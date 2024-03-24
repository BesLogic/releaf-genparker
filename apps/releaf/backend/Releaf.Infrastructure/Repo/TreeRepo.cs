using Releaf.Domain.Repo;
using Releaf.Domain.Trees;

namespace Releaf.Infrastructure.Repo;

public class TreeRepo : ITreeRepo
{
  private static readonly Guid PinCherryId = new Guid("81eeb67d-f469-4b27-9625-a4bbfe261a8e");
  private static readonly Guid RedMapleId = new Guid("a511da78-696f-4db9-b55c-10abb2650ee0");
  private static readonly Guid HuckleberryId = new Guid("75ea29f6-b3cf-4f57-8a95-8bdf59153438");
  private static readonly Guid BigShellbarkHickoryId = new Guid("694aca76-0d90-4e65-8829-4ab97451c632");

  public IEnumerable<TreeDefinitionAggregate> GetAll()
  {
    return new TreeDefinitionAggregate[]
    {
      new TreeDefinitionAggregate(new TreeDefinitionId(PinCherryId), "Pin Cherry", PinCherryInstructions),
      new TreeDefinitionAggregate(new TreeDefinitionId(RedMapleId), "Red Maple", RedMapleInstructions),
      new TreeDefinitionAggregate(new TreeDefinitionId(HuckleberryId), "Huckleberry", HuckleberryInstructions),
      new TreeDefinitionAggregate(new TreeDefinitionId(BigShellbarkHickoryId), "Big Shellbark Hickory", BigShellbarkHickoryInstructions),
    };
  }

  public TreeDefinitionAggregate GetOne(Guid id)
  {
    return GetAll().Where(t => t.Id.Value == id).First();
  }

  private static TreeInstructionAuthor NicoAuthor = new TreeInstructionAuthor("Nicolas");

  private static TreeInstructionAuthor RaphAuthor = new TreeInstructionAuthor("Raphael");

  private static TreeInstructionAuthor AndrewAuthor = new TreeInstructionAuthor("Andrew");

  private static TreeInstructionStep[] TreeInstructionSteps =
  [
    new TreeInstructionStep("Bla bla bla bla bla bla bla bla bla bla bla", new Uri("https://upload.wikimedia.org/wikipedia/commons/3/36/PaulowniaPrune.jpg"), "Tree Fork"),
    new TreeInstructionStep("Bla bla bla bla bla bla bla bla bla bla bla", new Uri("https://upload.wikimedia.org/wikipedia/commons/3/36/PaulowniaPrune.jpg"), "Tree Fork"),
    new TreeInstructionStep("Bla bla bla bla bla bla bla bla bla bla bla", new Uri("https://upload.wikimedia.org/wikipedia/commons/3/36/PaulowniaPrune.jpg"), "Tree Fork"),
  ];

  private static TreeInstruction[] PinCherryInstructions =
  [
    new TreeInstruction("Outdoor Planting Manual", new DateTime(2021, 03, 10), NicoAuthor, TreeInstructionSteps),
    new TreeInstruction("Seeding Manual", new DateTime(2022, 07, 31), NicoAuthor, TreeInstructionSteps),
  ];

  private static TreeInstruction[] RedMapleInstructions =
  [
    new TreeInstruction("Seeding Manual", new DateTime(2023, 01, 11), RaphAuthor, TreeInstructionSteps),
  ];

  private static TreeInstruction[] HuckleberryInstructions =
  [
    new TreeInstruction("Seeding Manual", new DateTime(2023, 10, 13), AndrewAuthor, TreeInstructionSteps),
  ];

  private static TreeInstruction[] BigShellbarkHickoryInstructions =
  [
    new TreeInstruction("Seeding Manual", new DateTime(2024, 02, 29), RaphAuthor, TreeInstructionSteps),
  ];
}
