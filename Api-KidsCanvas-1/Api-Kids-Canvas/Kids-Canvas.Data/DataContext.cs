using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Kids_Canvas.Core.Entities;

namespace Kids_Canvas.Data
{
    public class DataContext: DbContext
    {
        public DbSet<User> Users { get; set; }

        public DbSet<Category> Categories { get; set; }

        public DbSet<Drawings> Drawings { get; set; }

        public DbSet<Comments> Comments { get; set; }

        public DbSet<Favorite_Drawings> FavoriteDrawings { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.LogTo(Console.WriteLine, Microsoft.Extensions.Logging.LogLevel.Information);

            optionsBuilder.UseSqlServer(@"Server=(localdb)\MSSQLLocalDB;Database=Kids_Canvas_Db");
        }
    }
}
