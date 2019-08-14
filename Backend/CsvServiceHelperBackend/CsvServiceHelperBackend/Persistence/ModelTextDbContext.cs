using System;
using System.Collections.Generic;

using System.Linq;
using System.Threading.Tasks;
using CsvServiceHelperBackend.Entity;
using Microsoft.EntityFrameworkCore;

namespace CsvServiceHelperBackend.Persistence
{
    public class ModelTextDbContext: DbContext
    {
        public DbSet<ModelText> modelText { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(
                @"Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=ModelText;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False");
        }
        //Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=ModelText;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False
        //Data Source=ccserver;Initial Catalog=DLT;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False;Persist Security Info=True;User ID=DCC-Administration;Password=Ed-§fAQdi#
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ModelText>()
                .HasKey(itemModelNumber => new {itemModelNumber.DLTCountryCode, itemModelNumber.SupplierID, itemModelNumber.Brand, itemModelNumber.ModelNumber});

        }
    }
}
