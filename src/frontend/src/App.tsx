import React, {Suspense, SuspenseResource, useState} from 'react';
import spinner from './../util/spinner.gif';

function App() {
  const [activeTab, setActiveTab] = useState<string>('homePage');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <Suspense fallback={<div>
        <img
          src={spinner}
          style={{ width: '100px', margin: 'auto', display: 'block' }}
          alt="Loading..."
        />
      </div>}>
        // Tab logic here
      </Suspense>
    </div>
  );
}

export default App;
