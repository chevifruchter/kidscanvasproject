using Api_Kids_Canvas.Models;
using Api_Kids_Canvas.RolesAndPermissions;
using Kids_Canvas.Core.Entities;
using Kids_Canvas.Core.Services;
using Kids_Canvas.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Api_Kids_Canvas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly DataContext _context;
        public AuthController(IConfiguration configuration, DataContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        [HttpPost("get-admin-token")]
        [AllowAnonymous]
        public IActionResult GetAdminToken([FromBody] LoginModel loginModel)
        {
            var user = _context.Users
               .FirstOrDefault(u => u.Name == loginModel.UserName && u.Password == loginModel.Password);
            if (user == null)
                return BadRequest("ניכר כי הנך משתמש חדש במערכת");
            if (user.Role == Role.Admin)
            {
                var claims = new List<Claim>
                {
                 new Claim(ClaimTypes.Name, "AdminUser"),
                 new Claim(ClaimTypes.Role, "admin")
                };

                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Key"]));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

                var tokenOptions = new JwtSecurityToken(
                    issuer: _configuration["JWT:Issuer"],
                    audience: _configuration["JWT:Audience"],
                    claims: claims,
                    expires: DateTime.Now.AddHours(1),
                    signingCredentials: signinCredentials
                );

                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

                return Ok(new { token = tokenString });
            }
            else
            {
                return BadRequest("the user is not admin!");
            }
        }


        [HttpPost]
        public IActionResult Login([FromBody] LoginModel loginModel)
        {
            // 1. חיפוש המשתמש במסד הנתונים
            var user = _context.Users
                .FirstOrDefault(u => u.Name == loginModel.UserName && u.Password == loginModel.Password);
            // 2. אם המשתמש לא קיים, החזר שגיאת הרשאה
            if (user == null)
            {
                var claims = new List<Claim>()
                {
                    new Claim(ClaimTypes.Name, loginModel.UserName),
                    new Claim(ClaimTypes.Role, "guest")
                };
                return Unauthorized("ניכר כי הנך משתמש חדש במערכת");
            }
            else
            {
                // 3. יצירת טענות (Claims) בהתאם לתפקיד של המשתמש
                var claims = new List<Claim>
            {
                    new Claim(ClaimTypes.Name, loginModel.UserName),
                    new Claim(ClaimTypes.Role, "user") // ברירת מחדל - user
            };

                // 4. יצירת טוקן JWT
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetValue<string>("JWT:Key")));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                var tokeOptions = new JwtSecurityToken(
                    issuer: _configuration.GetValue<string>("JWT:Issuer"),
                    audience: _configuration.GetValue<string>("JWT:Audience"),
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(6),
                    signingCredentials: signinCredentials);

                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);

                // 5. החזרת הטוקן
                return Ok(new { Token = tokenString, Role = user.Role });
            }
        }




        //[HttpPost]
        //public IActionResult Login([FromBody] LoginModel loginModel)
        //{
        //    Console.WriteLine(loginModel.UserName,loginModel.Password);
        //    // 1. חיפוש המשתמש במסד הנתונים
        //    var user = _context.Users
        //        .FirstOrDefault(u => u.Name == loginModel.UserName && u.Password == loginModel.Password);

        //    // 2. אם המשתמש לא קיים, החזר שגיאת הרשאה
        //    if (user == null)
        //    {
        //        var claims = new List<Claim>()
        //        {
        //            new Claim(ClaimTypes.Name, loginModel.UserName),
        //            new Claim(ClaimTypes.Role, "guest")
        //        };
        //        return Unauthorized("ניכר כי הנך משתמש חדש במערכת");
        //    }
        //    else
        //    {
        //        var claims = new List<Claim>()
        //        {
        //              new Claim(ClaimTypes.Name, loginModel.UserName),
        //              new Claim(ClaimTypes.Role, "user")
        //        };

        //        var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetValue<string>("JWT:Key")));
        //        var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
        //        var tokeOptions = new JwtSecurityToken(
        //            issuer: _configuration.GetValue<string>("JWT:Issuer"),
        //            audience: _configuration.GetValue<string>("JWT:Audience"),
        //            claims: claims,
        //            expires: DateTime.Now.AddMinutes(6),
        //            signingCredentials: signinCredentials);
        //        var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
        //        return Ok(new { Token = tokenString });
        //    }
        //}
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] LoginModel loginModel)
        {
            var user = new User { Name = loginModel.UserName, Phone = loginModel.Phone, Email = loginModel.Email, Password = loginModel.Password };
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            var token = CreateToken(user); // פונקציה שמייצרת JWT

            return Ok(new { token });
        }
        private string CreateToken(User user)
        {
            var claims = new List<Claim>()
                {
                      new Claim("name", user.Name),
                      new Claim("phone", user.Phone),
                      new Claim("email", user.Email),
                      new Claim("password",user.Password),
                      new Claim("role","user")
                };

            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetValue<string>("JWT:Key")));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokeOptions = new JwtSecurityToken(
                issuer: _configuration.GetValue<string>("JWT:Issuer"),
                audience: _configuration.GetValue<string>("JWT:Audience"),
                claims: claims,
                expires: DateTime.Now.AddMinutes(6),
                signingCredentials: signinCredentials);
            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
            return tokenString;
        }
        [HttpPost("check")]
        public IActionResult CheckUser([FromBody] LoginModel model)
        {
            bool exists = _context.Users.Any(u => u.Name == model.UserName);
            return Ok(new { exists });
        }
    }
}
