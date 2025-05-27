using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kids_Canvas.Core.Entities
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";

        public List<Drawings> Drawings { get; set; }
    }
}
