using Api_Kids_Canvas.Models;
using AutoMapper;
using Kids_Canvas.Core.DTOs;
using Kids_Canvas.Core.Entities;
using Kids_Canvas.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Api_Kids_Canvas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public UsersController(IUserService userService, IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
        }

    
        // GET: api/<UsersController>
        [HttpGet]
        public ActionResult Get()
        {
            var list = _userService.GetAll();
            var newList = _mapper.Map<IEnumerable<UserDto>>(list);
            return Ok(newList);
        }

        // GET api/<UsersController>/5
        [HttpGet("{id}")]
        public ActionResult Get(int id)
        {
            var user = _userService.GetById(id);
            var userDto = _mapper.Map<UserDto>(user);
            return Ok(userDto);
        }

        // POST api/<UsersController>
        [HttpPost]
        public void Post([FromBody] UserPostModel user)
        {
            var userToAdd = new User { Id = user.Id, Name = user.Name ,Password=user.Password,Phone=user.Phone,Email=user.Email,Role=user.Role};    
            _userService.Add(userToAdd);
        }

        // PUT api/<UsersController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] UserPostModel user)
        {
            var userToAdd = new User { Id = user.Id, Name = user.Name, Password = user.Password, Phone = user.Phone, Email = user.Email, Role = user.Role };
            _userService.Update(id,userToAdd);
        }

        // DELETE api/<UsersController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var user = new User { Id = id };
            _userService.Delete(user);
        }
    }
}
