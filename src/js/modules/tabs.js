export default class Tabs {
  constructor(tabsWrapper = '', {tabClass = '', content = ''} = {}) {
    this.$wrapper = document.querySelector(tabsWrapper);
    this.$tabs = this.$wrapper.querySelectorAll(tabClass);
    this.$contents = document.querySelectorAll(content);
  }

  init() {
    this.showTab = this.showTab.bind(this);
    console.log(this.$tabs)

    this.$tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        this.showTab(index);
      })
    })
  }

  showTab(i) {
    let type = '';

    this.$tabs.forEach((tab, index) => {
      tab.classList.remove('active');
      if (i === index) {
        tab.classList.add('active');
        type = tab.dataset.type;
        console.log(type);
      }
    })

    this.$contents.forEach(item => {
      if (item.dataset.type !== type) {
        item.style.display = 'none';
      } else {
        item.style.display = 'flex';
      }
    })
  }

}