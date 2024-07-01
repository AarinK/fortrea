import React, { useState, forwardRef, Ref } from 'react';
import { ReactNode } from 'react';
import { DropResult, DraggableLocation, Droppable, DragDropContext, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
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

interface KioskProps {
    isDraggingOver: boolean;
    children?: ReactNode;
}

const Kiosk = forwardRef((props: KioskProps, ref: Ref<HTMLDivElement>) => (
    <div ref={ref} className="absolute top-0 right-0 bottom-0 w-40 bg-red-500 p-2 rounded border border-gray-300 font-sans text-red-500">
        {props.children}
    </div>
));


const Content = styled.div`
    margin-right: 200px;
`;

const Item = styled.div<{ isDragging?: boolean }>`
    display: flex;
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

const List = styled.div<{ isDraggingOver: boolean; containerCount: number }>`
    border: 1px ${props => (props.isDraggingOver ? 'dashed #000' : 'solid #ddd')};
    background: #fff;
    padding: 0.5rem 0.5rem 0;
    border-radius: 3px;
    flex: 0 0 calc(${props => 100 / (props.containerCount > 4 ? 4 : props.containerCount)}% - 1rem);
    margin: 0.5rem;
    font-family: sans-serif;
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
            className="flex items-center justify-center m-48 p-2 text-red border border-gray-300 bg-green-900 rounded-md text-base cursor-pointer"
            onClick={onClick}
        >
            {children}
        </button>
    );
};

const ButtonText = styled.div`
    margin: 0 1rem;
`;

const ITEMS: ItemType[] = [
    {
        id: uuidv4(),
        title: 'Container',
        icon: PiShippingContainerThin
    },
    {
        id: uuidv4(),
        title: 'Heading',
        icon: LiaHeadingSolid
    },
    {
        id: uuidv4(),
        title: 'Line Break',
        icon: MdOutlineInsertPageBreak
    },
    {
        id: uuidv4(),
        title: 'First Name',
        icon: CiViewTable
    },
    {
        id: uuidv4(),
        title: 'Tabs',
        icon: PiAddressBookTabsThin
    },
    {
        id: uuidv4(),
        title: '',
        icon: null
    },
    {
        id: uuidv4(),
        title: '',
        icon: null
    },
    {
        id: uuidv4(),
        title: '',
        icon: null
    },
    {
        id: uuidv4(),
        title: '',
        icon: null
    }
];

const ReactDND = () => {
    const [state, setState] = useState<ListType>({ [uuidv4()]: [] });
    const [order, setOrder] = useState<string[]>([]);

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;

        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId && source.index === destination.index) {
            return;
        }

        switch (source.droppableId) {
            case destination.droppableId:
                setState({
                    ...state,
                    [source.droppableId]: reorder(state[source.droppableId], source.index, destination.index)
                });
                break;
            case 'ITEMS':
                setState({
                    ...state,
                    [destination.droppableId]: copy(ITEMS, state[destination.droppableId], source, destination)
                });
                break;
            default:
                const movedResult = move(
                    state[source.droppableId],
                    state[destination.droppableId],
                    source,
                    destination
                );
                setState({
                    ...state,
                    ...movedResult,
                });
                break;
        }
    };

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

    const addList = () => {
        const newListId = uuidv4();
        setState({ ...state, [newListId]: [] });
        setOrder([...order, newListId]);
    };

    const logState = () => {
        console.log(order.map(id => ({ [id]: state[id] })));
    };

    const containerCount = order ? order.length : 0;

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="ITEMS" isDropDisabled={true}>
                {(provided, snapshot) => (
                    <Kiosk ref={provided.innerRef} isDraggingOver={snapshot.isDraggingOver}>
                        {ITEMS.map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided, snapshot) => (
                                    <>
                                        <Item ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} isDragging={snapshot.isDragging} style={provided.draggableProps.style}>
                                            {item.icon && <item.icon />}
                                            {item.title}
                                        </Item>
                                        {snapshot.isDragging && (
                                            <Clone>
                                                {item.icon && <item.icon />}
                                                {item.title}
                                            </Clone>
                                        )}
                                    </>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </Kiosk>
                )}
            </Droppable>
            <Content>
                <Button onClick={addList}>
                    <svg width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                    </svg>
                    <ButtonText>Add List</ButtonText>
                </Button>
                <Button onClick={logState}>Log</Button>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {order.map((list) => (
                        <Droppable key={list} droppableId={list}>
                            {(provided, snapshot) => (
                                <Container ref={provided.innerRef} isDraggingOver={snapshot.isDraggingOver} containerCount={containerCount}>
                                    {state[list].length ? (
                                        state[list].map((item, index) => (
                                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                                {(provided, snapshot) => (
                                                    <Item ref={provided.innerRef} {...provided.draggableProps} isDragging={snapshot.isDragging} style={provided.draggableProps.style}>
                                                        <Handle {...provided.dragHandleProps}>
                                                            <svg width="24" height="24" viewBox="0 0 24 24">
                                                                <path fill="currentColor" d="M3,15H21V13H3V15M3,19H21V17H3V19M3,11H21V9H3V11M3,5V7H21V5H3Z" />
                                                            </svg>
                                                        </Handle>
                                                        {item.icon && <item.icon />}
                                                        {item.title}
                                                    </Item>
                                                )}
                                            </Draggable>
                                        ))
                                    ) : (
                                        !provided.placeholder && <Notice>Drop items here</Notice>
                                    )}
                                    {provided.placeholder}
                                </Container>
                            )}
                        </Droppable>
                    ))}
                </div>
            </Content>
        </DragDropContext>
    );
};

export default ReactDND;
