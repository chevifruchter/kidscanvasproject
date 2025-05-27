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
    public class DrawingsService : IDrawingsService
    {
        private readonly IRepository<Drawings> _drowingsRepository;

        public DrawingsService(IRepository<Drawings> drowingsRepository)
        {
            _drowingsRepository = drowingsRepository;
        }

        public Drawings Add(Drawings obj)
        {
            return _drowingsRepository.Add(obj);
        }

        public void Delete(Drawings obj)
        {
            _drowingsRepository.Delete(obj);
        }

        public IEnumerable<Drawings> GetAll()
        {
            return _drowingsRepository.GetAllDrawings();
        }

        public Drawings? GetById(int id)
        {
            return _drowingsRepository.GetById(id);
        }

        public Drawings? Update(int id, Drawings obj)
        {
            return _drowingsRepository.Update(id, obj);

        }

    }
}
