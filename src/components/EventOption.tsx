interface Props {
    title: string;
    isSelected?: boolean;
    className?: string; // Сделали необязательным
}

const EventOption = ({ title, isSelected = false, className = "" }: Props) => {
    // Базовые стили вынесены для читаемости
    const baseStyles = "shadow-sm rounded-2xl h-20 w-full text-[14px] cursor-pointer transition-all duration-200 flex justify-center items-center border font-medium";
    const stateStyles = isSelected
        ? "bg-indigo-600 text-white border-indigo-600 shadow-indigo-100 shadow-md"
        : "bg-white text-slate-700 border-slate-100 hover:bg-slate-50 hover:text-slate-900 active:bg-slate-100";

    return (
        // Используем шаблонную строку для объединения
        <div className={`${baseStyles} ${stateStyles} ${className}`}>
            {title}
        </div>
    );
};

export default EventOption;