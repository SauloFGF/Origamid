import React from 'react'

type CheckboxProps = {
    label: string;
}

const Checkbox = ({label} : CheckboxProps) => {
    const [value, setValue] = React.useState(false);
  return (
    <label style={{padding: "1rem", border: value ? "2px solid #8D2" : "2px solid #F70"}} >
    <input type='checkbox' checked={value}
        onChange={({ currentTarget }) => setValue(currentTarget.checked)}/>
        {label}
    </label>
  )
}

export default Checkbox