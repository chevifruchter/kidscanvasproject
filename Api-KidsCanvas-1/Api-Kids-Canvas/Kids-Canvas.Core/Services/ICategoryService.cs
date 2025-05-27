using Kids_Canvas.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kids_Canvas.Core.Services
{
    public interface ICategoryService
    {
        IEnumerable<Category> GetAll();

        Category? GetById(int id);

        Category Add(Category obj);

        Category? Update(int id, Category obj);

        void Delete(Category entity);
    }
}
