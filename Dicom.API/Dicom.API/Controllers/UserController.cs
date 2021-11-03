using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Dicom.Application.Commands;
using Dicom.Application.Queries;
using Microsoft.AspNetCore.Authorization;

namespace Dicom.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ApiController
    {
        [HttpPost("create-user")]
        [Authorize]
        public async Task<IActionResult>
            CreateUserAsync([FromBody] CreateUserCommand createUser)
        {
            var result = await Mediator.Send(createUser);
            return result != null ? Created("", result) : BadRequest(result);
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync([FromBody] LoginCommand login)
        {
            var result = await Mediator.Send(login);
            return result != null ? Created("", result) : BadRequest(result);
        }


        [HttpGet("get-user/{userid}")]
        [Authorize]
        public async Task<IActionResult>
            FindUserByIdAsync([FromRoute] string userid)
        {
            var result = await Mediator.Send(new UserInfoQuery { UserId = userid });
            return result != null ? Ok(result) : (IActionResult)NotFound();
        }
    }
}
