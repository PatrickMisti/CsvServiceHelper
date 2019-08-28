using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CsvServiceHelperBackend.Entity;
using CsvServiceHelperBackend.Persistence;

namespace CsvServiceHelperBackend.Persistence
{
    public class UnitOfWork
    {
        private RepositoryUow<ModelText, ModelTextDbContext> modelTextUow;
        private ModelTextDbContext db;

        public UnitOfWork()
        {
            db = new ModelTextDbContext();
            modelTextUow = new RepositoryUow<ModelText, ModelTextDbContext>(db);
        }

        public IEnumerable<ModelText> getAllModelText()
        {
            return modelTextUow.Get();
        }

        public void postModelText(List<ModelText> model)
        {
            model.ForEach(p => modelTextUow.Create(p));
            db.SaveChanges();
        }
    }
}
