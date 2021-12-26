using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Azure.Storage;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Newtonsoft.Json;
using System.IO;
using System.Net.Http;
using Microsoft.AspNetCore.Http;
using gallery_azure_storage_api.Services;
using gallery_azure_storage_api.Models;

namespace gallery_azure_storage_api.Controllers
{
    public class GalleryController : Controller
    {

        private const string blobServiceEndpoint = "https://lukifrstorage.blob.core.windows.net/";
        private const string storageAccountName = "lukifrstorage";
        private const string storageAccountKey = "fYV0+pS8VcaCqzdxcAED0TufLVRI7IV18TrPzKe8iqyFRqkX6aM7MzZN8DM0tyxJe8ZVHkCicp/6du3FezIEpg==";

        private class Image
        {
            public string URL;
            public string blobName;

            public Image(string URL, string blobName)
            {
                this.URL = URL;
                this.blobName = blobName;
            }
        }

        private readonly ICosmosDbService _cosmosDbService;
        public GalleryController(ICosmosDbService cosmosDbService)
        {
            _cosmosDbService = cosmosDbService;
        }

        [HttpGet]
        public async Task<String> list_images()
        {
            StorageSharedKeyCredential accountCredentials = new StorageSharedKeyCredential(storageAccountName, storageAccountKey);
            BlobServiceClient serviceClient = new BlobServiceClient(new Uri(blobServiceEndpoint), accountCredentials);

            string containerName = "gallery";

            BlobContainerClient container = serviceClient.GetBlobContainerClient(containerName);
            //container.DeleteBlob("leo.jpg");

            var blobs = new List<string>();

            await foreach (BlobItem blob in container.GetBlobsAsync())
            {
                blobs.Add(blob.Name);
            }

            List<Image> images = new List<Image>();

            blobs.ForEach(addUrl);

            void addUrl(string x)
            {
                BlobClient blob_url = container.GetBlobClient(x);
                string url = blob_url.Uri.ToString();
                Image image = new Image(url, blob_url.Name);
                images.Add(image);
            }

            string json = JsonConvert.SerializeObject(images, Formatting.Indented);

            return json;
        }

        
        public async Task<IActionResult> delete_image(string id, string imgname)
        {
            StorageSharedKeyCredential accountCredentials = new StorageSharedKeyCredential(storageAccountName, storageAccountKey);
            BlobServiceClient serviceClient = new BlobServiceClient(new Uri(blobServiceEndpoint), accountCredentials);

            string containerName = "gallery";

            BlobContainerClient container = serviceClient.GetBlobContainerClient(containerName);
            container.DeleteBlob(imgname);

            await _cosmosDbService.DeleteItemAsync(id);

            return Ok();
        }

        public async Task<String> get_images(string tag)
        {
            List<ImageModel> images;

           if (tag == "all")
            {
                var data = await _cosmosDbService.GetItemsAsync("SELECT * FROM c");
                images = data.ToList();
            }
            else
            {
                var data = await _cosmosDbService.GetItemsAsync($"SELECT * FROM c WHERE c.tag = '{tag}'");
                images = data.ToList();
            }
        
            var json = JsonConvert.SerializeObject(images, Formatting.Indented);

            return json;
        }

        [HttpPost]
        public async Task<IActionResult> upload_image(IFormCollection form)
        {
            var name = form["imageName"];
            var description = form["description"];
            var tag = form["tag"];
            var uploadDate = form["uploadDate"];

            byte[] image;
            Stream stream = null;

            foreach (var file in form.Files)
            {
                image = UploadFile(file);
                stream = new MemoryStream(image);
            };


            StorageSharedKeyCredential accountCredentials = new StorageSharedKeyCredential(storageAccountName, storageAccountKey);
            BlobServiceClient serviceClient = new BlobServiceClient(new Uri(blobServiceEndpoint), accountCredentials);

            string containerName = "gallery";

            BlobContainerClient container = serviceClient.GetBlobContainerClient(containerName);
            container.UploadBlob(name, stream);

            var data = new ImageModel
            {
                Id = Guid.NewGuid().ToString(),
                Name = name,
                Description = description,
                Tag = tag,
                UploadDate = uploadDate,
                URL = container.Uri + "/" + name

            };

            await _cosmosDbService.AddItemAsync(data);

            return Ok(name[0]);
        }

        private static byte[] UploadFile(IFormFile file)
        {
            if (file == null || file.Length == 0)
                throw new Exception("File is empty!");
            byte[] fileArray;
            using (var stream = file.OpenReadStream())
            using (var memoryStream = new MemoryStream())
            {
                stream.CopyTo(memoryStream);
                fileArray = memoryStream.ToArray();
                return fileArray;
            }
        }

    }

}
