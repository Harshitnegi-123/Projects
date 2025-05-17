import { useState , useEffect} from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid'
function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [EditingID, setEditingID] = useState(null)

  useEffect(() => {
    // Automatically save todos to localStorage whenever it changes
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    if (todos.length > 0) { // Save only if there are todos
      localStorage.setItem("todos", JSON.stringify(todos))
    }
  }, [todos])
  
  const HandleEdit = (id) => {
    let t = (todos.filter(item=> item.id === id))
    setTodo(t[0].todo)
    setEditingID(id)
    
  }
  const HandleDelete = (id) => {
    // filter sabko check krega or new array me bhejega fhir item ek individual todo object hai jo todos array mein hota hai. or fhir arrow function har item ko check krega ki id match kr rhi h yaa nhi agar id match nhi kregi toh bhai wo todo store ho jayega new array me filter ki help se or agar id match nhi hui toh bhai filter usko add hi ni krega toh wo delete hi ho jayega na.
    setTodos(todos.filter(item => item.id !== id))
    
  }
  const HandleAdd = () => {
    if (EditingID) {
      // ✅ We're editing
      setTodos(todos.map(item =>
        item.id === EditingID
          ? { ...item, todo }
          : item
      ))
      setEditingID(null)
    } else {
      // ✅ Adding new
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    }
    setTodo("")
    
  }
  const HandleChange = (e) => {
    setTodo(e.target.value)
    
  }
  //   Check karo ki kis todo item par click hua (isliye humein id chahiye).

  // Sab todos ke through loop chalao (map).

  // Jis todo ka id match kare, uska isCompleted flip kar do.

  // Baaki sab todos waise ke waise rehne do.


  const HandleCheckBox = (id) => {
    setTodos(
      // yaha  !item.isCompleted ye line flip kr raha h true h to false or f hai to t or value kisme jayegi isCompleted isme or ...item pure object ko spread krke copy kr raha h or fhir item map ko return kara dekho
      todos.map((item) =>
        item.id === id
          ? { ...item, isCompleted: !item.isCompleted }
          : item)
    );
    
  };

  return (
    <>
      <Navbar />
      <div className="container bg-violet-200 p-5 rounded-xl min-h-[80vh] w-[32vw] mx-auto my-6">
        <div className="addtodo text-lg font-bold">
          <h2 className='my-2'>Add a Todo</h2>
          <input onChange={HandleChange} value={todo} className='bg-white rounded-lg' type="text" />
          <button onClick={HandleAdd} className='bg-slate-700 hover:bg-slate-800 text-sm font-bold  p-3 py-1 text-white rounded-md mx-5'>{EditingID ? "Save" : "Add"}</button>
        </div>
        <h2 className="text-lg font-bold my-2">
          Your Todos
        </h2>
        <div className="todos">
          {todos.map((item) => {
            return <div key={item.id} className="todo flex justify-between w-full my-2">
              <div className='flex gap-5 '>
              <input onChange={() => HandleCheckBox(item.id)} type="checkbox" checked={item.isCompleted} />
              <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="button">
                <button onClick={()=> HandleEdit(item.id)} className='bg-slate-700 hover:bg-slate-800 text-sm font-bold  p-3 py-1 text-white rounded-md mx-2'>Edit</button>
                <button onClick={()=> HandleDelete(item.id)} className='bg-slate-700 hover:bg-slate-800 text-sm font-bold  p-3 py-1 text-white rounded-md mx-2'>Delete</button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
