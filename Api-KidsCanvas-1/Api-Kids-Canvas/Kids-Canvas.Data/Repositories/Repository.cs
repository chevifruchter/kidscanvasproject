using Kids_Canvas.Core.Entities;
using Kids_Canvas.Core.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kids_Canvas.Data.Repositories
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private readonly DataContext _context;
        private readonly DbSet<T> _dbSet;


        public Repository(DataContext context)
        {
            Console.WriteLine("repository");
            _context = context;
            _dbSet = context.Set<T>() ?? throw new ArgumentNullException(nameof(_dbSet));
        }


        public T Add(T entity)
        {
            _dbSet.Add(entity);
            _context.SaveChanges();
            return entity;
        }

        public void Delete(T entity)
        {
            _dbSet.Remove(entity);
            _context.SaveChanges();
        }

        public IEnumerable<T> GetAll()
        {
            return _dbSet.ToList();
        }

        public IEnumerable<Drawings> GetAllDrawings()
        {
            return _context.Drawings.Include(d=>d.Users).ToList();
        }

        public IEnumerable<User> GetAllUsers()
        {
            return _context.Users.Include(u => u.Drawings).ToList();
        }

        public T? GetById(int id)
        {
            return _dbSet.Find(id);
        }

        public T Update(int id, T entity)
        {
            var existingEntity = _dbSet.Find(id); // חיפוש הישות הקיימת
            if (existingEntity != null)
            {
                _context.Entry(existingEntity).CurrentValues.SetValues(entity); // עדכון כל הערכים
                _context.SaveChanges(); // שמירה ל-DB
            }
            return entity;
        }


    }
}
