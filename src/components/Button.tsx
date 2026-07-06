const Button = ({onClick}: {onClick: () => void}) => {
  return (
    <button className="flex py-3 w-full shadow justify-center rounded-2xl bg-white mt-7 hover:mt-6 transition-all duration-100 hover:shadow-md" onClick={onClick}>+ Добавить Операцию</button>
  )
}

export default Button