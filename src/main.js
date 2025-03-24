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
  loadMoreButton: document.querySelector('.js-load-more-button'),
};

let search = { inputValue: '', page: 1 };

let galleryBox = new SimpleLightbox('.gallery-link', { captionDelay: 250 });

function handleFormSubmit(event) {
  event.preventDefault();
  refs.gallery.innerHTML = '';
  refs.loadMoreButton.classList.remove('active');

  search.inputValue = refs.input.value;
  search.page = 1;

  if (search.inputValue.trim() === '') {
    iziToast.error({
      title: 'Error',
      message: 'Please enter the search query!',
    });
    return;
  }
  refs.loader.classList.add('active');
  getPhotos(search.inputValue)
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
      galleryBox.refresh();
      if (data.totalHits > data.hits.length) {
        refs.loadMoreButton.classList.add('active');
      }
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

async function handleLoadMore() {
  search.page += 1;
  refs.loader.classList.add('active');
  window.scrollBy({
    top: window.innerHeight,
    left: 0,
    behavior: 'smooth',
  });
  refs.loadMoreButton.classList.remove('active');
  try {
    const images = await getPhotos(search.inputValue, search.page);
    refs.gallery.insertAdjacentHTML(
      'beforeend',
      images.hits.map(imageInfo => createGalleryCard(imageInfo)).join('')
    );
    galleryBox.refresh();

    if (images.totalHits < search.page * 15) {
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
      });
      refs.loadMoreButton.removeEventListener('click', handleLoadMore);
    } else {
      refs.loadMoreButton.classList.add('active');
    }

    const { height } = document
      .querySelector('.gallery-item')
      .getBoundingClientRect();

    window.scrollBy({
      top: height * 2,
      left: 0,
      behavior: 'smooth',
    });
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again!',
    });
  } finally {
    refs.loader.classList.remove('active');
  }
}

refs.form.addEventListener('submit', handleFormSubmit);
refs.loadMoreButton.addEventListener('click', handleLoadMore);
