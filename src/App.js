import React from 'react';
import './App.css';

import SelectSection from './components/selectComp/SelectSection';
import ResultSection from './components/ResultSection';
import AppContextProvider from './contexts/AppContext';

const App = () => {
  return (
    <div className="bg-gray-200">
      <header className="bg-blue-300 shadow-md">
        <h1 className="text-center text-3xl p-3 font-bold">Build Your Own PC</h1>
      </header>
      <AppContextProvider> 
        <div className="container mx-auto p-3">
          <SelectSection />
          <ResultSection />
        </div>
      </AppContextProvider>
    </div>
  );
}

export default App;
