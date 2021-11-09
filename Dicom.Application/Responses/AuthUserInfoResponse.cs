using System;
using Dicom.Application.Common.Models;
using Dicom.Application.DTO;
using Dicom.Entity.Identity;

namespace Dicom.Application.Responses
{
    public class AuthUserInfoResponse : BaseResponse
    {
        public UserDto User { get; set; }
    }
}
