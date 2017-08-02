import {IndexRoute, Route, Router, browserHistory} from 'react-router';
import * as React from 'react';
import SignUp from './containers/signup/Signup';
import Login from './containers/login/Login';
import About from './containers/about/About';
import MyPage from './containers/myPage/MyPage';
import MyIdeas from './containers/myIdeas/MyIdeas';
import Ideas from './containers/ideas/Ideas';
import Root from './containers/Root';
import NotFound from './components/not_found/';

const router = () => (
    <Router history={browserHistory}>
        <Route path='/' component={Root}>
            <IndexRoute  component={SignUp}/>
            <Route path='about' component={About}/>
            <Route path='login' component={Login}/>
            <Route path='myPage' component={MyPage}/>
            <Route path='myIdeas' component={MyIdeas}/>
            <Route path='ideas' component={Ideas}/>
            <Route path='*' component={NotFound}/>
        </Route>
    </Router>
);

export default router;