using System;
using System.Collections.Generic;

namespace Dicom.Entity.Dicom
{
    public class Dicom : IEntity
    {
        public Guid Id { get; set; }

        public string FileName { get; set; }

        public long FileSize { get; set; }

        public string Path { get; set; }

        public ICollection<DwvConfiguration> DwvConfigurations { get; set; }
    }
}
