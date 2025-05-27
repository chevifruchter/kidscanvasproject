using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kids_Canvas.Core.Entities
{
    public class Drawings
    {
        public int Id { get; set; } = 0;

        public string Path { get; set; } = "";

        public string Name { get; set; } = "";

        public int CategoryId { get; set; } = 0;

        public string Artist_name { get; set; } = "";

        public int Target_age { get; set; } = 0;

        public DateTime? Created_at { get; set; }

        public DateTime? Updated_at { get; set; }

        public List<User> Users { get; set; }=new List<User>();

        public Category Category { get; set; }=new Category();

        public List<Favorite_Drawings> Favorite_Drawings { get; set; } = new List<Favorite_Drawings>();

    }
}
