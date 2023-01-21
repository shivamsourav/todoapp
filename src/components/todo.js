import React, { useEffect, useState } from "react";
import "./index.css";

// getting local data 
const getLocalData = () => {
    const list = localStorage.getItem("mytodolist");

    if(list){
        return JSON.parse(list);
    }else {
        return [];
    }
};


const Todo = () => {
    const [inputItems,setinputItems] = useState("")
     const [items,setItems] = useState(getLocalData());
     const [editItems,seteditItems] = useState("");
     const [toggleButton,settoggleButton]  = useState(false);


    //  adding items
    const addItems = () => {
if(!inputItems){
    alert("Add items");
} else if(inputItems && toggleButton){
    setItems(
        items.map((curElem)=>{
            if(curElem.id===editItems){
                return {...curElem, name : inputItems};
            }
            return curElem;
         })
    );
     setinputItems("");
     seteditItems("");
     settoggleButton(false);
}
else{   
    const myinputData = {
        id: new Date().getTime().toString(),
        name : inputItems,
    };
    setItems([...items,myinputData]);
    setinputItems("");
}
    };
//   deleting items

    const deleteItem = (index) => {
           const updatedItems = items.filter((curElem) => {
            return curElem.id !== index ; 
           });
           setItems(updatedItems);
    };

    // removing all the items
    const removeAll = () =>{
        setItems([]);
    }

    // adding local storage
    useEffect(() => {
    localStorage.setItem("mytodolist",JSON.stringify(items))
    },[items]);

//  editing items
     const editItem = (index) => {
        const todo_edit_items = items.find((curElem) => {
          return curElem.id === index
        })
        setinputItems(todo_edit_items.name);
        seteditItems(index);
        settoggleButton(true);
     }

    return <>
        <div className="main-div">
            <div className="child-div">
            <figure>
                <img src="todo.svg" alt="" />
                <figcaption>To do List</figcaption>
            </figure>
           <div className="addItems">
           <input 
                type="text" 
                placeholder="Task.."
                className="form-control" 
                value={inputItems}
                onChange={(event) => setinputItems(event.target.value)}
            />

            {
                toggleButton ? (   <i className="fa fa-edit add-btn" onClick={addItems}></i> )
                : (   <i className="fa fa-plus add-btn" onClick={addItems}></i>)
            }
            
           </div>

           {/* Show items */}
           <div className="showItems">
           { items.map((curElem) => {
            return (
                
            <div className="eachItem" key={curElem.id}>
                <h3>{curElem.name}</h3>
                <div className="todo-btn">
                <i className="far fa-edit add-btn" onClick={() => editItem(curElem.id)}></i>
                <i className="far fa-trash-alt add-btn"  onClick={ () => deleteItem(curElem.id)}></i>
                </div>
                </div>
             
            );
           })};
           
           
          
           
           </div>
            <div className="showItems">
                <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}>
                <span> Task List </span>  </button>
            </div>
            </div>
        </div>
    </>
};
export default Todo;