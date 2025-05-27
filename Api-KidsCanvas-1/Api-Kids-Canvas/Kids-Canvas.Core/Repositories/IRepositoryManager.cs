using Kids_Canvas.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kids_Canvas.Core.Repositories
{
    public interface IRepositoryManager
    {
        IRepository<User> Users { get; }

        void Save();
    }
}
