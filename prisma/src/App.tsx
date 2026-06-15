import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Features } from "./components/Features";

function App() {
  return (
    <main className="w-full bg-black min-h-screen text-white overflow-x-hidden">
      <Hero />
      <About />
      <Features />
    </main>
  );
}

export default App;
