import axios from 'axios'
import { parseCookies } from 'nookies'
import dotenv from 'dotenv'

import { API_URL } from '@/utils/app';


dotenv.config();
export function getAPIClient(ctx?: any) {

  const {'habit-token': token } = parseCookies(ctx);

  const api = axios.create({
    baseURL: API_URL
  });

  api.interceptors.request.use(config => {
    return config;
  });

  if ( token ) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  }

  
  return api;
}