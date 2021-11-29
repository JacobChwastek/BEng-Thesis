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

        public DocumentationService(DicomRepositories dal)
        {
            _dal = dal;
        }

        public async Task AddDocumentationImages(Guid documentationId, string drawLayerImgBase64, string viewLayerImageBase64)
        {
            var documentation = await _dal.DicomDocumentationRepositoryAsync
                .SingleOrDefaultAsync(x => x.Id == documentationId);

            if (documentation is null)
                throw new NotFoundException();
            
        }

        public async Task<Guid> CreateDocumentation(Guid dicomId)
        {
            var dicomDocumentation = new DicomDocumentation()
            {
                Id = Guid.NewGuid(),
                DicomId = dicomId,
                CreatedAt = DateTime.Now,
                DocumentationImages = new List<DocumentationImage>(),
                LastModifiedAt = DateTime.Now,
            };

            await _dal.DocumentationImageRepositoryAsync.InsertAsync(dicomDocumentation);

            await _dal.SaveChangesAsync();

            return dicomDocumentation.Id;
        }
    }
}