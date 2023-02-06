import { ExclamationCircleFilled } from '@ant-design/icons'
import { Modal } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import { fetchDeleteArticle } from '../../services/BlogService'

const { confirm } = Modal

const ShowDeleteConfirm = () => {
  const dispatch = useDispatch()
  const singleArticle = useSelector((state) => state.articles.singleArticle)
  const user = useSelector((state) => state.authorisation.user)
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

export default ShowDeleteConfirm
