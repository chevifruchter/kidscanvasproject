using Api_Kids_Canvas.Models;
using AutoMapper;
using Kids_Canvas.Core.Entities;
using Kids_Canvas.Core.Services;
using Kids_Canvas.Core.DTOs;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Api_Kids_Canvas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;
        private readonly IMapper _mapper;

        public CategoryController(ICategoryService categoryService,IMapper mapper)
        {
            _categoryService=categoryService;   
            _mapper=mapper; 
        }

        // GET: api/<CategoryController>
        [HttpGet]
        public ActionResult Get()
        {
            var list = _categoryService.GetAll();   
            var listDto = _mapper.Map<IEnumerable<CategoryDto>>(list);
            return Ok(listDto);
        }

        // GET api/<CategoryController>/5
        [HttpGet("{id}")]
        public ActionResult Get(int id)
        {
           var category = _categoryService.GetById(id);
           var categoryDto = _mapper.Map<CategoryDto>(category);
            return Ok(categoryDto);
        }

        // POST api/<CategoryController>
        [HttpPost]
        public void Post([FromBody] CategoryPostModel category)
        {
            var categoryToAdd = new Category { Id = category.Id  };
            _categoryService.Add(categoryToAdd);
        }

        // PUT api/<CategoryController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] CategoryPostModel category)
        {
            var categoryToAdd = new Category { Id = category.Id, Name = category.Name, };
            _categoryService.Update(id,categoryToAdd);
        }

        // DELETE api/<CategoryController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var categorynew = new Category { Id = id };
            _categoryService.Delete(categorynew);
        }
    }
}
