using Amazon.S3;
using Amazon.S3.Model;
using Kids_Canvas.Core.Entities;
using Kids_Canvas.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Api_Kids_Canvas
{

    public class S3Service
    {
        private readonly IAmazonS3 _s3Client;
        private readonly DataContext _dbContext;
        private readonly string _bucketName; // שם הבאקט

        public S3Service(IAmazonS3 s3Client, DataContext dbContext, IConfiguration icofiguration)
        {
            _s3Client = s3Client;
            _dbContext = dbContext;
            _bucketName = icofiguration["AWS:BucketName"];
        }

        public async Task AsyncSaveDrawingsFromS3(Drawings drawing)
        {
            var newdrawing = new Drawings
            {
                Name = drawing.Name,
                Artist_name = drawing.Artist_name,
                Target_age = drawing.Target_age,
                CategoryId = drawing.CategoryId,
                Path = $"https://{_bucketName}.s3.amazonaws.com/{drawing.Name}", // יצירת קישור ישיר
                Created_at = drawing.Created_at,
                Updated_at = DateTime.UtcNow
            };

            _dbContext.Drawings.Add(drawing);

            await _dbContext.SaveChangesAsync();
        }
    }

}

