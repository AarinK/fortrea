import React from 'react';
import TableComponent from './components/ui-reusable/table/table';
// import ReactDND from './components/ui-reusable/datePicker/datepicker';
import ReactDND from './components/ui-reusable/dnd';
import Proposal from './components/ui-reusable/text-fields/InputFields';

const App: React.FC = () => {


  return (
    <div>
      <ReactDND/>
    </div>
  );
};

export default App;
