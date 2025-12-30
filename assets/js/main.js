
(function(){
  const nav = document.getElementById('mainNav');
  const onScroll = () => window.scrollY > 10 ? nav.classList.add('navbar-shrink') : nav.classList.remove('navbar-shrink');
  onScroll(); window.addEventListener('scroll', onScroll);

  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(a => { if(a.getAttribute('href') === path) a.classList.add('active'); });

  const counters = document.querySelectorAll('.count');
  let fired = false;
  const run = () => counters.forEach(el => {
    const t = +el.getAttribute('data-target'); const d = 1200; const s = performance.now();
    const step = (n)=>{ const p = Math.min((n-s)/d,1); el.textContent = Math.floor(p*t); if(p<1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  });
  const io = new IntersectionObserver((es)=> es.forEach(e=>{ if(e.isIntersecting && !fired){ fired = true; run(); } }), {threshold:.2});
  counters.forEach(c=>io.observe(c));

  const news = document.getElementById('newsletter');
  if(news){ news.addEventListener('submit', (e)=>{ e.preventDefault(); alert('Thanks for subscribing!'); e.target.reset(); }); }

  const contact = document.getElementById('contactForm');
  if(contact){
    contact.addEventListener('submit', (e)=>{
      e.preventDefault();
      if(!contact.checkValidity()){ contact.classList.add('was-validated'); return; }
      const toastEl = document.getElementById('formToast');
      new bootstrap.Toast(toastEl).show();
      contact.reset(); contact.classList.remove('was-validated');
    });
  }

  const y = document.getElementById('year'); if(y){ y.textContent = new Date().getFullYear(); }
  if(window.AOS){ AOS.init({ once:true, duration:700, easing:'ease-out-cubic' }); }
})();
