document.addEventListener("DOMContentLoaded", () => {
  loadFavorites();
});

const loadFavorites = () => {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const favoritesContainer = document.getElementById("favorites");

  if (favorites.length === 0) {
    favoritesContainer.innerHTML = "<p>No favorites yet.</p>";
    return;
  }

  const getFavoritesHtml = favorites.map((photoId) => {
    const photoDetails = getPhotoDetailsById(photoId);
    const imageUrl = (photoDetails.urls && photoDetails.urls.small) || "";

    return `
          <div class="favorite-item" data-photo-id="${photoId}">
              <img src="${imageUrl}" alt="${photoDetails.alt_description}" class="favorite-image" />
          </div>
      `;
  });

  const removeAllButton = document.createElement("button");
  removeAllButton.textContent = "Remove All Favorites";
  removeAllButton.addEventListener("click", removeAllFavorites);

  favoritesContainer.innerHTML = getFavoritesHtml.join("");
  favoritesContainer.appendChild(removeAllButton);
};

const getPhotoDetailsById = (photoId) => {
  const allPhotos = JSON.parse(localStorage.getItem("allPhotos")) || [];
  return allPhotos.find((photo) => photo.id === photoId) || {};
};

const removeAllFavorites = () => {
  localStorage.removeItem("favorites");
  loadFavorites();
};
