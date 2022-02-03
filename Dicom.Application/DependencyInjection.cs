using FluentValidation;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
using Dicom.Application.Common.Behaviors;
using Dicom.Application.Common.Interfaces;
using Dicom.Application.Services;
using Dicom.Imaging;
using FellowOakDicom;

namespace Dicom.Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            services.AddAutoMapper(Assembly.GetExecutingAssembly());
            services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
            services.AddMediatR(Assembly.GetExecutingAssembly());
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(UnhandledExceptionBehaviour<,>));
            services.AddTransient<IAuthentication, AuthenticationService>();
            services.AddTransient<IDicomService, DicomService>();
            services.AddTransient<IPdfService, PdfService>();
            services.AddTransient<IDocumentationService, DocumentationService>();
            services.AddTransient<IFileService, FileService>();
            services.AddTransient<IHtmlService, HtmlService>();
            services.AddTransient<IUserService, UserService>();

            new DicomSetupBuilder()
                .RegisterServices(s => s.AddFellowOakDicom())
                .Build();
            
            return services;
        }
    }
}
