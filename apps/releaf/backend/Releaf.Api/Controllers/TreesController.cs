using Microsoft.AspNetCore.Mvc;
using Releaf.Domain.Repo;
using Releaf.Domain.Trees;

namespace Releaf.Backend.Controllers;

[ApiController]
[Route("[controller]")]
public class TreesController : ControllerBase
{
  private readonly ILogger<TreesController> _logger;
  private readonly ITreeRepo treeRepo;

  public TreesController(ILogger<TreesController> logger, ITreeRepo treeRepo)
  {
    _logger = logger;
    this.treeRepo = treeRepo;
  }

  [HttpGet]
  public IDictionary<string, string> GetAll(int page, int size)
  {
    IEnumerable<TreeDefinitionAggregate> trees = treeRepo.GetAll(page, size);
    return trees.ToDictionary(t => t.Id.Value, t => t.Name);
  }

  [HttpGet("{id}")]
  public TreeDefinitionAggregate GetTreeDefinition(string id)
  {
    return treeRepo.GetOne(new TreeDefinitionId(id));
  }
}
