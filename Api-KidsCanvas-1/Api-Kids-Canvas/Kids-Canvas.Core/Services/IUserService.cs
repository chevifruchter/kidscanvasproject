using Kids_Canvas.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kids_Canvas.Core.Services
{
    public interface IUserService
    {
        IEnumerable<User> GetAll();

        User? GetById(int id);

        User Add(User obj);

        User? Update(int id, User obj);

        void Delete(User obj);
    }
}
