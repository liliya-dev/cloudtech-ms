import React from 'react';

export type TodoProps = {
  children: React.ReactElement | React.ReactChild;
};

export const Todo = ({ children }: TodoProps) => {
  if (process.env.NODE_ENV === 'production') return null;
  return (
    <div className="p-32 text-center bg-yellow-50 border-black border-opacity-10 relative">
      <span className="absolute left-1 top-1 p-2 rounded-sm bg-black text-white font-semibold">
        TODO
      </span>
      {children}
    </div>
  );
};
