import { apicraft } from '@siberiacancode/apicraft';

export default apicraft([
  {
    input: 'api.yaml',
    output: 'generated/api',
    instance: 'axios',
    baseUrl: 'https://juniorsbootcamp.ru',
    nameBy: 'path',
    groupBy: 'tags',
    plugins: ['tanstack']
  }
]);
