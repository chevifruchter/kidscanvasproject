using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using RestSharp;
using System.Net;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Api_Kids_Canvas.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DrawingController : ControllerBase
    {   
        private readonly IConfiguration _configuration;
        public DrawingController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpPost("generate")]
        public async Task<IActionResult> ImageWithiAi([FromBody] DrawingRequest request)
        {
            var client = new RestClient("https://api.openai.com/v1/images/generations");
            var openAiRequest = new RestRequest(Method.POST);
            openAiRequest.AddHeader("Authorization", $"Bearer {_configuration["OpenAI:ApiKey"]}");
            openAiRequest.AddHeader("Content-Type", "application/json");

            var body = new
            {
                model = "gpt-4o-mini", // רק מודלים תומכים בהפקת תמונה
                prompt = request.Prompt,
                n = 1,
                size = "1024x1024",
                response_format = "url"
            };
            openAiRequest.AddJsonBody(body);

            var response = await client.ExecuteAsync(openAiRequest);
            if (!response.IsSuccessful)
                return StatusCode((int)response.StatusCode, response.Content);

            var json = JObject.Parse(response.Content!);
            var imageUrl = json["data"]?[0]?["url"]?.ToString();

            if (string.IsNullOrEmpty(imageUrl))
                return BadRequest("Image generation failed");

            // הורדה של התמונה כקובץ
            using var httpClient = new HttpClient();
            var imageData = await httpClient.GetByteArrayAsync(imageUrl!);

            // אפשר לשנות ל-"application/pdf" אם אתה יוצר PDF
            return File(imageData, "image/svg+xml", "drawing.svg");
        }
    }

    public class DrawingRequest
    {
        public string Prompt { get; set; } = string.Empty;
    }
}
