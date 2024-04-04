namespace Releaf.Domain.Trees;

public class TreeInstruction
{
  public TreeInstruction(string title, DateTime publishDate, TreeInstructionAuthor author, IEnumerable<TreeInstructionStep> steps)
  {
    Title = title;
    PublishDate = publishDate;
    Author = author;
    Steps = steps;
  }

  public string Title { get; } = string.Empty;
  public DateTime PublishDate { get; }
  public TreeInstructionAuthor Author { get; } = new TreeInstructionAuthor(string.Empty, string.Empty);
  public IEnumerable<TreeInstructionStep> Steps { get; } = Enumerable.Empty<TreeInstructionStep>();
}

public class TreeInstructionAuthor
{
  public TreeInstructionAuthor(string username, string displayName)
  {
    UserName = username;
    DisplayName = displayName;
  }

  public string UserName { get; }
  public string DisplayName { get; }
}

public class TreeInstructionStep
{
  public TreeInstructionStep(string text, Uri imageUrl, string imageAlt)
  {
    Text = text;
    ImageUrl = imageUrl;
    ImageAlt = imageAlt;
  }

  public string Text { get; }
  public Uri ImageUrl { get; }
  public string ImageAlt { get; }
}
