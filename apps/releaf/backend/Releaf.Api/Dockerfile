#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

COPY ["Releaf.Api/Releaf.Api.csproj", "Releaf.Api/"]
COPY ["GenParker.Application/GenParker.Application.csproj", "GenParker.Application/"]
COPY ["GenParker.Domain/GenParker.Domain.csproj", "GenParker.Domain/"]
COPY ["Releaf.Shared/Releaf.Shared.csproj", "Releaf.Shared/"]
COPY ["GenParker.Events/GenParker.Events.csproj", "GenParker.Events/"]
COPY ["GenParker.Infrastructure/GenParker.Infrastructure.csproj", "GenParker.Infrastructure/"]
COPY ["Releaf.Application/Releaf.Application.csproj", "Releaf.Application/"]
COPY ["Releaf.Domain/Releaf.Domain.csproj", "Releaf.Domain/"]
COPY ["Releaf.Infrastructure/Releaf.Infrastructure.csproj", "Releaf.Infrastructure/"]
COPY ["Releaf.Auth/Releaf.Auth.csproj", "Releaf.Auth/"]
RUN dotnet restore "./Releaf.Api/Releaf.Api.csproj"
COPY . .
WORKDIR "/src/Releaf.Api"
RUN dotnet build "./Releaf.Api.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./Releaf.Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Releaf.Api.dll"]
