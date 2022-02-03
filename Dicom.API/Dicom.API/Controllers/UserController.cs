using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Dicom.API.Extensions;
using Dicom.Application.Commands.CreateUser;
using Dicom.Application.Commands.Login;
using Dicom.Application.Queries;
using Dicom.Application.Services;
using Dicom.Entity.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;

namespace Dicom.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ApiController
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        public async Task<IEnumerable<User>> GetUsers() => await _userService.GetUsers();

        [HttpPost("register")]
        public async Task<IActionResult> CreateUserAsync([FromBody] CreateUserCommand createUser)
        {
            var result = await Mediator.Send(createUser);
            return result != null ? Created("", result) : BadRequest();
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync([FromBody] LoginCommand login)
        {
            var result = await Mediator.Send(login);

            if (result == null)
            {
                return BadRequest();
            }

            if (result.Errors is null)
            {
                return Ok(result);
            }

            if (result.Errors.Any())
            {
                return Unauthorized(result);
            }

            return Ok(result);
        }

        [HttpGet()]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> FindAuthenticatedUser()
        {
            var userId = User.GetUserId();

            try
            {
                var result = await Mediator.Send(new AuthUserInfoQuery() { UserId = userId });
                return result != null ? Ok(result) : NotFound();
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        [HttpGet("get-user/{userid:guid}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> FindUserByIdAsync([FromRoute] Guid userId)
        {
            var result = await Mediator.Send(new UserInfoQuery { UserId = userId });
            return result != null ? Ok(result) : NotFound();
        }
    }
}