using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kids_Canvas.Core.Entities
{
    public class Comments
    {
        public int id { get; set; }
        public int User_Id { get; set; }
        public int Drawing_Id { get; set; }
        public string Content { get; set; }
        public DateTime? Created_at { get; set; }
    }
}
