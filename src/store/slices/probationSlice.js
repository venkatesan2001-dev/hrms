import { createSlice } from '@reduxjs/toolkit'

const initialState = { items: [], loading: false, error: null, pagination: null }

const probationSlice = createSlice({
  name: 'probation',
  initialState,
  reducers: {
    fetchProbations: (s) => { s.loading = true; s.error = null },
    fetchProbationsSuccess: (s, { payload }) => { s.loading = false; s.items = payload?.data || []; s.pagination = payload?.pagination || null },
    fetchProbationsFailure: (s, { payload }) => { s.loading = false; s.error = payload },

    createProbation: (s) => { s.loading = true },
    createProbationSuccess: (s, { payload }) => { s.loading = false; if (payload) s.items.unshift(payload) },
    createProbationFailure: (s, { payload }) => { s.loading = false; s.error = payload },

    updateProbation: (s) => { s.loading = true },
    updateProbationSuccess: (s, { payload }) => { s.loading = false; const i = s.items.findIndex(x => x._id === payload._id); if (i !== -1) s.items[i] = payload },
    updateProbationFailure: (s, { payload }) => { s.loading = false; s.error = payload },
  }
})

export const { fetchProbations, fetchProbationsSuccess, fetchProbationsFailure, createProbation, createProbationSuccess, createProbationFailure, updateProbation, updateProbationSuccess, updateProbationFailure } = probationSlice.actions

export default probationSlice.reducer


