using GenParker.Events;
using MediatR;
using Releaf.Domain.Boxes;
using Releaf.Domain.Repo;

namespace Releaf.Application.EventHandlers;

public class DeviceSensorLogToBoxVitalsHandler : INotificationHandler<DeviceSensorLogUpdated>
{
  public double Temperature { get; }
  public double AirHumidity { get; }
  public double SoilMoisture { get; }
  public double Luminosity { get; }

  public DeviceSensorLogToBoxVitalsHandler(IBoxRepo boxRepo)
  {
    BoxRepo = boxRepo;
  }

  public IBoxRepo BoxRepo { get; }

  public Task Handle(DeviceSensorLogUpdated notification, CancellationToken cancellationToken)
  {
    var pairingKey = new BoxPairingKey(notification.PairingKey);
    var box = GetPairedBoxOrDefault(pairingKey);
    UpdateBoxWhenPaired(notification, box);

    return Task.CompletedTask;
  }

  private BoxAggregate? GetPairedBoxOrDefault(BoxPairingKey pairingKey)
  {
    if (BoxRepo.BoxAlreadyPaired(pairingKey))
    {
      return BoxRepo.GetBoxWithPairingKey(pairingKey);
    }

    return default;
  }

  private void UpdateBoxWhenPaired(DeviceSensorLogUpdated notification, BoxAggregate? box)
  {
    if (IsPaired(box))
    {
      bool updated = false;
      updated |= TryUpdateTemperature(box!, notification);
      updated |= TryUpdateMoisture(box!, notification);
      updated |= TryUpdateLuminosity(box!, notification);

      if (updated)
      {
        BoxRepo.Update(box!);
      }
    }
  }

  private static bool IsPaired(BoxAggregate? box)
  {
    return box != default;
  }

  // NOT TESTED YET
  // Error on sensor reading will return -99 or the temperature value in celcius
  private bool TryUpdateTemperature(BoxAggregate box, DeviceSensorLogUpdated notification)
  {
    if (notification.ValueType == DeviceSensorLogUpdated.ValueTypes.Temperature)
    {
      if (notification.Value <= -99)
      {
        return false;
      }

      box.UpdateTemperatureVitals(notification.TimeStamp, notification.Value);
      return true;
    }
    else if (notification.ValueType == DeviceSensorLogUpdated.ValueTypes.TemperatureBatteryCharge)
    {
      box.UpdateTemperatureBatteryVitals(notification.TimeStamp, notification.Value);
      return true;
    }

    return false;
  }

  // NOT TESTED YET
  // https://www.instructables.com/Soil-Moisture-Measurement-With-Arduino/
  // - Value over 1000 = device disconnected or not in soil
  // - SoilMoisture is Dry between 600 and 1000
  // - SoilMoisture is Humid between 370 and 600
  // - SoilMoisture is Water under 370
  private bool TryUpdateMoisture(BoxAggregate box, DeviceSensorLogUpdated notification)
  {
    if (notification.ValueType == DeviceSensorLogUpdated.ValueTypes.SoilMoisture)
    {
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
    else if (notification.ValueType == DeviceSensorLogUpdated.ValueTypes.SoilMoistureBatteryCharge)
    {
      box.UpdateSoilMoistureBatteryVitals(notification.TimeStamp, notification.Value);
      return true;
    }

    return false;
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
    if (notification.ValueType == DeviceSensorLogUpdated.ValueTypes.Luminosity)
    {
      var luminosityPercent = notification.Value / 1023d;
      box.UpdateLuminosityPercentVitals(notification.TimeStamp, luminosityPercent);
      return true;
    }
    else if (notification.ValueType == DeviceSensorLogUpdated.ValueTypes.LuminosityBatteryCharge)
    {
      box.UpdateLuminosityBatteryVitals(notification.TimeStamp, notification.Value);
      return true;
    }

    return false;
  }
}
