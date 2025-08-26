import { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCandidates } from '../store/slices/candidatesSlice'
import { fetchOffers, createOffer, sendOfferEmail } from '../store/slices/offersSlice'
import Button from '../components/Button'
import Input from '../components/Input'
import Dropdown from '../components/Dropdown'
import Table from '../components/Table'

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
          <Dropdown
            label="Shortlisted Candidate"
            name="candidateId"
            value={form.candidateId}
            onChange={(e) => { setForm({ ...form, candidateId: e.target.value }); selectCandidate(e.target.value) }}
            data={candidates.filter(c => c.status === 'SHORTLISTED' || c.status === 'HR_PASS' || c.status === 'TECH_PASS').map(c => ({ label: `${c.name} - ${c.position}`, value: c._id }))}
            displayName="label"
            displayValue="value"
            searchFields={["label"]}
            placeholder="Select shortlisted candidate"
          />
          <Input label="Position" name="position" value={form.position} onChange={e => setForm({ ...form, position: e.target.value })} />
          <Input type="date" label="Joining Date" name="joiningDate" value={form.joiningDate} onChange={e => setForm({ ...form, joiningDate: e.target.value })} />
          <Input type="number" label="Annual CTC" name="annualCTC" placeholder="Annual CTC" value={form.annualCTC} onChange={e => setForm({ ...form, annualCTC: Number(e.target.value) })} />
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
      <Table
        enableColumnPicker
        enableResize
        statusKey="status"
        columns={[
          { header: 'Candidate', accessor: 'candidateName' },
          { header: 'Position', accessor: 'position' },
          { header: 'CTC', key: 'ctc', render: (o) => `₹${(o.annualCTC || 0).toLocaleString('en-IN')}` },
          { header: 'Status', accessor: 'status', status: true },
          { header: '', key: 'actions', render: (o) => (
            <div style={{ textAlign: 'right' }}>
              <Button onClick={() => onSend(o._id)} disabled={o.status === 'SENT'}>
                {o.status === 'SENT' ? 'Sent' : 'Send'}
              </Button>
            </div>
          )},
        ]}
        data={items}
        emptyText={loading ? 'Loading...' : 'No offers'}
      />
    </div>
  )
}


