import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/Store';
import { increment, decrement, incrementByAmount } from './CounterSlice';

const Counter: React.FC = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Counter: {count}</h1>
      <div className="space-x-4">
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <button
          className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700 transition duration-300"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
        <button
          className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition duration-300"
          onClick={() => dispatch(incrementByAmount(5))}
        >
          Increment by 5
        </button>
      </div>
    </div>
  );
};

export default Counter;
