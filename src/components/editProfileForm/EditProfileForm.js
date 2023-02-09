/* eslint-disable prettier/prettier */
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { fetchEditProfile } from '../../services/BlogService'
import path from '../../assets/path'

import './EditProfileForm.scss'

const EditProfileForm = () => {
  const { user, isLoggedIn } = useSelector((state) => state.authorisation)
  const dispatch = useDispatch()
  const {
    register,
    //unregister,
    formState: { errors },
    reset,
    //watch,
    handleSubmit,
  } = useForm({
    defaultValues: {
      username: user.username,
      email: user.email,
    },
    mode: 'all',
  })

  useEffect(() => {
    reset()
  }, [])

  const onSubmit = (data) => {
    let body = {user: {}}
    for ( let key in data) {
      if (data[key] === '') {
        continue
      }
      body.user[key] = data[key]
    }
    dispatch(fetchEditProfile({ body, token: user.token }))
  }

  return (
    <div className="container-edit-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="edit-form-group">
          <h2>Edit Profile</h2>
          <label htmlFor="username">Username</label>
          <input
            {...register('username', {
              required: 'Please fill out this feild.',
              minLength: {
                value: 3,
                message: 'Your username needs to be at least 3 characters',
              },
              maxLength: {
                value: 20,
                message: 'Your username needs to be less than 20 characters',
              },
            })}
            className="form-input"
            type="text"
            name="username"
            placeholder="Username"
            autoFocus
          />
          <span className="form-error">
            {errors?.username && <p>{errors?.username?.message || 'Error!'}</p>}
          </span>
        </div>
        <div className="edit-form-group">
          <label htmlFor="email-adress">Email adress</label>
          <input 
            {...register('email', {
              required: 'Please fill out this feild.',
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            })}
            className="form-input"
            type="text"
            name="email"
            placeholder="Email address"
          />
          <span className="form-error">
            {errors?.email && <p>{errors?.email?.message || 'Email is invalid'}</p>}
          </span>
        </div>
        <div className="edit-form-group">
          <label htmlFor="password">New Password</label>
          <input
            {...register('password', {
              // required: 'Please fill out this feild.',
              minLength: {
                value: 6,
                message: 'Your password needs to be at least 6 characters',
              },
              maxLength: {
                value: 40,
                message: 'Your password needs to be less than 40 characters',
              },
            })}
            className="form-input"
            type="password"
            name="password"
            placeholder="Password"
          />
          <span className="form-error">
            {errors?.password && <p>{errors?.password?.message || 'Error!'}</p>}
          </span>
        </div>
        <div className="edit-form-group">
          <label htmlFor="image">Avatar image (url)</label>
          <input
            {...register('image', {
              pattern: {
                value: /(https:\/\/)([^\s(["<,>/]*)(\/)[^\s[",><]*(.png|.jpg)(\?[^\s[",><]*)?/g,
                message: 'This url is invalid!',
              },
            })}
            className="form-input"
            type="text"
            name="image"
            placeholder="Avatar image"
          />
          <span className="form-error">
            {errors?.image && <p>{errors?.image?.message || 'Error!'}</p>}
          </span>
        </div>
        <div className="edit-form-group">
          <button className="btn">Save</button>
        </div>
      </form>
      {isLoggedIn ? null : <Redirect to={path.signIn} />}
    </div>
  )
}

export default EditProfileForm
