import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { getPhotos } from './js/pixabay-api';
import { createGalleryCard } from './js/render-functions';

const refs = {
  form: document.querySelector('.js-search-form'),
  input: document.querySelector('.js-search-input'),
  submitButton: document.querySelector('.js-search-button'),
  gallery: document.querySelector('.js-gallery'),
  loader: document.querySelector('.js-loader'),
};

function handleFormSubmit(event) {
  event.preventDefault();
  refs.gallery.innerHTML = '';

  const inputValue = refs.input.value;
  if (inputValue.trim() === '') {
    iziToast.error({
      title: 'Error',
      message: 'Please enter the search query!',
    });
    return;
  }
  refs.loader.classList.add('active');
  getPhotos(inputValue)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          title: 'Error',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
        return;
      }

      refs.gallery.innerHTML = data.hits
        .map(imageInfo => createGalleryCard(imageInfo))
        .join('');
      let gallery = new SimpleLightbox('.gallery-link', { captionDelay: 250 });
      gallery.refresh();
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong. Please try again!',
      });
    })
    .finally(() => {
      refs.loader.classList.remove('active');
    });
  refs.form.reset();
}

refs.form.addEventListener('submit', handleFormSubmit);
