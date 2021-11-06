using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using CryptoHashVerify;
using Dicom.Application.Commands;
using Dicom.Application.Common.Interfaces;
using Dicom.Application.Options;
using Dicom.Application.Responses;
using Dicom.Entity.Identity;
using Dicom.Infrastructure.Repositories;
using Microsoft.IdentityModel.Tokens;

namespace Dicom.Application.Services
{
    public class AuthenticationService : IAuthentication
    {
        private readonly DicomRepositories _dal;
        private readonly JwtSettings _jwtSettings;
        public AuthenticationService(JwtSettings jwtSettings, DicomRepositories dal)
        {
            _jwtSettings = jwtSettings;
            _dal = dal;
        }

        public async Task<AuthenticationResponse> LoginAsync(LoginCommand user)
        {
            var existingUser = await _dal.UserRepositoryAsync.GetByIDAsync(user.UserId);

            if (existingUser == null)
            {
                return new AuthenticationResponse
                {
                    Errors = new[] { "Username / password incorrect" }
                };
            }

            if (CheckPasswordAsync(existingUser.Password, existingUser.Salt, user.Password))
            {
                return new AuthenticationResponse
                {
                    Errors = new[] { "Username / password incorrect" }
                };
            }

            return await GenerateAuthenticationResponseForUserAsync(existingUser);
        }

        public async Task<AuthenticationResponse> RegisterAsync(CreateUserCommand user)
        {
            var existingUser = await _dal.UserRepositoryAsync.GetByIDAsync(user.UserId);

            if (existingUser != null)
            {
                return new AuthenticationResponse
                {
                    Errors = new[] { "User with this user id already exists" }
                };
            }

            var (password, salt) = GenerateHashPasswordAndSalt(password: user.Password);

            var role = new Role()
            {
                Id = Guid.NewGuid(),
                Name = user.Role
            };

            var result = await _dal.UserRepositoryAsync.InsertAsync(new User
                { Id = user.UserId, Password = password, Salt = salt, Role = role });

            if (!result.HasValue)
            {
                return new AuthenticationResponse
                {
                    Errors = new[] { "Unable to create user" }
                };
            }

            var newUser = await _dal.UserRepositoryAsync.GetByIDAsync(user.UserId);

            return await GenerateAuthenticationResponseForUserAsync(newUser);
        }

        private static bool CheckPasswordAsync(string hashPassword, string salt, string password)
        {
            return HashVerify.VerifyHashString(hashPassword, salt, password);
        }

        private Task<AuthenticationResponse> GenerateAuthenticationResponseForUserAsync(User user)
        {
            var jwtHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwtSettings.Secret);

            var claims = new List<Claim>
            {
               new Claim(ClaimTypes.Role, user.Role.Name),
               new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
               new Claim("id", user.Id.ToString()),
               new Claim("userId", user.Id.ToString())
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Audience = "http://dev.chandu.com",
                Expires = DateTime.UtcNow.Add(_jwtSettings.TokenLifetime),
                SigningCredentials =
                new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };


            var token = jwtHandler.CreateToken(tokenDescriptor);

            return Task.FromResult(new AuthenticationResponse
            {
                IsSuccess = true,
                Token = jwtHandler.WriteToken(token)
            });
        }

        private static (string, string) GenerateHashPasswordAndSalt(string password)
        {
            return HashVerify.GenerateHashString(password);
        }
    }
}
