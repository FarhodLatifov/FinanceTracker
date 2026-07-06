import type { ReactNode } from "react"

interface Props {
    children: ReactNode;
    className?: string;
}

const Wrapper = ({children, className = ""}: Props) => {
  return (
    <div className={`w-full ${className}`}>{children}</div>
  )
}

export default Wrapper