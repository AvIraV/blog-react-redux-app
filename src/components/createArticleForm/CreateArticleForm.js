import { useForm, useFieldArray } from 'react-hook-form'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { fetchCreateArticle } from '../../services/BlogService'
import path from '../../assets/path'

import './CreateArticleForm.scss'

const CreateArticleForm = () => {
  const dispatch = useDispatch()
  const { user, isLoggedIn } = useSelector((state) => state.authorisation)
  const { isCreated } = useSelector((state) => state.articles)
  const {
    register,
    formState: { errors },
    control,
    reset,
    handleSubmit,
  } = useForm({
    mode: 'all',
    defaultValues: {
      title: '',
      description: '',
      body: '',
      tagList: [{ tag: '' }, { tag: '' }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    name: 'tagList',
    control,
  })

  const onSubmit = (data) => {
    const body = {
      body: data.body,
      description: data.description,
      tagList: data.tagList.map(({ tag }) => tag),
      title: data.title,
    }
    dispatch(fetchCreateArticle({ body: { article: body }, token: user.token }))
    reset()
  }
  return (
    <div className="new-article-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="form-title">Create new article</h2>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            {...register('title', {
              required: 'Please fill out this feild.',
              maxLength: {
                value: 100,
                message: 'Your title needs to be less than 100 characters',
              },
            })}
            type="text"
            className="form-input-new"
            name="title"
            placeholder="Title"
            maxLength={60}
          />
          <span className="form-error">{errors?.title && <p>{errors?.title?.message}</p>}</span>
        </div>
        <div className="form-group">
          <label htmlFor="description">Short description</label>
          <input
            {...register('description', {
              required: 'Please fill out this feild.',
              maxLength: {
                value: 150,
                message: 'Your description needs to be less than 150 characters',
              },
            })}
            type="text"
            className="form-input-new"
            name="description"
            placeholder="Text"
          />
          <span className="form-error">{errors?.description && <p>{errors?.description?.message}</p>}</span>
        </div>
        <div className="form-group">
          <label htmlFor="body">Text</label>
          <textarea
            {...register('body', {
              required: 'Please fill out this feild.',
            })}
            name="body"
            className="text"
            placeholder="Text"
            rows="9"
          />
          <span className="form-error">{errors?.body && <p>{errors?.body?.message}</p>}</span>
        </div>
        {fields.map((field, index) => {
          return (
            <div key={field.id}>
              <label className="tags-control">
                <input
                  {...register(`tagList[${index}].tag`, {
                    required: 'Please fill out or delete this feild.',
                  })}
                  type="text"
                  className="form-input-new tags-input"
                />
                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => {
                    remove(index)
                  }}
                >
                  Delete
                </button>
              </label>
              {errors?.tagList === undefined || errors?.tagList[index] === undefined ? null : (
                <span className="form-error">
                  {errors?.tagList[index].tag && <p>{errors?.tagList[index].tag.message}</p>}
                </span>
              )}
            </div>
          )
        })}
        <button
          type="button"
          className="add-btn"
          onClick={() => {
            append({
              tag: '',
            })
          }}
        >
          Add tag
        </button>
        <input type="submit" className="btn btn-send" value="Send" />
      </form>
      {isLoggedIn ? null : <Redirect to={path.signIn} />}
      {isCreated ? <Redirect to={path.articles} /> : null}
    </div>
  )
}

export default CreateArticleForm
