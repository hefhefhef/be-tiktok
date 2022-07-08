import configs from 'configs';
import connectMongo from './mongo';
import { client } from './elasticsearch';
import { MongodbSubmitToElasticSearch } from 'libs/elasticsearch';
import { AccountsModel } from 'models';

export default async () => {
  if (configs.mongodb.uri) {
    await connectMongo();
  }

  if (client) {
    const clientInfo = await client.info();
    console.log(`Successfully connected to ElasticSearch: cluster_name:${clientInfo.cluster_name}`);
    const healthInfo = await client.cluster.health();
    console.log(healthInfo);
  }
};

export const MongoEs = new MongodbSubmitToElasticSearch(client, AccountsModel);