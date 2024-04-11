using Releaf.Domain.Boxes;
using Releaf.Domain.Repo;

namespace Releaf.Infrastructure.Repo;

public class DeviceRepo : IDeviceRepo
{
  public static readonly BoxPairingKey DeviceId = new BoxPairingKey("123456789012345678901234567890123456789012345678901234567890AAA3");
}
