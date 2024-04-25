namespace Releaf.Shared;

public abstract class DomainException : Exception
{
  public DomainException()
  {
  }

  public DomainException(string? message)
    : base(message)
  {
  }

  public DomainException(string? message, Exception? inner)
    : base(message, inner)
  {
  }
}
