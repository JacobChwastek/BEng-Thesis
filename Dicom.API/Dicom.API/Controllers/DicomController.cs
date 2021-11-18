using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Dicom.Application.Commands.Dicom.UploadDicom;
using Dicom.Application.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;

namespace Dicom.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DicomController : ApiController
    {
        private readonly IDicomService _dicomService;

        public DicomController(IDicomService dicomService)
        {
            _dicomService = dicomService;
        }


        [HttpPost("upload-dicom")]
        [RequestFormLimits(ValueLengthLimit = int.MaxValue, MultipartBodyLengthLimit = int.MaxValue)]
        [DisableRequestSizeLimit]
        [Consumes("multipart/form-data")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> UploadDicom()
        {
            IEnumerable<IFormFile> files = Request.Form.Files;

            if (files.Count() != 1)
            {
                return BadRequest("Only one file at the time possible");
            }

            var file = files.First();

            if (file.Length == 0)
            {
                return BadRequest("Empty file");
            }

            var result = await Mediator.Send(request: new UploadDicomCommand()
            {
                File = file
            });
            
            return Ok(result);
        }

        [HttpGet()]
        public async Task<IActionResult> LoadDicom()
        {
            var result = await _dicomService.LoadDicom();
            return Ok(result);
        }

    }
}
