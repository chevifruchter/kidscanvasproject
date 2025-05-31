using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Api_Kids_Canvas.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DrawingStoryController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IHttpClientFactory _httpClientFactory;

        public DrawingStoryController(IConfiguration config, IHttpClientFactory httpClientFactory)
        {
            _config = config;
            _httpClientFactory = httpClientFactory;
        }

        [HttpPost("create-story")]
        public async Task<IActionResult> CreateStory([FromForm] List<IFormFile> drawings)
        {
            if (drawings == null || drawings.Count == 0)
                return BadRequest("No drawings uploaded.");

            var apiKey = _config["OpenAI:ApiKey"];
            var model = _config["OpenAI:Model"] ?? "gpt-4o";
            var client = _httpClientFactory.CreateClient();

            var messages = new List<Dictionary<string, object>>
        {
            new()
            {
                ["role"] = "system",
                ["content"] = " אתה מספר סיפורים לילדים. צור סיפור שמתאים לציורים שיצורפו.סיפור חינוכי בלבד!!"
            }
        };

            // Add each drawing as a base64 image input
            foreach (var drawing in drawings)
            {
                using var ms = new MemoryStream();
                await drawing.CopyToAsync(ms);
                var base64 = Convert.ToBase64String(ms.ToArray());

                messages.Add(new Dictionary<string, object>
                {
                    ["role"] = "user",
                    ["content"] = new object[]
                    {
                    new { type = "text", text = "תאר לי את הציור הזה כחלק מסיפור" },
                    new
                    {
                        type = "image_url",
                        image_url = new { url = $"data:{drawing.ContentType};base64,{base64}" }
                    }
                    }
                });
            }

            var body = new
            {
                model,
                messages,
                temperature = 0.7
            };

            var request = new HttpRequestMessage(HttpMethod.Post, "https://api.openai.com/v1/chat/completions");
            request.Headers.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", apiKey);
            request.Content = new StringContent(JsonSerializer.Serialize(body), Encoding.UTF8, "application/json");

            var response = await client.SendAsync(request);
            if (!response.IsSuccessStatusCode)
            {
                var err = await response.Content.ReadAsStringAsync();
                return StatusCode((int)response.StatusCode, err);
            }

            var json = await response.Content.ReadAsStringAsync();
            using var doc = JsonDocument.Parse(json);
            var story = doc.RootElement
                .GetProperty("choices")[0]
                .GetProperty("message")
                .GetProperty("content")
                .GetString();

            return Ok(new { story });
        }
    }
}
