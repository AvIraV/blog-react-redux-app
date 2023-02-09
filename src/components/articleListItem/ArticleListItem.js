import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { textTruncate } from '../utils/textTruncate'
import { fetchChangeFavorite } from '../../services/BlogService'
import { onFocusFavoriteArticle } from '../../store/articlesSlice'
import liked from '../../assets/redHeart.png'
import notliked from '../../assets/white-heart.png'
import avatar from '../../assets/avatar.png'
import path from '../../assets/path'
import './ArticleListItem.scss'

const ArticleListItem = ({
  favoritesCount,
  favorited,
  author,
  title,
  createdAt,
  description,
  slug,
  tagList,
  index,
  isLoggedIn,
}) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.authorisation.user)

  return (
    <div className="post-item open">
      <header className="post-item__header">
        <h2 className="title">
          <Link className="title" to={`${path.articles}/${slug}`}>
            {textTruncate(title, 8)}
          </Link>
        </h2>
        <div
          className="likes-group"
          onClick={() => {
            if (isLoggedIn) {
              dispatch(onFocusFavoriteArticle(index))
              dispatch(fetchChangeFavorite({ slug, token: user.token, method: favorited ? 'DELETE' : 'POST' }))
            }
          }}
        >
          <img src={favorited ? liked : notliked} className="heart" />
          <span className="likes-counter">{favoritesCount}</span>
        </div>
        <span className="user-info">
          <p className="user-name">{author?.username}</p>
          <p className="post-date">
            {new Date(createdAt).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </span>
        <img
          src={author?.image}
          alt="avatar"
          onError={(e) => {
            e.target.src = avatar
          }}
          className="avatar"
        />
      </header>
      <div className="tag-list">
        {tagList?.map((tag, index) => {
          return (
            <div className={tag === '' ? 'tag' : 'no-tags'} key={index}>
              {textTruncate(tag, 4)}
            </div>
          )
        })}
      </div>
      <main>
        <p className="post-item__article">{textTruncate(description, 25)}</p>
      </main>
    </div>
  )
}

export default ArticleListItem
