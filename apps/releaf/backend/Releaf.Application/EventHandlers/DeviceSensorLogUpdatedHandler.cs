using GenParker.Events;
using MediatR;
using Releaf.Domain.Boxes;
using Releaf.Domain.Devices;
using Releaf.Domain.Repo;
using System.Net.Http.Headers;

namespace Releaf.Application.EventHandlers;

public class DeviceSensorLogUpdatedHandler : INotificationHandler<DeviceSensorLogUpdated>
{
  public double Temperature { get; }
  public double AirHumidity { get; }
  public double SoilMoisture { get; }
  public double Luminosity { get; }

  public DeviceSensorLogUpdatedHandler(IBoxRepo boxRepo)
  {
    BoxRepo = boxRepo;
  }

  public IBoxRepo BoxRepo { get; }

  public Task Handle(DeviceSensorLogUpdated notification, CancellationToken cancellationToken)
  {
    var deviceId = new DeviceId(notification.DeviceKey);
    var box = BoxRepo.GetBoxPairedWithDevice(deviceId);

    bool updated = false;
    updated |= TryUpdateTemperature(box, notification);
    updated |= TryUpdateAirHumidity(box, notification);
    updated |= TryUpdateMoisture(box, notification);
    updated |= TryUpdateLuminosity(box, notification);

    if (updated)
    {
      BoxRepo.Update(box);
    }

    return Task.CompletedTask;
  }

  // NOT TESTED YET
  // Error on sensor reading will return -99 or the temperature value in celcius
  private bool TryUpdateTemperature(BoxAggregate box, DeviceSensorLogUpdated notification)
  {
    if (notification.ValueType != DeviceSensorLogUpdated.ValueTypes.Temperature) return false;

    if (notification.Value <= -99)
    {
      return false;
    }

    box.UpdateTemperatureVitals(notification.TimeStamp, notification.Value);
    return true;
  }

  // NOT TESTED YET
  // https://www.circuitbasics.com/how-to-set-up-the-dht11-humidity-sensor-on-an-arduino/
  // value is between 0 and 100
  private bool TryUpdateAirHumidity(BoxAggregate box, DeviceSensorLogUpdated notification)
  {
    if (notification.ValueType != DeviceSensorLogUpdated.ValueTypes.AirHumidity) return false;

    if (notification.Value < 0 || notification.Value > 100)
    {
      return false;
    }

    box.UpdateAirHumidityPercentVitals(notification.TimeStamp, notification.Value / 100d);
    return true;
  }

  // NOT TESTED YET
  // https://www.instructables.com/Soil-Moisture-Measurement-With-Arduino/
  // - Value over 1000 = device disconnected or not in soil
  // - SoilMoisture is Dry between 600 and 1000
  // - SoilMoisture is Humid between 370 and 600
  // - SoilMoisture is Water under 370
  private bool TryUpdateMoisture(BoxAggregate box, DeviceSensorLogUpdated notification)
  {
    if (notification.ValueType != DeviceSensorLogUpdated.ValueTypes.SoilMoisture) return false;

    // Disconnected
    if (SoilMoistureDisconnected(notification))
    {
      return false;
    }

    var perthousand = 1000d - notification.Value;
    var soilMoisturePercent = perthousand / 1000d;

    box.UpdateSoilMoisturePercentVitals(notification.TimeStamp, soilMoisturePercent);
    return true;
  }

  // NOT TESTED YET
  // - Value over 1000 = device disconnected or not in soil
  private static bool SoilMoistureDisconnected(DeviceSensorLogUpdated notification)
  {
    return notification.Value > 1000;
  }

  // NOT TESTED YET
  // https://sensorkit.arduino.cc/sensorkit/module/lessons/lesson/05-the-light-sensor
  // - Value between 0 and 1023
  private bool TryUpdateLuminosity(BoxAggregate box, DeviceSensorLogUpdated notification)
  {
    if (notification.ValueType != DeviceSensorLogUpdated.ValueTypes.Luminosity) return false;

    var luminosityPercent = notification.Value / 1023d;
    box.UpdateLuminosityPercentVitals(notification.TimeStamp, luminosityPercent);
    return true;
  }
}
