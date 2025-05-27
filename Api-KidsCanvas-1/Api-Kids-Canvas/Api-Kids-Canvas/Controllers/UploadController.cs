using Microsoft.AspNetCore.Mvc;
using Amazon.S3;
using Amazon.S3.Model;
using Kids_Canvas.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Kids_Canvas.Data;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Api_Kids_Canvas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadController : ControllerBase
    {
        private readonly IAmazonS3 _s3Client;
        private readonly string _bucketName;

        public UploadController(IAmazonS3 s3Client, IConfiguration configuration,DbContext dbContext)
        {
            _s3Client = s3Client;
            _bucketName = configuration["AWS:BucketName"];
        }



        [HttpGet("upload-url")]
        public async Task<IActionResult> GetUploadUrl([FromQuery] string nameFile)
        {

            if (string.IsNullOrEmpty(nameFile))
                return BadRequest("שם הקובץ נדרש");

            var request = new GetPreSignedUrlRequest
            {
                BucketName = _bucketName,
                Key = $"DrawingsFolder/{nameFile}", // קבצים נשמרים בתיקיית exams
                Verb = HttpVerb.PUT,
                Expires = DateTime.UtcNow.AddMinutes(10),
                ContentType = "jpg"
            };

            //  הוספת כותרת ACL כדי לוודא שהבאקט הוא הבעלים
            request.Headers["x-amz-acl"] = "bucket-owner-full-control";
            // שמירת הנתונים ב-DB
            //var newdrawing = new Drawings
            //{
            //    Name = drawing.Name,
            //    Artist_name = drawing.Artist_name,
            //    Target_age = drawing.Target_age,
            //    Path = $"https://{_bucketName}.s3.eu-north-1.amazonaws.com/{drawing.Name}", // יצירת קישור ישיר
            //    Created_at = drawing.Created_at,
            //    Updated_at = DateTime.UtcNow
            //};

            //_dbContext.Drawings.Add(newdrawing);
            //await _dbContext.SaveChangesAsync();

            try
            {
                //Response.Headers.Append("Access-Control-Allow-Origin", "*");
                //Response.Headers.Append("Access-Control-Allow-Methods", "GET, POST, PUT");
                //Response.Headers.Append("Access-Control-Allow-Headers", "Content-Type");

                string url = _s3Client.GetPreSignedURL(request);
                return Ok(new { url });
            }
            catch (AmazonS3Exception ex)
            {
                return StatusCode(500, $"שגיאה ביצירת URL עם הרשאות: {ex.Message}");
            }

        }
    }
}
