using Kids_Canvas.Core.Entities;
using Microsoft.AspNetCore.Components.Forms;
using static System.Net.Mime.MediaTypeNames;
using System;

namespace Api_Kids_Canvas.RolesAndPermissions
{
    public class Roles
    {
        public int Id { get; set; }
        public string RoleName { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
