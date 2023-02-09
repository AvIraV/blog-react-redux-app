import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import Header from '../header/Header'
import ArticlesList from '../articlesList/ArticlesList'
import SingleArticle from '../singleArticle/SingleArticle'
import SignupForm from '../signupForm/SignupForm'
import SigninForm from '../signinForm/SigninForm'
import EditProfileForm from '../editProfileForm/EditProfileForm'
import EditArticleForm from '../editArticleForm/EditArticleForm'
import CreateArticleForm from '../createArticleForm/CreateArticleForm'
import path from '../../assets/path'

import './App.scss'

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Switch>
          <Route exact path="/">
            <Redirect to={path.articles} />
          </Route>
          <Route exact path={path.articles}>
            <ArticlesList />
          </Route>
          <Route exact path={path.singleArticle}>
            <SingleArticle />
          </Route>
          <Route exact path={path.signUp}>
            <SignupForm />
          </Route>
          <Route exact path={path.signIn}>
            <SigninForm />
          </Route>
          <Route exact path={path.profile}>
            <EditProfileForm />
          </Route>
          <Route exact path={path.newArticle}>
            <CreateArticleForm />
          </Route>
          <Route exact path={path.edit}>
            <EditArticleForm />
          </Route>
          <Route render={() => <h2 className="error-message">Page not found</h2>}></Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
