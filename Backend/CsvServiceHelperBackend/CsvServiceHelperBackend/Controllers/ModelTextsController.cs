using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CsvServiceHelperBackend.Entity;
using CsvServiceHelperBackend.Persistence;
using Microsoft.AspNetCore.Cors;

namespace CsvServiceHelperBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("csv")]
    public class ModelTextsController : ControllerBase
    {
        UnitOfWork repo = new UnitOfWork();

        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<ModelText>> Get()
        {
            return repo.getAllModelText().ToList();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }

        // POST api/values()
        [HttpPost]
        public ActionResult<int> Post([FromBody] List<ModelText> model)
        {
            repo.postModelText(model);
            return Response.StatusCode;
        }
    }
}