using Kids_Canvas.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kids_Canvas.Core.Services
{
    public interface IDrawingsService
    {
        IEnumerable<Drawings> GetAll();

        Drawings? GetById(int id);

        Drawings Add(Drawings obj);

        Drawings? Update(int id, Drawings obj);

        void Delete(Drawings obj);
    }
}
