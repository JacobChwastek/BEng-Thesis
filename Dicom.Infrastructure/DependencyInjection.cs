using Dicom.Application.Common.Interfaces;
using Dicom.Infrastructure.Persistence;
using Dicom.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Dicom.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services)
        {

            services.AddTransient<IIdentity, UserRepository>();
            services.AddDbContext<Context>();

            return services;
        }
    }
}
