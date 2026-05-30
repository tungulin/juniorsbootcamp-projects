import { apicraft } from '@siberiacancode/apicraft';

export default apicraft([
  {
    input: 'api.yaml',
    output: './app/generated/api',
    instance: {
      name: 'axios',
      runtimeInstancePath: './app/shared/axiosInstance'
    },
    baseUrl: 'https://juniorsbootcamp.ru',
    nameBy: 'path',
    groupBy: 'tags',
    plugins: ['tanstack']
  }
]);
