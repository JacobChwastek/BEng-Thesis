using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dicom.Application.Common.Exceptions;
using Dicom.Domain.DicomModel;
using Dicom.Infrastructure.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using FellowOakDicom;
using FellowOakDicom.Imaging.Reconstruction;

namespace Dicom.Application.Services
{
    public interface IDicomService
    {
        Task<Guid> SaveDicom(IFormFile file, Guid requestUserId);
        Task<object> LoadDicom();
        Task RemoveDicomAsync(Guid id);
        Task<List<MetaData>> GetMetaTags(Guid id);

        bool Exists(Guid id);
    }

    public class DicomService : IDicomService
    {
        private readonly DicomRepositories _dal;
        private readonly IFileService _fileService;
        private readonly IHostEnvironment _hostEnvironment;

        public DicomService(IHostEnvironment hostEnvironment, DicomRepositories dal, IFileService fileService)
        {
            _hostEnvironment = hostEnvironment;
            _dal = dal;
            _fileService = fileService;
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

        public async Task<List<MetaData>> GetMetaTags(Guid id)
        {
            var dicom = await _dal.DicomRepositoryAsync
                .FirstOrDefaultAsync(x => x.Id == id);

            var file = await DicomFile.OpenAsync(dicom.Path);

            var dicomDataset = file.Dataset;

            var imageType = dicomDataset.GetValues<string>(DicomTag.ImageType);
            var modality = dicomDataset.GetSingleValue<string>(DicomTag.Modality);
            var patientName = dicomDataset.GetSingleValue<string>(DicomTag.PatientName);
            var instanceNumber = dicomDataset.GetSingleValue<string>(DicomTag.InstanceNumber);

            var studyInstanceUid = dicomDataset.GetSingleValue<string>(DicomTag.StudyInstanceUID);
            var seriesInstanceUid = dicomDataset.GetSingleValue<string>(DicomTag.SeriesInstanceUID);
            var sopClassUid = dicomDataset.GetSingleValue<string>(DicomTag.SOPClassUID);
            var sopInstanceUid = dicomDataset.GetSingleValue<string>(DicomTag.SOPInstanceUID);
            var transferSyntaxUid = file.FileMetaInfo.TransferSyntax;
            
            return new List<MetaData>
            {
                new()
                {
                    Code = DicomTag.ImageType.ToString(),
                    Name = "Type",
                    Value = string.Join("-", imageType),
                },
                new()
                {
                    Code = DicomTag.Modality.ToString(),
                    Name = "Modality",
                    Value = modality,
                },
                new()
                {
                    Code = DicomTag.PatientName.ToString(),
                    Name = "Patient Name",
                    Value = patientName,
                },
                new()
                {
                    Code = DicomTag.InstanceNumber.ToString(),
                    Name = "Instance number",
                    Value = instanceNumber
                }
            };
        }


        public bool Exists(Guid id) => _dal.DicomRepositoryAsync.Any(x => x.Id == id);


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