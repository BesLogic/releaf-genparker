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
  public IDictionary<Guid, string> GetAll()
  {
    IEnumerable<TreeDefinitionAggregate> trees = treeRepo.GetAll();
    return trees.ToDictionary(t => t.Id.Value, t => t.Name);
  }

  [HttpGet("{id}")]
  public TreeDefinitionAggregate GetTreeDefinition(Guid id)
  {
    return treeRepo.GetOne(id);
  }
}
