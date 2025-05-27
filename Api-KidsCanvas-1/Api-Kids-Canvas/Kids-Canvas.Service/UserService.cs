using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Kids_Canvas.Core.Services;
using Kids_Canvas.Core.Entities;
using Kids_Canvas.Core.Repositories;

namespace Kids_Canvas.Service
{
    public class UserService : IUserService
    { 

        private readonly IRepository<User> _UserRepository;

        public UserService(IRepository<User> userService)
        {
            _UserRepository = userService;
        }

        public User Add(User obj)
        {
            return _UserRepository.Add(obj);
        }

        public void Delete(User obj)
        {
            _UserRepository.Delete(obj);
        }

        public IEnumerable<User> GetAll()
        {
            return _UserRepository.GetAll();
        }

        public User? GetById(int id)
        {
            return _UserRepository.GetById(id);
        }

        public User? Update(int id, User obj)
        {
            return _UserRepository.Update(id, obj);
        }
    }
}
