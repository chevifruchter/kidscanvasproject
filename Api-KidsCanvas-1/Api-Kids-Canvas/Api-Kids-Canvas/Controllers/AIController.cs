using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
using System.Text;

namespace Api_Kids_Canvas.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ImageGeneratorController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IHttpClientFactory _httpClientFactory;
        private const string ModelUrl = "https://router.huggingface.co/fal-ai/fal-ai/stable-diffusion-v35-large";

        public ImageGeneratorController(IHttpClientFactory httpClientFactory,IConfiguration configuration)
        {
            _httpClientFactory = httpClientFactory;
            _configuration = configuration;

        }

        [HttpPost]
        public async Task<IActionResult> GenerateImage([FromBody] PromptRequest request)
        {
            var client = _httpClientFactory.CreateClient();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _configuration["Hugging_Face_API_KEY"]);

            var inputJson = $"{{\"inputs\": \"{request.Prompt}\"}}";
            var content = new StringContent(inputJson, Encoding.UTF8, "application/json");

            var response = await client.PostAsync(ModelUrl, content);
            if (!response.IsSuccessStatusCode)
            {
                return BadRequest("הבקשה ל-Hugging Face נכשלה: " + await response.Content.ReadAsStringAsync());
            }

            var imageBytes = await response.Content.ReadAsByteArrayAsync();
            return File(imageBytes, "image/png");
        }
    }

    public class PromptRequest
    {
        public string Prompt { get; set; }
    }

}