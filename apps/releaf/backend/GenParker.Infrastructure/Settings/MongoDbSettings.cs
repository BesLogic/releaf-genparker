namespace GenParker.Infrastructure.Settings;

public class MongoDbSettings
{
  public string ConnectionString { get; set; } = string.Empty;
  public string DbName { get; set; } = string.Empty;
}
