using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Kids_Canvas.Core.Entities;
using Kids_Canvas.Core.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Kids_Canvas.Data.Repositories
{
    internal class RepositoryManager : IRepositoryManager
    {
        private readonly DataContext _context;
        private readonly IRepository<User> userRepository;
        public IRepository<User> Users => userRepository;

        public RepositoryManager(DataContext context)
        {
            _context = context;
        }

        public void Save()
        {
            _context.SaveChanges();
        }
    }
}
