export default function Button({ variant = 'primary', children, className = '', icon, ...props }) {
  const base = variant === 'secondary' ? 'btn-secondary' : 'btn-primary'
  return (
    <button className={`${base} ${className}`.trim()} {...props}>
      {icon && <span className="button-icon">{icon}</span>}
      {children}
    </button>
  )
}


