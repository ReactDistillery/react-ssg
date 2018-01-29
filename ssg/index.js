import os from 'os';
import path from 'path';
import { fork } from 'child_process';

const CORES = os.cpus().length;
const MAX_HOMES = process.env.MAX_HOMES;
const client = new GraphQLClient(`${process.env.HYDRA_DOMAIN}/query`);

const routesArg = JSON.parse(process.argv[2]);

const generateStaticSite = async (routes) => {
  const chunkSize = Math.ceil(routes.length / CORES);
  let chunks = [];
  if (routes && Array.isArray(routes)) {
    if (routes.length && routes.length > chunkSize) {
      for (i = 0, l = array.length; i < l; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
      }
    } else {
      chunks = [routes];
    }
    for (const chunked of chunks) {
      try {
        fork(path.resolve(__dirname, 'buildRoutes.jsx'), [JSON.stringify(chunked)]);
      } catch (e) {
        throw e;
      }
    }
  }
};

generateStaticSite();
