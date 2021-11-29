using System;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dicom.API.Extensions;
using Dicom.Application.Commands.Dicom.RemoveDicom;
using Dicom.Application.Commands.Dicom.UploadDicom;
using Dicom.Application.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;

namespace Dicom.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
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
        public async Task<IActionResult> UploadDicom()
        {
            var userId  = User.GetUserId();
            
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

            var result = await Mediator.Send(new UploadDicomCommand()
            {
                File = file,
                UserId = userId
            });
            
            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> LoadDicom()
        {
            var result = await _dicomService.LoadDicom();
            return Ok(result);
        }

        [HttpDelete]
        public async Task<IActionResult> RemoveDicom([FromQuery] Guid id)
        {
            try
            {
                if (Guid.Empty == id)
                {
                    return NotFound();
                }

                await Mediator.Send(new RemoveDicomCommandRequest()
                {
                    Id = id
                });

                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
