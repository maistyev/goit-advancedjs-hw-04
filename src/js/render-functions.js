function getUniqueTags(tagsString) {
  const tagsArray = tagsString.split(',');

  const trimmedTags = tagsArray.map(tag => tag.trim());

  const uniqueTags = [...new Set(trimmedTags)];

  return uniqueTags;
}

export const createGalleryCard = ({
  webformatURL,
  largeImageURL,
  likes,
  views,
  comments,
  downloads,
  tags,
}) => {
  return `
<li class="gallery-item">
  <a class="gallery-link" href="${largeImageURL}">
    <img class="gallery-image" src="${webformatURL}" title="${getUniqueTags(
    tags
  ).join(', ')}"/>
  </a>
  <div class="stats">
    <div class="stat">
      <p class="stat-title">Likes</p>
      <p class="stat-value">${likes}</p>
    </div>
    <div class="stat">
      <p class="stat-title">Views</p>
      <p class="stat-value">${views}</p>
    </div>
    <div class="stat">
      <p class="stat-title">Comments</p>
      <p class="stat-value">${comments}</p>
    </div>
    <div class="stat">
      <p class="stat-title">Downloads</p>
      <p class="stat-value">${downloads}</p>
    </div>
  </div>
</li>
`;
};
