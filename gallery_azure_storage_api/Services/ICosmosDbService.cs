using System.Collections.Generic;
using System.Threading.Tasks;
using gallery_azure_storage_api.Models;

namespace gallery_azure_storage_api.Services
{
 
    public interface ICosmosDbService
    {
        Task<IEnumerable<ImageModel>> GetItemsAsync(string query);
        Task<ImageModel> GetItemAsync(string id);
        Task AddItemAsync(ImageModel item);
        Task UpdateItemAsync(string id, ImageModel item);
        Task DeleteItemAsync(string id);
    }
}
