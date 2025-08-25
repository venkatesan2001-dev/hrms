import { createSlice } from '@reduxjs/toolkit'

const initialState = { items: [], pagination: null, loading: false, error: null }

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    fetchOffers: (s) => { s.loading = true; s.error = null },
    fetchOffersSuccess: (s, { payload }) => { s.loading = false; s.items = payload?.data || []; s.pagination = payload?.pagination || null },
    fetchOffersFailure: (s, { payload }) => { s.loading = false; s.error = payload },

    createOffer: (s) => { s.loading = true },
    createOfferSuccess: (s, { payload }) => { s.loading = false; if (payload) s.items.unshift(payload) },
    createOfferFailure: (s, { payload }) => { s.loading = false; s.error = payload },

    sendOfferEmail: (s) => { s.loading = true },
    sendOfferEmailSuccess: (s, { payload }) => { s.loading = false; const i = s.items.findIndex(x => x._id === payload._id); if (i !== -1) s.items[i] = payload },
    sendOfferEmailFailure: (s, { payload }) => { s.loading = false; s.error = payload },
  }
})

export const { fetchOffers, fetchOffersSuccess, fetchOffersFailure, createOffer, createOfferSuccess, createOfferFailure, sendOfferEmail, sendOfferEmailSuccess, sendOfferEmailFailure } = offersSlice.actions

export default offersSlice.reducer


