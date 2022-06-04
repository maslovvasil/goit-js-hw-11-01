import { refs } from './js/services/getRefs';
import ApiService from './js/services/apiServise';
import renderGalleryMarkup from './js/components/gallery';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

hideButton();
refs.searchForm.addEventListener('submit', handleSearchFormSubmit);
refs.loadMoreBtn.addEventListener('click', handleLoadMoreBtnClick);

let inputValue = '';
let totalPages = 0;
const lightbox = new SimpleLightbox('.gallery a');
const api = new ApiService();

async function handleSearchFormSubmit(e) {
  e.preventDefault();
  clearMarkup();
  inputValue = e.currentTarget.elements.searchQuery.value.trim().replace(' ', '+');
  if (!inputValue) {
    Notify.failure('Please fill in the search field');
    return;
  }
  api.resetPage();
  try {
    const res = await api.fetchPhotos(inputValue);
    loadFirstPage(res);
  } catch (error) {
    handleError(error);
  }
}

function loadFirstPage({ hits, totalHits }) {
  clearMarkup();
  if (!hits.length) {
    Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    return;
  }
  totalPages = Math.ceil(totalHits / hits.length);
  renderGalleryMarkup(hits);
  if (api.page !== totalPages) {
    showButton();
  }
  Notify.success(`Hooray! We found ${totalHits} images.`);
  lightbox.refresh();
}

async function handleLoadMoreBtnClick(e) {
  e.target.classList.add('is-hidden');
  api.incrementPage();
  try {
    const res = await api.fetchPhotos(inputValue);
    loadNextPage(res);
  } catch (error) {
    handleError(error);
  }
}

function loadNextPage(res) {
  renderGalleryMarkup(res.hits);
  if (api.page === totalPages) {
    hideButton();
    Notify.info("We're sorry, but you've reached the end of search results.");
    lightbox.refresh();
    return;
  }
  showButton();
  lightbox.refresh();
}

function clearMarkup() {
  hideButton();
  refs.galleryDiv.innerHTML = '';
}

function handleError(error) {
  console.log(error);
  Notify.failure('Something went wrong.Please try again');
}

function hideButton() {
  refs.loadMoreBtn.classList.add('is-hidden');
}
function showButton() {
  refs.loadMoreBtn.classList.remove('is-hidden');
}