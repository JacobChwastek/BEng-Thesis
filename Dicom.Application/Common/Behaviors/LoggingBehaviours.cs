using System.Threading;
using System.Threading.Tasks;
using MediatR.Pipeline;
using Microsoft.Extensions.Logging;

namespace Dicom.Application.Common.Behaviors
{
    public class LoggingBehaviour<TRequest> : IRequestPreProcessor<TRequest>
    {
        private readonly ILogger _logger;

        public LoggingBehaviour(ILogger<TRequest> logger)
        {
            _logger = logger;
        }

        public async Task Process(TRequest request, CancellationToken cancellationToken)
        {
            var requestName = typeof(TRequest).Name;

            var user = await GetUserId();

            _logger.LogInformation("Rectitude Portal Profile Request: {Name} {User} {@Request}",
                requestName, user, request);
        }

        /// <summary>
        /// Here we need inject the identity server or application identity to get the user ID
        /// </summary>
        /// <returns></returns>
        public async Task<string> GetUserId() => await Task.FromResult<string>("User ID");
    }
}
