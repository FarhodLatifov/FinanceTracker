import { useState } from "react"
import { Wrapper, Navbar, ShowBudget, Button, Modal } from "./imports"


const App = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  function handleModalClose() {
    setIsModalOpen(false)
  }

  function handleModalOpen() {
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Wrapper className="max-w-4xl mx-auto px-4 py-8">
        <Navbar />

        {/* Main Dashboard Section */}
        <main className="mt-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-8">
            <h3 className="text-gray-500 font-medium uppercase tracking-wider text-sm">
              Текущий Баланс
            </h3>
            <p className="text-4xl font-bold text-gray-900 mt-2">
              10,000 TJS
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <ShowBudget type="income" cash={4000} />
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <ShowBudget type="expense" cash={200} />
            </div>
          </div>
          <Button onClick={handleModalOpen} />
          {isModalOpen && <Modal onClose={handleModalClose} />}
        </main>
      </Wrapper>
    </div>
  )
}

export default App