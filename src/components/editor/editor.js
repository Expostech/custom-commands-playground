//import './editor.css';
import React from 'react'
import { Data } from './data';
import { Output } from './output';
import { Input } from './input';


export default function Editor() {
  return (
    <div className="container">
      <div className="container flex flex-row">
        <div className="p-5 w-full"><Input /></div>
        <div className="py-1"><Data /></div>
      </div>
      <div className="container">
        <div className="p-4"><Output /></div>
      </div>
    </div>
  );
}





