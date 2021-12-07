using System;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Dicom.Application.Services
{
    public interface IFileService
    {
        void SaveBase64ToFile(string fileName, string file);
        void SaveBytesToFile(string filename, byte[] bytesToWrite);

        Task<MemoryStream> GetFileAsync(string path);
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

        public async Task<MemoryStream> GetFileAsync(string path)
        {
            var memory = new MemoryStream();
            await using (var stream = new FileStream(path, FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }
            memory.Position = 0;
            return memory;
        }
    }
}