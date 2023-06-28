import React, { useEffect, useState, useCallback } from 'react';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import AppLayout from '../components/layouts/AppLayout';
import AuthLayout from '../components/layouts/AuthLayout';
import AddBook from '../pages/AddBook';
import AddStory from '../pages/AddStory';
import BookDetails from '../pages/BookDetails';
import EditBook from '../pages/EditBook';
import EditStory from '../pages/EditStory';
import Home from '../pages/Home';
import Login from '../pages/Login';
import MyBooks from '../pages/MyBooks';
import MyStories from '../pages/MyStories';
import SignUp from '../pages/SignUp';
import StoryDetails from '../pages/StoryDetails';
import AuthManager from '../services/AuthManager';
import Favorites from '../pages/Favorites';
import paths from './paths';
import MyProfile from '../pages/MyProfile';
import EditProfile from '../pages/EditProfile';
import Users from '../pages/Users';
import UserProfile from '../pages/UserProfile';
import Notices from '../pages/Notices';
import Tests from '../pages/Tests';
import OneTest from '../pages/OneTest'
import RandomTicket from '../pages/RandomTicket';


const authRouts = [
  {
    path: paths.login,
    exact: true,
    Component: Login,
  },
  {
    path: paths.signUp,
    exact: true,
    Component: SignUp,
  },
];

const appRouts = [
  {
    path: paths.home,
    exact: true,
    Component: Home,
  },
  {
    path: paths.myProfile,
    exact: true,
    Component: MyProfile,
  },
  {
    path: paths.editProfile,
    exact: true,
    Component: EditProfile,
  },
  {
    path: paths.userProfile,
    exact: true,
    Component: UserProfile,
  },
  {
    path: paths.Tests,
    exact: true,
    Component: Tests,
  },
  {
    path: paths.oneTest,
    exact: true,
    Component: OneTest,
  },
  {
    path: paths.randomTicket,
    exact: true,
    Component: RandomTicket,
  },
];

const useIsLoggedIn = () => {
  const [loggedIn, setLoggedIn] = useState(AuthManager.isLoggedIn());

  const subscriber = useCallback((token) => {
    setLoggedIn(!!token);
  }, []);

  useEffect(() => {
    AuthManager.onLoginStatusChange(subscriber);
    return () => {
      AuthManager.offLoginStatusChange(subscriber);
    };
  }, [subscriber]);
  return loggedIn;
};

const RootRouter = () => {
  const loggedIn = useIsLoggedIn();
  return (
    <Router>
      {loggedIn ? (
        <AppLayout>
          <Switch>
            {appRouts.map(({ path, exact, Component }) => {
              return (
                <Route key={paths} exact={exact} path={path}>
                  <Component />
                </Route>
              );
            })}
            <Redirect to={paths.home} />
          </Switch>
        </AppLayout>
      ) : (
        <AuthLayout>
          <Switch>
            {authRouts.map(({ path, exact, Component }) => {
              return (
                <Route key={paths} exact={exact} path={path}>
                  <Component />
                </Route>
              );
            })}
            <Redirect to={paths.login} />
          </Switch>
        </AuthLayout>
      )}
    </Router>
  );
};

export default RootRouter;
