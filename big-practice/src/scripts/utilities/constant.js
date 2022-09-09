const API_URL = 'http://localhost:3000/api';
const API_USERS = `${API_URL}/users`;
const API_TASKS = `${API_URL}/tasks`;
const API_COMMENTS = `${API_URL}/comments`;
const STATE = ['todo', 'in-progress', 'done', 'archived'];
const DRAG_TASK_BG = '#CEE5FF';
const EFFECT_ALLOWED = 'move';
const DROP_EFFECT = 'move';

export default {
  API_URL,
  API_USERS,
  API_TASKS,
  API_COMMENTS,
  STATE,
  DRAG_TASK_BG,
  EFFECT_ALLOWED,
  DROP_EFFECT,
};
