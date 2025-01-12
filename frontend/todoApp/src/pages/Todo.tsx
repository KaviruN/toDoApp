import { addTodo, getTodos, todoDelete, toComplete, getUsername, logout } from "../static/ts/main";
import { useState, useEffect } from "react";
// import { todoDelete } from "./main";
// import { toComplete } from "./main";

const Todo: React.FC = () => {
  interface TodoItem {
    id: number;
    user: number;
    title: string;
    completed: boolean;
  }

  const msg = (
    <div role="alert" className="msg bg-green-100 dark:bg-green-900 border-l-4 border-green-500 dark:border-green-700 text-green-900 dark:text-green-100 p-2 rounded-lg flex items-center transition duration-300 ease-in-out hover:bg-green-200 dark:hover:bg-green-800 transform hover:scale-105">
      <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" className="h-5 w-5 flex-shrink-0 mr-2 text-green-600" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
      </svg>
      <p className="text-xs font-semibold">Success - Everything went smoothly!</p>
    </div>
  );

  const [responce, setResponce] = useState<TodoItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<JSX.Element | null>(null);
  const [username, setUsername] = useState<string | null>();

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const todos = await getTodos();
      setResponce(todos);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    function fetchData() {
      const username = getUsername();
      setUsername(username);
    }
    fetchData();
  }, []);


  async function fetchData() {
    setIsLoading(true);
    const todos = await getTodos();
    setResponce(todos);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000)
  }

  async function handleAdd() {
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

  async function handleDelete(id: number) {

    const deleteResponce = await todoDelete(id);
    fetchData()
    console.log(deleteResponce);

  }


  async function handleComplete(id: number) {
    const completeResponce = await toComplete(id);
    fetchData()
    console.log(completeResponce);
  }

  function handleLogout() {
    logout();
    window.location.href = '/';
  }

  return (
    <div>
      {message}
      <nav className="nav flex justify-between items-center">
        <h2 className="text-xl font-semibold">Welcome '{username}'</h2>
        <button className="group flex items-center justify-start w-11 h-11 bg-red-600 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1" onClick={handleLogout}>
          <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
            <svg className="w-4 h-4" viewBox="0 0 512 512" fill="white">
              <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
            </svg>
          </div>
          <div className="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
            Logout
          </div>
        </button>
      </nav>
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