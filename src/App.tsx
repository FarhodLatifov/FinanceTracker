import { useState, useCallback } from "react"
import { Wrapper, Navbar, ShowBudget, Button, Modal } from "./imports"
import { useAppStore } from "./store/AppStore"
import { CATEGORIES } from "./constants/categories"

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const { transactions, deleteTransaction } = useAppStore();

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  const handleModalOpen = useCallback(() => {
    setIsModalOpen(true)
  }, [])

  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <div className="min-h-screen bg-slate-50/50 pb-12 font-sans">
      <Navbar />

      <Wrapper className="max-w-3xl mx-auto px-4 py-8">
        <main className="space-y-6">
          {/* Main Balance Section */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl shadow-xl shadow-slate-900/10 text-white relative overflow-hidden">
            <div className="absolute right-0 top-0 -mt-6 -mr-6 w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none" />
            <div className="absolute left-1/3 bottom-0 -mb-6 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl pointer-events-none" />
            
            <h3 className="text-slate-400 font-medium uppercase tracking-wider text-xs">
              Текущий Баланс
            </h3>
            <p className="text-4xl font-extrabold mt-2 tracking-tight">
              {balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} TJS
            </p>
          </div>

          {/* Income & Expense Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <ShowBudget type="income" cash={totalIncome} />
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <ShowBudget type="expense" cash={totalExpense} />
            </div>
          </div>

          <Button onClick={handleModalOpen} />

          {/* Operations History */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-800">История операций</h3>
              <span className="text-sm text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full font-medium">
                Всего: {transactions.length}
              </span>
            </div>

            {transactions.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200 p-6">
                <p className="text-slate-400 font-medium">История операций пуста</p>
                <p className="text-slate-300 text-sm mt-1">Добавьте первую операцию, чтобы начать отслеживание</p>
              </div>
            ) : (
              <div className="space-y-3">
                {[...transactions].reverse().map(t => {
                  const isIncome = t.type === "income";
                  return (
                    <div key={t.id} className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                      <div className="flex flex-col gap-1.5 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-800 truncate">{t.title}</span>
                          <span className="text-[11px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100 whitespace-nowrap">
                            {t.date}
                          </span>
                        </div>
                        {/* Категории */}
                        <div className="flex flex-wrap gap-1">
                          {t.operations.map(opId => {
                            const cat = CATEGORIES.find(c => c.id === opId);
                            if (!cat) return null;
                            return (
                              <span 
                                key={opId} 
                                className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                                  isIncome 
                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                                    : "bg-rose-50 text-rose-700 border border-rose-100"
                                }`}
                              >
                                {cat.title}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 ml-4">
                        <span className={`text-lg font-bold whitespace-nowrap ${isIncome ? "text-emerald-600" : "text-rose-600"}`}>
                          {isIncome ? "+" : "-"}
                          {t.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} TJS
                        </span>
                        
                        <button
                          onClick={() => deleteTransaction(t.id)}
                          className="p-2 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Удалить операцию"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </main>
      </Wrapper>

      {isModalOpen && <Modal onClose={handleModalClose} />}
    </div>
  )
}

export default App