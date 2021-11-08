//using Dicom.Application.Common.Interfaces;
using Dicom.Infrastructure.Persistence;
using Dicom.Infrastructure.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace Dicom.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services)
        {
            services.AddScoped<DicomRepositories>();
            services.AddTransient<IUnitOfWork,UnitOfWork>() ;
            services.AddDbContext<Context>();

            return services;
        }
    }
}
