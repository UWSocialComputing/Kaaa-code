import React, {Suspense, useState} from 'react';
import {SwishSpinner} from 'react-spinners-kit';
import Navbar from './Components/Navbar.tsx'
import Sidebar from './Components/Sidebar.tsx'

function App() {
  // Defaults to home page
  const [activeTab, setActiveTab] = useState<string>('homePage');
  // Sidebar deafaults off (obviously)
  const [activeSidebar, setActiveSidebar] = useState<boolean>(false);
  // Current group deafults to none, and should always be none unless on drawing, mosaic, or gallery screens.
  const [currentGroup, setCurrentGroup] = useState<string>('');

  const handleTabClick = (tab: string) => {
    if (tab !== activeTab) setActiveTab(tab);
  };

  return (
    <div onClick={() => {if (activeSidebar) setActiveSidebar(false)}}>
      {activeSidebar && <Sidebar
        groupList={[]}
        onGroupPress={(group: string) => {
          handleTabClick('whiteBoard')
          setCurrentGroup(group);
        }}
      ></Sidebar>}
      <Navbar
        onClickHome={() => {
          handleTabClick('homePage');
          setCurrentGroup('');
        }}
        onClickSidebar={() => setActiveSidebar(true)}
        currentGroup={currentGroup}
      ></Navbar>
      <Suspense fallback={<div className="h-screen flex items-center justify-center"><SwishSpinner size={150} loading={true}/></div>}>
        <div className="h-screen">
          Tab logic here
        </div>
      </Suspense>
    </div>
  );
}

export default App;