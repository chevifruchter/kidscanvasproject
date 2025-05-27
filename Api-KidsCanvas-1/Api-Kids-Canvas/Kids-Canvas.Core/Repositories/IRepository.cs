using Kids_Canvas.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kids_Canvas.Core.Repositories
{
    public interface IRepository<T> where T : class
    {
        IEnumerable<T> GetAll();

        public IEnumerable<Drawings> GetAllDrawings();

        public IEnumerable<User> GetAllUsers();

        T? GetById(int id);

        T Add(T entity);

        T Update(int id,T entity);

        void Delete(T entity);
    }
}
