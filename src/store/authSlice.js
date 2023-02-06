import { createSlice } from '@reduxjs/toolkit'

import { fetchSignUp, fetchSignIn, fetchProfile, fetchEditProfile } from '../services/BlogService'
import { setSessionData } from '../components/utils/setSessionData'

const initialState = {
  isLoggedIn: false,
  user: {},
  profile: {},
  serverErrors: {},
  authLoadingStatus: '',
}

const authSlice = createSlice({
  name: 'authorisation',
  initialState,
  reducers: {
    onLogOut: (state) => {
      state.isLoggedIn = false
      setSessionData(false)
      state.user = {}
      state.profile = {}
    },
    onLogIn: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
      state.user = action.payload.user
      state.profile = action.payload.profile
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSignUp.pending, (state) => {
        state.authLoadingStatus = 'fetching'
        state.serverErrors = {}
      })
      .addCase(fetchSignUp.fulfilled, (state, action) => {
        state.authLoadingStatus = 'fetched'
        state.user = action.payload.user
        if (action.payload.user) {
          state.isLoggedIn = true
        }
        state.serverErrors = action.payload.errors
      })
      .addCase(fetchSignUp.rejected, (state) => {
        state.authLoadingStatus = 'error'
      })
      .addCase(fetchSignIn.pending, (state) => {
        state.authLoadingStatus = 'fetching'
        state.serverErrors = {}
      })
      .addCase(fetchSignIn.fulfilled, (state, action) => {
        state.authLoadingStatus = 'fetched'
        state.user = action.payload.user
        if (action.payload.user) {
          state.isLoggedIn = true
        }
        action.payload.errors ? (state.serverErrors = action.payload.errors) : (state.serverErrors = {})
      })
      .addCase(fetchSignIn.rejected, (state) => {
        state.authLoadingStatus = 'error'
      })
      .addCase(fetchProfile.pending, (state) => {
        state.authLoadingStatus = 'fetching'
        state.serverErrors = {}
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.authLoadingStatus = 'fetched'
        state.profile = action.payload.profile
        setSessionData(state.isLoggedIn, state.user, action.payload.profile)
      })
      .addCase(fetchProfile.rejected, (state) => {
        state.authLoadingStatus = 'error'
      })
      .addCase(fetchEditProfile.fulfilled, (state, action) => {
        state.authLoadingStatus = 'fetched'
        state.user = action.payload.user
        state.serverErrors = action.payload.errors
      })
      .addDefaultCase(() => {})
  },
})

const { actions, reducer } = authSlice
export default reducer
export const { onLogOut, onLogIn } = actions
