using GenParker.Domain.DeviceSensorDatas;
using MongoDB.Bson;

namespace GenParker.Infrastructure.Models;

public class Data
{
  public ObjectId Id { get; set; }
  public string key { get; set; } = string.Empty;
  public string mac { get; set; } = string.Empty;
  public long date { get; set; }
  public int sensor { get; set; }
  public string position { get; set; } = string.Empty;
  public double value { get; set; }

  public DeviceSensorData ToSensorLog()
  {
    var timeStamp = DateTime.UnixEpoch.AddMilliseconds(date);
    return new DeviceSensorData(Id.ToString(), key, mac, timeStamp, (SensorTypes)sensor, value);
  }
}


