import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="text-center mt-5">
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <p className="mt-2">Loading...</p>
    </div>
  );
};

export default Loading; 