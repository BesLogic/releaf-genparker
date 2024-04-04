using Releaf.Domain.Boxes;
using Releaf.Shared;

namespace Releaf.Domain.Exceptions;

public class BoxAlreadyPairedException : DomainException
{
  public BoxAlreadyPairedException(BoxPairingKey pairingKey)
    : base($"Box with pairing key ({pairingKey.Value}) is already initialized")
  {
  }
}
