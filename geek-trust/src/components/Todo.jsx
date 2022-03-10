
import "./Todo.css";
import { useState ,useEffect} from "react";
const Todo = ()=>{
let [arr,setArr]=useState([]);
const [search,setSearch] = useState("");
useEffect(()=>{
    getTodo();
    
  },[search])
  let [page,setPage] = useState(1);    
     useEffect(()=>{
        getTodo();
        
      },[page])

    //   const onSearch = (x)=>{
    //     fetch(`http://localhost:2345/users/search/${x}`).then((d)=>(d.json())).then((res)=>(setArr([...res])));
    //   }

   const getTodo = ()=>{
    fetch(`http://localhost:2345/users?page=${page}&size=10`).then((d)=>(d.json())).then((res)=>(setArr([...res])));
   
   }
   
   const handleSearch = (e)=>{
      console.log(e.target.value);
      if(e.target.value>3){
      setSearch(e.target.value);
      
      }

   }

   const onclick =()=>{
    //onSearch(search);
   }
    return <div className="main">
    
    
   <input onChange={handleSearch} className="inp1" type="text" placeholder="Search by name, email or role" />
   <button onClick={onclick}>Search</button>
     
   <div className="divTag"> <div><input type="checkbox"></input></div> <div><h4>Name</h4></div> <div><h4>Email</h4></div> <div><h4>Actions</h4></div></div> 
{arr.map(e=><div key={e.id} className="divTag">
    <div><input type="checkbox"></input></div> <div><p>{e.name}</p></div> <div><p>{e.email}</p></div> <div><p>{e.role}</p></div></div>)}
    <button className="deletebtn">Delete Selected</button>

<button disabled={page===1} onClick={()=>setPage(page-1)}>Left</button>
<button disabled={arr.length<10}onClick={()=>setPage(page+1)}>Right</button>

    </div>
    
}

export default Todo;