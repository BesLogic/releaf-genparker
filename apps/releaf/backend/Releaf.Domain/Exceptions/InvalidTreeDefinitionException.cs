using Releaf.Shared;

namespace Releaf.Domain.Exceptions;

public class TreeDefinitionNotFoundException : DomainException
{
  public TreeDefinitionNotFoundException() : base($"Tree definition was not found")
  {
  }
}
