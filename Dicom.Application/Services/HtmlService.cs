using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Dicom.Domain.DicomModel;
using Dicom.Domain.DicomModel.Html;

namespace Dicom.Application.Services
{
    public interface IHtmlService
    {
        public string GenerateHtml(IEnumerable<DocumentationImageUrl> documentationImageUrls, List<MetaData> tags);
    }

    public class HtmlService : IHtmlService
    {
        private readonly StringBuilder _sb;

        public HtmlService()
        {
            _sb = new StringBuilder();
        }

        private void GenerateHeader()
        {
            _sb
                .Append("<!DOCTYPE html>")
                .Append("<html xmlns=\"http://www.w3.org/1999/xhtml\">")
                .Append("<head>")
                // .Append(_header)
                .Append(@"<style>")
                .Append(@"  @media print {
                        .avoidBreakInside {
                                break-inside: avoid;
                        }
                }

                table {
                        text-align: left;
                        position: relative;
                        border-collapse: collapse;
                        background-color: #f6f6f6;
                }

                /* Spacing */
                td,
                th {
                        border: 1px solid #999;
                        padding: 20px;
                }

                th {
                        background: brown;
                        color: white;
                        border-radius: 0;
                        position: sticky;
                        top: 0;
                        padding: 10px;
                }

                .primary {
                        background-color: #000000
                }

                tfoot>tr {
                        background: black;
                        color: white;
                }")
                .Append(@"</style>")
                .Append("<title>Dicom Viewer</title>")
                .Append("</head>");
        }

        private void GenerateTagsTable(List<MetaData> tags)
        {
            _sb.Append("<table>");
            _sb.Append(@"<h2 style=""flex: 1; text-align: center;"">Tags </h2>");
            _sb.Append(@"<tr>");
            _sb.Append(@"<th scope=""col"">Tag Number</th>");
            _sb.Append(@"<th scope=""col"">Tag Name</th>");
            _sb.Append(@"<th>Value</th>");
            _sb.Append(@"<tr>");
            _sb.Append(@"</tr>");

            foreach (var value in tags)
            {
                _sb.Append(@"<tr>");
                _sb.Append($@"   <th>{value.Code}</th>");
                _sb.Append($@"   <td>{value.Name}</td>");
                _sb.Append($@"   <td>{value.Value}</td>");
                _sb.Append(@"</tr>");
            }

            _sb.Append("</table>");
        }

        private void GenerateDicomImages(IEnumerable<DocumentationImageUrl> documentationImageUrls)
        {
            _sb.Append(@"<div class=""avoidBreakInside"">");

            var index = 0;
            foreach (var documentationImageUrl in documentationImageUrls)
            {
                _sb.Append(@"<div class=""documentation-images avoidBreakInside"" style=""display: flex; flex-direction: row; flex-wrap: wrap;"">");
                _sb.Append(@"<div style=""width: 100%; height: 20px; border-bottom: 1px solid black; text-align: center;     margin-bottom: 2%;"">");
                _sb.Append(@"<span style=""font-size: 2rem; background-color: #FFF; padding: 0 10px;"">");
                _sb.Append($"Instance {(++index).ToString()}");
                _sb.Append("</span>");
                _sb.Append("</div>");

                _sb.Append(@"<div style=""flex:48%; display: flex; justify-content: center; margin: 1%;"">");
                _sb.Append(@$" <img style=""max-height: 300px;"" src=""{documentationImageUrl.ViewUrl}"" alt=""view"">");
                _sb.Append(@"</div>");
                _sb.Append(@"<div style=""flex:48%; display: flex; justify-content: center; margin: 1%;"">");
                _sb.Append(@$" <img  style=""max-height: 300px; background: grey;""  src=""{documentationImageUrl.DrawUrl}"" alt=""draw"">");
                _sb.Append(@"</div>");
                _sb.Append(@"</div>");
            }

            _sb.Append(@"</div>");
        }

        private void GenerateTitle()
        {
            _sb
                .Append(@"<body style=""padding: 0 3rem 3rem 3rem;display: flex;flex-direction: column;"">")
                .Append(@"<section class=""header"" style=""display: flex; font-size: 2rem;"">")
                .Append(@"<div class=""logo"" style=""display: flex; align-items: center;"">")
                .Append(@"<img style=""width: 100px;"" class=""header-img"" src=""https://localhost:5001/api/assets\"" alt=""logo"">")
                .Append(@"</div>")
                .Append(@"<h1 style=""flex: 1; text-align: center;"">Medical Documentation </h1>")
                .Append(@"<div class=""datetime"" style=""display: flex; align-items: center;"">")
                .Append(@"<h3 style=""font-size: 1.5rem;"">")
                .Append(DateTime.Now.Date.ToString("g"))
                .Append(@" </h3>")
                .Append("</section>");
        }

        private void CloseBody()
        {
            _sb.Append("</div>");

            _sb.Append("</body>");
        }

        private void GenerateBody(IEnumerable<DocumentationImageUrl> documentationImageUrls, List<MetaData> tags)
        {
            GenerateTitle();
            GenerateTagsTable(tags);
            GenerateDicomImages(documentationImageUrls);
            CloseBody();
        }

        private void CloseHtml()
        {
            _sb.Append("</html>");
        }

        public string GenerateHtml(IEnumerable<DocumentationImageUrl> documentationImageUrls, List<MetaData> tags)
        {
            GenerateHeader();
            GenerateBody(documentationImageUrls, tags);
            CloseHtml();

            return _sb.ToString();
        }
    }
}