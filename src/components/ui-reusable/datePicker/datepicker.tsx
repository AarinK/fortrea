// import React, { useState } from 'react';
// import './DatePicker.css'; // Assuming you have a CSS file for additional styling

// const DatePicker: React.FC = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [selectedDate, setSelectedDate] = useState<Date | null>(null);

//     const toggleCalendar = () => {
//         setIsOpen(!isOpen);
//     };

//     const generateCalendar = (date: Date) => {
//         const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
//         const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
//         const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

//         const days = [];
//         let dateIterator = new Date(firstDay);

//         while (dateIterator <= lastDay) {
//             days.push(
//                 <tr key={dateIterator.toISOString()}>
//                     {[0, 1, 2, 3, 4, 5, 6].map((day) => {
//                         if (dateIterator.getDay() === day) {
//                             return (
//                                 <td
//                                     key={day}
//                                     className={`cursor-pointer py-2 ${
//                                         dateIterator.getMonth() === date.getMonth() ? 'hover:bg-gray-200' : ''
//                                     }`}
//                                     onClick={() => handleDateClick(dateIterator)}
//                                 >
//                                     {dateIterator.getDate()}
//                                 </td>
//                             );
//                         } else {
//                             return <td key={day}></td>;
//                         }
//                     })}
//                 </tr>
//             );
//             dateIterator.setDate(dateIterator.getDate() + 1);
//         }

//         return days;
//     };

//     const handleDateClick = (date: Date) => {
//         setSelectedDate(date);
//         setIsOpen(false);
//     };

//     const formatDate = (date: Date | null) => {
//         if (!date) return '';
//         const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
//         return date.toLocaleDateString('en-US', options);
//     };

//     const monthNames = [
//         'January', 'February', 'March', 'April', 'May', 'June', 
//         'July', 'August', 'September', 'October', 'November', 'December'
//     ];

//     return (
//         <div className="date-picker">
//             <input
//                 type="text"
//                 id="datepicker"
//                 placeholder="Select a date"
//                 onClick={toggleCalendar}
//                 value={selectedDate ? formatDate(selectedDate) : ''}
//                 readOnly
//                 className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
//             />
//             {isOpen && (
//                 <div className="calendar mt-1 rounded-lg border-gray-300 shadow-md bg-white">
//                     <table className="w-full">
//                         <thead>
//                             <tr className="text-center">
//                                 <th colSpan={7} className="py-2">
//                                     {monthNames[selectedDate?.getMonth() || 0]} {selectedDate?.getFullYear()}
//                                 </th>
//                             </tr>
//                             <tr className="text-center">
//                                 {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
//                                     <th key={index} className="py-2">
//                                         {day}
//                                     </th>
//                                 ))}
//                             </tr>
//                         </thead>
//                         <tbody>{generateCalendar(selectedDate || new Date())}</tbody>
//                     </table>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default DatePicker;


import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable, DraggableLocation, DropResult } from 'react-beautiful-dnd';
import { PiShippingContainerThin, PiAddressBookTabsThin } from "react-icons/pi";
import { LiaHeadingSolid } from "react-icons/lia";
import { MdOutlineInsertPageBreak } from "react-icons/md";
import { CiViewTable } from "react-icons/ci";
import { IconType } from "react-icons";
 
type ItemType = {
    id: string;
    title: string;
    icon: IconType | null;
};
 
type ListType = {
    [key: string]: ItemType[]
};
 
interface ListProps {
    isDraggingOver: boolean;
    containerCount: number;
}
 
interface ItemProps {
    isDragging?: boolean;
}
 
const reorder = (list: ItemType[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
 
    return result;
};
 
const copy = (source: ItemType[], destination: ItemType[], droppableSource: DraggableLocation, droppableDestination: DraggableLocation) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const item = sourceClone[droppableSource.index];
 
    destClone.splice(droppableDestination.index, 0, { ...item, id: uuidv4() });
    return destClone;
};
 
const move = (source: ItemType[], destination: ItemType[], droppableSource: DraggableLocation, droppableDestination: DraggableLocation) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
 
    destClone.splice(droppableDestination.index, 0, removed);
 
    const result: ListType = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;
 
    return result;
};
 
const tailwindkiosk = "absolute top-0 right-0 bottom-0 w-52"
 
const Content = styled.div`
    margin-right: 200px;
`;
 
const Item = styled.div<ItemProps>`
    display: flex;z
    user-select: none;
    padding: 0.5rem;
    margin: 0 0 0.5rem 0;
    align-items: flex-start;
    align-content: flex-start;
    line-height: 1.5;
    border-radius: 3px;
    background: #fff;
    border: 1px ${props => (props.isDragging ? 'dashed #4099ff' : 'solid #ddd')};
`;
 
const Clone = styled(Item)`
    + div {
        display: none !important;
    }
`;
 
const Handle = styled.div`
    display: flex;
    align-items: center;
    align-content: center;
    user-select: none;
    margin: -0.5rem 0.5rem -0.5rem -0.5rem;
    padding: 0.5rem;
    line-height: 1.5;
    border-radius: 3px 0 0 3px;
    background: #fff;
    border-right: 1px solid #ddd;
    color: #000;
`;
 
const List = styled.div<ListProps>`
    border: 1px
        ${props => (props.isDraggingOver ? 'dashed #000' : 'solid #ddd')};
    background: #fff;
    padding: 0.5rem 0.5rem 0;
    border-radius: 3px;
    flex: 0 0 calc(${props => 100 / (props.containerCount > 4 ? 4 : props.containerCount)}% - 1rem);
    margin: 0.5rem;
    font-family: sans-serif;
`;
 
const Kiosk = styled(List)`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 200px;
    // background-color: red
`;
 
const Container = styled(List)`
    background: #ccc;
`;
 
const Notice = styled.div`
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    padding: 0.5rem;
    margin: 0 0.5rem 0.5rem;
    border: 1px solid transparent;
    line-height: 1.5;
    color: #aaa;
`;
 
const Button = ({ children, onClick }: { children: any, onClick: any }) => {
    return (
        <button
            className="flex items-center justify-center m-48 p-2 text-black border border-gray-300 bg-white rounded-md text-base cursor-pointer"
            onClick={onClick}
        >
            {children}
        </button>
    );
};
 
// const Button = styled.button`
//     display: flex;
//     align-items: center;
//     align-content: center;
//     justify-content: center;
//     margin: 0.5rem;
//     padding: 0.5rem;
//     color: #000;
//     border: 1px solid #ddd;
//     background: #fff;
//     border-radius: 3px;
//     font-size: 1rem;
//     cursor: pointer;
// `;
 
// const ButtonText = styled.div`
//     margin: 0 1rem;
// `;
 
// const ITEMS: ItemType[] = [
//     {
//         id: uuidv4(),
//         title: 'Container',
//         icon: PiShippingContainerThin
//     },
//     {
//         id: uuidv4(),
//         title: 'Heading',
//         icon: LiaHeadingSolid
//     },
//     {
//         id: uuidv4(),
//         title: 'Line Break',
//         icon: MdOutlineInsertPageBreak
//     },
//     {
//         id: uuidv4(),
//         title: 'First Name',
//         icon: CiViewTable
//     },
//     {
//         id: uuidv4(),
//         title: 'Tabs',
//         icon: PiAddressBookTabsThin
//     },
//     {
//         id: uuidv4(),
//         title: '',
//         icon: null
//     },
//     {
//         id: uuidv4(),
//         title: '',
//         icon: null
//     },
//     {
//         id: uuidv4(),
//         title: '',
//         icon: null
//     },
//     {
//         id: uuidv4(),
//         title: '',
//         icon: null
//     }
// ];
 
// const ReactDND = () => {
//     const [state, setState] = useState<ListType>({ [uuidv4()]: [] });
//     const [order, setOrder] = useState<string[]>([]);
 
//     const onDragEnd = (result: DropResult) => {
//         const { source, destination } = result;
 
//         if (!destination) {
//             return;
//         }
 
//         if (source.droppableId === destination.droppableId && source.index === destination.index) {
//             return;
//         }
 
//         switch (source.droppableId) {
//             case destination.droppableId:
//                 setState({
//                     ...state,
//                     [source.droppableId]: reorder(state[source.droppableId], source.index, destination.index)
//                 });
//                 break;
//             case 'ITEMS':
//                 setState({
//                     ...state,
//                     [destination.droppableId]: copy(ITEMS, state[destination.droppableId], source, destination)
//                 });
//                 break;
//             default:
//                 // setState(move(state[source.droppableId], state[destination.droppableId], source, destination));
//                 const movedResult = move(
//                     state[source.droppableId],
//                     state[destination.droppableId],
//                     source,
//                     destination
//                 );
//                 setState({
//                     ...state,
//                     ...movedResult,
//                 });
//                 break;
//         }
//     };
 
//     const addList = () => {
//         const newListId = uuidv4();
//         setState({ ...state, [newListId]: [] });
//         setOrder([...order, newListId]);
//     };
 
//     const logState = () => {
//         console.log(order.map(id => ({ [id]: state[id] })));
//     };
 
//     const containerCount = order ? order.length : 0;
 
//     return (
//         <DragDropContext onDragEnd={onDragEnd}>
//             <Droppable droppableId="ITEMS" isDropDisabled={true}>
//                 {(provided, snapshot) => (
//                     <Kiosk ref={provided.innerRef} isDraggingOver={snapshot.isDraggingOver} containerCount={containerCount}>
//                         {ITEMS.map((item, index) => (
//                             <Draggable key={item.id} draggableId={item.id} index={index}>
//                                 {(provided, snapshot) => (
//                                     <>
//                                         <Item ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} isDragging={snapshot.isDragging} style={provided.draggableProps.style}>
//                                             {item.icon && <item.icon />}
//                                             {item.title}
//                                         </Item>
//                                         {snapshot.isDragging && (
//                                             <Clone>
//                                                 {item.icon && <item.icon />}
//                                                 {item.title}
//                                             </Clone>
//                                         )}
//                                     </>
//                                 )}
//                             </Draggable>
//                         ))}
//                         {provided.placeholder}
//                     </Kiosk>
//                 )}
//             </Droppable>
//             <Content>
//                 <Button onClick={addList}>
//                     <svg width="24" height="24" viewBox="0 0 24 24">
//                         <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
//                     </svg>
//                     <ButtonText>Add List</ButtonText>
//                 </Button>
//                 <Button onClick={logState}>Log</Button>
//                 <div style={{ display: 'flex', flexWrap: 'wrap' }}>
//                     {order.map((list) => (
//                         <Droppable key={list} droppableId={list}>
//                             {(provided, snapshot) => (
//                                 <Container ref={provided.innerRef} isDraggingOver={snapshot.isDraggingOver} containerCount={containerCount}>
//                                     {state[list].length ? (
//                                         state[list].map((item, index) => (
//                                             <Draggable key={item.id} draggableId={item.id} index={index}>
//                                                 {(provided, snapshot) => (
//                                                     <Item ref={provided.innerRef} {...provided.draggableProps} isDragging={snapshot.isDragging} style={provided.draggableProps.style}>
//                                                         <Handle {...provided.dragHandleProps}>
//                                                             <svg width="24" height="24" viewBox="0 0 24 24">
//                                                                 <path fill="currentColor" d="M3,15H21V13H3V15M3,19H21V17H3V19M3,11H21V9H3V11M3,5V7H21V5H3Z" />
//                                                             </svg>
//                                                         </Handle>
//                                                         {item.icon && <item.icon />}
//                                                         {item.title}
//                                                     </Item>
//                                                 )}
//                                             </Draggable>
//                                         ))
//                                     ) : (
//                                         !provided.placeholder && <Notice>Drop items here</Notice>
//                                     )}
//                                     {provided.placeholder}
//                                 </Container>
//                             )}
//                         </Droppable>
//                     ))}
//                 </div>
//             </Content>
//         </DragDropContext>
//     );
// };
 
// export default ReactDND;