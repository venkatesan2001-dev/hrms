import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  list: [],
  loading: false,
  error: null
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    fetchUsers: (state) => { state.loading = true; state.error = null },
    fetchUsersSuccess: (state, { payload }) => { state.loading = false; state.list = payload },
    fetchUsersFailure: (state, { payload }) => { state.loading = false; state.error = payload },

    createUser: (state) => { state.loading = true },
    createUserSuccess: (state, { payload }) => { state.loading = false; state.list.unshift(payload) },
    createUserFailure: (state, { payload }) => { state.loading = false; state.error = payload },

    deleteUser: (state) => { state.loading = true },
    deleteUserSuccess: (state, { payload }) => {
      state.loading = false;
      state.list = state.list.filter(u => u._id !== payload)
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


