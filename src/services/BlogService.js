/* eslint-disable prettier/prettier */
import { createAsyncThunk } from '@reduxjs/toolkit'

const _apiBase = 'https://blog.kata.academy/api/'

export const fetchAllArticles = createAsyncThunk('articles/fetchAllArticles', async (data) => {
  return await fetch(`${_apiBase}articles?limit=5&offset=${(data.pageOfArticles - 1) * 5}`, {
    headers: data.token
      ? {
        Authorization: `Bearer ${data.token}`,
      } : {},
  }).then((res) => {
    return res.json()
  })
})

export const fetchSingleArticle = createAsyncThunk('articles/fetchSingleArticle', async (data) => {
  return await fetch(`${_apiBase}articles/${data.slug}`, {
    headers: data.token
      ? {
        Authorization: `Bearer ${data.token}`,
      } : {},
  }).then((res) => {
    return res.json()
  })
})

export const fetchSignUp = createAsyncThunk('authorisation/fetchSignUp', async (body) => {
  return await fetch(`${_apiBase}users`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body,
  }).then((res) => {
    return res.json()
  })
})

export const fetchSignIn = createAsyncThunk('authorisation/fetchSifetchSignInngIn', async (body) => {
  return await fetch(`${_apiBase}users/login`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body,
  }).then((res) => {
    return res.json()
  })
})

export const fetchProfile = createAsyncThunk('authorisation/fetchProfile', async (username) => {
  return await fetch(`${_apiBase}profiles/${username}`).then((res) => {
    return res.json()
  })
})

export const fetchEditProfile = createAsyncThunk('authorisation/fetchEditProfile', async (data) => {
  return await fetch(`${_apiBase}user`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${data.token}`,
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data.body),
  }).then((res) => {
    return res.json()
  })
})

export const fetchCreateArticle = createAsyncThunk('articles/fetchCreateArticle', async (data) => {
  return await fetch(`${_apiBase}articles`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${data.token}`,
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data.body),
  }).then((res) => {
    return res.json()
  })
})

export const fetchEditArticle = createAsyncThunk('articles/fetchEditArticle', async (data) => {
  return await fetch(`${_apiBase}articles/${data.slug}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${data.token}`,
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data.body),
  }).then((res) => {
    return res.json()
  })
})

export const fetchDeleteArticle = createAsyncThunk('articles/fetchDeleteArticle', async (data) => {
  return await fetch(`${_apiBase}articles/${data.slug}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${data.token}`,
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    return res.json()
  })
})

export const fetchChangeFavorite = createAsyncThunk('articles/fetchChangeFavorite', async (data) => {
  return await fetch(`${_apiBase}articles/${data.slug}/favorite`, {
    method: data.method,
    headers: {
      Authorization: `Bearer ${data.token}`,
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    return res.json()
  })
})
