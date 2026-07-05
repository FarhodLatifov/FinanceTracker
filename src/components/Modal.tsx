import { useEffect, useRef, useState } from "react"

const Modal = ({ onClose }: { onClose: () => void }) => {

    const [category, setCategory] = useState<string>("income")
    const modalRef = useRef<HTMLDivElement>(null)



    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Если клик был вне элемента, к которому привязан modalRef, вызываем onClose
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose()
            }
        }

        // Слушаем клики по всему документу
        document.addEventListener("mousedown", handleClickOutside)

        // Очищаем слушатель при размонтировании компонента
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [onClose])

    return (
        // Задний фон (Оверлей) с размытием
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 font-sans">

            {/* Контейнер модального окна */}
            <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-2xl transition-all border border-slate-100" ref={modalRef}>

                {/* Заголовок */}
                <h3 className="text-xl font-semibold leading-6 text-slate-900 mb-5">
                    Новая транзакция
                </h3>

                {/* Форма */}
                <div className="space-y-4">
                    {/* Поле: Название */}
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="title" className="text-sm font-medium text-slate-600">
                            Название
                        </label>
                        <input
                            type="text"
                            id="title"
                            placeholder="Например: Продукты, Зарплата..."
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                        />
                    </div>

                    {/* Поле: Категория */}
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="category" className="text-sm font-medium text-slate-600">
                            Тип операции
                        </label>
                        <div className="relative">
                            <select
                                id="category"
                                name="category"
                                onChange={e => setCategory(e.currentTarget.value)}
                                defaultValue={category}
                                className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition-all cursor-pointer focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                            >
                                <option value="income">💰 Доход</option>
                                <option value="expense">📉 Расход</option>
                            </select>
                            {/* Кастомная стрелочка для select */}
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                                <svg className="fill-current h-4 w-4" xmlns="http://w3.org" viewBox="0 0 20 20">
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Кнопки управления */}
                <div className="mt-6 flex justify-end gap-3">
                    <button
                        type="button"
                        className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900 active:bg-slate-100"
                        onClick={onClose}
                    >
                        Отмена
                    </button>
                    <button
                        type="button"
                        className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 active:bg-blue-800 shadow-lg shadow-blue-500/20"
                    >
                        Добавить
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Modal
