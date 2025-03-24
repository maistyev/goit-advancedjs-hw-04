const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '49481602-fd69c907e71567b02dc237fda';

export function getPhotos(query) {
  return fetch(
    `${BASE_URL}/?key=${API_KEY}&q=${encodeURIComponent(
      query
    )}&image_type=photo&orientation=horizontal&safesearch=true`
  ).then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    }

    return res.json();
  });
}
