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
    public class CommentsService : ICommentsService
    {
        private readonly IRepository<Comments> _commentsRepository;

        public CommentsService(IRepository<Comments> commentsRepository)
        {
            _commentsRepository = commentsRepository;
        }

        public Comments Add(Comments obj)
        {
            return _commentsRepository.Add(obj);
        }

        public void Delete(Comments obj)
        {
            _commentsRepository.Delete(obj);
        }

        public IEnumerable<Comments> GetAll()
        {
            return _commentsRepository.GetAll();
        }

        public Comments? GetById(int id)
        {
             return _commentsRepository.GetById(id);
        }

        public Comments? Update(int id, Comments obj)
        {
              return _commentsRepository.Update(id, obj);
        }
    }
}
