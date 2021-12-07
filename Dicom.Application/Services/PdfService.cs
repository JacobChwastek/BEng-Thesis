using System.Collections.Generic;
using System.IO;
using System.Net.Mime;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PuppeteerSharp;
using PuppeteerSharp.Media;

namespace Dicom.Application.Services
{
    public interface IPdfService
    {
        
        Task<FileContentResult>  GeneratePdf();
        Task<FileContentResult>  GeneratePdf(string template);
    }

    public class PdfService : IPdfService
    {
        public async Task<FileContentResult>  GeneratePdf()
        {
            var templateContent =
                await File.ReadAllTextAsync(@"D:\Projects\Software\dicom\Dicom.Domain\Dicom.Domain\PdfTemplates\DefaultTemplate.html");

            await new BrowserFetcher().DownloadAsync(BrowserFetcher.DefaultChromiumRevision);
            await using var browser = await Puppeteer.LaunchAsync(new LaunchOptions
            {
                Headless = false,
                
            });

            await using var page = await browser.NewPageAsync();
            await page.EmulateMediaTypeAsync(MediaType.Print);
            await page.SetContentAsync(templateContent);
            var pdfContent = await page.PdfStreamAsync(new PdfOptions
            {
                PrintBackground = true,
                MarginOptions = new MarginOptions { Bottom = "0.50cm", Top = "0.50cm" },
                Scale = 0.57M
            });

            await using var ms = new MemoryStream();

            await pdfContent.CopyToAsync(ms);
            
            return new FileContentResult(ms.ToArray(), MediaTypeNames.Application.Pdf);
        }

        public async Task<FileContentResult> GeneratePdf(string template)
        {
            await new BrowserFetcher().DownloadAsync(BrowserFetcher.DefaultChromiumRevision);
            await using var browser = await Puppeteer.LaunchAsync(new LaunchOptions
            {
                Headless = true
            });

            await using var page = await browser.NewPageAsync();
            await page.EmulateMediaTypeAsync(MediaType.Print);
            
            await page.SetContentAsync(template);
            var pdfContent = await page.PdfStreamAsync(new PdfOptions
            {
                PrintBackground = true,
                MarginOptions = new MarginOptions { Bottom = "0.50cm", Top = "0.50cm" },
                Scale = 0.80M
            });

            await using var ms = new MemoryStream();

            await pdfContent.CopyToAsync(ms);
            
            return new FileContentResult(ms.ToArray(), MediaTypeNames.Application.Pdf);
        }
    }
}