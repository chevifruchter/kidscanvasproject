using Api_Kids_Canvas.Models;
using AutoMapper;
using Kids_Canvas.Core.Entities;
using Kids_Canvas.Core.DTOs;
using Kids_Canvas.Core.Services;
using Kids_Canvas.Service;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Api_Kids_Canvas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DrawingsController : ControllerBase
    {
        private readonly IDrawingsService _DrawingsService;
        private readonly IMapper _mapper;

        public DrawingsController(IDrawingsService DrawingsService, IMapper mapper)
        {
            _DrawingsService = DrawingsService;
            _mapper = mapper;
        }

        // GET: api/<Drawings>
        [HttpGet]
        public ActionResult Get()
        {
            var list = _DrawingsService.GetAll();
            var newlist = _mapper.Map<IEnumerable<DrawingsDto>>(list);
            return Ok(newlist);
        }

        // GET api/<Drawings>/5
        [HttpGet("{id}")]
        public ActionResult Get(int id)
        {
            var Drawings = _DrawingsService.GetById(id);
            var drawingDto = _mapper.Map<DrawingsDto>(Drawings);
           return Ok(drawingDto);
        }

        // POST api/<Drawings>
        [HttpPost]
        public void Post([FromBody] DrawingsPostModel drowing)
        {
            var drowingToAdd = new Drawings { Name = drowing.Name ,Artist_name=drowing.Artist_name,Target_age=drowing.Target_age,CategoryId=drowing.CategoryId};
            _DrawingsService.Add(drowingToAdd);
        }

        // PUT api/<Drawings>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] DrawingsPostModel drowing)
        {
            var drowingToAdd = new Drawings { Name = drowing.Name, Artist_name = drowing.Artist_name, Target_age = drowing.Target_age, CategoryId = drowing.CategoryId };
            _DrawingsService.Update(id,drowingToAdd);
        }

        // DELETE api/<Drawings>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var newDrowing = new Drawings {Id = id};
            _DrawingsService.Delete(newDrowing);
        }
    }
}
