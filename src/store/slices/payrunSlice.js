import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  list: [],
  loading: false,
  error: null
}

const payrunSlice = createSlice({
  name: 'payrun',
  initialState,
  reducers: {
    fetchPayruns: (state) => { state.loading = true; state.error = null },
    fetchPayrunsSuccess: (state, { payload }) => { state.loading = false; state.list = payload },
    fetchPayrunsFailure: (state, { payload }) => { state.loading = false; state.error = payload },

    generatePayrun: (state) => { state.loading = true },
    generatePayrunSuccess: (state, { payload }) => { state.loading = false; state.list.unshift(payload) },
    generatePayrunFailure: (state, { payload }) => { state.loading = false; state.error = payload },

    processPayrun: (state) => { state.loading = true },
    processPayrunSuccess: (state, { payload }) => {
      state.loading = false
      const idx = state.list.findIndex(p => p._id === payload._id)
      if (idx >= 0) state.list[idx] = payload
    },
    processPayrunFailure: (state, { payload }) => { state.loading = false; state.error = payload }
  }
})

export const {
  fetchPayruns, fetchPayrunsSuccess, fetchPayrunsFailure,
  generatePayrun, generatePayrunSuccess, generatePayrunFailure,
  processPayrun, processPayrunSuccess, processPayrunFailure
} = payrunSlice.actions

export default payrunSlice.reducer


