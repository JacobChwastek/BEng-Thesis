using Dicom.Application.Common.Models;

namespace Dicom.Application.Responses
{
    public class UserInfoQueryResponse : BaseResponse
    {
        public string UserId { get; set; }
        public string Role { get; set; }
    }
}
