export default class Request {
  constructor(url, data) {
    this.url = url;
    this.data = data;
  }

  async postData() {
    return await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(this.data)
    })
  }

  async getData() {
    return await fetch(this.url);
  }
}