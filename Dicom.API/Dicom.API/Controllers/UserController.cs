using System;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Dicom.Application.Commands;
using Dicom.Application.Queries;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;

namespace Dicom.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ApiController
    {
        [HttpPost("register")]
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
            return result != null ? Ok(result) : BadRequest(result);
        }

        [HttpGet()]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> FindAuthenticatedUser()
        {
            var claimUserId = User.FindFirstValue(ClaimTypes.UserData);
            var isUserIdValid = Guid.TryParse(claimUserId, out var userId);

            if (!isUserIdValid)
                return NotFound();

            var result = await Mediator.Send(new AuthUserInfoQuery() { UserId = userId });
            return result != null ? Ok(result) : (IActionResult)NotFound();
        }


        [HttpGet("get-user/{userid}")]
        [Authorize]
        public async Task<IActionResult>
            FindUserByIdAsync([FromRoute] Guid userId)
        {
            var result = await Mediator.Send(new UserInfoQuery { UserId = userId });
            return result != null ? Ok(result) : (IActionResult)NotFound();
        }
    }
}
