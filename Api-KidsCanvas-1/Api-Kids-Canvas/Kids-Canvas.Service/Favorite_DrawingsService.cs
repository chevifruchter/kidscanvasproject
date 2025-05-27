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
    public class Favorite_DrawingsService : IFavorite_DrawingsService
    {
        private readonly IRepository<Favorite_Drawings> _favorite_drowings;

        public Favorite_DrawingsService(IRepository<Favorite_Drawings> favorite_drowings)
        {
            _favorite_drowings = favorite_drowings;
        }

        public Favorite_Drawings Add(Favorite_Drawings obj)
        {
            return _favorite_drowings.Add(obj);
        }

        public void Delete(Favorite_Drawings obj)
        {
            _favorite_drowings.Delete(obj);
        }

        public IEnumerable<Favorite_Drawings> GetAll()
        {
             return _favorite_drowings.GetAll();
        }

        public Favorite_Drawings? GetById(int id)
        {
            return _favorite_drowings.GetById(id);
        }

        public Favorite_Drawings? Update(int id, Favorite_Drawings obj)
        {
            return _favorite_drowings.Update(id, obj);
        }
    }
}
