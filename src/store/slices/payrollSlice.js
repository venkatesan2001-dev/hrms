import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  byUser: {},
  loading: false,
  error: null
}

const payrollSlice = createSlice({
  name: 'payroll',
  initialState,
  reducers: {
    fetchAllocations: (state, { payload }) => { state.loading = true; state.error = null },
    fetchAllocationsSuccess: (state, { payload }) => {
      const { userId, allocations } = payload
      state.loading = false
      state.byUser[userId] = allocations
    },
    fetchAllocationsFailure: (state, { payload }) => { state.loading = false; state.error = payload },

    createAllocation: (state) => { state.loading = true },
    createAllocationSuccess: (state, { payload }) => {
      const { user, allocation } = payload
      state.loading = false
      if (!state.byUser[user]) state.byUser[user] = []
      state.byUser[user].unshift(allocation)
    },
    createAllocationFailure: (state, { payload }) => { state.loading = false; state.error = payload }
  }
})

export const {
  fetchAllocations, fetchAllocationsSuccess, fetchAllocationsFailure,
  createAllocation, createAllocationSuccess, createAllocationFailure
} = payrollSlice.actions

export default payrollSlice.reducer


