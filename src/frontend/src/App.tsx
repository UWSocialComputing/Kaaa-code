import React, {Suspense, useState} from 'react';
import {SwishSpinner} from 'react-spinners-kit';
import Navbar from './Components/Navbar.tsx'
import Sidebar from './Components/Sidebar.tsx'

function App() {
  const [activeTab, setActiveTab] = useState<string>('homePage');
  const [activeSidebar, setActiveSidebar] = useState<boolean>(false);

  const handleTabClick = (tab: string) => {
    if (tab !== activeTab) setActiveTab(tab);
  };

  return (
    <div onClick={() => {if (activeSidebar) setActiveSidebar(false)}}>
      {activeSidebar && <Sidebar/>}
      <Navbar
        onClickHome={() => handleTabClick("home")}
        onClickSidebar={() => setActiveSidebar(true)}
        currentGroup={""}
      ></Navbar>
      <Suspense fallback={<div className="h-screen flex items-center justify-center"><SwishSpinner size={150} loading={true}/></div>}>
        <div className="">
          Tab logic here
        </div>
      </Suspense>
    </div>
  );
}

export default App;