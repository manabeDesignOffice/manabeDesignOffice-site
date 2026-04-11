(() => {
  const hamburger = document.getElementById('hamburger');
  const menuDesktop = document.getElementById('menu');

  if (hamburger && menuDesktop) {
    const drawer = menuDesktop.cloneNode(true);
    drawer.classList.remove('menu');
    drawer.classList.add('menu--drawer');
    drawer.id = 'menuDrawer';
    drawer.setAttribute('aria-hidden', 'true');

    hamburger.insertAdjacentElement('beforebegin', drawer);

    function setOpen(open) {
      hamburger.setAttribute('aria-expanded', String(open));
      drawer.setAttribute('aria-hidden', String(!open));
      drawer.classList.toggle('is-open', open);
    }

    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
      setOpen(!isOpen);
    });

    drawer.addEventListener('click', (e) => {
      if (e.target && e.target.tagName === 'A') {
        setOpen(false);
      }
    });

    document.addEventListener('click', (e) => {
      const isClickInside = drawer.contains(e.target) || hamburger.contains(e.target);
      if (!isClickInside) {
        setOpen(false);
      }
    });
  }

  const y = document.getElementById('y');
  if (y) {
    y.textContent = new Date().getFullYear();
  }

  fetch("./news.json")
    .then(res => res.json())
    .then(items => {
      const latest = items.slice(0, 3);

      const html = latest.map(item => `
        <article class="news-item">
          <h3 class="news-title">
            <a href="${item.link}" target="_blank" rel="noopener noreferrer">${item.title}</a>
          </h3>
          <p class="news-date">${item.date}</p>
        </article>
      `).join("");

      const news = document.getElementById("note-news");
      if (news) {
        news.innerHTML =
          html || `<p><a href="https://note.com/manabedesign2026" target="_blank" rel="noopener noreferrer">noteの記事一覧を見る</a></p>`;
      }
    })
    .catch(err => {
      console.error(err);
      const news = document.getElementById("note-news");
      if (news) {
        news.innerHTML =
          `<p><a href="https://note.com/manabedesign2026" target="_blank" rel="noopener noreferrer">noteの記事一覧を見る</a></p>`;
      }
    });
})();