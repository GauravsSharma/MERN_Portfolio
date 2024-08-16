import React from 'react';

const FormLoader = () => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        width="20"
        height="20"
        style={{ shapeRendering: 'auto', display: 'block', background: 'transparent' }}
      >
        <g>
          <path
            stroke="none"
            fill="#ffffff"
            d="M10 50A40 40 0 0 0 90 50A40 44.8 0 0 1 10 50"
          >
            <animateTransform
              values="0 50 52.4;360 50 52.4"
              keyTimes="0;1"
              repeatCount="indefinite"
              dur="0.37453183520599254s"
              type="rotate"
              attributeName="transform"
            />
          </path>
        </g>
      </svg>
    </div>
  );
};

export default FormLoader;
