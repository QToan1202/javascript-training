import constant from "./constant";

export default class APITask {
  async addTask(data) {
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const result = await fetch(`${constant.API_URL}/tasks`, options).then((response) => response.json());
    return result;
  }
}
