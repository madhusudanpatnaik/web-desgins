
import { Hero } from './components/Hero';
import { About } from './components/About';
import { CaseStudies } from './components/CaseStudies';

function App() {
  return (
    <main className="w-full bg-white antialiased font-sans text-gray-900">
      <Hero />
      <About />
      <CaseStudies />
    </main>
  );
}

export default App;
