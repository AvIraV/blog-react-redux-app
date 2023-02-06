/* eslint-disable prettier/prettier */
import { useForm, useFieldArray } from 'react-hook-form'
import { Redirect } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchEditArticle } from '../../services/BlogService'

import './EditArticleForm.scss'

const EditArticleForm = () => {
  const dispatch = useDispatch()
  const { singleArticle, isEdited } = useSelector((state) => state.articles)
  const { user, isLoggedIn } = useSelector((state) => state.authorisation)
  const defaultValues = {
    title: singleArticle.title,
    description: singleArticle.description,
    body: singleArticle.body,
    tagList:
      singleArticle.tagList === undefined
        ? [{ tag: '' }, { tag: '' }]
        : singleArticle.tagList.map((tag) => {
          return { tag: tag }
        }),
  }
  const {
    register,
    formState: { errors },
    control,
    reset,
    handleSubmit,
  } = useForm({
    mode: 'all',
    defaultValues,
  })

  useEffect(() => {
    reset()
  }, [])

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
    dispatch(fetchEditArticle({ body: { article: body }, token: user.token, slug: singleArticle.slug }))
    reset()
  }
  return (
    <div className="new-article-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="form-title">Edit article</h2>
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
          <span style={{ fontSize: 12, color: 'red', paddingTop: 3 }}>
            {errors?.title && <p>{errors?.title?.message}</p>}
          </span>
        </div>
        <div className="form-group">
          <label htmlFor="description">Short description</label>
          <input
            {...register('description', {
              required: 'Please fill out this feild.',
              maxLength: {
                value: 150,
                message: 'Your description needs to be less than 100 characters',
              },
            })}
            type="text"
            className="form-input-new"
            name="description"
            placeholder="Text"
            maxLength={16}
          />
          <span style={{ fontSize: 12, color: 'red', paddingTop: 3 }}>
            {errors?.description && <p>{errors?.description?.message}</p>}
          </span>
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
          <span style={{ fontSize: 12, color: 'red', paddingTop: 3 }}>
            {errors?.body && <p>{errors?.body?.message}</p>}
          </span>
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
                <span style={{ fontSize: 12, color: 'red', paddingTop: 3 }}>
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
      {isLoggedIn ? null : <Redirect to="/sign-in" />}
      {isEdited ? <Redirect to={`/articles/${singleArticle.slug}`} /> : null}
    </div>
  )
}

export default EditArticleForm
