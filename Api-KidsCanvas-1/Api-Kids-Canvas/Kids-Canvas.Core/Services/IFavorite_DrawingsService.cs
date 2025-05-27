using Kids_Canvas.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kids_Canvas.Core.Services
{
    public interface IFavorite_DrawingsService
    {
        IEnumerable<Favorite_Drawings> GetAll();

        Favorite_Drawings? GetById(int id);

        Favorite_Drawings Add(Favorite_Drawings obj);

        Favorite_Drawings? Update(int id, Favorite_Drawings obj);

        void Delete(Favorite_Drawings obj);
    }
}
