import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'

import { fetchSingUp } from '../../services/BlogService'
import './SingupForm.scss'

const SingupForm = () => {
  const { serverErrors, isLoggedIn } = useSelector((state) => state.authorisation)
  const dispatch = useDispatch()
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'all',
  })

  const onSubmit = (data) => {
    const body = {
      user: {
        username: data.username,
        email: data.email,
        password: data.password,
      },
    }
    dispatch(fetchSingUp(JSON.stringify(body)))
    reset()
  }

  const password = useRef()
  password.current = watch('password')
  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <h2>Create new account</h2>
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
            placeholder="Username"
            autoFocus
          />
          <span style={{ fontSize: 12, color: 'red', paddingTop: 3 }}>
            {(errors?.username || serverErrors?.username) && (
              <p>{errors?.username?.message || `This username ${serverErrors?.username}`}</p>
            )}
          </span>
        </div>
        <div className="form-group">
          <label htmlFor="email-adress">Email adress</label>
          <input
            {...register('email', {
              required: 'Please fill out this feild.',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email is invalid!',
              },
            })}
            className="form-input"
            type="text"
            name="email"
            placeholder="Email address"
          />
          <span style={{ fontSize: 12, color: 'red', paddingTop: 3 }}>
            {(errors?.email || serverErrors?.email) && (
              <p>{errors?.email?.message || `This email ${serverErrors?.email}`}</p>
            )}
          </span>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            {...register('password', {
              required: 'Please fill out this feild.',
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
          <span style={{ fontSize: 12, color: 'red', paddingTop: 3 }}>
            {errors?.password && <p>{errors?.password?.message || 'Error!'}</p>}
          </span>
        </div>
        <div className="form-group">
          <label htmlFor="passwordRepeat">Repeat Password</label>
          <input
            {...register('passwordRepeat', {
              required: 'Please fill out this feild.',
              minLength: {
                value: 6,
                message: 'Your password needs to be at least 6 characters',
              },
              maxLength: {
                value: 40,
                message: 'Your password needs to be less than 40 characters',
              },
              validate: (value) => value === password.current,
            })}
            className="form-input"
            type="password"
            placeholder="Password"
          />
          <span style={{ fontSize: 12, color: 'red', paddingTop: 3 }}>
            {errors?.passwordRepeat && <p>{errors?.passwordRepeat?.message || 'Password must match!'}</p>}
          </span>
        </div>
        <div className="form-group checkbox-group">
          <label htmlFor="agree-checkbox" className="checkbox-label">
            <input
              {...register('checkbox', {
                required: 'You must agree to the processing of your personal information!',
              })}
              type="checkbox"
              className="checkbox"
              name="checkbox"
              placeholder="Password"
            />
            I agree to the processing of my personal information
          </label>
          <span style={{ fontSize: 12, color: 'red', paddingTop: 3 }}>
            {errors?.checkbox && <p>{errors?.checkbox?.message || 'Error'}</p>}
          </span>
        </div>
        <div className="form-group">
          <input type="submit" className="btn" value="Create" />
        </div>
        <div className="form-group">
          <p className="form-group__info">
            Already have an account?
            <Link to="/sign-in"> Sign In</Link>
          </p>
        </div>
      </form>
      {isLoggedIn ? <Redirect to="/articles" /> : null}
    </div>
  )
}

export default SingupForm
