import { createSlice } from '@reduxjs/toolkit'

const initialState = { records: [], idcardRequests: [], loading: false, error: null, pagination: null }

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    fetchOnboardings: (s) => { s.loading = true; s.error = null },
    fetchOnboardingsSuccess: (s, { payload }) => { s.loading = false; s.records = payload?.data || []; s.pagination = payload?.pagination || null },
    fetchOnboardingsFailure: (s, { payload }) => { s.loading = false; s.error = payload },

    createOnboarding: (s) => { s.loading = true },
    createOnboardingSuccess: (s, { payload }) => { s.loading = false; if (payload) s.records.unshift(payload) },
    createOnboardingFailure: (s, { payload }) => { s.loading = false; s.error = payload },

    updateOnboarding: (s) => { s.loading = true },
    updateOnboardingSuccess: (s, { payload }) => { s.loading = false; const i = s.records.findIndex(r => r._id === payload._id); if (i !== -1) s.records[i] = payload },
    updateOnboardingFailure: (s, { payload }) => { s.loading = false; s.error = payload },

    createIdCardRequest: (s) => { s.loading = true },
    createIdCardRequestSuccess: (s, { payload }) => { s.loading = false; if (payload) s.idcardRequests.unshift(payload) },
    createIdCardRequestFailure: (s, { payload }) => { s.loading = false; s.error = payload },
  }
})

export const {
  fetchOnboardings, fetchOnboardingsSuccess, fetchOnboardingsFailure,
  createOnboarding, createOnboardingSuccess, createOnboardingFailure,
  updateOnboarding, updateOnboardingSuccess, updateOnboardingFailure,
  createIdCardRequest, createIdCardRequestSuccess, createIdCardRequestFailure
} = onboardingSlice.actions

export default onboardingSlice.reducer


