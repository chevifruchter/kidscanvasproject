using Kids_Canvas.Data;
using Kids_Canvas.Core.Services;
using Kids_Canvas.Service;
using Kids_Canvas.Core.Repositories;
using Kids_Canvas.Data.Repositories;
using System.Text.Json.Serialization;
using Kids_Canvas.Core;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Api_Kids_Canvas;
using Microsoft.OpenApi.Models;
using Amazon.S3;
using Amazon.Extensions.NETCore.Setup;
using Amazon;
using FluentAssertions.Common;
using Amazon.Runtime;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDefaultAWSOptions(builder.Configuration.GetAWSOptions());
builder.Services.AddAWSService<IAmazonS3>();
builder.Services.AddSingleton<IAmazonS3>(sp =>
{
    var configuration = sp.GetRequiredService<IConfiguration>();
    var credentials = new BasicAWSCredentials(
        configuration["AWS:AccessKey"],
        configuration["AWS:SecretKey"]
    );
    var clientConfig = new AmazonS3Config
    {
        RegionEndpoint = RegionEndpoint.GetBySystemName(configuration["AWS:Region"])
    };
    return new AmazonS3Client(credentials, clientConfig);
});


builder.Services.AddScoped<ICategoryService,CategoryService>();

builder.Services.AddScoped<ICommentsService, CommentsService>();

builder.Services.AddScoped<IDrawingsService,DrawingsService>();

builder.Services.AddScoped<IFavorite_DrawingsService,Favorite_DrawingsService>();

builder.Services.AddScoped<IUserService,UserService>();

builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));

builder.Services.AddDbContext<DataContext>();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["JWT:Issuer"],
            ValidAudience = builder.Configuration["JWT:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Key"]))
        };
    });

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    options.JsonSerializerOptions.WriteIndented = true;
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddHttpClient();


builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Description = "Bearer Authentication with JWT Token",
        Type = SecuritySchemeType.Http
    });
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Id = "Bearer",
                    Type = ReferenceType.SecurityScheme
                }
            },
            new List<string>()
        }
    });
});

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
        policy =>
        {
            policy.AllowAnyOrigin() // הרשה ל-React
                  .AllowAnyMethod() // GET, POST, PUT, DELETE...
                  .AllowAnyHeader(); // כותרות כמו Authorization, Content-Type...
        });
});

builder.Services.AddAutoMapper(typeof(MappinProfile));
// הוספת DbContext
builder.Services.AddDbContext<DataContext>(options =>
{
    var connectionString = builder.Configuration.GetConnectionString("DbConnectionString");
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
});

var app = builder.Build();

app.UseCors(MyAllowSpecificOrigins);

// Configure the HTTP request pipeline.
builder.Services.AddHttpClient();

builder.Configuration.AddUserSecrets<Program>();



app.UseSwagger();

app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.UseTrack();

app.MapControllers();

app.Run();
