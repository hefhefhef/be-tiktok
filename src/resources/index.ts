import configs from 'configs';
import connectMongo from './mongo';
import { client } from './elasticsearch';
import { MongodbSubmitToElasticSearch } from 'libs/elasticsearch';
import { UserModel } from 'models';
import { logger } from 'utils/logger';

export default async () => {
  if (configs.mongodb.host) {
    await connectMongo();
  }
  try {
    if (client) {
      const clientInfo = await client.info();
      console.log(`Successfully connected to ElasticSearch: cluster_name:${clientInfo.cluster_name}`);
      const healthInfo = await client.cluster.health();
      console.log(healthInfo);
    }
  } catch (error) {
    logger.error(`ES::: Connection error::: ${error}`);
  }
};

export const MongoEs = new MongodbSubmitToElasticSearch(client, UserModel);
