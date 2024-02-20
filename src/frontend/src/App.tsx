import React, {Suspense, useState} from 'react';
import {SwishSpinner} from 'react-spinners-kit';
import Navbar from './Components/Navbar.tsx';
import Sidebar from './Components/Sidebar.tsx';
import HomePage from './Components/HomePage.tsx';
import {Tab} from './util/Tab.ts';

function App() {
  // Defaults to home page
  const [activeTab, setActiveTab] = useState<Tab>(Tab.HomePage);
  // Sidebar deafaults off (obviously)
  const [activeSidebar, setActiveSidebar] = useState<boolean>(false);
  // Current group deafults to none, and should always be none unless on drawing, mosaic, or gallery screens.
  const [currentGroup, setCurrentGroup] = useState<string>('');

  const handleTabClick = (tab: Tab) => {
    if (tab !== activeTab) setActiveTab(tab);
  };

  // FOR TESTING PURPOSES ONLY
  const groupList = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's'];

  return (
    <div onClick={() => {if (activeSidebar) setActiveSidebar(false)}}>
      {activeSidebar && <Sidebar
        groupList={groupList}
        onGroupPress={(group: string) => {
          handleTabClick(Tab.WhiteBoard)
          setCurrentGroup(group);
        }}
      ></Sidebar>}
      <Navbar
        onClickHome={() => {
          handleTabClick(Tab.HomePage);
          setCurrentGroup('');
        }}
        onClickSidebar={() => setActiveSidebar(true)}
        currentGroup={currentGroup}
      ></Navbar>
      <Suspense fallback={<div className="h-screen flex items-center justify-center"><SwishSpinner size={150} loading={true}/></div>}>
        <div>
          {activeTab === Tab.HomePage &&
            <HomePage
              groupList={groupList}
              friendList={[]}
              onGroupPress={(group: string) => {
                handleTabClick(Tab.WhiteBoard)
                setCurrentGroup(group);
              }}
            ></HomePage>
          }
        </div>
      </Suspense>
    </div>
  );
}

export default App;