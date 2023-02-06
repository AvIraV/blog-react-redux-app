import { createSlice } from '@reduxjs/toolkit'

import {
  fetchAllArticles,
  fetchSingleArticle,
  fetchCreateArticle,
  fetchEditArticle,
  fetchDeleteArticle,
  fetchChangeFavorite,
} from '../services/BlogService'

const initialState = {
  articlesLoadingStatus: '',
  articlesList: [],
  singleArticle: {},
  articlesCount: 0,
  pageOfArticles: 1,
  isEdited: false,
  isDeleted: false,
  isCreated: false,
  serverErrors: {},
  focusFavoriteArticle: 5,
}

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    getNextPageArticles: (state, action) => {
      state.pageOfArticles = action.payload
    },
    updateArticle: (state, action) => {
      state.slug = action.payload
    },
    onArticleLoaded: (state, action) => {
      state.singleArticle = action.payload
    },
    onFocusFavoriteArticle: (state, action) => {
      state.focusFavoriteArticle = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllArticles.pending, (state) => {
        state.articlesLoadingStatus = 'fetching'
        state.isCreated = false
      })
      .addCase(fetchAllArticles.fulfilled, (state, action) => {
        state.articlesLoadingStatus = 'fetched'
        state.articlesList = action.payload.articles
        state.articlesCount = action.payload.articlesCount
      })
      .addCase(fetchAllArticles.rejected, (state, action) => {
        state.articlesLoadingStatus = 'error'
        console.log(action)
      })
      .addCase(fetchSingleArticle.pending, (state) => {
        state.articlesLoadingStatus = 'fetching'
        state.isEdited = false
        state.isDeleted = false
      })
      .addCase(fetchSingleArticle.fulfilled, (state, action) => {
        state.articlesLoadingStatus = 'fetched'
        state.singleArticle = action.payload.article
      })
      .addCase(fetchSingleArticle.rejected, (state) => {
        state.articlesLoadingStatus = 'error'
      })
      .addCase(fetchCreateArticle.fulfilled, (state, action) => {
        state.articlesLoadingStatus = 'fetched'
        state.singleArticle = action.payload.article
        state.isCreated = true
      })
      .addCase(fetchEditArticle.fulfilled, (state, action) => {
        state.articlesLoadingStatus = 'fetched'
        state.singleArticle = action.payload.article
        action.payload.article ? (state.isEdited = true) : false
      })
      .addCase(fetchDeleteArticle.fulfilled, (state) => {
        state.articlesLoadingStatus = 'fetched'
        state.isDeleted = true
      })
      .addCase(fetchDeleteArticle.rejected, (state) => {
        state.isDeleted = true
      })
      .addCase(fetchChangeFavorite.fulfilled, (state, action) => {
        state.focusFavoriteArticle === 5
          ? (state.singleArticle = action.payload.article)
          : (state.articlesList[state.focusFavoriteArticle] = action.payload.article)
      })
      .addDefaultCase(() => {})
  },
})

const { actions, reducer } = articlesSlice
export default reducer
export const { getNextPageArticles, updateArticle, onArticleLoaded, onFocusFavoriteArticle } = actions
