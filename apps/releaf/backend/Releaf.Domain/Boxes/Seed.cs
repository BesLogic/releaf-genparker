
namespace Releaf.Domain.Boxes;

public class Seed
{
  public Seed(string name)
  {
    Name = name;
  }

  public string Name { get; }

  private static Bogus.Faker faker = new Bogus.Faker("fr");
  public static string NewName()
  {
    return faker.Name.FirstName();
  }
}
