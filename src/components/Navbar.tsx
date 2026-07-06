import { Wrapper } from "../imports"

const Navbar = () => {
    return (
        <nav className="w-full border-b border-gray-100">
            <Wrapper className="flex justify-between items-center py-4 px-4 max-w-3xl mx-auto">
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">FinanceApp</h2>
                
                <div className="h-10 w-10 bg-indigo-600 text-white font-semibold rounded-full flex justify-center items-center shadow-md cursor-pointer hover:bg-indigo-700 transition-colors">
                    U
                </div>
            </Wrapper>
        </nav>
    )
}

export default Navbar