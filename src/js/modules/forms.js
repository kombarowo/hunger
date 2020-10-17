import Request from "../services/requests";
import Parser from "../services/parser";

export default class Form {
  constructor({selector = '', url = ''} = {}) {
    this.$forms = document.querySelectorAll(selector);
    this.url = url;
  }

  init() {
    this.sendForm = this.sendForm.bind(this)

    this.$forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        this.sendForm(form)
      })
    })
  }

  sendForm(form) {
    const formData = new FormData(form);

    const jsonData = new Parser(formData).toJson();

    const statusElement = this.createStatusElement();
    document.body.appendChild(statusElement);

    this.setStatus(statusElement, 'loading')

    new Request(this.url, jsonData)
      .postData()
      .then(resp => {
        if (!resp.ok) {
          this.finishSubmit(statusElement, form, 'error');
          return;
        }
        console.log(jsonData)
        this.finishSubmit(statusElement, form, 'ok');
      })
      .catch(error => {
        console.error(error);
      })
  }

  createStatusElement() {
    const status = document.createElement('div');
    status.classList.add('text');
    status.style.cssText = `
    position: fixed;
    z-index: 10;
    bottom: 5vw;
    right: 5vw;
    box-sizing: border-box;
    background: #fff;
    font-size: 18px;
    font-weight: 700;
    width: 175px;
    padding: 10px 15px;
    border: 1px solid gray;
    border-radius: 5px;
    text-align: center;
    text-transform: uppercase;
    `
    return status;
  }

  setStatus(status, text) {
    switch (text) {
      case 'loading': {
        status.textContent = 'Loading...'
        status.style.color = '';
        break
      }
      case 'done': {
        status.textContent = 'Success!!!'
        status.style.color = 'green';
        break
      }
      case 'error': {
        status.textContent = 'Error..'
        status.style.color = 'red';
        break
      }
    }
  }

  clearInputs(form) {
    const inputs = form.querySelectorAll('input');

    inputs.forEach(input => {
      input.value = '';
    })
  }

  clearStatus(elem) {
    elem.classList.add('fadeOut');
    setTimeout(() => {
      elem.remove();
    }, 1000);
  }

  finishSubmit(statusElement, form, status) {
    if (status === 'ok') {
      this.setStatus(statusElement, 'done');
      this.clearInputs(form);
      setTimeout(() => {
        this.clearStatus(statusElement);
      }, 1500);
    } else {
      this.setStatus(statusElement, 'error');
      this.clearInputs(form);
      setTimeout(() => {
        this.clearStatus(statusElement);
      }, 2000);
    }
  }
}