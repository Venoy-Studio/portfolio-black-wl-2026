/**
 * Client-side progressive enhancement interactions for Black WL 2026
 * Fictitious WhatsApp contact: +55 (81) 99999-0000 (5581999990000)
 */

document.addEventListener('DOMContentLoaded', function () {
  const FICTITIOUS_PHONE = '5581999990000';

  // --- 1. MOBILE NAVIGATION TOGGLE ---
  const mobileToggle = document.querySelector('.bw-mobile-toggle');
  const mobileNav = document.getElementById('bw-mobile-nav') || document.querySelector('.bw-mobile-nav');
  
  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', function () {
      const isOpen = mobileNav.classList.contains('is-open');
      if (isOpen) {
        mobileNav.classList.remove('is-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      } else {
        mobileNav.classList.add('is-open');
        mobileToggle.setAttribute('aria-expanded', 'true');
      }
    });

    // Close mobile nav when clicking any link inside it
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('is-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- 2. HORIZON ANIMATION TOGGLE ---
  const horizonToggle = document.querySelector('.bw-horizon__toggle');
  const horizonField = document.querySelector('.bw-horizon__field');

  if (horizonToggle && horizonField) {
    horizonToggle.addEventListener('click', function () {
      const isRunning = horizonField.getAttribute('data-running') !== 'false';
      if (isRunning) {
        horizonField.setAttribute('data-running', 'false');
        horizonToggle.setAttribute('aria-pressed', 'true');
        horizonToggle.innerHTML = '<span aria-hidden="true">▶</span>Retomar animação';
      } else {
        horizonField.setAttribute('data-running', 'true');
        horizonToggle.setAttribute('aria-pressed', 'false');
        horizonToggle.innerHTML = '<span aria-hidden="true">Ⅱ</span>Pausar animação';
      }
    });
  }

  // --- 3. DIAGNOSIS TABS (DESKTOP) & ACCORDION (MOBILE) ---
  const diagnosisTabs = document.querySelectorAll('.bw-diagnosis__tab');
  const diagnosisTopics = document.querySelectorAll('.bw-diagnosis__topic');
  const accordionTriggers = document.querySelectorAll('.bw-diagnosis__accordion-trigger');
  const accordionItems = document.querySelectorAll('.bw-diagnosis__accordion-item');

  function setActiveDiagnosis(categoryKey) {
    // 1. Update desktop tabs
    diagnosisTabs.forEach(tab => {
      const isMatch = tab.id.includes(categoryKey);
      tab.setAttribute('data-active', isMatch ? 'true' : 'false');
      tab.setAttribute('aria-selected', isMatch ? 'true' : 'false');
      tab.tabIndex = isMatch ? 0 : -1;
    });

    // 2. Update desktop panels
    diagnosisTopics.forEach(topic => {
      const isMatch = topic.id.includes(categoryKey);
      topic.setAttribute('data-active', isMatch ? 'true' : 'false');
      topic.setAttribute('aria-hidden', isMatch ? 'false' : 'true');
      if (isMatch) {
        topic.removeAttribute('inert');
        topic.tabIndex = 0;
      } else {
        topic.setAttribute('inert', '');
        topic.tabIndex = -1;
      }
    });

    // 3. Update mobile accordion
    accordionItems.forEach(item => {
      const isMatch = item.querySelector(`[id*="${categoryKey}"]`) !== null;
      item.setAttribute('data-open', isMatch ? 'true' : 'false');
      
      const trigger = item.querySelector('.bw-diagnosis__accordion-trigger');
      if (trigger) {
        trigger.setAttribute('aria-expanded', isMatch ? 'true' : 'false');
      }

      const panel = item.querySelector('.bw-diagnosis__accordion-panel');
      if (panel) {
        panel.setAttribute('aria-hidden', isMatch ? 'false' : 'true');
        if (isMatch) {
          panel.removeAttribute('inert');
        } else {
          panel.setAttribute('inert', '');
        }
      }
    });
  }

  diagnosisTabs.forEach(tab => {
    tab.addEventListener('click', function () {
      const id = tab.id || '';
      const key = id.split('-tab-')[1] || '';
      if (key) setActiveDiagnosis(key);
    });
  });

  accordionTriggers.forEach(trigger => {
    trigger.addEventListener('click', function () {
      const id = trigger.id || '';
      const key = id.split('-mobile-trigger-')[1] || '';
      const item = trigger.closest('.bw-diagnosis__accordion-item');
      const isOpen = item && item.getAttribute('data-open') === 'true';

      if (isOpen) {
        // Close if already open
        item.setAttribute('data-open', 'false');
        trigger.setAttribute('aria-expanded', 'false');
        const panel = item.querySelector('.bw-diagnosis__accordion-panel');
        if (panel) {
          panel.setAttribute('aria-hidden', 'true');
          panel.setAttribute('inert', '');
        }
      } else if (key) {
        setActiveDiagnosis(key);
      }
    });
  });

  // --- 4. FEATURE CAROUSEL (VIDEOS & BEFORE/AFTER) ---
  const carousel = document.querySelector('.bw-feature-carousel');
  if (carousel) {
    const slides = Array.from(carousel.querySelectorAll('.bw-feature-carousel__slide'));
    let currentSlide = 0;

    function updateCarousel(newIndex) {
      if (newIndex < 0) newIndex = slides.length - 1;
      if (newIndex >= slides.length) newIndex = 0;
      currentSlide = newIndex;

      slides.forEach((slide, idx) => {
        const offset = idx - currentSlide;
        const isActive = idx === currentSlide;

        slide.classList.toggle('is-active', isActive);
        slide.setAttribute('aria-hidden', isActive ? 'false' : 'true');
        slide.setAttribute('data-position', offset);

        // Visual 3D transform effect
        if (isActive) {
          slide.style.transform = 'translateX(0%) scale(1) rotateY(0deg)';
          slide.style.zIndex = '10';
          slide.style.opacity = '1';
          slide.style.filter = 'blur(0px)';
          slide.style.visibility = 'visible';
          slide.style.pointerEvents = 'auto';
        } else if (offset === -1 || (currentSlide === 0 && idx === slides.length - 1)) {
          slide.style.transform = 'translateX(-75%) scale(0.85) rotateY(15deg)';
          slide.style.zIndex = '5';
          slide.style.opacity = '0.5';
          slide.style.filter = 'blur(1px)';
          slide.style.visibility = 'visible';
          slide.style.pointerEvents = 'none';
        } else {
          slide.style.transform = 'translateX(75%) scale(0.85) rotateY(-15deg)';
          slide.style.zIndex = '5';
          slide.style.opacity = '0.5';
          slide.style.filter = 'blur(1px)';
          slide.style.visibility = 'visible';
          slide.style.pointerEvents = 'none';
        }

        // Pause video in inactive slides
        const video = slide.querySelector('video');
        if (video && !isActive) {
          video.pause();
        }
      });
    }

    // Attach click events on slides to select them
    slides.forEach((slide, idx) => {
      slide.addEventListener('click', (e) => {
        if (!slide.classList.contains('is-active')) {
          e.preventDefault();
          updateCarousel(idx);
        }
      });
    });

    // Handle video click to play/pause with sound
    carousel.querySelectorAll('video').forEach(video => {
      video.addEventListener('click', function () {
        if (video.paused) {
          video.play();
        } else {
          video.pause();
        }
      });
    });
  }

  // --- 5. REVIEW CARDS FLIP (3D ROTATION TO PROOF) ---
  const reviewCards = document.querySelectorAll('.bw-review-card');
  reviewCards.forEach(card => {
    const flipBtn = card.querySelector('.bw-review-card__original');
    const backBtn = card.querySelector('.bw-review-card__back-footer .bw-review-card__original');

    if (flipBtn) {
      flipBtn.addEventListener('click', function (e) {
        e.preventDefault();
        card.setAttribute('data-flipped', 'true');
        flipBtn.setAttribute('aria-expanded', 'true');
      });
    }

    if (backBtn) {
      backBtn.addEventListener('click', function (e) {
        e.preventDefault();
        card.setAttribute('data-flipped', 'false');
        if (flipBtn) flipBtn.setAttribute('aria-expanded', 'false');
      });
    }
  });

  // --- 6. WAITLIST FORM HANDLING WITH FICTITIOUS WHATSAPP ---
  const formPanel = document.querySelector('.bw-form-panel');
  const form = document.querySelector('form.bw-form');
  const phoneInput = form ? form.querySelector('input[name="phone"]') : null;

  // Phone input mask: (XX) XXXXX-XXXX
  if (phoneInput) {
    phoneInput.addEventListener('input', function (e) {
      let val = e.target.value.replace(/\D/g, '');
      if (val.length > 11) val = val.slice(0, 11);
      
      let formatted = val;
      if (val.length > 2) {
        formatted = '(' + val.slice(0, 2) + ') ' + val.slice(2);
      }
      if (val.length > 7) {
        formatted = '(' + val.slice(0, 2) + ') ' + val.slice(2, 7) + '-' + val.slice(7);
      }
      e.target.value = formatted;
    });
  }

  // Secondary interest buttons pre-select or focus form
  document.querySelectorAll('.bw-secondary-interest button, .bw-footer__interests button').forEach(btn => {
    btn.addEventListener('click', function () {
      const text = btn.textContent.trim();
      const goalSelect = document.querySelector('select[name="goal"]');
      if (goalSelect) {
        if (text.includes('novo')) goalSelect.value = 'Trocar de medida';
        else if (text.includes('Materiais')) goalSelect.value = 'Comprar material para produção';
      }
      const formEl = document.getElementById('lista-vip');
      if (formEl) {
        formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const nameInput = formEl.querySelector('input[name="name"]');
        if (nameInput) nameInput.focus();
      }
    });
  });

  // Handle Form Submission
  if (form && formPanel) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const nameInput = form.querySelector('input[name="name"]');
      const goalSelect = form.querySelector('select[name="goal"]');
      const consentCheck = form.querySelector('input[name="consent"]');

      const name = nameInput ? nameInput.value.trim() : '';
      const phone = phoneInput ? phoneInput.value.trim() : '';
      const goal = goalSelect ? goalSelect.value : '';

      if (!name) {
        alert('Por favor, informe seu nome.');
        if (nameInput) nameInput.focus();
        return;
      }

      if (!phone || phone.replace(/\D/g, '').length < 10) {
        alert('Por favor, informe um WhatsApp válido com DDD.');
        if (phoneInput) phoneInput.focus();
        return;
      }

      if (consentCheck && !consentCheck.checked) {
        alert('Por favor, aceite os termos para continuar.');
        consentCheck.focus();
        return;
      }

      // Build personalized WhatsApp text
      let message = `Olá! Meu nome é ${name} e quero entrar na Lista Black WL 2026.`;
      if (goal) {
        message += `\nMeu objetivo: ${goal}.`;
      }
      message += `\nMeu WhatsApp: ${phone}.`;

      const waUrl = `https://wa.me/${FICTITIOUS_PHONE}?text=${encodeURIComponent(message)}`;

      // Show confirmation handoff view
      formPanel.innerHTML = `
        <div class="bw-handoff" role="status" aria-live="polite">
          <span class="bw-handoff__check">
            <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6 9 17l-5-5"></path>
            </svg>
          </span>
          <h3 id="bw-signup-title">Mensagem preparada com sucesso!</h3>
          <p style="margin: 12px 0; color: #43576e; font-size: 15px; line-height: 1.5;">
            Olá <strong>${escapeHtml(name)}</strong>! Clique no botão abaixo para concluir seu cadastro na Lista Black WL pelo WhatsApp fictício de demonstração:
          </p>
          <div style="background: #f0f7ff; border: 1px solid #c2dcff; border-radius: 12px; padding: 14px; margin-bottom: 20px; font-size: 14px; color: #10233f; word-break: break-word;">
            "${escapeHtml(message)}"
          </div>
          <a class="bw-button bw-button--wide" href="${waUrl}" target="_blank" rel="noopener noreferrer" style="margin-bottom: 12px;">
            Abrir mensagem no WhatsApp
            <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </a>
          <button type="button" class="bw-handoff__edit" id="btn-edit-form" style="display: block; margin: 10px auto; background: none; border: none; color: #125fd6; font-size: 14px; text-decoration: underline; cursor: pointer;">
            Voltar e editar meus dados
          </button>
          <p class="bw-handoff__privacy" style="font-size: 12px; color: #718298; margin-top: 14px;">
            Ambiente demonstrativo de clone com dados de contato fictícios (+55 81 99999-0000).
          </p>
        </div>
      `;

      // Open in WhatsApp
      window.open(waUrl, '_blank', 'noopener,noreferrer');

      // Allow editing
      const editBtn = document.getElementById('btn-edit-form');
      if (editBtn) {
        editBtn.addEventListener('click', function () {
          location.reload();
        });
      }
    });
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // --- 7. SMOOTH SCROLL OFFSET FOR FIXED HEADER ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          const header = document.querySelector('.bw-header');
          const headerHeight = header ? header.offsetHeight : 70;
          const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight - 16;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
});
