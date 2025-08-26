import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProbations, createProbation } from '../store/slices/probationSlice'
import Button from '../components/Button'
import Input from '../components/Input'
import Table from '../components/Table'

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
          <Input type="date" label="Start Date" name="startDate" value={startDate} onChange={e => setStartDate(e.target.value)} />
          <Input type="number" label="Duration (days)" name="durationDays" value={durationDays} onChange={e => setDurationDays(Number(e.target.value))} />
          <Button disabled={loading}>Create Probation</Button>
        </form>
      </div>
      <div className="card">
        <h3>Probation Records</h3>
        <Table
          enableColumnPicker
          enableResize
          statusKey="status"
          columns={[
            { header: 'User', accessor: 'userId' },
            { header: 'Start', key: 'start', render: (p) => new Date(p.startDate).toLocaleDateString() },
            { header: 'End', key: 'end', render: (p) => new Date(p.endDate).toLocaleDateString() },
            { header: 'Status', accessor: 'status', status: true },
          ]}
          data={items}
          emptyText={loading ? 'Loading...' : 'No records'}
        />
      </div>
    </div>
  )
}


