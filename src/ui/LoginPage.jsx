import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { login } from '../store/slices/authSlice'

export default function LoginPage() {
  const dispatch = useDispatch()
  const { loading, error } = useSelector(s => s.auth)

  const formik = useFormik({
    initialValues: { email: '', password: '', remember: false },
    validate: (values) => {
      const errors = {}
      if (!values.email) errors.email = 'Email is required'
      if (!values.password) errors.password = 'Password is required'
      return errors
    },
    onSubmit: (values) => {
      dispatch(login({ email: values.email, password: values.password }))
      if (values.remember) {
        try { localStorage.setItem('remember_email', values.email) } catch {}
      }
    }
  })

  return (
    <div className="login-container">
      <div className="login-card">
        <h3 className="login-title">Welcome back</h3>
        <form onSubmit={formik.handleSubmit} className="login-form">
          <input
            className="login-input"
            type="email"
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="login-error">{formik.errors.email}</div>
          )}

          <input
            className="login-input"
            type="password"
            name="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="login-error">{formik.errors.password}</div>
          )}

          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#065f46' }}>
            <input type="checkbox" name="remember" checked={formik.values.remember} onChange={formik.handleChange} />
            Remember me
          </label>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <a href="#" className="login-forgot">Forgot password?</a>
          </div>

          {error && <div className="login-error">{error}</div>}
          <button className="btn-primary login-submit" disabled={loading}>{loading ? 'Signing in...' : 'Sign in'}</button>
        </form>
      </div>
    </div>
  )
}


