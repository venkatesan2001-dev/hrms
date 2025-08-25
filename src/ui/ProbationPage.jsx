import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProbations, createProbation } from '../store/slices/probationSlice'
import Button from '../components/Button'

export default function ProbationPage() {
  const [startDate, setStartDate] = useState('')
  const [durationDays, setDurationDays] = useState(90)
  const [objectives, setObjectives] = useState([{ title: 'Learn systems', description: 'Get onboarded', weight: 30 }])

  const dispatch = useDispatch()
  const { items = [], loading } = useSelector(s => s.probation || {})
  useEffect(() => { dispatch(fetchProbations({ page: 1, limit: 20 })) }, [dispatch])

  const create = (e) => {
    e.preventDefault()
    const userId = prompt('Enter userId for probation')
    if (!userId) return
    dispatch(createProbation({ userId, startDate, objectives, durationDays }))
  }

  return (
    <div>
      <div className="card">
        <h3>Probation & Confirmation</h3>
        <form onSubmit={create} className="row" style={{ flexWrap: 'wrap', gap: 12 }}>
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
          <input type="number" value={durationDays} onChange={e => setDurationDays(Number(e.target.value))} />
          <Button disabled={loading}>Create Probation</Button>
        </form>
      </div>
      <div className="card">
        <h3>Probation Records</h3>
        <div className="enhanced-table">
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Start</th>
                <th>End</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (<tr><td colSpan={4} style={{ textAlign: 'center', padding: 20, color: '#64748b' }}>{loading ? 'Loading...' : 'No records'}</td></tr>)}
              {items.map(p => (
                <tr key={p._id}>
                  <td>{p.userId}</td>
                  <td>{new Date(p.startDate).toLocaleDateString()}</td>
                  <td>{new Date(p.endDate).toLocaleDateString()}</td>
                  <td>{p.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}


