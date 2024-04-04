using Releaf.Domain.Trees;

namespace Releaf.Application.Seeds;

internal class ReleafDbSeeds
{
  internal static TreeDefinitionAggregate[] GetTreeDefinitionsSeed() => [
      new TreeDefinitionAggregate("Pin Cherry", PinCherryInstructions),
    new TreeDefinitionAggregate("Red Maple", RedMapleInstructions),
    new TreeDefinitionAggregate("Huckleberry", HuckleberryInstructions),
    new TreeDefinitionAggregate("Big Shellbark Hickory", BigShellbarkHickoryInstructions),
  ];

  private static TreeInstructionAuthor AnonymousAuthor = new TreeInstructionAuthor("anonymous", "Anony Mous");

  private static TreeInstructionStep[] TreeInstructionSteps =
  [
    new TreeInstructionStep(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed lectus iaculis, cursus dolor vel, suscipit quam. Ut faucibus id lorem eget suscipit. Aenean vitae cursus eros. Fusce posuere accumsan nunc non aliquam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque viverra vestibulum vestibulum. Nulla facilisi. Nullam sed tincidunt ante. Donec erat dui, aliquet at condimentum non, efficitur id turpis. Donec tempor nisi quam, in dapibus justo tristique a.",
      new Uri("https://upload.wikimedia.org/wikipedia/commons/3/36/PaulowniaPrune.jpg"),
      "Tree Fork"
    ),
    new TreeInstructionStep(
      "Mauris tincidunt porttitor turpis et faucibus. Nullam eleifend orci id interdum suscipit. Nulla vel fermentum lorem. Donec et nisl tempus, bibendum ante sit amet, volutpat enim. Etiam dictum elementum ante vitae iaculis. Sed vitae mi et magna facilisis laoreet ac vel purus. Maecenas placerat finibus mauris a cursus. In vulputate accumsan urna in luctus. Aenean tempus odio a orci tincidunt, ut mattis ligula fermentum. Nunc rutrum non nulla id maximus.",
      new Uri("https://upload.wikimedia.org/wikipedia/commons/3/36/PaulowniaPrune.jpg"),
      "Tree Fork"
    ),
    new TreeInstructionStep(
      "Curabitur libero turpis, tincidunt eu lorem et, faucibus eleifend augue. Suspendisse elementum nunc felis, et consectetur leo elementum nec. Quisque efficitur ipsum dui, at fringilla nulla condimentum non. Vivamus gravida eu dui ac viverra. Nulla tempus sagittis est. Morbi scelerisque pellentesque sodales. Aliquam sodales sit amet libero tristique pellentesque. Etiam id leo nunc. Nullam tempor tortor turpis, non sodales dui fermentum a.",
      new Uri("https://upload.wikimedia.org/wikipedia/commons/3/36/PaulowniaPrune.jpg"),
      "Tree Fork"
    ),
  ];

  private static TreeInstruction[] PinCherryInstructions =
  [
    new TreeInstruction("Outdoor Planting Manual", new DateTime(2021, 03, 10), AnonymousAuthor, TreeInstructionSteps),
    new TreeInstruction("Seeding Manual", new DateTime(2022, 07, 31), AnonymousAuthor, TreeInstructionSteps),
  ];

  private static TreeInstruction[] RedMapleInstructions =
  [
    new TreeInstruction("Seeding Manual", new DateTime(2023, 01, 11), AnonymousAuthor, TreeInstructionSteps),
  ];

  private static TreeInstruction[] HuckleberryInstructions =
  [
    new TreeInstruction("Seeding Manual", new DateTime(2023, 10, 13), AnonymousAuthor, TreeInstructionSteps),
  ];

  private static TreeInstruction[] BigShellbarkHickoryInstructions =
  [
    new TreeInstruction("Seeding Manual", new DateTime(2024, 02, 29), AnonymousAuthor, TreeInstructionSteps),
  ];
}
