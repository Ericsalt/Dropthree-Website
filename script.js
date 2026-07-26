(function(){
  "use strict";

  var nav = document.getElementById('nav');
  var navLinks = document.getElementById('navLinks');
  var navToggle = document.getElementById('navToggle');

  // menu mobile
  navToggle.addEventListener('click', function(){
    var open = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  navLinks.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // nav ganha fundo/blur mais forte ao rolar
  window.addEventListener('scroll', function(){
    nav.classList.toggle('is-scrolled', window.scrollY > 24);
  }, { passive: true });

  // indicador deslizante + estado ativo por seção
  var navIndicator = document.getElementById('navIndicator');
  var navItems = Array.prototype.slice.call(navLinks.querySelectorAll('a[data-nav]'));
  var currentActive = null;

  function moveIndicatorTo(link){
    if(!link){ navIndicator.style.opacity = '0'; return; }
    navIndicator.style.opacity = '1';
    navIndicator.style.transform = 'translateX(' + link.offsetLeft + 'px)';
    navIndicator.style.width = link.offsetWidth + 'px';
  }

  navItems.forEach(function(link){
    link.addEventListener('mouseenter', function(){ moveIndicatorTo(link); });
  });
  navLinks.addEventListener('mouseleave', function(){ moveIndicatorTo(currentActive); });

  var navSections = navItems
    .map(function(link){ return document.querySelector(link.getAttribute('href')); })
    .filter(Boolean);

  var sectionObserver = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        var id = '#' + entry.target.id;
        var link = navItems.find ? navItems.find(function(a){ return a.getAttribute('href') === id; })
                                  : navItems.filter(function(a){ return a.getAttribute('href') === id; })[0];
        if(link){
          navItems.forEach(function(a){ a.classList.remove('is-active'); });
          link.classList.add('is-active');
          currentActive = link;
          moveIndicatorTo(link);
        }
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
  navSections.forEach(function(s){ sectionObserver.observe(s); });

  window.addEventListener('resize', function(){ moveIndicatorTo(currentActive); });

  // cursor customizado — só em dispositivos com mouse de verdade
  if (window.matchMedia('(pointer: fine)').matches) {
    var htmlEl = document.documentElement;
    var cursorDot = document.getElementById('cursorDot');
    var cursorRing = document.getElementById('cursorRing');
    var mouseX = 0, mouseY = 0;
    var ringX = 0, ringY = 0;
    var started = false;
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    window.addEventListener('mousemove', function(e){
      mouseX = e.clientX; mouseY = e.clientY;
      if (!started) {
        started = true;
        ringX = mouseX; ringY = mouseY;
        htmlEl.classList.add('has-custom-cursor');
      }
      cursorDot.style.transform = 'translate3d(' + mouseX + 'px,' + mouseY + 'px,0) translate(-50%,-50%)';
      if (reduceMotion) {
        cursorRing.style.transform = 'translate3d(' + mouseX + 'px,' + mouseY + 'px,0) translate(-50%,-50%)';
      }
    });

    document.addEventListener('mouseleave', function(){ htmlEl.classList.remove('has-custom-cursor'); });
    document.addEventListener('mouseenter', function(){ if(started) htmlEl.classList.add('has-custom-cursor'); });

    if (!reduceMotion) {
      (function loop(){
        ringX += (mouseX - ringX) * 0.16;
        ringY += (mouseY - ringY) * 0.16;
        cursorRing.style.transform = 'translate3d(' + ringX + 'px,' + ringY + 'px,0) translate(-50%,-50%)';
        requestAnimationFrame(loop);
      })();
    }

    var hoverTargets = document.querySelectorAll('a, button, [data-cursor-hover]');
    hoverTargets.forEach(function(el){
      el.addEventListener('mouseenter', function(){ cursorRing.classList.add('is-hover'); });
      el.addEventListener('mouseleave', function(){ cursorRing.classList.remove('is-hover'); });
    });
  }

  // formulário de contato — monta um mailto: com os dados preenchidos
  var contatoForm = document.getElementById('contatoForm');
  if (contatoForm) {
    contatoForm.addEventListener('submit', function(e){
      e.preventDefault();
      var nome = document.getElementById('nome').value.trim();
      var email = document.getElementById('email').value.trim();
      var mensagem = document.getElementById('mensagem').value.trim();

      var subject = 'Contato pelo site — ' + nome;
      var body = 'Nome: ' + nome + '\n' + 'E-mail: ' + email + '\n\nMensagem:\n' + mensagem;

      var mailtoUrl = 'mailto:dropthree3@gmail.com'
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(body);

      window.location.href = mailtoUrl;
    });
  }

  // scroll reveal
  var revealEls = document.querySelectorAll('[data-reveal]');
  var revealObserver = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  // ===== COMMAND PALETTE =====
  var palette = document.getElementById('palette');
  var paletteInput = document.getElementById('paletteInput');
  var paletteList = document.getElementById('paletteList');
  var paletteStatus = document.getElementById('paletteStatus');
  var paletteOverlay = document.getElementById('paletteOverlay');
  var paletteTrigger = document.getElementById('paletteTrigger');
  var paletteKbd = document.getElementById('paletteKbd');
  var lastFocused = null;
  var activeIndex = 0;
  var filteredCommands = [];

  if (paletteKbd && navigator.platform && /Mac/.test(navigator.platform)) {
    paletteKbd.textContent = '⌘K';
  }

  var commands = [
    { label: 'Sobre', hint: 'seção', action: function(){ goTo('#sobre'); } },
    { label: 'Como trabalhamos', hint: 'seção', action: function(){ goTo('#metodo'); } },
    { label: 'Soluções', hint: 'seção', action: function(){ goTo('#solucoes'); } },
    { label: 'Stack tecnológico', hint: 'seção', action: function(){ goTo('#stack'); } },
    { label: 'Produtos', hint: 'seção', action: function(){ goTo('#produtos'); } },
    { label: 'Foundation', hint: 'seção', action: function(){ goTo('#foundation'); } },
    { label: 'Idea Hub', hint: 'seção', action: function(){ goTo('#idea-hub'); } },
    { label: 'Fundadores', hint: 'seção', action: function(){ goTo('#fundadores'); } },
    { label: 'Contato', hint: 'seção', action: function(){ goTo('#contato'); } },
    { label: 'Abrir Lumi', hint: 'produto ↗', action: function(){ window.open('https://lumi-br.lovable.app/', '_blank', 'noopener'); } },
    { label: 'Abrir Code Bridge', hint: 'produto ↗', action: function(){ window.open('https://ericsalt.github.io/Code-Brigde/', '_blank', 'noopener'); } },
    { label: 'Copiar e-mail', hint: 'dropthree3@gmail.com', action: function(){ copyEmail(); } },
    { label: 'Ir para o Instagram', hint: '↗', action: function(){ window.open('https://www.instagram.com/dropthree3/', '_blank', 'noopener'); } },
    { label: 'Termos de Uso', hint: 'documento', action: function(){ window.location.href = 'termos.html'; } },
    { label: 'Política de Privacidade', hint: 'documento', action: function(){ window.location.href = 'privacidade.html'; } }
  ];

  function goTo(hash){
    if (document.getElementById(hash.slice(1))) {
      document.querySelector(hash).scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = 'index.html' + hash;
    }
  }

  function copyEmail(){
    var text = 'dropthree3@gmail.com';
    var done = function(){
      paletteStatus.textContent = 'E-mail copiado: ' + text;
      paletteStatus.classList.add('is-visible');
      setTimeout(function(){ paletteStatus.classList.remove('is-visible'); }, 1800);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(done);
    } else {
      done();
    }
  }

  function renderList(query){
    var q = (query || '').toLowerCase().trim();
    filteredCommands = commands.filter(function(c){ return c.label.toLowerCase().indexOf(q) !== -1; });
    activeIndex = 0;
    paletteList.innerHTML = '';
    if (filteredCommands.length === 0) {
      var empty = document.createElement('li');
      empty.className = 'palette__empty';
      empty.textContent = 'Nada encontrado.';
      paletteList.appendChild(empty);
      return;
    }
    filteredCommands.forEach(function(cmd, i){
      var li = document.createElement('li');
      li.className = 'palette__item' + (i === 0 ? ' is-active' : '');
      li.innerHTML = '<span>' + cmd.label + '</span><span class="hint">' + cmd.hint + '</span>';
      li.addEventListener('click', function(){ runCommand(i); });
      li.addEventListener('mouseenter', function(){ setActive(i); });
      paletteList.appendChild(li);
    });
  }

  function setActive(i){
    activeIndex = i;
    Array.prototype.forEach.call(paletteList.children, function(el, idx){
      el.classList.toggle('is-active', idx === i);
    });
  }

  function runCommand(i){
    var cmd = filteredCommands[i];
    if (!cmd) return;
    if (cmd.label !== 'Copiar e-mail') closePalette();
    cmd.action();
  }

  function openPalette(){
    lastFocused = document.activeElement;
    palette.hidden = false;
    renderList('');
    paletteInput.value = '';
    setTimeout(function(){ paletteInput.focus(); }, 10);
    document.body.style.overflow = 'hidden';
  }

  function closePalette(){
    palette.hidden = true;
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }

  if (palette) {
    paletteTrigger.addEventListener('click', openPalette);
    paletteOverlay.addEventListener('click', closePalette);
    paletteInput.addEventListener('input', function(){ renderList(paletteInput.value); });

    palette.addEventListener('keydown', function(e){
      if (e.key === 'Escape') { closePalette(); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); setActive(Math.min(activeIndex + 1, filteredCommands.length - 1)); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(Math.max(activeIndex - 1, 0)); }
      else if (e.key === 'Enter') { e.preventDefault(); runCommand(activeIndex); }
    });

    window.addEventListener('keydown', function(e){
      var k = e.key.toLowerCase();
      if ((e.metaKey || e.ctrlKey) && k === 'k') {
        e.preventDefault();
        palette.hidden ? openPalette() : closePalette();
      }
    });
  }

  // ===== EFEITO DE DECODIFICAÇÃO NO HEADLINE =====
  var scrambleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&/\\<>';
  var reduceMotionGlobal = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function scrambleText(el, finalText, duration, startDelay){
    if (reduceMotionGlobal) { el.textContent = finalText; return; }
    setTimeout(function(){
      var totalFrames = Math.round(duration / 16);
      var frame = 0;
      var resolveFrame = finalText.split('').map(function(_, i){
        return Math.floor((i / finalText.length) * totalFrames * 0.65) + Math.random() * totalFrames * 0.35;
      });
      (function tick(){
        var out = '';
        for (var i = 0; i < finalText.length; i++) {
          var ch = finalText[i];
          if (ch === ' ') { out += ' '; continue; }
          out += (frame >= resolveFrame[i]) ? ch : scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        }
        el.textContent = out;
        frame++;
        if (frame <= totalFrames) requestAnimationFrame(tick);
        else el.textContent = finalText;
      })();
    }, startDelay);
  }

  document.querySelectorAll('.scramble-line').forEach(function(el, i){
    var finalText = el.textContent;
    scrambleText(el, finalText, 700, 250 + i * 220);
  });

  // ===== TILT 3D NOS CARDS DE PRODUTO =====
  if (window.matchMedia('(pointer: fine)').matches && !reduceMotionGlobal) {
    document.querySelectorAll('.card-produto').forEach(function(card){
      var bounds;
      card.style.transformStyle = 'preserve-3d';
      card.style.transition = 'transform .35s cubic-bezier(.22,1,.36,1)';

      card.addEventListener('mouseenter', function(){
        bounds = card.getBoundingClientRect();
        card.style.transition = 'none';
      });
      card.addEventListener('mousemove', function(e){
        if (!bounds) bounds = card.getBoundingClientRect();
        var px = (e.clientX - bounds.left) / bounds.width - 0.5;
        var py = (e.clientY - bounds.top) / bounds.height - 0.5;
        var rotateY = px * 10;
        var rotateX = py * -10;
        card.style.transform = 'perspective(900px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateZ(4px)';
      });
      card.addEventListener('mouseleave', function(){
        card.style.transition = 'transform .5s cubic-bezier(.22,1,.36,1)';
        card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)';
        bounds = null;
      });
    });
  }

  // ===== BOTÕES MAGNÉTICOS =====
  if (window.matchMedia('(pointer: fine)').matches && !reduceMotionGlobal) {
    document.querySelectorAll('.btn').forEach(function(btn){
      btn.addEventListener('mousemove', function(e){
        var b = btn.getBoundingClientRect();
        var x = (e.clientX - b.left - b.width / 2) * 0.28;
        var y = (e.clientY - b.top - b.height / 2) * 0.35;
        btn.style.transition = 'transform .08s linear';
        btn.style.transform = 'translate(' + x + 'px,' + y + 'px)';
      });
      btn.addEventListener('mouseleave', function(){
        btn.style.transition = 'transform .4s cubic-bezier(.34,1.56,.64,1)';
        btn.style.transform = 'translate(0,0)';
      });
    });
  }

  // ===== EASTER EGG NO CONSOLE =====
  console.log(
    '%c█ ▄ █  %cdropthree',
    'color:#2EC4B6;font-family:monospace;font-size:14px;',
    'color:#F2F3F5;font-family:monospace;font-size:14px;font-weight:bold;'
  );
  console.log(
    '%cCriamos soluções digitais para problemas reais.',
    'color:#9AA0AC;font-family:monospace;font-size:12px;'
  );
  console.log(
    '%cCurioso(a) o suficiente pra abrir o DevTools? A gente gosta disso.\nSe você constrói coisas de verdade, fala com a gente: dropthree3@gmail.com',
    'color:#2563A8;font-family:monospace;font-size:12px;'
  );

  // ===== BARRA DE PROGRESSO DE LEITURA =====
  var progressBar = document.getElementById('progressBar');
  if (progressBar) {
    var updateProgress = function(){
      var scrollTop = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = pct + '%';
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    updateProgress();
  }

  revealEls.forEach(function(el){ revealObserver.observe(el); });

})();
