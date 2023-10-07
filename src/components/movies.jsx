import React, { Component } from 'react';
import { toast } from "react-toastify"
import { Link } from 'react-router-dom';
import MoviesTable from './moviesTable';
import ListGroup from './common/listGroup';
import Pagination from './common/pagination';
import { getMovies, deleteMovie } from '../services/movieService';
import { getGenres } from '../services/genreService';
import { paginate } from '../utils/paginate';
import SearchBox from './searchBox';
import _ from 'lodash'

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    searchQuery: '',
    selectedGenre: '',
    sortColumn: { path: 'title', order: 'asc' }
  }

  async componentDidMount() {
    let { data: genresData } = await getGenres()
    const genres = [{ _id: '', name: "All Genres" }, ...genresData]

    let { data: moviesData } = await getMovies()
    this.setState({ movies: moviesData, genres })
  }

  handleDelete = async (movie) => {
    console.log('deleteMovie:', movie._id);
    const originalMovies = this.state.movies
    const movies = originalMovies.filter(m => m._id !== movie._id)
    this.setState({ movies })

    try {
      await deleteMovie(movie._id)
    } catch (ex) {
      if (ex.response) {
        if (ex.response.status === 404) {
          toast.error("page has already deleted!")
        } else if (ex.response.status === 401) {
          toast.error("unauthorized 401")
        }
      }
      this.setState({ movies: originalMovies })
    }
  }

  handleLike = (movie) => {
    console.log('handleLike clicked:', movie._id);
    const movies = [...this.state.movies]
    const index = movies.indexOf(movie)
    movies[index] = { ...movies[index] }
    movies[index].liked = !movies[index].liked
    this.setState({ movies })
  }

  handlePageClick = (currentPage) => {
    // console.log('handlePageClick:', pageNum);
    this.setState({ currentPage })
  }

  handleGenreSelected = (selectedGenre) => {
    console.log('handleGenreSelected:', selectedGenre);
    this.setState({ selectedGenre, searchQuery: "", currentPage: 1 })
  }

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: '', currentPage: 1 })
  }

  handleSort = (sortColumn) => {
    this.setState({ sortColumn })
  }

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state

    let filtered = allMovies;
    if (searchQuery) {
      filtered = allMovies.filter(m => m.title.toLowerCase().startsWith(searchQuery.toLowerCase()))
    } else if (selectedGenre && selectedGenre._id) {
      filtered = allMovies.filter(m => m.genre._id === selectedGenre._id)
    }

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: sorted.length, data: movies };
  }

  render() {
    const { length: count } = this.state.movies
    const {
      pageSize,
      currentPage,
      genres,
      searchQuery,
    } = this.state
    // const { length: count } = this.state.genres

    if (count === 0) return <p>no movies in the database.</p>

    const { totalCount, data: movies } = this.getPagedData();
    // console.log('movies:', movies);
    const { user } = this.props
    // console.log('user in movies:', user);

    return (
      // we don't have a mixture of high level components, it's more clear
      <div className="row" >
        <div className="col-3">
          <ListGroup
            items={genres}
            // textProperty="_id" // ListGroup.defaultPros
            // valueProperty="name"
            selectedItem={this.state.selectedGenre}
            onItemSelected={this.handleGenreSelected} />
        </div>
        <div className="col">
          {user && (<Link
            to="/movies/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          > New Movie </Link>)}

          <p>Showing {totalCount} movies in the database. </p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <MoviesTable
            movies={movies}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
            sortColumn={this.state.sortColumn}
            onSort={this.handleSort} />
          <Pagination
            // itemsCount={count}
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onClick={this.handlePageClick} />
        </div>
      </div >
    );
  }
}

export default Movies;