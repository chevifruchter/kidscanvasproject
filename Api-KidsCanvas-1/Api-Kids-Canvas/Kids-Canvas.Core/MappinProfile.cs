using AutoMapper;
using Kids_Canvas.Core.DTOs;
using Kids_Canvas.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kids_Canvas.Core
{
    public class MappinProfile : Profile
    {
        public MappinProfile()
        {
            CreateMap<User,UserDto>().ReverseMap();
            CreateMap<CategoryDto, Category>().ReverseMap();
            CreateMap<Drawings,DrawingsDto>().ReverseMap();
            CreateMap<Favorite_Drawings,Favorite_DrawingsDto>().ReverseMap();
        }
    }
}
