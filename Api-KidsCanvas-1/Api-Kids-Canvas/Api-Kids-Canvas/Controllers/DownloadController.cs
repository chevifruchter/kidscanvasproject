using Amazon.S3.Model;
using Amazon.S3;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Api_Kids_Canvas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DownloadController : ControllerBase
    {
        private readonly IAmazonS3 _s3Client;
        private readonly string _bucketName;

        public DownloadController(IAmazonS3 s3Client, IConfiguration configuration)
        {
            _s3Client = s3Client;
            _bucketName = configuration["AWS:BucketName"];
        }

        [HttpGet("download-url")]
        public async Task<IActionResult> GetDownloadUrl([FromQuery] string fileName)
        {
            if (string.IsNullOrEmpty(fileName))
                return BadRequest("שם הקובץ נדרש");

            var request = new GetPreSignedUrlRequest
            {
                BucketName = _bucketName,  // שם הבאקט
                Key = $"kidscanvasbucket/{fileName}", // הנתיב שבו שמור הקובץ ב-S3
                Verb = HttpVerb.GET, // יצירת URL להורדה
                Expires = DateTime.UtcNow.AddMinutes(5) // תוקף של 5 דקות
            };

            try
            {
                string url = _s3Client.GetPreSignedURL(request);
                return Ok(new { url });
            }
            catch (AmazonS3Exception ex)
            {
                return StatusCode(500, $"שגיאה ביצירת URL: {ex.Message}");
            }
        }

    }
}
