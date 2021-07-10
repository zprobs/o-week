import { InMemoryCache, InMemoryCacheConfig } from '@apollo/client';

const config: InMemoryCacheConfig = {};

const cache = new InMemoryCache(config);

export default cache;
