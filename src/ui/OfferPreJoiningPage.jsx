import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCandidates } from '../store/slices/candidatesSlice'
import { fetchOffers, createOffer, sendOfferEmail } from '../store/slices/offersSlice'
import Button from '../components/Button'

export default function OfferPreJoiningPage() {
  const dispatch = useDispatch()
  const { items: candidates = [] } = useSelector(s => s.candidates || {})
  const [form, setForm] = useState({ candidateId: '', candidateName: '', candidateEmail: '', position: '', joiningDate: '', annualCTC: 0 })

  useEffect(() => { dispatch(fetchCandidates({ page: 1, limit: 50 })); dispatch(fetchOffers({ page: 1, limit: 20 })) }, [dispatch])

  const selectCandidate = (id) => {
    const c = candidates.find(x => x._id === id)
    if (!c) return
    setForm(f => ({ ...f, candidateId: c._id, candidateName: c.name, candidateEmail: c.email, position: c.position }))
  }

  const createOffer = (e) => {
    e.preventDefault()
    dispatch(createOffer(form))
  }

  const sendOffer = (offerId) => {
    dispatch(sendOfferEmail(offerId))
  }

  return (
    <div>
      <div className="card">
        <h3>Offer & Pre-Joining</h3>
        <form onSubmit={createOffer} className="row" style={{ flexWrap: 'wrap', gap: 12 }}>
          <select value={form.candidateId} onChange={e => { setForm({ ...form, candidateId: e.target.value }); selectCandidate(e.target.value) }}>
            <option value="">Select shortlisted candidate</option>
            {candidates.filter(c => c.status === 'SHORTLISTED' || c.status === 'HR_PASS' || c.status === 'TECH_PASS').map(c => (
              <option key={c._id} value={c._id}>{c.name} - {c.position}</option>
            ))}
          </select>
          <input placeholder="Position" value={form.position} onChange={e => setForm({ ...form, position: e.target.value })} />
          <input type="date" value={form.joiningDate} onChange={e => setForm({ ...form, joiningDate: e.target.value })} />
          <input type="number" placeholder="Annual CTC" value={form.annualCTC} onChange={e => setForm({ ...form, annualCTC: Number(e.target.value) })} />
          <button>Create Offer</button>
        </form>
      </div>
      <OffersList onSend={sendOffer} />
    </div>
  )
}

function OffersList({ onSend }) {
  const dispatch = useDispatch()
  const { items = [], loading } = useSelector(s => s.offers || {})
  useEffect(() => { dispatch(fetchOffers({ page: 1, limit: 20 })) }, [dispatch])
  return (
    <div className="card">
      <h3>Offers</h3>
      <div className="enhanced-table">
        <table>
          <thead>
            <tr>
              <th>Candidate</th>
              <th>Position</th>
              <th>CTC</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr><td colSpan={5} style={{ textAlign: 'center', padding: 20, color: '#64748b' }}>{loading ? 'Loading...' : 'No offers'}</td></tr>
            )}
            {items.map(o => (
              <tr key={o._id}>
                <td>{o.candidateName}</td>
                <td>{o.position}</td>
                <td>₹{(o.annualCTC || 0).toLocaleString('en-IN')}</td>
                <td>{o.status}</td>
                <td style={{ textAlign: 'right' }}>
                  <Button onClick={() => onSend(o._id)} disabled={o.status === 'SENT'}>
                    {o.status === 'SENT' ? 'Sent' : 'Send' }
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}


