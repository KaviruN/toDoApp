import { addTodo, getTodos } from "./main";
import { useState, useEffect } from "react";
import { todoDelete } from "./main";
import { toComplete } from "./main";

const Todo: React.FC = () => {
    interface TodoItem {
      id: number;
      user: number;
      title: string;
      completed: boolean;
    }

    const msg = (
      <div role="alert" className="bg-green-100 dark:bg-green-900 border-l-4 border-green-500 dark:border-green-700 text-green-900 dark:text-green-100 p-2 rounded-lg flex items-center transition duration-300 ease-in-out hover:bg-green-200 dark:hover:bg-green-800 transform hover:scale-105">
        <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" className="h-5 w-5 flex-shrink-0 mr-2 text-green-600" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
        </svg>
        <p className="text-xs font-semibold">Success - Everything went smoothly!</p>
      </div>
    );

    const [responce, setResponce] = useState<TodoItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<JSX.Element | null>(null);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            const todos = await getTodos();
            setResponce(todos);
            setIsLoading(false);
        }
        fetchData();
    }, []);

    async function fetchData() {
        setIsLoading(true);
        const todos = await getTodos();
        setResponce(todos);
        setIsLoading(false);
    }

    async function handleAdd(){
        const userInput = document.querySelector('.promt') as HTMLInputElement;
        setIsLoading(true);
        const submitTodo = await addTodo(userInput.value);
        userInput.value = '';
        if (submitTodo[0].success) {
            setResponce([...responce, submitTodo[0].data]);
            setMessage(msg);

        }
        setIsLoading(false);
        setInterval(() => {
            setMessage(null);
        }, 5000);

    }

    async function handleDelete(id: number){

        const deleteResponce = await todoDelete(id);
        fetchData()
        console.log(deleteResponce);

    }


    async function handleComplete(id: number){
        const completeResponce = await toComplete(id);
        fetchData()
        console.log(completeResponce);
    }
    
  return (
    <div>
        {message}
        <h1>Todo List</h1>
        <div className="todo">
        <input className="input h-[34px] text-[14px] text-white/60 w-[240px] bg-[#09090b] text-[#f4f4f5] px-3 py-1 rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-[#09090b] transition-all duration-150 ease-in-out promt" name="text" type="text" placeholder="Enter your name..." />
        <div>
        <button className="add-btn group cursor-pointer outline-none hover:rotate-90 duration-300" title="Add New">
      <svg className="stroke-teal-500 fill-none group-hover:fill-teal-800 group-active:stroke-teal-200 group-active:fill-teal-600 group-active:duration-0 duration-300" viewBox="0 0 24 24" height="50px" width="50px" xmlns="http://www.w3.org/2000/svg" onClick={handleAdd}>
        <path strokeWidth="1.5" d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" />
        <path strokeWidth="1.5" d="M8 12H16" />
        <path strokeWidth="1.5" d="M12 16V8" />
      </svg>
    </button>

        </div>
        
        </div>
        <ul>
        <div className="todo-spiner">
        {isLoading && <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin" />}
        </div>
            {responce.length > 0 && responce.map((item) => (
                <li className={`todo-items bg-blue-100 dark:bg-blue-900bg-blue-100 dark:bg-blue-900 border-l-4 border-blue-500 dark:border-blue-700 text-blue-900 dark:text-blue-100 p-2 rounded-lg flex items-center transition duration-300 ease-in-out hover:bg-blue-200 dark:hover:bg-blue-800 transform hover:scale-105`} key={item.id} onDoubleClick={() => handleComplete(item.id)}>
                    <p className={`${item.completed && 'completed'} `} >{item.title}</p>
                    <button className="inline-flex items-center px-4 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110" onClick={() => handleDelete(item.id)}>
                    <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
                    </svg>
                    Delete
                    </button>                    
                </li>
            ))}
        </ul>
    </div>
  );
}

export default Todo;