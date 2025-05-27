namespace Api_Kids_Canvas
{
    public static class TrackMiddleWareExtentions
    {
        public static IApplicationBuilder UseTrack(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<TrackMiddleware>();
        }
    }
}
