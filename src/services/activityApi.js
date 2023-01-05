import api from './api';

export async function post(id, token) {
  const response = await api.post(`/activite/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
