using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;


namespace Dicom.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssetsController: ControllerBase
    {

        [HttpGet]
        public async Task<IActionResult> GetLogo()
        {
            var path = Path.GetFullPath(@"D:\Projects\Software\dicom\Dicom.Domain\Dicom.Domain\Assets\Images\logo.png");
            var memory = new MemoryStream();
            await using (var stream = new FileStream(path, FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }
            memory.Position = 0;
            return File(memory, "image/png", Path.GetFileName(path));
        }
    }
}