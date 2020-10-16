export default class Menu {
  constructor(menuClass = '', {triggerClass = ''} = {}) {
    this.$el = document.querySelector(menuClass);
    this.$trigger = document.querySelector(triggerClass);
  }

  init() {
    this.toggleMenu = this.toggleMenu.bind(this);
    this.$trigger.addEventListener('click', this.toggleMenu);
  }

  toggleMenu() {
    let isOpen = this.$el.classList.contains('active');
    if (isOpen) {
      this.$el.classList.remove('active');
      this.$trigger.classList.remove('active');
      document.body.style.overflow = '';
    } else {
      this.$el.classList.add('active');
      this.$trigger.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }
}