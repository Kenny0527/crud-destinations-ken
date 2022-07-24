import fetch from "node-fetch";
export async function getPhoto(location, destination) {
  let apiKey = "-7SxAREIOWjMrpNqZnb48Bzhr13NqIilOhZJREXp6f0";

  let search_url = `https://api.unsplash.com/search/photos/?client_id=${apiKey}&query=${destination} ${location}`;

  try {
    const response = await fetch(search_url);
    const data = await response.json();
    const allPhotos = data.results;
    const randIdx = Math.floor(Math.random() * allPhotos.length);
    const randPhoto = allPhotos[randIdx];
    return randPhoto.urls.thumb;
  } catch (error) {
    console.log(error);
  }
}
