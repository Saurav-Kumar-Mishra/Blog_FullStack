import React from 'react'
import './Spinner.css'

export default function Spinner()
{
  return(
    <div className="flex justify-center  h-screen bg-red-200">
      <div className='flex justify-center items-center'>
        <div className='spinner'></div>
      </div>
    </div>
  );
}