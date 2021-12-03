
import './App.css';
import {useEffect, useState} from 'react'
 import Table from './Table' 
 
function App() {
  const [list, setList]=useState([])
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
    .then(res => res.json() )
    .then(data => {
      
      setList(data)
    })

  }, [])
  return (
    <div className="App">
      <Table list={list} />
    </div>
  );
}

export default App;
