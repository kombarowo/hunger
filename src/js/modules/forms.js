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
    form.insertAdjacentElement('afterend', statusElement);

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
    status.style.cssText = `
    padding: 20px;
    color: #fff;
    font-size: 30px;
    font-weight: 700;
    width: 125px;
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
    elem.remove()
  }

  finishSubmit(statusElement, form, status) {
    if (status === 'ok') {
      this.setStatus(statusElement, 'done');
      this.clearInputs(form);
      setTimeout(() => {
        this.clearStatus(statusElement);
      }, 2000);
    } else {
      this.setStatus(statusElement, 'error');
      this.clearInputs(form);
      setTimeout(() => {
        this.clearStatus(statusElement);
      }, 2000);
    }
  }
}