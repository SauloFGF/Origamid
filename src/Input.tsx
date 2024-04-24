import React from 'react'

type InputProps = React.ComponentProps<'input'> &{
    label: string;
}

const Input = ({label, id, ...props} : InputProps) => {
  return (
    <div style={{ marginBottom: '1rem'}}>
        <label htmlFor={label}>{label}</label>
        <input id={id} name={id} type="text" {...props} />
    </div>
  )
}

export default Input