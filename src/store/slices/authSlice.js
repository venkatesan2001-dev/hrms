import { createSlice } from '@reduxjs/toolkit'

const tokenKey = 'auth_token'
const userKey = 'auth_user'

const initialState = {
  token: localStorage.getItem(tokenKey) || null,
  user: JSON.parse(localStorage.getItem(userKey) || 'null'),
  loading: false,
  error: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (s) => { s.loading = true; s.error = null },
    loginSuccess: (s, { payload }) => {
      s.loading = false
      s.token = payload?.token || null
      s.user = payload?.user || null
      if (s.token) localStorage.setItem(tokenKey, s.token)
      if (s.user) localStorage.setItem(userKey, JSON.stringify(s.user))
    },
    loginFailure: (s, { payload }) => { s.loading = false; s.error = payload },
    logout: (s) => {
      s.token = null; s.user = null; s.error = null
      localStorage.removeItem(tokenKey); localStorage.removeItem(userKey)
    }
  }
})

export const { login, loginSuccess, loginFailure, logout } = authSlice.actions
export default authSlice.reducer


