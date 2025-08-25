import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  pagination: null,
  loading: false,
  error: null
}

const candidatesSlice = createSlice({
  name: 'candidates',
  initialState,
  reducers: {
    fetchCandidates: (state) => { state.loading = true; state.error = null },
    fetchCandidatesSuccess: (state, { payload }) => {
      state.loading = false;
      state.items = payload?.data || []
      state.pagination = payload?.pagination || null
    },
    fetchCandidatesFailure: (state, { payload }) => { state.loading = false; state.error = payload },

    uploadCandidate: (state) => { state.loading = true },
    uploadCandidateSuccess: (state, { payload }) => {
      state.loading = false;
      if (payload) state.items.unshift(payload)
    },
    uploadCandidateFailure: (state, { payload }) => { state.loading = false; state.error = payload },

    updateCandidateStatus: (state) => { state.loading = true },
    updateCandidateStatusSuccess: (state, { payload }) => {
      state.loading = false;
      const idx = state.items.findIndex(c => c._id === payload._id)
      if (idx !== -1) state.items[idx] = payload
    },
    updateCandidateStatusFailure: (state, { payload }) => { state.loading = false; state.error = payload },
  }
})

export const {
  fetchCandidates, fetchCandidatesSuccess, fetchCandidatesFailure,
  uploadCandidate, uploadCandidateSuccess, uploadCandidateFailure,
  updateCandidateStatus, updateCandidateStatusSuccess, updateCandidateStatusFailure
} = candidatesSlice.actions

export default candidatesSlice.reducer


