import React from 'react';
import { Route, Switch } from 'react-router';

// Module root components
import HomePage from './pages/home-page';
import SignupPage from './pages/signup-page';
import LogInPage from './pages/login-page';
import NotFoundPage from './pages/notfound-page';
import ViewPostPage from './pages/viewpost-page';
import ViewHivePage from './pages/viewhive-page';
import ProfileHomePage from './pages/profilehome-page';
import PublicProfilePage from './pages/publicprofile-page';
import BuildHivePage from './pages/buildhive-page';
import CreatePostPage from './pages/createpost-page';
import ConversationPage from './pages/conversation-page';
import ViewCommentPage from './pages/viewcomment-page';

export default (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route path="/posts/view/:id" component={ViewPostPage} />
    <Route path="/posts/comments/:id" component={ViewCommentPage} />
    <Route path="/hives/view/:title" component={ViewHivePage} />
    <Route path="/hives/build" component={BuildHivePage} />
    <Route path="/users/profile/home" component={ProfileHomePage} />
    <Route path="/users/:user" component={PublicProfilePage} />
    <Route path="/posts/create/:id" component={CreatePostPage} />
    <Route path="/messages/:id" component={ConversationPage} />
    <Route exact path="/signup" component={SignupPage} />
    <Route exact path="/login" component={LogInPage} />
    <Route path="*" component={NotFoundPage} />
  </Switch>
);