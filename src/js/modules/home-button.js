export default class HomeButton {
  constructor(element) {
    this.$el = document.querySelector(element);
  }

  init() {
    this.toggleButton = this.toggleButton.bind(this);
    this.toggleButton();
    window.addEventListener('scroll', this.toggleButton);
  }

  toggleButton() {
    if (pageYOffset > window.innerHeight * 2) {
      this.$el.style.display = 'flex';
    } else {
      this.$el.style.display = 'none';
    }
  }
}