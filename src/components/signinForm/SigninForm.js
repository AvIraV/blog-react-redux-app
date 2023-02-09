import { useForm } from 'react-hook-form'
import { Link, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { fetchSignIn } from '../../services/BlogService'
import path from '../../assets/path'

import './SigninForm.scss'

const SigninForm = () => {
  const { isLoggedIn, serverErrors } = useSelector((state) => state.authorisation)
  const dispatch = useDispatch()
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const onSubmit = (data) => {
    dispatch(fetchSignIn(JSON.stringify({ user: data })))
  }

  return (
    <div className="singin-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="singin-form-group">
          <h2>Sign In</h2>
        </div>
        <div className="singin-form-group">
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
          <span className="form-error">{errors?.email && <p>{errors?.email?.message || 'Email is invalid'}</p>}</span>
        </div>
        <div className="singin-form-group">
          <label htmlFor="password">Password</label>
          <input
            {...register('password', {
              required: 'Please fill out this feild.',
            })}
            className="form-input"
            type="password"
            name="password"
            placeholder="Password"
          />
          <span className="form-error">
            {(errors?.password || (serverErrors === {} || undefined ? null : serverErrors['email or password'])) && (
              <p>
                {errors?.password?.message ||
                  `Email or password ${serverErrors === {} || undefined ? null : serverErrors['email or password']}`}
              </p>
            )}
          </span>
        </div>
        <div className="singin-form-group">
          <input type="submit" className="btn" value="Login" />
        </div>
        <div className="singin-form-group">
          <p className="form-group__info">
            Don’t have an account?
            <Link to="/sign-up"> Sign Up</Link>
          </p>
          {isLoggedIn ? <Redirect to={path.articles} /> : null}
        </div>
      </form>
    </div>
  )
}

export default SigninForm
