import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  pagination: null,
  loading: false,
  error: null
}

const rolesSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    fetchRoles: (state) => { state.loading = true; state.error = null },
    fetchRolesSuccess: (state, { payload }) => {
      state.loading = false;
      state.items = payload?.data || []
      state.pagination = payload?.pagination || null
    },
    fetchRolesFailure: (state, { payload }) => { state.loading = false; state.error = payload },

    createRole: (state) => { state.loading = true },
    createRoleSuccess: (state, { payload }) => { state.loading = false; state.items.unshift(payload) },
    createRoleFailure: (state, { payload }) => { state.loading = false; state.error = payload },
  }
})

export const { fetchRoles, fetchRolesSuccess, fetchRolesFailure, createRole, createRoleSuccess, createRoleFailure } = rolesSlice.actions
export default rolesSlice.reducer
