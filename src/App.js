import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import NarBar from './components/navBar';
import RegisterForm from './components/registerForm';
import LoginForm from './components/loginForm';
import Logout from "./components/logoutForm";
import Movies from './components/movies';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import MovieForm from './components/movieForm';
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from "./components/common/protectedRouter";
import authService from './services/authService';
import "./App.css"

class App extends Component {
  state = {}
  componentDidMount() {
    const user = authService.getCurrentUser()
    this.setState({ user })
  }

  render() {
    const { user } = this.state
    return (
      <React.Fragment>
        <ToastContainer />
        <NarBar user={user} />
        <main className='container'>
          <Switch>
            <Route path='/register' component={RegisterForm} />
            <Route path='/login' component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <ProtectedRoute
              path='/movies/:id' component={MovieForm} />
            <Route
              path='/movies'
              render={props => <Movies {...props} user={user} />}
            />
            <Route path='/customers' component={Customers} />
            <Route path='/rentals' component={Rentals} />
            <Route path='/not-found' component={NotFound} />
            <Redirect from='/' exact to='/movies' />
            <Redirect to='/not-found' />
          </Switch>
        </main >
      </React.Fragment>
    );
  }
}

export default App;