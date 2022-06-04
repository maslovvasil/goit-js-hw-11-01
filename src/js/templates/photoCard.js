function createPhotoMarkup({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `<li class="photo-card">
            <a href="${largeImageURL}" class="photo-link">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" class="photo-card__img" width="300"/>
            </a>
            <div class="info">
              <p class="info-item">
                <b>Likes</b>
                <span>${likes}</span>
              </p>
              <p class="info-item">
                <b>Views</b>
                <span>${views}</span>
              </p>
              <p class="info-item">
                <b>Comments</b>
                <span>${comments}</span>
              </p>
              <p class="info-item">
                <b>Downloads</b>
                <span>${downloads}</span>
              </p>
            </div>
          </li>`;
}
export { createPhotoMarkup };