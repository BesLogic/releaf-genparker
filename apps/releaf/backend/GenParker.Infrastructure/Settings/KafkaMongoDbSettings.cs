namespace GenParker.Infrastructure.Settings;

public class KafkaMongoDbSettings
{
  public string ConnectionString { get; set; } = string.Empty;
  public string DbName { get; set; } = string.Empty;
}
