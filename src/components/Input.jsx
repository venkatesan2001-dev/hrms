import React from 'react'

export default function Input({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  as = 'input',
  rows,
  children,
  ...rest
}) {
  const Field = as === 'textarea' ? 'textarea' : as === 'select' ? 'select' : 'input'
  return (
    <div className="form-group">
      {label && <label htmlFor={name}>{label}</label>}
      <Field
        id={name}
        name={name}
        type={Field === 'input' ? type : undefined}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        rows={Field === 'textarea' ? rows : undefined}
        {...rest}
      >
        {Field === 'select' ? children : null}
      </Field>
      {error && <div className="login-error">{error}</div>}
    </div>
  )
}


