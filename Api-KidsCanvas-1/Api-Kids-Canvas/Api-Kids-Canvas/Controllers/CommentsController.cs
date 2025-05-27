using Kids_Canvas.Core.Entities;
using Kids_Canvas.Core.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Api_Kids_Canvas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly ICommentsService _commentsService;

        public CommentsController(ICommentsService commentsService)
        {
            _commentsService = commentsService;
        }


        // GET: api/<CommentsController>
        [HttpGet]
        public IEnumerable<Comments> Get()
        {
          return _commentsService.GetAll();
        }

        // GET api/<CommentsController>/5
        [HttpGet("{id}")]
        public Comments Get(int id)
        {
           return _commentsService.GetById(id);
        }

        // POST api/<CommentsController>
        [HttpPost]
        public void Post([FromBody] Comments comment)
        {
            _commentsService.Add(comment);
        }

        // PUT api/<CommentsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Comments comment)
        {
            _commentsService.Update(id, comment);
        }

        // DELETE api/<CommentsController>/5
        [HttpDelete("{id}")]
        public void Delete(Comments comment)
        {
            _commentsService.Delete(comment);
        }
    }
}
