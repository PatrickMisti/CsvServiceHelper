using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CsvServiceHelperBackend.Entity
{
    public class ModelText
    {
        [Column(Order = 1)]
        [Required]
        public string DLTCountryCode { get; set; }
        [Column(Order = 2)]
        [Required]
        public string SupplierID { get; set; }
        [Column(Order = 3)]
        [Required]
        public string Brand { get; set; }
        [Column(Order = 4)]
        [Required]
        public string ModelNumber { get; set; }
        [Required]
        public string Description { get; set; }
        public string Text { get; set; }
    }
}
