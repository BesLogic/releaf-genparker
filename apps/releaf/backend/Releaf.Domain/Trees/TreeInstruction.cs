using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
  public TreeInstructionAuthor Author { get; } = new TreeInstructionAuthor(string.Empty);
  public IEnumerable<TreeInstructionStep> Steps { get; } = Enumerable.Empty<TreeInstructionStep>();
}

public class TreeInstructionAuthor
{
  public TreeInstructionAuthor(string fullName)
  {
    FullName = fullName;
  }

  public string FullName { get; }
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
