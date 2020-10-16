export default function animOnScroll() {
  const animItems = document.querySelectorAll('[data-anim]');

  if (animItems.length > 0) {
    window.addEventListener('scroll', anim)

    function anim() {
      const animStart = 4;
      animItems.forEach(item => {
        const animProps = item.dataset.anim.split(',');
        const itemHeight = item.offsetHeight;
        const itemOffset = calcOffset(item);

        let animStartPoint;
        if (itemHeight > window.innerHeight) {
          animStartPoint = window.innerHeight - window.innerHeight / animStart;
        } else {
          animStartPoint = window.innerHeight - itemHeight / animStart;
        }

        if ((pageYOffset > itemOffset.top - animStartPoint) && pageYOffset < (itemOffset.top + itemHeight)) {
          item.classList.add(animProps[0]);
          item.style.animationDelay = `${animProps[2]}s`;
        } else {
          if (animProps[1] !== 'once') {
            item.classList.remove(animProps[0]);
            item.style.animationDelay = `0s`;
          }
        }
      })
    }

    function calcOffset(elem) {
      const coords = elem.getBoundingClientRect();
      const scrollY = pageYOffset || document.documentElement.scrollTop;
      const scrollX = pageXOffset || document.documentElement.scrollWidth;
      return {top: coords.top + scrollY, left: coords.left + scrollX};
    }

    setTimeout(() => {
      anim();
    }, 500);
  }
}