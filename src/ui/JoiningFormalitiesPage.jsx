import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createOnboarding } from '../store/slices/onboardingSlice'
import Button from '../components/Button'

export default function JoiningFormalitiesPage() {
  const [docFiles, setDocFiles] = useState([])
  const [checklist, setChecklist] = useState([
    { key: 'aadhar', label: 'Aadhar Card', completed: false },
    { key: 'pan', label: 'PAN Card', completed: false },
    { key: 'bank', label: 'Bank Details', completed: false },
  ])

  const dispatch = useDispatch()
  const { loading } = useSelector(s => s.onboarding || {})

  const submit = (e) => {
    e.preventDefault()
    dispatch(createOnboarding({ documents: docFiles, checklist }))
  }

  return (
    <div>
      <div className="card">
        <h3>Joining Formalities</h3>
        <form onSubmit={submit} className="row" style={{ flexWrap: 'wrap', gap: 12 }}>
          <input type="file" multiple onChange={e => setDocFiles(Array.from(e.target.files || []))} />
          <div style={{ width: '100%' }}>
            {checklist.map((item, idx) => (
              <label key={item.key} style={{ display: 'inline-flex', gap: 8, marginRight: 16 }}>
                <input type="checkbox" checked={item.completed} onChange={e => {
                  const next = [...checklist]; next[idx] = { ...item, completed: e.target.checked }; setChecklist(next)
                }} />{item.label}
              </label>
            ))}
          </div>
          <Button disabled={loading}>Save Onboarding</Button>
        </form>
      </div>
      <div className="card">
        <h3>ID Card Request</h3>
        {/* Form to request ID card and auto-email marketing */}
      </div>
    </div>
  )
}


