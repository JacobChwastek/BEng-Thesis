using System;
using System.IO;

namespace Dicom.Application.Services
{
    public interface IFileService
    {
        void SaveBase64ToFile(string fileName, string file);
        void SaveBytesToFile(string filename, byte[] bytesToWrite);
    }
    
    public class FileService: IFileService
    {
        public void SaveBase64ToFile(string fileName, string file)
        {
            var fileBytes = Convert.FromBase64String(file);
            
            SaveBytesToFile(fileName, fileBytes);
        }
        
        public void SaveBytesToFile(string filename, byte[] bytesToWrite)
        {
            if (filename is not { Length: > 0 } || bytesToWrite == null) 
                return;
            
            if (!Directory.Exists(Path.GetDirectoryName(filename)))
                Directory.CreateDirectory(Path.GetDirectoryName(filename) ?? string.Empty);

            var file = File.Create(filename);

            file.Write(bytesToWrite, 0, bytesToWrite.Length);

            file.Close();
        }
    }
}