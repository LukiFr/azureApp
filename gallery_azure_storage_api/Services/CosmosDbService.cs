using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using gallery_azure_storage_api.Models;
using Microsoft.Azure.Cosmos;
using Microsoft.Azure.Cosmos.Fluent;
using Microsoft.Extensions.Configuration;

namespace gallery_azure_storage_api.Services
{
    public class CosmosDbService : ICosmosDbService
    {
        private Container _container;

        public CosmosDbService(
            CosmosClient dbClient,
            string databaseName,
            string containerName)
        {
            this._container = dbClient.GetContainer(databaseName, containerName);
        }

        public async Task AddItemAsync(ImageModel item)
        {
            await this._container.CreateItemAsync<ImageModel>(item, new PartitionKey(item.Id));
        }

        public async Task DeleteItemAsync(string id)
        {
            await this._container.DeleteItemAsync<ImageModel>(id, new PartitionKey(id));
        }

        public async Task<ImageModel> GetItemAsync(string id)
        {
            try
            {
                ItemResponse<ImageModel> response = await this._container.ReadItemAsync<ImageModel>(id, new PartitionKey(id));
                return response.Resource;
            }
            catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                return null;
            }

        }

        public async Task<IEnumerable<ImageModel>> GetItemsAsync(string queryString)
        {
            var query = this._container.GetItemQueryIterator<ImageModel>(new QueryDefinition(queryString));
            List<ImageModel> results = new List<ImageModel>();
            while (query.HasMoreResults)
            {
                var response = await query.ReadNextAsync();

                results.AddRange(response.ToList());
            }

            return results;
        }

        public async Task UpdateItemAsync(string id, ImageModel item)
        {
            await this._container.UpsertItemAsync<ImageModel>(item, new PartitionKey(id));
        }
    }
}
