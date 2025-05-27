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
    public class Favorite_DrawingsController : ControllerBase
    {
        private readonly IFavorite_DrawingsService _FavoriteDrowService;
        private readonly IMapper _mapper;

        public Favorite_DrawingsController(IFavorite_DrawingsService favoriteDrowService, IMapper mapper)
        {
            _FavoriteDrowService = favoriteDrowService;
            _mapper = mapper;
        }


        // GET: api/<Favorite_DrowingsController>
        [HttpGet]
        public ActionResult Get()
        {
            var list = _FavoriteDrowService.GetAll();
            var listDto = _mapper.Map<IEnumerable<Favorite_DrawingsDto>>(list);
            return Ok(listDto);
        }

        // GET api/<Favorite_DrowingsController>/5
        [HttpGet("{id}")]
        public ActionResult Get(int id)
        {
           var favorite_drowing = _FavoriteDrowService.GetById(id);
           var favorite_drowingDto = _mapper.Map<Favorite_DrawingsDto>(favorite_drowing);
           return Ok(favorite_drowingDto);
        }

        // POST api/<Favorite_DrowingsController>
        [HttpPost]
        public void Post([FromBody] Favorite_DrawingsPostModel favorite)
        {
            var favoriteDrowToAdd = new Favorite_Drawings { Id=favorite.Id,User_Id=favorite.User_Id,Drawing_Id=favorite.Drowing_Id };
            _FavoriteDrowService.Add(favoriteDrowToAdd);
        }

        // PUT api/<Favorite_DrowingsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Favorite_DrawingsPostModel favorite)
        {
            var favoriteDrowToAdd = new Favorite_Drawings { Id = favorite.Id, User_Id = favorite.User_Id, Drawing_Id = favorite.Drowing_Id };
            _FavoriteDrowService.Update(id,favoriteDrowToAdd);
        }

        // DELETE api/<Favorite_DrowingsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var favoriteDrow = new Favorite_Drawings { Id = id };
            _FavoriteDrowService.Delete(favoriteDrow);
        }
    }
}
