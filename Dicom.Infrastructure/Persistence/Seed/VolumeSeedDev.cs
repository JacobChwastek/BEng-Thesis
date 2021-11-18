using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dicom.Entity;

namespace Dicom.Infrastructure.Persistence.Seed
{
    public static class VolumeSeedDev
    {
        public static Volume[] VolumeSeed = new Volume[]
        {
            new Volume()
            {
                Id = new Guid("f61f2648-1ee5-4889-999a-8baa0dd6fa6a"),
                CreatedAt = new DateTime(2021,11,14, 19, 0, 0),
                Host = "",
                LastModifiedAt = new DateTime(2021,11,14, 19, 0, 0),
                Path = "D:\\Projects\\Software\\dicom\\Assets"
            },
        };
    }
}
