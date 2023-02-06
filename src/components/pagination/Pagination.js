import { Pagination } from 'antd'
import { useSelector, useDispatch } from 'react-redux'

import { getNextPageArticles } from '../../store/articlesSlice'

import './Pagination.scss'

const PaginationList = () => {
  const { articlesCount, pageOfArticles } = useSelector((state) => state.articles)
  const dispatch = useDispatch()
  return (
    <div>
      <Pagination
        className="pagination"
        defaultCurrent={pageOfArticles}
        defaultPageSize={5}
        total={articlesCount}
        onChange={(page) => dispatch(getNextPageArticles(page))}
        showSizeChanger={false}
      />
    </div>
  )
}
export default PaginationList
