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
    public class CategoryService : ICategoryService
    {
        private readonly IRepository<Category> _CategoryRepository;

        public CategoryService(IRepository<Category> categoryService)
        {
            _CategoryRepository= categoryService; 
        }

        public Category Add(Category obj)
        {
            return _CategoryRepository.Add(obj);    
        }

        public void Delete(Category category)
        {
             _CategoryRepository.Delete(category);
        }

        public IEnumerable<Category> GetAll()
        {
            return _CategoryRepository.GetAll();
        }

        public Category? GetById(int id)
        {
           return _CategoryRepository.GetById(id);
        }

        public Category? Update(int id, Category obj)
        {
            return _CategoryRepository.Update(id, obj);
        }
    }
}
