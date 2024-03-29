import React, { Component } from 'react';
import Form from './common/form';
import Joi from 'joi-browser';

import { getMovie, saveMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";


class MovieForm extends Form {
  state = {
    data: {
      title: '',
      genreId: '',
      numberInStock: '',
      dailyRentalRate: ''
    },
    genres: [],
    errors: {}
  }

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number().required().min(0).max(100).label("Number In Stock"),
    dailyRentalRate: Joi.number().required().min(0).max(10).label("Rate"),
  }

  async populateGenres() {
    const { data: genres } = await getGenres()
    this.setState({ genres })
  }

  async populateMovies() {
    const movieId = this.props.match.params.id;
    if (movieId === "new") return

    try {
      const { data: movie } = await getMovie(movieId)
      this.setState({ data: this.mapToViewModel(movie) })
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        this.props.history.replace("/not-found")
      }
    }
  }

  async componentDidMount() {
    await this.populateGenres()
    await this.populateMovies()
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    }
  }

  doSubmit = async () => {
    try {
      await saveMovie(this.state.data)
      this.props.history.push("/movies")
    } catch (ex) {
      console.log(ex);
    }
    console.log('Submitted MoviesForm')
  }

  render() {
    const { match } = this.props
    return (
      <div>
        <h1>MovieForm {match.params.id}</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number In Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  };
}

export default MovieForm;