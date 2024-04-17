import React from 'react'

type ButtonProps = React.ComponentProps<"button"> & {
    tamanho?: string;
    total: number;
    setTotal: React.Dispatch<React.SetStateAction<number>>;
}

const Button = ({ tamanho, total, setTotal, ...props}: ButtonProps) => {
  return (
    <button  style={{fontSize: tamanho }} {...props} onClick={() => setTotal((t) => t +1)}>
        Incrementar {total}
    </button>
  )
}

export default Button