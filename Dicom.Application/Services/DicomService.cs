using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dicom.Application.Common.Exceptions;
using Dicom.Infrastructure.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;

namespace Dicom.Application.Services
{
    public interface IDicomService
    {
        Task<Guid> SaveDicom(IFormFile file, Guid requestUserId);
        Task<object> LoadDicom();

        Task RemoveDicomAsync(Guid id);
    }

    public class DicomService: IDicomService
    {
        private readonly DicomRepositories _dal;
        private readonly IHostEnvironment _hostEnvironment;

        public DicomService(IHostEnvironment hostEnvironment, DicomRepositories dal)
        {
            _hostEnvironment = hostEnvironment;
            _dal = dal;
        }

        public async Task<object> LoadDicom()
        {
            var file = await DicomFile.OpenAsync(@"D:\Projects\Software\dicom\Assets\Dicom\ff6610d2-d302-4c15-88d7-dff8395eef48");
            var dicomDataset = file.Dataset;
            var studyInstanceUid = dicomDataset.GetSingleValue<string>(DicomTag.StudyInstanceUID);
            var seriesInstanceUid = dicomDataset.GetSingleValue<string>(DicomTag.SeriesInstanceUID);
            var sopClassUid = dicomDataset.GetSingleValue<string>(DicomTag.SOPClassUID);
            var sopInstanceUid = dicomDataset.GetSingleValue<string>(DicomTag.SOPInstanceUID);
            var transferSyntaxUid = file.FileMetaInfo.TransferSyntax;

            var result = new
            {
                StudyInstanceUid = studyInstanceUid,
                SeriesInstanceUid = seriesInstanceUid,
                SopClassUid = sopClassUid,
                SopInstanceUid = sopInstanceUid,
                TransferSyntaxUid = transferSyntaxUid
            };

            return result;
        }

        public async Task RemoveDicomAsync(Guid id)
        {
            var dicom = await _dal.DicomRepositoryAsync
                .FirstOrDefaultAsync(x => x.Id == id);

            if (dicom is null || !File.Exists(dicom.Path))
            {
                throw new NotFoundException();
            }

            dicom.Deleted = true;
            dicom.DeletedAt = DateTime.Now;
            dicom.LastModifiedAt = DateTime.Now;
            
            File.Delete(dicom.Path);

            await _dal.SaveChangesAsync();
        }
        
        public async Task<Guid> SaveDicom(IFormFile file, Guid requestUserId)
        {
            var path = await _dal.VolumeRepositoryAsync.FirstOrDefaultAsync();

            var user = await _dal.UserRepositoryAsync.FirstOrDefaultAsync(x => x.Id == requestUserId);
            
            var directoryPath = path.Path + "\\Dicom\\";

            if (!Directory.Exists(directoryPath))
                Directory.CreateDirectory(directoryPath);

            var dicomId = Guid.NewGuid();

            var filePath = Path.Combine(directoryPath, dicomId.ToString());

            var dicom = new Entity.Dicom.Dicom
            {
                Id = dicomId,
                FileName = file.FileName,
                FileSize = file.Length,
                Path = filePath,
                User = user
            };
            
            await using Stream fileStream = new FileStream(filePath, FileMode.Create);
            
            await file.CopyToAsync(fileStream);

            await _dal.DicomRepositoryAsync.InsertAsync(dicom);

            await _dal.SaveChangesAsync();

            return dicom.Id;
        }
    }
}
