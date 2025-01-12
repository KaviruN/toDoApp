import axios from "axios";
import { jwtDecode } from "jwt-decode";
// import { data } from "react-router-dom";




const api = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Django backend URL
  withCredentials: true, // Send cookies with requests
});

// function getAccessTokenFromLocalStorage(): string | null {
//   return localStorage.getItem('AccessToken');
// }

function storeRefreshToken(token: string) {

  localStorage.setItem('RefreshToken', token);
}

function storeAccessToken(token: string) {
  localStorage.setItem('AccessToken', token);
}



async function userLogin(username: string, password: string): Promise<boolean> {
  try {
    const response = await api.post('/api/token/', { username, password });
    const refresh = response.data.refresh;
    const access = response.data.access;
    storeRefreshToken(refresh);
    storeAccessToken(access);
    return true;
  } catch (error) {
    return false;
  }
}

async function userRegister(username: string, email:string, password: string): Promise<boolean> {
  try {
    await api.post('/api/register/', { username, password, email });
    return true;
  } catch (error) {
    return false;
  }
}

async function getNewAccessToken() {
  const refreshToken = localStorage.getItem('RefreshToken');
  return api
    .post('/api/token/refresh/', { refresh: refreshToken })
    .then((response) => {
      const newAccess = response.data.access;
      storeAccessToken(newAccess);
    })
    .catch((error) => {
      console.error('Failed to refresh access token:', error);
    });
}

function isTokenValid(token: string): boolean {
  try {
    const decoded: any = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (error) {
    return false;
  }
}


function getUsername(){
  const accessToken = localStorage.getItem('AccessToken');
  if (accessToken) {
    const decoded: any = jwtDecode(accessToken);
    return decoded.username;
  }
  return null;
}


async function getTodos(): Promise<any>  {
  const refreshToken = localStorage.getItem('RefreshToken');
  let accessToken = localStorage.getItem('AccessToken');

  if (refreshToken && !isTokenValid(refreshToken)) {
    console.log("Please login again");
    return [{'error': 'Please login again'}];
  }

  if (accessToken && !isTokenValid(accessToken)) {
    console.log("Access token expired, getting new one");
    await getNewAccessToken();
    accessToken = localStorage.getItem('AccessToken');
  }

  if (!accessToken) {
    console.error('Please login first');
    return [{'error': 'Please login first'}];
  }

  try {
    const response = await api.get('/api/todo/', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true // Ensure cookies are included in the request
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response && (error.response.data.code === 'token_not_valid' || error.response.status === 401)) {
      console.error('Token is not valid or unauthorized:', error);
    } else {
      console.error('Error retrieving todos:', error);
    }
    return [{'error': 'Error retrieving todos'}];
  }
}

// ...existing code...

async function addTodo(promt: string): Promise<any> {
  const refreshToken = localStorage.getItem('RefreshToken');
  let accessToken = localStorage.getItem('AccessToken');

  if (refreshToken && !isTokenValid(refreshToken)) {
    console.log("Please login again");
    return [{'error': 'Please login again'}];
  }

  if (accessToken && !isTokenValid(accessToken)) {
    console.log("Access token expired, getting new one");
    await getNewAccessToken();
    accessToken = localStorage.getItem('AccessToken');
  }

  if (!accessToken) {
    console.error('Please login first');
    return [{'error': 'Please login first'}];
  }

  const todoData = {
    title: promt,
    completed: false,
  };

  try {
    const response = await api.post('/api/todo/', todoData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true // Ensure cookies are included in the request
    });
    return [{'success': 'Todo added successfully', 'data': response.data}];
  } catch (error) {
    if (axios.isAxiosError(error) && error.response && (error.response.data.code === 'token_not_valid' || error.response.status === 401)) {
      console.error('Token is not valid or unauthorized:', error);
    } else {
      console.error('Error adding todo:', error);
    }
    return [{'error': 'Error adding todo'}];
  }
}

function logout() {
  localStorage.removeItem('AccessToken');
  localStorage.removeItem('RefreshToken');
  console.log('Logged out');
}

async function todoDelete(id: number): Promise<any> {
  const refreshToken = localStorage.getItem('RefreshToken');
  let accessToken = localStorage.getItem('AccessToken');

  if (refreshToken && !isTokenValid(refreshToken)) {
    console.log("Please login again");
    return [{'error': 'Please login again'}];
  }

  if (accessToken && !isTokenValid(accessToken)) {
    console.log("Access token expired, getting new one");
    await getNewAccessToken();
    accessToken = localStorage.getItem('AccessToken');
  }

  if (!accessToken) {
    console.error('Please login first');
    return [{'error': 'Please login first'}];
  }

  try {
    const response = await api.delete(`/api/todo/${id}/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true // Ensure cookies are included in the request
    });
    return [{'success': 'Todo deleted successfully', 'data': response.data}];
  } catch (error) {
    if (axios.isAxiosError(error) && error.response && (error.response.data.code === 'token_not_valid' || error.response.status === 401)) {
      console.error('Token is not valid or unauthorized:', error);
    } else {
      console.error('Error deleting todo:', error);
    }
    return [{'error': 'Error deleting todo'}];
  }
}

async function toComplete(id: number, completed: boolean): Promise<any> {
  const refreshToken = localStorage.getItem('RefreshToken');
  let accessToken = localStorage.getItem('AccessToken');

  if (refreshToken && !isTokenValid(refreshToken)) {
    console.log("Please login again");
    return [{'error': 'Please login again'}];
  }

  if (accessToken && !isTokenValid(accessToken)) {
    console.log("Access token expired, getting new one");
    await getNewAccessToken();
    accessToken = localStorage.getItem('AccessToken');
  }

  if (!accessToken) {
    console.error('Please login first');
    return [{'error': 'Please login first'}];
  }

  try {
    if(!completed){
      const response = await api.patch(`/api/todo/${id}/`,{completed: true} ,{
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true // Ensure cookies are included in the request
      });
      return [{'success': 'Todo complite successfully', 'data': response.data}];
    }
    if(completed){
      const response = await api.patch(`/api/todo/${id}/`,{completed: false} ,{
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true // Ensure cookies are included in the request
      });
      return [{'success': 'Todo complite successfully', 'data': response.data}];
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response && (error.response.data.code === 'token_not_valid' || error.response.status === 401)) {
      console.error('Token is not valid or unauthorized:', error);
    } else {
      console.error('Error complite todo:', error);
    }
    return [{'error': 'Error complite todo'}];
  }
}


export { userLogin, getTodos, logout, userRegister, addTodo, todoDelete, toComplete, getUsername };