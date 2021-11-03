using Microsoft.Extensions.Configuration;
using System.IO;

namespace Dicom.Infrastructure.Common
{
    internal static class ConfigurationConstants
    {
        public static readonly string DBConnectionString = ("DefaultConnection").AppSettings();

        public static string AppSettings(this string key, bool isConnectionString = true)
        {
            var config = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();

            return isConnectionString switch
            {
                true => config["ConnectionStrings:" + key],
                _ => config[key],
            };
        }
    }

}
