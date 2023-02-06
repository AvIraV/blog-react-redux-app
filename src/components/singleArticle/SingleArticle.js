import { useParams, Link, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { ExclamationCircleFilled } from '@ant-design/icons'
import { Modal } from 'antd'
import ReactMarkdown from 'react-markdown'

import { textTruncate } from '../utils/textTruncate'
import { fetchSingleArticle, fetchDeleteArticle, fetchChangeFavorite } from '../../services/BlogService'
import { onFocusFavoriteArticle } from '../../store/articlesSlice'
import Loader from '../loader/Loader'
import liked from '../../assets/redHeart.png'
import notliked from '../../assets/white-heart.png'
import './SingleArticle.scss'

const SingleArticle = () => {
  const { singleArticle, articlesLoadingStatus, isDeleted } = useSelector((state) => state.articles)
  const { user, isLoggedIn } = useSelector((state) => state.authorisation)
  const { articleId } = useParams()
  const dispatch = useDispatch()

  const { confirm } = Modal

  const showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure to delete this article?',
      icon: <ExclamationCircleFilled />,
      open: true,
      mask: false,
      width: 246,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        dispatch(fetchDeleteArticle({ slug: singleArticle.slug, token: user.token }))
      },
    })
  }

  useEffect(() => {
    dispatch(fetchSingleArticle({ slug: articleId, token: isLoggedIn ? user.token : false }))
  }, [])

  if (articlesLoadingStatus === 'error') {
    return <h5 className="error-message">Page not found!</h5>
  }

  const { author, favoritesCount, favorited, title, createdAt, description, body, slug, tagList } = singleArticle

  return (
    <>
      {articlesLoadingStatus === 'fetching' ? <Loader /> : null}
      {articlesLoadingStatus === 'fetched' ? (
        <div className="article">
          <header className="article__header">
            <h2 className="title">{textTruncate(title, 6)}</h2>
            <div
              className="likes"
              onClick={() => {
                if (isLoggedIn) {
                  dispatch(onFocusFavoriteArticle(5))
                  dispatch(fetchChangeFavorite({ slug, token: user.token, method: favorited ? 'DELETE' : 'POST' }))
                }
              }}
            >
              <img src={favorited ? liked : notliked} className="article__heart" />
              <span className="likes-counter">{favoritesCount}</span>
            </div>

            <span className="user-info">
              <p className="user-name">{author === undefined ? null : author.username}</p>
              <p className="article-date">{createdAt}</p>
            </span>
            <img src={author === undefined ? null : author.image} alt="avatar" className="avatar" />
          </header>
          <div className="tag-list">
            {tagList?.map((tag, index) => {
              return (
                <div className="tag" key={index}>
                  {textTruncate(tag, 4)}
                </div>
              )
            })}
          </div>

          <div className="article__dscr">
            <p>{textTruncate(description, 25)}</p>
            {user?.username === singleArticle?.author?.username ? (
              <div className="article-btn authorised">
                <button className="article-btn-delete" onClick={showDeleteConfirm}>
                  Delete
                </button>
                <Link className="article-btn-edit" to={`/articles/${slug}/edit`}>
                  Edit
                </Link>
              </div>
            ) : null}
          </div>

          <main className="article__body">
            <ReactMarkdown>{body}</ReactMarkdown>
          </main>
        </div>
      ) : null}

      {isDeleted ? <Redirect to="/articles" /> : null}
    </>
  )
}

export default SingleArticle
