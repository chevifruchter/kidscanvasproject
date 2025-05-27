using Kids_Canvas.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kids_Canvas.Core.Services
{
    public interface ICommentsService
    {
        IEnumerable<Comments> GetAll();

        Comments? GetById(int id);

        Comments Add(Comments obj);

        Comments? Update(int id, Comments obj);

        void Delete(Comments obj);
    }
}
