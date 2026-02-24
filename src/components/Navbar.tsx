import Link from "next/link";
export default function Navbar() {
    return (
      <nav className="flex items-center justify-between px-6 py-4 bg-[#14141A]">
        
        <div className="text-xl font-bold gradient-primary bg-clip-text text-transparent">
          PGen
        </div>
  
        <div className="flex gap-4">
  
            <Link href="/login">
                <button className="px-4 py-2 rounded-lg hover:bg-[#1f1f28] transition">
                    Login
                </button>
            </Link>
  
            <Link href="/signup">
                <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 transition">
                    Sign Up
                </button>
            </Link>
  
          <button className="px-4 py-2 rounded-lg border border-gray-700">
            Connect Wallet
          </button>
  
        </div>
  
      </nav>
    )
  }