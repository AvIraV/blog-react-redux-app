import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { onLogOut, onLogIn } from '../../store/authSlice'
import { fetchProfile } from '../../services/BlogService'
import { getSessionData } from '../utils/setSessionData'
import avatar from '../../assets/avatar.png'
import path from '../../assets/path'
import './Header.scss'

const Header = () => {
  const { isLoggedIn, user, profile } = useSelector((state) => state.authorisation)
  const dispatch = useDispatch()

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchProfile(user.username))
    }
  }, [user])

  useEffect(() => {
    const data = getSessionData()
    if (data) {
      dispatch(onLogIn(data))
    }
  }, [])

  return (
    <header className="header">
      <nav className="navbar">
        <h1 className="logo">
          <Link to="/">Realworld Blog</Link>
        </h1>
        {!isLoggedIn ? (
          <ul>
            <li className="navbar-item">
              <Link className="navbar-item-sing-in" to={path.signIn}>
                Sign In
              </Link>
            </li>
            <li>
              <Link className="navbar-item-sing-up" to={path.signUp}>
                Sign Up
              </Link>
            </li>
          </ul>
        ) : (
          <div className="authorised">
            <ul>
              <li className="navbar-item-authorised">
                <Link className="navbar-item-create-article" to={path.newArticle}>
                  Create article
                </Link>
              </li>
              <li>
                <Link className="navbar-item-user" to={path.profile}>
                  <div className="user-info-authorised">
                    <p>{user.username}</p>
                    <img
                      src={profile.image}
                      className="user-avatar"
                      onError={(e) => {
                        e.target.src = avatar
                      }}
                      alt="avatar"
                    />
                  </div>
                </Link>
              </li>
              <li>
                <button className="navbar-item-logout" onClick={() => dispatch(onLogOut())}>
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header
