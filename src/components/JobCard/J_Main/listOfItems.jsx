import React, { Component } from 'react';


function listOfitems(props){
    const items = props.items;
    console.log("second delete");
    const listItems = items.map(item =>
   {
       return <div className="list" key={item.key}>

     <p>
             <input type="text" id={item.key} value={item.itemna} onChange={(e)=>{
             props.setUpdate(e.target.value,item.key)}}/>



    <span>
        
       <button className="faicons" onClick={() => {
            props.deleteItem(item.key)
            }} icon="trash" />
    </span>
     </p>
     
    </div>})

    return <div>{listItems}</div>;
  }

  export default listOfitems;