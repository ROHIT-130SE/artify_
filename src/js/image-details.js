import {} from "unsplash-js";

const imageDetailsContainer = document.querySelector(
  "#image-details-container"
);
const imageModal = document.querySelector("#image-modal");

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const photoId = params.get("photoId");

  if (photoId) {
    fetchAndDisplayImageDetails(photoId);
  } else {
    console.error("Photo ID not provided in the query parameters.");
  }
});

const fetchAndDisplayImageDetails = async (photoId) => {
  try {
    const photoDetails = await getPhotoDetails(photoId);

    if (!photoDetails) {
      console.error("Failed to fetch photo details.");
      return;
    }

    const imageElement = document.createElement("img");
    imageElement.src = photoDetails.urls.full;
    imageElement.alt = photoDetails.alt_description || "Untitled";

    imageDetailsContainer.appendChild(imageElement);

    const response = await fetch("./image-details.html");

    if (!response.ok) {
      throw new Error("Failed to load image-details.html");
    }

    const data = await response.text();

    const creatorName = photoDetails.user?.first_name || "Unknown";
    const description = photoDetails.description || "No description available";
    const fullSizeImageUrl = photoDetails.urls?.full || "";
    const creatorBio = photoDetails.user?.bio || "No bio available";

    const updatedContent = data
      .replace("{creator}", creatorName)
      .replace("{description}", description)
      .replace("{fullSizeImageUrl}", fullSizeImageUrl)
      .replace("{creatorBio}", creatorBio);

    imageDetailsContainer.innerHTML = updatedContent;
    imageModal.style.display = "block";
  } catch (error) {
    console.error(error);
  }
};

const getPhotoDetails = async (photoId) => {
  try {
    const response = await fetch(`https://api.unsplash.com/photos/${photoId}`, {
      method: "GET",
      headers: {
        Authorization: "XOzK-npm1BzOxkjW2iwLgyU4GQGsWReTKEOOuss1Tyk",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch photo details for photoId: ${photoId}`);
    }

    const photoDetails = await response.json();
    return photoDetails;
  } catch (error) {
    console.error(error);
    return null;
  }
};
