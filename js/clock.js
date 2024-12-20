/* 数字时钟 */
window.addEventListener('DOMContentLoaded', () => {
  const clock = document.getElementById('clock');
  let isMouseOver = false;
  let isMobile = false;
  let isClicked = false;

  const checkMobile = () => {
      isMobile = window.innerWidth <= 600;
      clock.classList.toggle('show', !isMobile && isClicked);
  };

  window.addEventListener('resize', checkMobile);
  checkMobile();

  clock.addEventListener('mouseover', () => {
      isMouseOver = true;
      if (!isMobile) {
          clock.classList.add('show');
      }
  });

  clock.addEventListener('mouseout', () => {
      isMouseOver = false;
      if (!isMobile && !isClicked) {
          setTimeout(() => {
              if (!isMouseOver) {
                  clock.classList.remove('show');
              }
          }, 2000);
      }
  });

  clock.addEventListener('click', () => {
      isClicked = true;
      clock.classList.add('show');
  });

  setInterval(() => {
      if ((isMouseOver || isClicked) && !isMobile) {
          const date = new Date();
          clock.textContent = date.toLocaleTimeString('en-US', { hour12: false });
      }
  }, 1000);
});