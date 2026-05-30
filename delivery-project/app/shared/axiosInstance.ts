import axios from 'axios';

import { AUTH_TOKEN } from './localltorage';

export const instance = axios.create({
  baseURL: 'https://juniorsbootcamp.ru'
});

instance.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem(AUTH_TOKEN);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});
