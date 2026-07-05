import type { ReactNode } from "react"

interface Props {
    children: ReactNode;
    className: string;
}

const Wrapper = ({children, className}: Props) => {
  return (
    <div className={`max-w-300 ${className}`}>{children}</div>
  )
}

export default Wrapper