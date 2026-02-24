export default function Navbar() {
    return (
      <nav className="flex items-center justify-between px-6 py-4 bg-[#14141A]">
        
        <div className="text-xl font-bold gradient-primary bg-clip-text text-transparent">
          PGen
        </div>
  
        <div className="flex gap-4">
  
          <button className="px-4 py-2 rounded-lg hover:bg-[#1f1f28]">
            Login
          </button>
  
          <button className="px-4 py-2 rounded-lg gradient-primary">
            Sign Up
          </button>
  
          <button className="px-4 py-2 rounded-lg border border-gray-700">
            Connect Wallet
          </button>
  
        </div>
  
      </nav>
    )
  }