import React, {Suspense, useState} from 'react';
import {SwishSpinner} from 'react-spinners-kit';
import Navbar from './Navbar/Navbar.tsx'

function App() {
  const [activeTab, setActiveTab] = useState<string>('homePage');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <Navbar></Navbar>
      <Suspense fallback={<div className="h-screen flex items-center justify-center"><SwishSpinner size={150} loading={true}/></div>}>
        <div className="">
          Tab logic here
        </div>
      </Suspense>
    </div>
  );
}

export default App;