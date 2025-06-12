using Microsoft.AspNetCore.Mvc;
using Amazon.S3;
using Amazon.S3.Model;
using Kids_Canvas.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Kids_Canvas.Data;
using Api_Kids_Canvas.Models;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Api_Kids_Canvas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadController : ControllerBase
    {
        public class DrawingModel
        {
            public string Name { get; set; }
            public int TargetAge { get; set; }
            public string ArtistName { get; set; }
        }

        private readonly IAmazonS3 _s3Client;
        private readonly string _bucketName;
        private readonly DataContext _dbContext;

        public UploadController(IAmazonS3 s3Client, IConfiguration configuration, DataContext dbContext)
        {
            _s3Client = s3Client;
            _bucketName = configuration["AWS:BucketName"];
            _dbContext = dbContext;
        }



        [HttpGet("upload-url")]
        public async Task<IActionResult> GetUploadUrl([FromForm] DrawingModel drawing)
        {
            if (string.IsNullOrEmpty(drawing.Name))
                return BadRequest("שם הקובץ נדרש");

            // יצירת שם ייחודי לקובץ
            var fileName = $"{Guid.NewGuid()}_{drawing.Name}";
            var key = $"Drawings/{fileName}";

            var request = new GetPreSignedUrlRequest
            {
                BucketName = _bucketName,
                Key = key,
                Verb = HttpVerb.PUT,
                Expires = DateTime.UtcNow.AddMinutes(10),
                ContentType = "jpg" // עדיף לשלוח מהקליינט ולהגדיר דינמית
            };

            request.Headers["x-amz-acl"] = "bucket-owner-full-control";

            string fileUrl = $"https://{_bucketName}.s3.eu-north-1.amazonaws.com/{key}";

            try
            {
                string url = _s3Client.GetPreSignedURL(request);
                return Ok(new { url, fileUrl });
            }
            catch (AmazonS3Exception ex)
            {
                return StatusCode(500, $"שגיאה ביצירת URL עם הרשאות: {ex.Message}");
            }
        }

        [HttpPost("save")]
        public async Task<IActionResult> SaveDrawing([FromBody] SaveDrawingDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Name) || string.IsNullOrWhiteSpace(dto.Url))
                return BadRequest("Missing required data");

            var drawing = new Drawings
            {
                Name = dto.Name,
                Artist_name = dto.ArtistName,
                Target_age = dto.TargetAge,
                Path = dto.Url,
                Created_at = DateTime.UtcNow,
                Updated_at = DateTime.UtcNow
            };

            _dbContext.Drawings.Add(drawing);
            await _dbContext.SaveChangesAsync();

            return Ok(new { message = "הציור נשמר בהצלחה!" });
        }

        // DTO – מחלקת קלט
        public class SaveDrawingDto
        {
            public string Name { get; set; }
            public string ArtistName { get; set; }
            public int TargetAge { get; set; }
            public string Url { get; set; }
        }

    }

}
