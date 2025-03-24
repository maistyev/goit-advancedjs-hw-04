import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com';

const ENDPOINT = 'api/';
const API_KEY = '49481602-fd69c907e71567b02dc237fda';

export async function getPhotos(query, page = 1, perPage = 15) {
  const { data } = await axios.get(ENDPOINT, {
    params: {
      key: API_KEY,
      q: encodeURIComponent(query),
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page: perPage,
    },
  });
  return data;
}
