﻿namespace Api_Kids_Canvas
{
    public class TrackMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<TrackMiddleware> _logger;

        public TrackMiddleware(RequestDelegate next, ILogger<TrackMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var requestSeq = Guid.NewGuid().ToString();
            _logger.LogInformation($"Request Starts {requestSeq}");
            context.Items.Add("RequestSequence", requestSeq);
            await _next(context);
            _logger.LogInformation($"Request Ends {requestSeq}");
        }
    }
}
