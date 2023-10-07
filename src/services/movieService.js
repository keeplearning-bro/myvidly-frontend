import * as genresAPI from "./genreService";
import http from "./httpService"

const apiEndpoint = process.env.REACT_APP_URL + "/movies"

function movieUrl(id) {
  return `${apiEndpoint}/${id}`
}

export function getMovies() {
  return http.get(apiEndpoint)
}

export function deleteMovie(id) {
  return http.delete(movieUrl(id))
}

export function getMovie(id) {
  return http.get(movieUrl(id))
}

export async function saveMovie(movie) {
  if (movie._id) {
    // 避免movie和url中都包含id，这样容易引起混淆，不是最佳实践
    const body = { ...movie }
    console.log("before:", body);
    delete body._id
    console.log("after:", body);
    return http.put(movieUrl(movie._id), body)
  }

  return http.post(apiEndpoint, movie)
}
