import React from 'react';

const Loading = () => {
    return (
        <div className="loading">
           <div className="semipolar-spinner">
              <div className="ring"/>
              <div className="ring"/>
              <div className="ring"/>
              <div className="ring"/>
              <div className="ring"/>
           </div>
        </div>
    );
};

export default Loading;