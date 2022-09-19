export const API_URL = 'http://localhost:3000/api';
export const BASE_URL = 'http://localhost:1234';
export const LOGIN_PAGE = `${BASE_URL}/login.html`;
export const API_USERS = `${API_URL}/users`;
export const API_TASKS = `${API_URL}/tasks`;
export const API_COMMENTS = `${API_URL}/comments`;
export const AVATAR_URL = 'https://picsum.photos/id';
export const STATES = { 
  NEW_CREATE: 'todo',
  DOING: 'in-progress',
  FINISHED: 'done',
  STORED: 'archived',
};
export const DRAG_TASK_BG = '#CEE5FF';
export const EFFECT_ALLOWED = 'move';
export const DROP_EFFECT = 'move';
export const MESSAGES = {
  LOGIN_FAIL: 'Wrong username or password',
  PASSWORD: 'Password don\'t match',
  EMPTY_PASSWORD: 'Password is required!',
  LOGOUT: 'Are you sure wanna log out?',
  DELETE: 'Delete this task?',
  MISS_ID: 'Selected task don\'t have ID',
  EMPTY_NAME: 'Task name is empty',
  REQUIRED: 'All field are required',
}
