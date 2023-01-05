import api from './api';

export async function oauthSignIn(code) {
  const response = await api.post(`/oauth?code=${code}`);
  return response.data;
}
//
