using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kids_Canvas.Core.Entities
{
    public enum Role {Admin,User,Guest};
    public class User
    {
        public int Id { get; set; } = 0;
        public string Name { get; set; } = "";
        public string Phone { get; set; } = "";
        public string Email { get; set; } = "";
        public string Password { get; set; } = "";
        public Role Role { get; set; } = Role.Guest;
        public string PasswordHash { get; set; } = "";
        public DateTime? Created { get; set; }
        public DateTime? Uptated { get; set; }
        //ralations: 
        //many to one
        //public int DrawingsId { get; set; } = 0;
        public List<Drawings> Drawings { get; set; } = new List<Drawings>();
        //many to many
        public List<Favorite_Drawings> Favorites_list { get; set; }

    }
}