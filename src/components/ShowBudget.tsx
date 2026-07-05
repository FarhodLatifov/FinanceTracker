const ShowBudget = ({ type, cash }: { type: 'income' | 'expense', cash: number }) => {
  const isIncome = type === 'income';

  return (
    <div className="flex flex-col gap-1">
      <p className="text-gray-500 font-medium text-sm">
        {isIncome ? "Общий доход" : "Общие расходы"}
      </p>
      
      <div className={`text-2xl font-bold ${isIncome ? "text-emerald-600" : "text-rose-600"}`}>
        {isIncome ? "+" : "-"}
        {cash.toLocaleString()} TJS
      </div>
    </div>
  );
};

export default ShowBudget;