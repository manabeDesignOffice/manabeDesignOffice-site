(() => {
  const hamburger = document.getElementById('hamburger');
  const menuDesktop = document.getElementById('menu');

  const drawer = menuDesktop.cloneNode(true);
  drawer.classList.remove('menu');
  drawer.classList.add('menu--drawer');
  drawer.id = 'menuDrawer';
  drawer.setAttribute('aria-hidden', 'true');
  hamburger.insertAdjacentElement('beforebegin', drawer);

  function setOpen(open){
    hamburger.setAttribute('aria-expanded', String(open));
    drawer.setAttribute('aria-hidden', String(!open));
    drawer.classList.toggle('is-open', open);
  }

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
    setOpen(!isOpen);
  });

  drawer.addEventListener('click', (e) => {
    if (e.target && e.target.tagName === 'A') setOpen(false);
  });

  document.addEventListener('click', (e) => {
    const isClickInside = drawer.contains(e.target) || hamburger.contains(e.target);
    if (!isClickInside) setOpen(false);
  });

  const y = document.getElementById('y');
  if (y) y.textContent = new Date().getFullYear();
})();
