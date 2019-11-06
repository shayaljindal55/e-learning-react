import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Login from './login/login';
import Register from './register/register';
import Header from "./shared/header/header";
import Notfound from "./shared/notFound/notFound";
import Footer from "./shared/footer/footer";
import Home from "./home/home";
import { withRouter } from "react-router-dom";

const Main = withRouter(({ location }) => {
    return (
        <div>
            {
                location.pathname !== '/' && location.pathname !== '/login'
                && location.pathname !== '/register' && <Header />
            }
            <Route exact path="/" component={App} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/home" component={Home} />
            {
                location.pathname !== '/' && location.pathname !== '/login'
                && location.pathname !== '/register' && <Footer />
            }
        </div>
    )
})

const Root = () => (
    <Router>
        <Main />
    </Router>
)
ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
