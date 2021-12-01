using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Dicom.Application.Common.Exceptions;
using Dicom.Entity.Dicom;
using Dicom.Infrastructure.Repositories;
using MediatR;

namespace Dicom.Application.Services
{
    public interface IDocumentationService
    {
        public Task AddDocumentationImages(Guid documentationId, string drawLayerImgBase64,
            string viewLayerImageBase64);

        public Task<Guid> CreateDocumentation(Guid dicomId);
    }

    public class DocumentationService : IDocumentationService
    {
        private readonly DicomRepositories _dal;
        private readonly IFileService _fileService;

        public DocumentationService(DicomRepositories dal, IFileService fileService)
        {
            _dal = dal;
            _fileService = fileService;
        }

        public async Task AddDocumentationImages(Guid documentationId, string drawLayerImgBase64,
            string viewLayerImageBase64)
        {
            var documentation = await _dal.DicomDocumentationRepositoryAsync
                .SingleOrDefaultAsync(x => x.Id == documentationId);

            if (documentation is null)
                throw new NotFoundException();


            if (drawLayerImgBase64.Length == 0 || viewLayerImageBase64.Length == 0)
                throw new BadImageFormatException();

            var volumePath = await _dal.VolumeRepositoryAsync.FirstOrDefaultAsync();
            var drawImagePath = $"{volumePath.Path}\\DocumentationImages\\{Guid.NewGuid().ToString()}";
            var viewLayerPath = $"{volumePath.Path}\\DocumentationImages\\{Guid.NewGuid().ToString()}";

            _fileService.SaveBase64ToFile(drawImagePath, drawLayerImgBase64.Replace("data:image/png;base64,",""));
            _fileService.SaveBase64ToFile(viewLayerPath, viewLayerImageBase64.Replace("data:image/png;base64,",""));

            var documentationImage = new DocumentationImage()
            {
                Id = Guid.NewGuid(),
                CreatedAt = DateTime.Now,
                DicomDocumentation = documentation,
                DicomDocumentationId = documentation.Id,
                DrawLayerImage = drawImagePath,
                ViewLayerImage = viewLayerPath
            };

            await _dal.DocumentationImageRepositoryAsync.InsertAsync(documentationImage);
            await _dal.SaveChangesAsync();
        }

        public async Task<Guid> CreateDocumentation(Guid dicomId)
        {
            var dicom = await _dal.DicomRepositoryAsync.FirstOrDefaultAsync(x => x.Id == dicomId);
            var dicomDocumentation = new DicomDocumentation()
            {
                Id = Guid.NewGuid(),
                DicomId = dicomId,
                Dicom = dicom,
                CreatedAt = DateTime.Now,
                LastModifiedAt = DateTime.Now,
                Deleted = false
            };

            await _dal.DicomDocumentationRepositoryAsync.InsertAsync(dicomDocumentation);

            await _dal.SaveChangesAsync();

            return dicomDocumentation.Id;
        }
    }
}