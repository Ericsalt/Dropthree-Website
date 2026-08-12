(function(){
  "use strict";

  var reduceMotionGlobal = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
      } else {
        startRingLoop();
      }
    });

    document.addEventListener('mouseleave', function(){ htmlEl.classList.remove('has-custom-cursor'); });
    document.addEventListener('mouseenter', function(){ if(started) htmlEl.classList.add('has-custom-cursor'); });

    var ringLoopRunning = false;
    function startRingLoop(){
      if (ringLoopRunning || reduceMotion) return;
      ringLoopRunning = true;
      (function loop(){
        ringX += (mouseX - ringX) * 0.16;
        ringY += (mouseY - ringY) * 0.16;
        cursorRing.style.transform = 'translate3d(' + ringX + 'px,' + ringY + 'px,0) translate(-50%,-50%)';
        if (Math.abs(mouseX - ringX) > 0.1 || Math.abs(mouseY - ringY) > 0.1) {
          requestAnimationFrame(loop);
        } else {
          ringLoopRunning = false;
        }
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

  // ===== CARROSSEL "IDEIAS QUE INSPIRAM" =====
  var quotesTrack = document.getElementById('quotesTrack');
  if (quotesTrack) {
    var quotes = [
      {
        text: 'Onde não há lei, não há liberdade.',
        author: 'John Locke',
        work: 'Segundo Tratado sobre o Governo, 1689',
        reflection: 'Regras claras não aprisionam quem constrói — libertam quem sabe onde pisa. É assim que pensamos conhecimento: uma estrutura que dá liberdade, não que a limita.'
      },
      {
        text: 'Não é da benevolência do açougueiro ou do padeiro que esperamos nosso jantar, mas do interesse próprio deles.',
        author: 'Adam Smith',
        work: 'A Riqueza das Nações, 1776',
        reflection: 'Quando alguém compartilha o que aprendeu, todo o ecossistema ao redor cresce junto — mesmo que o ponto de partida seja apenas construir melhor.'
      },
      {
        text: 'Quem abre mão da liberdade essencial por um pouco de segurança temporária não merece nem liberdade, nem segurança.',
        author: 'Benjamin Franklin',
        work: '1755',
        reflection: 'Achamos que autonomia não se troca por conveniência — inclusive a autonomia de aprender por conta própria.'
      },
      {
        text: 'O Estado é a grande ficção pela qual todos tentam viver às custas de todos os outros.',
        author: 'Frédéric Bastiat',
        work: 'O Estado, 1848',
        reflection: 'Preferimos comunidades que se sustentam pelo que constroem juntas, não por dependência de estrutura alheia.'
      },
      {
        text: 'A liberdade não pode se estabelecer sem a moral, nem a moral sem a fé.',
        author: 'Alexis de Tocqueville',
        work: 'A Democracia na América, 1835',
        reflection: 'Conhecimento sem propósito é só informação. O Forge existe para formar critério, não só repertório.'
      },
      {
        text: 'A paz, e não a guerra, é a mãe de todas as coisas.',
        author: 'Ludwig von Mises',
        work: 'Liberalismo, 1927',
        reflection: 'Cooperação constrói mais do que disputa. Uma comunidade de aprendizado só funciona quando todo mundo ganha junto.'
      },
      {
        text: 'Quanto mais o Estado "planeja", mais difícil se torna planejar para o indivíduo.',
        author: 'Friedrich A. Hayek',
        work: 'O Caminho da Servidão, 1944',
        reflection: 'Ninguém aprende por procuração. Por isso o Forge é trilha, não grade curricular fechada.'
      },
      {
        text: 'Uma sociedade que coloca a igualdade antes da liberdade não terá nenhuma das duas.',
        author: 'Milton Friedman',
        work: 'Liberdade de Escolher, 1980',
        reflection: 'Acreditamos em abrir oportunidade igual pra todo mundo começar — o que cada um constrói depois é mérito de quem construiu.'
      },
      {
        text: 'Não existem soluções, apenas trade-offs.',
        author: 'Thomas Sowell',
        work: 'A Conflict of Visions, 1987',
        reflection: 'Toda trilha de aprendizado é uma escolha do que priorizar agora. Ensinar isso é tão importante quanto o conteúdo em si.'
      },
      {
        text: 'Alcançar a própria felicidade é o único propósito moral da vida.',
        author: 'Ayn Rand',
        work: 'A Revolta de Atlas, 1957',
        reflection: 'Ninguém aprende de verdade por obrigação. O Forge é para quem quer aprender por si.'
      }
    ];

    var quotesDots = document.getElementById('quotesDots');
    var quoteIndex = 0;
    var quoteTimer = null;

    quotes.forEach(function(q, i){
      var slide = document.createElement('div');
      slide.className = 'quote-slide' + (i === 0 ? ' is-active' : '');
      slide.innerHTML = '<blockquote>' + q.text + '</blockquote>'
        + '<cite>' + q.author + ' — ' + q.work + '</cite>'
        + '<p class="reflection">' + q.reflection + '</p>';
      quotesTrack.appendChild(slide);

      var dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', 'Ver citação ' + (i + 1) + ' de ' + quotes.length);
      if (i === 0) dot.classList.add('is-active');
      dot.addEventListener('click', function(){ showQuote(i); resetQuoteTimer(); });
      quotesDots.appendChild(dot);
    });

    var quoteSlides = quotesTrack.querySelectorAll('.quote-slide');
    var quoteDotEls = quotesDots.querySelectorAll('button');

    function showQuote(i){
      quoteSlides[quoteIndex].classList.remove('is-active');
      quoteDotEls[quoteIndex].classList.remove('is-active');
      quoteIndex = i;
      quoteSlides[quoteIndex].classList.add('is-active');
      quoteDotEls[quoteIndex].classList.add('is-active');
    }

    function nextQuote(){ showQuote((quoteIndex + 1) % quotes.length); }

    function resetQuoteTimer(){
      if (quoteTimer) clearInterval(quoteTimer);
      if (!reduceMotionGlobal) quoteTimer = setInterval(nextQuote, 6000);
    }

    resetQuoteTimer();
    var quotesCarousel = document.getElementById('quotesCarousel');
    quotesCarousel.addEventListener('mouseenter', function(){ if (quoteTimer) clearInterval(quoteTimer); });
    quotesCarousel.addEventListener('mouseleave', resetQuoteTimer);
  }

  // formulário "quero ser avisado" da Forge — monta um mailto:
  var forgeForm = document.getElementById('forgeForm');
  if (forgeForm) {
    forgeForm.addEventListener('submit', function(e){
      e.preventDefault();
      var email = document.getElementById('forge-email').value.trim();
      var subject = 'Quero ser avisado sobre a Forge';
      var body = 'E-mail para aviso: ' + email;
      window.location.href = 'mailto:dropthree3@gmail.com'
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(body);
    });
  }

  // ===== CONTADOR ANIMADO DA BARRA DE ESTATÍSTICAS =====
  var statEls = document.querySelectorAll('.stat__num[data-count]');
  if (statEls.length) {
    var countUp = function(el){
      var target = parseInt(el.getAttribute('data-count'), 10);
      var pad = parseInt(el.getAttribute('data-pad'), 10) || 0;
      if (reduceMotionGlobal) { el.textContent = String(target).padStart(pad, '0'); return; }
      var duration = 1100;
      var start = null;
      function tick(ts){
        if (start === null) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var value = Math.round(eased * target);
        el.textContent = String(value).padStart(pad, '0');
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    };
    var statObserver = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting) {
          countUp(entry.target);
          statObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    statEls.forEach(function(el){ statObserver.observe(el); });
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
    { label: 'Serviços', hint: 'infraestrutura', action: function(){ goTo('#infraestrutura'); } },
    { label: 'Foundation', hint: 'seção', action: function(){ goTo('#foundation'); } },
    { label: 'Fundadores', hint: 'seção', action: function(){ goTo('#fundadores'); } },
    { label: 'Forge', hint: 'ecossistema de aprendizagem', action: function(){ window.location.href = 'forge.html'; } },
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
      li.id = 'palette-option-' + i;
      li.setAttribute('role', 'option');
      li.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      li.innerHTML = '<span>' + cmd.label + '</span><span class="hint">' + cmd.hint + '</span>';
      li.addEventListener('click', function(){ runCommand(i); });
      li.addEventListener('mouseenter', function(){ setActive(i); });
      paletteList.appendChild(li);
    });
    if (paletteInput) paletteInput.setAttribute('aria-activedescendant', 'palette-option-0');
  }

  function setActive(i){
    activeIndex = i;
    Array.prototype.forEach.call(paletteList.children, function(el, idx){
      el.classList.toggle('is-active', idx === i);
      el.setAttribute('aria-selected', idx === i ? 'true' : 'false');
    });
    if (paletteInput && paletteList.children[i]) {
      paletteInput.setAttribute('aria-activedescendant', paletteList.children[i].id);
    }
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
