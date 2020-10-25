import React from 'react';

function Close(props) {
  return (
    <svg
      width={17}
      height={17}
      viewBox="0 0 17 17"
      fill="none"
      style={{ display: 'flex' }}
      {...props}
    >
      <path
        d="M9.617 8.5l6.152-6.152a.79.79 0 10-1.117-1.117L8.5 7.384 2.348 1.23A.79.79 0 101.23 2.348L7.384 8.5 1.23 14.652a.79.79 0 101.117 1.117L8.5 9.616l6.152 6.153a.79.79 0 001.117-1.117L9.617 8.5z"
        fill="#0F2137"
        stroke="#0F2137"
        strokeWidth={0.5}
      />
    </svg>
  );
}

export default Close;
