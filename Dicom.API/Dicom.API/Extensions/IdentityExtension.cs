using System;
using System.Linq;
using System.Security.Claims;

namespace Dicom.API.Extensions
{
    public static class IdentityExtension
    {
        public static Guid GetUserId(this ClaimsPrincipal user)
        {
            var claimUserId = user.FindFirstValue(ClaimTypes.UserData);
            var isUserIdValid = Guid.TryParse(claimUserId, out var userId);

            if (!isUserIdValid)
                throw new UnauthorizedAccessException();

            return userId;
        }
        
        public static string GetClaimValue(this ClaimsPrincipal identity, string claimType) => 
            identity.Claims.FirstOrDefault(c => c.Type == claimType)?.Value;
    }
}