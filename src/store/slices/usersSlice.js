import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  pagination: null,
  loading: false,
  error: null
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    fetchUsers: (state) => { state.loading = true; state.error = null },
    fetchUsersSuccess: (state, { payload }) => {
      state.loading = false;
      state.items = payload?.data || []
      state.pagination = payload?.pagination || null
    },
    fetchUsersFailure: (state, { payload }) => { state.loading = false; state.error = payload },

    createUser: (state) => { state.loading = true },
    createUserSuccess: (state, { payload }) => {
      state.loading = false;
      if (payload) {
        state.items.unshift(payload)
        if (state.pagination) state.pagination.totalDocs = (state.pagination.totalDocs || 0) + 1
      }
    },
    createUserFailure: (state, { payload }) => { state.loading = false; state.error = payload },

    deleteUser: (state) => { state.loading = true },
    deleteUserSuccess: (state, { payload }) => {
      state.loading = false;
      state.items = state.items.filter(u => u._id !== payload)
      if (state.pagination && state.pagination.totalDocs > 0) state.pagination.totalDocs -= 1
    },
    deleteUserFailure: (state, { payload }) => { state.loading = false; state.error = payload }
  }
})

export const {
  fetchUsers, fetchUsersSuccess, fetchUsersFailure,
  createUser, createUserSuccess, createUserFailure,
  deleteUser, deleteUserSuccess, deleteUserFailure
} = usersSlice.actions

export default usersSlice.reducer


