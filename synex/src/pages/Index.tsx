import React, { useEffect } from 'react';
import { Hero } from '../components/synex/Hero';

export const Index = () => {
  useEffect(() => {
    document.title = "Synex — A New Standard in Wealth Management";
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Take full control of your assets with a unified platform for investing, tracking, and growing your portfolio in real time.');
  }, []);

  return (
    <main>
      <h1 className="sr-only">Synex — A New Standard in Wealth Management</h1>
      <Hero />
    </main>
  );
};

export default Index;
