using Kids_Canvas.Core.Entities;

namespace Api_Kids_Canvas.Models
{
    public class UserPostModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public Role Role { get; set; }
        public DateTime? Created { get; set; }
        public DateTime? Uptated { get; set; }
    }
}
