using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kids_Canvas.Core.DTOs
{
    public class DrawingsDto
    {
        //public int Id { get; set; }
        public string Name { get; set; }
        public string Path { get; set; }
        public int CategoryId { get; set; }
        public string Artist_name { get; set; }
        public int Target_age { get; set; }
        public DateTime? Created_at { get; set; }
        public DateTime? Updated_at { get; set; }
    }
}
