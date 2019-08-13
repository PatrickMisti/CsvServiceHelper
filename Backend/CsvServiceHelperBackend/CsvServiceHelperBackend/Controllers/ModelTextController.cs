using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CsvServiceHelperBackend.Entity;
using CsvServiceHelperBackend.Persistence;
using Microsoft.AspNetCore.Mvc;

namespace CsvServiceHelperBackend.Controllers
{
    [Route("api/modelText")]
    [ApiController]
    public class ModelTextController : ControllerBase
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

        // POST api/values
        [HttpPost]
        public void Post([FromBody] List<ModelText> model)
        {
            model.ForEach(p => repo.postModelText(p));
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
