import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Books from './components/books';
import BookDetails from './components/bookDetails';
import Lendings from './components/lendings';
import Customers from './components/customers/customers';
import CustomerForm from './components/customers/CustomerForm';
import AuthorsForm from './components/addForms/AuthorsForm';
import CategoriesForm from './components/addForms/CategoriesForm';
import PublishersForm from './components/addForms/PublishersForm';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import Logout from './components/logout';
import NotFound from './components/notFound';
import NavBar from './components/navbar';
import ProtectedRoute from './components/common/protectedRoute';

import auth from './services/authService';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <div className="content">
            <Switch>
              <Route
                path="/books"
                exact
                render={(props) => <Books {...props} user={user} />}
              />
              <ProtectedRoute path="/books/:id" component={BookDetails} />
              <Route path="/customers" exact component={Customers} />
              <ProtectedRoute path="/customers/:id" component={CustomerForm} />
              <ProtectedRoute path="/authors/new" component={AuthorsForm} />
              <ProtectedRoute
                path="/categories/new"
                component={CategoriesForm}
              />
              <ProtectedRoute
                path="/publishers/new"
                component={PublishersForm}
              />
              <Route path="/lendings" component={Lendings} />
              <Route path="/login" component={LoginForm} />
              <Route path="/logout" component={Logout} />
              <Route path="/register" component={RegisterForm} />
              <Route path="/not-found" component={NotFound} />
              <Redirect from="/" exact to="/books" />
              <Redirect to="/not-found" />
            </Switch>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
