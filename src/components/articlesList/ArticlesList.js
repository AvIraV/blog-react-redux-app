import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

import ArticleListItem from '../articleListItem/ArticleListItem'
import Loader from '../loader/Loader'
import PaginationList from '../pagination/Pagination'
import { fetchAllArticles } from '../../services/BlogService'

import './ArticlesList.scss'

const ArticlesList = () => {
  const { articlesList, articlesLoadingStatus, pageOfArticles } = useSelector((state) => state.articles)
  const { user, isLoggedIn } = useSelector((state) => state.authorisation)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAllArticles({ pageOfArticles, token: isLoggedIn ? user.token : false }))
  }, [pageOfArticles, isLoggedIn])

  if (articlesLoadingStatus === 'error') {
    return <h5>Ошибка загрузки</h5>
  }

  return (
    <main className="article-list">
      {articlesLoadingStatus === 'fetching' ? <Loader /> : null}
      {articlesList.map((props, index) => (
        <ArticleListItem {...props} index={index} isLoggedIn={isLoggedIn} key={uuidv4()} />
      ))}
      {articlesLoadingStatus === 'fetched' ? <PaginationList /> : null}
    </main>
  )
}

export default ArticlesList
