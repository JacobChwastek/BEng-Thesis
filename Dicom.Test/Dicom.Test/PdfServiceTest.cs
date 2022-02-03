using Dicom.Application.Services;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Dicom.Test
{
    public class PdfServiceTest
    {
        private readonly Mock<IPdfService> _pdfService;

        public PdfServiceTest()
        {
            _pdfService = new Mock<IPdfService>();
        }

        [Fact]
        public async Task Xd()
        {
            var exampleHtml = "<!DOCTYPE html>" +
                "< html lang = \"en\">" +
                "<head>< meta charset = \"UTF-8\">" +
                "<meta http - equiv = \"X-UA-Compatible\" content = \"IE=edge\" >" +
                "< meta name = \"viewport\" content = \"width=device-width, initial-scale=1.0\" >" +
                "< title > Document>" +
                " </ title>" +
                " </ head >" +
                "< body </ body>" +
                " </ html > ";

            // FileContentResult xd = new FileContentResult().;

            // var xd = await _pdfService.Setup(x => x.GeneratePdf()).ReturnsAsync();

            Assert.True(true);
        }
    }
}
