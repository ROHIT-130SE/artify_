import { createApi } from "unsplash-js";

const main = document.querySelector("#main");
const nextPageButton = document.querySelector("#nextPage");
const prevPageButton = document.querySelector("#prevPage");
const navLinks = document.querySelectorAll(".nav-link");

const unsplash = createApi({
  accessKey: "XOzK-npm1BzOxkjW2iwLgyU4GQGsWReTKEOOuss1Tyk",
});

let currentPage = 1;

const fetchAndDisplayPhotos = (query, page) => {
  unsplash.search
    .getPhotos({
      query: query,
      page: page,
      perPage: 12,
      orientation: "portrait",
    })
    .then((result) => {
      if (result.type === "success") {
        const photos = result.response.results;
        const getUrls = photos.map((i) => {
          return `
            <div class="gallery-item">
              <img src="${i.urls.small}" data-photo-id="${i.id}" class="photo" />
              <button class="favorite-button" data-photo-id="${i.id}" onclick="toggleFavorite(this)">
                <img src="./images/empty-heart-icon.png" alt="Favorite" class="heart-icon" />
              </button>
            </div>
          `;
        });
        main.innerHTML = getUrls.join("");
        addPhotoClickListeners();
      }
    });
};

const addPhotoClickListeners = () => {
  const photos = document.querySelectorAll(".photo");
  photos.forEach((photo) => {
    photo.addEventListener("click", function () {
      const photoId = this.dataset.photoId;
      window.location.href = `image-details.html?photoId=${photoId}`;
    });
  });
};

navLinks.forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    const query = this.dataset.query;
    currentPage = 1;
    fetchAndDisplayPhotos(query, currentPage);
  });
});

nextPageButton.addEventListener("click", function () {
  currentPage++;
  fetchAndDisplayPhotos("Indian Art", currentPage);
});

prevPageButton.addEventListener("click", function () {
  if (currentPage > 1) {
    currentPage--;
    fetchAndDisplayPhotos("Indian Art", currentPage);
  }
});

fetchAndDisplayPhotos("Indian Art", currentPage);

const loadFavorites = () => {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites.forEach((photoId) => {
    const button = document.querySelector(`[data-photo-id="${photoId}"]`);
    if (button) {
      button.classList.add("favorited");
      const heartIcon = button.querySelector(".heart-icon");
      heartIcon.src = "./images/filled-heart-icon.png";
    }
  });
};

document.addEventListener("DOMContentLoaded", loadFavorites);
