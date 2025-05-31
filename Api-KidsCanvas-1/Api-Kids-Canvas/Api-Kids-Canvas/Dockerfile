#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

#Depending on the operating system of the host machines(s) that will build or run the containers, the image specified in the FROM statement may need to be changed.
#For more information, please see https://aka.ms/containercompat

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["Api-Kids-Canvas/Api-Kids-Canvas.csproj", "Api-Kids-Canvas/"]
COPY ["Kids-Canvas.Data/Kids-Canvas.Data.csproj", "Kids-Canvas.Data/"]
COPY ["Kids-Canvas.Core/Kids-Canvas.Core.csproj", "Kids-Canvas.Core/"]
COPY ["Kids-Canvas.Service/Kids-Canvas.Service.csproj", "Kids-Canvas.Service/"]
RUN dotnet restore "Api-Kids-Canvas/Api-Kids-Canvas.csproj"
COPY . .
WORKDIR "/src/Api-Kids-Canvas"
RUN dotnet build "Api-Kids-Canvas.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Api-Kids-Canvas.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Api-Kids-Canvas.dll"]