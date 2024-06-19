// App.tsx

import React from 'react';
import SidePanel from './components/ui-reusable/sidepanel/SidePanel';
import InputTextField from './components/ui-reusable/text-fields/InputFields';

const App = () => {
    return (
        <div className="flex">
            <SidePanel />
           
            <div className="flex-grow p-6">
                
            </div>
        </div>
    );
};

export default App;
