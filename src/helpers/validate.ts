import { Song } from "../Components/MainLayout";

export const validate = (songData: Song) => {
  const errors: Record<string, string> = {};

  if (songData.title.length === 0) {
    errors["title"] = "Please enter a title.";
  }

  if (songData.artist.length === 0) {
    errors["artist"] = "Please enter an artist.";
  }

  if (songData.album.length === 0) {
    errors["album"] = "Please enter an album.";
  }

  if (songData.rating < 1 || songData.rating > 5) {
    errors["rating"] = "Please enter a rating between 1 and 5.";
  }

  if (songData.genres.length === 0) {
    errors["genres"] = "Please enter at least one genre.";
  }

  if (
    songData.releaseYear < 1900 ||
    songData.releaseYear > new Date().getFullYear()
  ) {
    errors["releaseYear"] =
      "Please enter a release year between 1900 and the current year.";
  }
  return errors;
}