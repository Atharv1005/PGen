import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen">

      <Navbar />

      <section className="flex flex-col items-center justify-center h-[80vh]">

        <h1 className="text-5xl font-bold mb-6">
          Secure Chat. Crypto Payments. Full Control.
        </h1>

        <p className="text-gray-400 mb-6">
          Next generation communication with blockchain security.
        </p>

        <button className="gradient-primary px-6 py-3 rounded-lg">
          Get Started
        </button>

      </section>

    </main>
  );
}