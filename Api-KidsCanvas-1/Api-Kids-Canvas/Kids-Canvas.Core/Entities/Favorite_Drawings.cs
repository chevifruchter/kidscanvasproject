using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kids_Canvas.Core.Entities
{
    public class Favorite_Drawings
    {
        public int Id { get; set; } 
        public int User_Id { get; set; }
        public int Drawing_Id { get; set; }

        public List<Drawings> Drawings_list { get; set; }

        public List<User> Users { get; set; }
    }
}
