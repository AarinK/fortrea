import React from 'react';

interface TableProps {
  data: string[]; // Array of header texts
  colors: string[]; // Array of background colors for headers
}

const TableComponent: React.FC<TableProps> = ({ data, colors }) => {
  return (
    <div className="flex w-screen h-screen p-10">
      <div className="flex flex-col w-full border-t border-r border-black">
        <div className="flex flex-shrink-0 bg-black text-white">
          {data.map((text, index) => (
            <div key={index} className={`flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-black ${colors[index]}`}>
              <span>{text}</span>
            </div>
          ))}
        </div>
        <div className="overflow-auto">
          {[...Array(10)].map((_, rowIndex) => (
            <div key={rowIndex} className="flex flex-shrink-0">
              {data.map((_, colIndex) => (
                <div key={colIndex} className="flex items-center flex-grow w-0 h-10 px-2 border-b border-l border-black">
                  <span>Item</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableComponent;
