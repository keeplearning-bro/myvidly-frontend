import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import authService from '../services/authService';
import { Like } from './common/like'
import Table from './common/table';

class MoviesTable extends Component {

  columns = [
    {
      path: 'title', label: 'Title', content:
        movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    },
    { path: 'genre.name', label: 'Genre' },
    { path: 'numberInStock', label: 'Stock' },
    { path: 'dailyRentalRate', label: 'Rate' },
    {
      key: 'like', content: (movie) =>
        < Like
          liked={movie.liked}
          onClick={() => this.props.onLike(movie)} />
    },
    // {
    //   key: 'delete', content: (movie) =>
    //     <button
    //       onClick={() => this.props.onDelete(movie)}
    //       className="btn btn-danger btn-sm">
    //       Delete
    //     </button>
    // }
  ]

  deleteColum = {
    key: "delete",
    content: movie => (
      <button hidden={
        authService.getCurrentUser() && authService.getCurrentUser().isAdmin ? false : true}
        onClick={() => this.props.onDelete(movie)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    )
  }

  constructor() {
    super()
    const user = authService.getCurrentUser()
    // console.log('user is Admin:', user);
    if (user && user.isAdmin) {
      // console.log('this is admin:', user);
      this.columns.push(this.deleteColum)
    }
  }

  render() {
    const { movies, onSort, sortColumn } = this.props

    return (
      <Table
        columns={this.columns}
        data={movies}
        onSort={onSort}
        sortColumn={sortColumn} />
    )
  }
}

export default MoviesTable;