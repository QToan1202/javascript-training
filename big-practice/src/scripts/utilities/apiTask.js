import constant from './constant';

export default class APITask {
  addTask(data) {
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return fetch(`${constant.API_URL}/tasks`, options)
      .then((response) => response.json())
      .catch((error) => {
        throw new Error(error);
      });
  }
}
