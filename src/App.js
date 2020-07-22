import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Books from './components/books';
import BookDetails from './components/bookDetails';
import Lendings from './components/lendings';
import Customers from './components/customers';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import NotFound from './components/notFound';
import NavBar from './components/navbar';
import './App.css';

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <main className="container">
        <div className="content">
          <Switch>
            <Route path="/books" exact component={Books} />
            <Route path="/books/:id" component={BookDetails} />
            <Route path="/customers" component={Customers} />
            <Route path="/lendings" component={Lendings} />
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" to="/books" />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </main>
    </React.Fragment>
  );
}

export default App;
