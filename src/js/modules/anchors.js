export default function initAnchors() {
  const items = document.querySelectorAll('[data-type="anchor"]');

  items.forEach(item => {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.getElementById(item.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        })
      }
    })
  })
}