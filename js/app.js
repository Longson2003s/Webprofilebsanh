/**
 * ============================================================================
 * BS. CKII. NGUYỄN HOÀNG ANH — INTERACTIVE MOTION & UI ENGINE
 * ============================================================================
 */

(function () {
  "use strict";

  const data = window.DOCTOR_PROFILE;
  if (!data) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouchDevice = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;

  /* --------------------------------------------------------------------------
   * 1. HELPERS & DATA HYDRATION
   * -------------------------------------------------------------------------- */
  const getByPath = (obj, path) =>
    path.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);

  function hydrateBindings() {
    document.querySelectorAll("[data-bind]").forEach((el) => {
      const value = getByPath(data, el.dataset.bind);
      if (value !== undefined) el.textContent = value;
    });

    document.querySelectorAll("[data-bind-src]").forEach((el) => {
      const value = getByPath(data, el.dataset.bindSrc);
      if (value) el.setAttribute("src", value);
    });

    document.querySelectorAll("[data-bind-href]").forEach((el) => {
      const value = getByPath(data, el.dataset.bindHref);
      if (value) el.setAttribute("href", value);
    });

    document.title = `${data.fullName} — Hồ Sơ Bác Sĩ`;
    const yearEl = document.getElementById("current-year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  function getPrincipleIcon(type) {
    const icons = {
      precision:
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"></circle><circle cx="12" cy="12" r="3"></circle><path d="M12 3v3m0 12v3M3 12h3m12 0h3"></path></svg>',
      personal:
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
      care:
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>'
    };
    return icons[type] || icons.precision;
  }

  function renderDynamicSections() {
    // 1) Marquee (nhân đôi nhóm để chạy vô tận không bị giật)
    const marqueeEl = document.getElementById("marquee-track");
    if (marqueeEl && Array.isArray(data.marqueeItems)) {
      const groupHtml = data.marqueeItems
        .map(
          (item) =>
            `<span class="marquee__item"><span class="marquee__sep" aria-hidden="true"></span>${item}</span>`
        )
        .join("");
      marqueeEl.innerHTML = `<div class="marquee__group">${groupHtml}</div><div class="marquee__group" aria-hidden="true">${groupHtml}</div>`;
    }

    // 2) About paragraphs
    const bioEl = document.getElementById("about-paragraphs");
    if (bioEl && data.about?.paragraphs) {
      bioEl.innerHTML = data.about.paragraphs.map((p) => `<p>${p}</p>`).join("");
    }

    // 3) Stats strip
    const statsEl = document.getElementById("stats-grid");
    if (statsEl && Array.isArray(data.stats)) {
      statsEl.innerHTML = data.stats
        .map(
          (st, idx) => `
          <div class="stat-card spotlight-card reveal-up" data-delay="${idx * 80}">
            <div class="stat-card__value" data-count-to="${st.value}" data-suffix="${st.suffix || ""}" data-decimals="${st.decimals || 0}">0${st.suffix || ""}</div>
            <div class="stat-card__label">${st.label}</div>
            <div class="stat-card__detail">${st.detail}</div>
          </div>`
        )
        .join("");
    }

    // 4) Principles
    const principlesEl = document.getElementById("principles-grid");
    if (principlesEl && data.about?.principles) {
      principlesEl.innerHTML = data.about.principles
        .map(
          (item, idx) => `
          <article class="principle-card spotlight-card reveal-up" data-delay="${idx * 90}">
            <div class="principle-card__icon">${getPrincipleIcon(item.icon)}</div>
            <div>
              <h4>${item.title}</h4>
              <p>${item.desc}</p>
            </div>
          </article>`
        )
        .join("");
    }

    // 5) Specialties tabs + dropdown options
    const specialtyListEl = document.getElementById("specialty-list");
    const inlineSelect = document.getElementById("inline-service-select");
    const modalSelect = document.getElementById("modal-service-select");

    if (Array.isArray(data.specialties)) {
      if (specialtyListEl) {
        specialtyListEl.innerHTML = data.specialties
          .map(
            (sp, idx) => `
            <button type="button" class="specialty-tab spotlight-card reveal-up ${idx === 0 ? "is-active" : ""}" data-specialty-idx="${idx}" data-delay="${idx * 70}" role="tab" aria-selected="${idx === 0}">
              <span class="specialty-tab__num">${sp.number}</span>
              <span class="specialty-tab__body">
                <h3>${sp.title}</h3>
                <p>${sp.shortDesc}</p>
              </span>
            </button>`
          )
          .join("");
      }

      const optionsHtml = data.specialties
        .map((sp) => `<option value="${sp.title}">${sp.title}</option>`)
        .join("");
      if (inlineSelect) inlineSelect.innerHTML = optionsHtml;
      if (modalSelect) modalSelect.innerHTML = optionsHtml;
    }

    // 6) Timeline
    const timelineEl = document.getElementById("timeline-items");
    if (timelineEl && Array.isArray(data.timeline)) {
      timelineEl.innerHTML = data.timeline
        .map(
          (item, idx) => `
          <article class="timeline-item spotlight-card reveal-up" data-delay="${idx * 80}">
            <span class="timeline-item__period">${item.period}</span>
            <h3>${item.role}</h3>
            <div class="timeline-item__org">${item.organization}</div>
            <p>${item.description}</p>
          </article>`
        )
        .join("");
    }

    // 7) Credentials
    const credEl = document.getElementById("credentials-grid");
    if (credEl && Array.isArray(data.credentials)) {
      credEl.innerHTML = data.credentials
        .map(
          (c, idx) => `
          <article class="credential-card spotlight-card reveal-up" data-delay="${idx * 80}">
            <span class="credential-card__year">${c.year}</span>
            <div>
              <h4>${c.title}</h4>
              <span>${c.issuer}</span>
            </div>
          </article>`
        )
        .join("");
    }

    // 8) Testimonials
    const slidesEl = document.getElementById("testimonial-slides");
    const dotsEl = document.getElementById("testimonial-dots");
    if (slidesEl && dotsEl && Array.isArray(data.testimonials)) {
      const starSvg =
        '<svg viewBox="0 0 24 24"><path d="M12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z"/></svg>';

      slidesEl.innerHTML = data.testimonials
        .map((t, idx) => {
          const initials = t.name
            .split(" ")
            .slice(-2)
            .map((w) => w[0])
            .join("")
            .toUpperCase();
          return `
            <article class="testimonial-slide ${idx === 0 ? "is-active" : ""}" data-slide-idx="${idx}">
              <div class="stars" aria-label="Đánh giá ${t.rating} trên 5 sao">${starSvg.repeat(t.rating || 5)}</div>
              <blockquote>“${t.quote}”</blockquote>
              <div class="testimonial-author">
                <div class="testimonial-avatar">${initials}</div>
                <div>
                  <strong>${t.name}</strong>
                  <span>${t.meta}</span>
                </div>
              </div>
            </article>`;
        })
        .join("");

      dotsEl.innerHTML = data.testimonials
        .map(
          (_, idx) =>
            `<button type="button" class="testimonial-dot ${idx === 0 ? "is-active" : ""}" data-dot-idx="${idx}" aria-label="Xem cảm nhận ${idx + 1}"></button>`
        )
        .join("");
    }

    // 9) Schedule
    const scheduleEl = document.getElementById("schedule-list");
    if (scheduleEl && Array.isArray(data.schedule)) {
      scheduleEl.innerHTML = data.schedule
        .map(
          (row) => `
          <div class="schedule-row">
            <div>
              <strong>${row.day}</strong>
              <small>${row.hours}</small>
            </div>
            <span class="schedule-row__status">${row.status}</span>
          </div>`
        )
        .join("");
    }

    // 10) FAQs
    const faqEl = document.getElementById("faq-list");
    if (faqEl && Array.isArray(data.faqs)) {
      faqEl.innerHTML = data.faqs
        .map(
          (f, idx) => `
          <div class="faq-item ${idx === 0 ? "is-open" : ""}">
            <button type="button" class="faq-trigger" aria-expanded="${idx === 0}">
              <span>${f.question}</span>
              <span class="faq-trigger__icon" aria-hidden="true">+</span>
            </button>
            <div class="faq-panel">
              <div class="faq-panel__inner">
                <p>${f.answer}</p>
              </div>
            </div>
          </div>`
        )
        .join("");
    }
  }

  /* --------------------------------------------------------------------------
   * 2. PRELOADER & PAGE READY ORCHESTRATION
   * -------------------------------------------------------------------------- */
  function initPreloader() {
    const preloader = document.getElementById("preloader");
    const finish = () => {
      if (preloader) preloader.classList.add("is-done");
      document.body.classList.add("page-ready");
    };

    if (prefersReducedMotion) {
      finish();
      return;
    }

    window.addEventListener("load", () => {
      setTimeout(finish, 520);
    });
    // Fallback an toàn nếu ảnh tải chậm
    setTimeout(finish, 1800);
  }

  /* --------------------------------------------------------------------------
   * 3. THEME SWITCHER (LIGHT / DARK)
   * -------------------------------------------------------------------------- */
  function initTheme() {
    const toggle = document.getElementById("theme-toggle");
    const saved = localStorage.getItem("doctor-profile-theme");
    if (saved === "dark" || saved === "light") {
      document.documentElement.setAttribute("data-theme", saved);
    }

    if (!toggle) return;
    toggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "light";
      const next = current === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("doctor-profile-theme", next);
      showToast(next === "dark" ? "Đã chuyển sang giao diện Tối dịu mắt" : "Đã chuyển sang giao diện Sáng tinh gọn");
    });
  }

  /* --------------------------------------------------------------------------
   * 4. HEADER, SCROLL PROGRESS, ACTIVE NAV PILL & MOBILE DRAWER
   * -------------------------------------------------------------------------- */
  function initNavigation() {
    const header = document.getElementById("site-header");
    const progressBar = document.getElementById("scroll-progress");
    const navLinks = Array.from(document.querySelectorAll(".nav__link"));
    const navPill = document.getElementById("nav-pill");
    const sections = navLinks
      .map((link) => document.querySelector(link.getAttribute("href")))
      .filter(Boolean);

    function movePillTo(linkEl) {
      if (!navPill || !linkEl) return;
      navPill.style.opacity = "1";
      navPill.style.width = `${linkEl.offsetWidth}px`;
      navPill.style.transform = `translateX(${linkEl.offsetLeft - 5}px)`;
    }

    navLinks.forEach((link) => {
      link.addEventListener("mouseenter", () => movePillTo(link));
    });

    const navEl = document.getElementById("primary-nav");
    if (navEl) {
      navEl.addEventListener("mouseleave", () => {
        const active = navLinks.find((l) => l.classList.contains("is-active"));
        if (active) {
          movePillTo(active);
        } else if (navPill) {
          navPill.style.opacity = "0";
        }
      });
    }

    function onScroll() {
      const y = window.scrollY;
      if (header) header.classList.toggle("is-scrolled", y > 24);

      if (progressBar) {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const ratio = docHeight > 0 ? Math.min(Math.max(y / docHeight, 0), 1) : 0;
        progressBar.style.transform = `scaleX(${ratio})`;
      }

      // Active section detection
      let currentIdx = -1;
      const offset = y + 180;
      sections.forEach((sec, idx) => {
        if (offset >= sec.offsetTop) currentIdx = idx;
      });

      navLinks.forEach((link, idx) => {
        const active = idx === currentIdx;
        link.classList.toggle("is-active", active);
        if (active) movePillTo(link);
      });

      if (currentIdx === -1 && navPill) {
        navPill.style.opacity = "0";
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();

    // Mobile drawer
    const menuToggle = document.getElementById("menu-toggle");
    const drawer = document.getElementById("mobile-drawer");
    const setDrawer = (open) => {
      if (!drawer || !menuToggle) return;
      drawer.classList.toggle("is-open", open);
      drawer.setAttribute("aria-hidden", String(!open));
      menuToggle.classList.toggle("is-open", open);
      menuToggle.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("no-scroll", open);
    };

    if (menuToggle) {
      menuToggle.addEventListener("click", () => setDrawer(!drawer.classList.contains("is-open")));
    }

    document.querySelectorAll("[data-close-drawer], .mobile-drawer__link").forEach((el) => {
      el.addEventListener("click", () => setDrawer(false));
    });
  }

  /* --------------------------------------------------------------------------
   * 5. SCROLL REVEAL & EASING NUMBER COUNTERS
   * -------------------------------------------------------------------------- */
  function animateCounter(el) {
    const target = parseFloat(el.dataset.countTo);
    const suffix = el.dataset.suffix || "";
    const decimals = parseInt(el.dataset.decimals || "0", 10);
    if (Number.isNaN(target)) return;

    if (prefersReducedMotion) {
      el.textContent = formatNumber(target, decimals) + suffix;
      return;
    }

    const duration = 1500;
    const startTime = performance.now();

    function frame(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      // Ease out quart
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = target * eased;
      el.textContent = formatNumber(current, decimals) + suffix;
      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        el.textContent = formatNumber(target, decimals) + suffix;
      }
    }

    requestAnimationFrame(frame);
  }

  function formatNumber(num, decimals) {
    if (decimals > 0) {
      return num.toFixed(decimals).replace(".", ",");
    }
    return Math.round(num).toLocaleString("vi-VN");
  }

  function initScrollReveal() {
    const targets = document.querySelectorAll(".reveal-up, .reveal-scale");
    if (!("IntersectionObserver" in window) || prefersReducedMotion) {
      targets.forEach((el) => el.classList.add("is-visible"));
      document.querySelectorAll("[data-count-to]").forEach(animateCounter);
      return;
    }

    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const delay = parseInt(el.dataset.delay || "0", 10);
          setTimeout(() => {
            el.classList.add("is-visible");
            const counter = el.querySelector("[data-count-to]");
            if (counter && !counter.dataset.counted) {
              counter.dataset.counted = "1";
              animateCounter(counter);
            }
          }, delay);
          obs.unobserve(el);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
    );

    targets.forEach((el) => revealObserver.observe(el));
  }

  /* --------------------------------------------------------------------------
   * 6. CUSTOM CURSOR, MAGNETIC BUTTONS, 3D TILT & CARD SPOTLIGHT
   * -------------------------------------------------------------------------- */
  function initPointerEffects() {
    if (isTouchDevice || prefersReducedMotion) return;

    // Custom trailing lens cursor
    const dot = document.getElementById("cursor-dot");
    const ring = document.getElementById("cursor-ring");
    if (dot && ring) {
      let mx = -100,
        my = -100,
        rx = -100,
        ry = -100;

      document.addEventListener("mousemove", (e) => {
        mx = e.clientX;
        my = e.clientY;
        document.body.classList.add("cursor-active");
        dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      });

      document.addEventListener("mouseleave", () => {
        document.body.classList.remove("cursor-active");
      });

      const loop = () => {
        rx += (mx - rx) * 0.16;
        ry += (my - ry) * 0.16;
        ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);

      const interactiveSelector = "a, button, .specialty-tab, .faq-trigger, input, select, textarea";
      document.addEventListener("mouseover", (e) => {
        if (e.target.closest(interactiveSelector)) {
          document.body.classList.add("cursor-hover");
        }
      });
      document.addEventListener("mouseout", (e) => {
        if (e.target.closest(interactiveSelector)) {
          document.body.classList.remove("cursor-hover");
        }
      });
    }

    // Magnetic buttons
    document.querySelectorAll(".magnetic").forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.22;
        const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.22;
        btn.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      });
      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "translate3d(0, 0, 0)";
      });
    });

    // 3D Tilt on Portrait Stage
    const stage = document.getElementById("portrait-stage");
    if (stage) {
      stage.addEventListener("mousemove", (e) => {
        const rect = stage.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        const rotY = px * 10;
        const rotX = -py * 8;
        stage.style.transform = `perspective(1100px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      });
      stage.addEventListener("mouseleave", () => {
        stage.style.transform = "perspective(1100px) rotateX(0deg) rotateY(0deg)";
      });
    }

    // Radial Spotlight on cards
    document.addEventListener("mousemove", (e) => {
      const card = e.target.closest(".spotlight-card");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      card.style.setProperty("--my", `${e.clientY - rect.top}px`);
    });
  }

  /* --------------------------------------------------------------------------
   * 7. SCROLL PARALLAX & TIMELINE BEAM
   * -------------------------------------------------------------------------- */
  function initScrollChoreography() {
    if (prefersReducedMotion) return;

    const parallaxItems = Array.from(document.querySelectorAll("[data-parallax]"));
    const timelineContainer = document.getElementById("timeline-container");
    const timelineBeam = document.getElementById("timeline-beam");
    const timelineItems = Array.from(document.querySelectorAll(".timeline-item"));

    let ticking = false;

    function update() {
      ticking = false;
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      // Subtle hero parallax
      if (scrollY < vh * 1.4) {
        parallaxItems.forEach((el) => {
          const speed = parseFloat(el.dataset.parallax || "0");
          el.style.transform = `translate3d(0, ${scrollY * speed}px, 0)`;
        });
      }

      // Vertical timeline beam fill
      if (timelineContainer && timelineBeam) {
        const rect = timelineContainer.getBoundingClientRect();
        const triggerPoint = vh * 0.62;
        const progress = Math.min(Math.max((triggerPoint - rect.top) / rect.height, 0), 1);
        timelineBeam.style.height = `${progress * 100}%`;

        timelineItems.forEach((item) => {
          const itemTop = item.getBoundingClientRect().top;
          item.classList.toggle("is-reached", itemTop < triggerPoint);
        });
      }
    }

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          requestAnimationFrame(update);
          ticking = true;
        }
      },
      { passive: true }
    );
    update();
  }

  /* --------------------------------------------------------------------------
   * 8. SPECIALTIES INTERACTIVE WORKSPACE
   * -------------------------------------------------------------------------- */
  function initSpecialties() {
    if (!Array.isArray(data.specialties) || data.specialties.length === 0) return;

    const detailBox = document.getElementById("specialty-detail");
    const numEl = document.getElementById("detail-num");
    const tagEl = document.getElementById("detail-tag");
    const titleEl = document.getElementById("detail-title");
    const descEl = document.getElementById("detail-desc");
    const durEl = document.getElementById("detail-duration");
    const recEl = document.getElementById("detail-recovery");
    const listEl = document.getElementById("detail-highlights");
    const bookBtn = document.getElementById("detail-book-btn");
    const tabs = Array.from(document.querySelectorAll(".specialty-tab"));

    let activeIndex = 0;

    function renderDetail(index, animate = true) {
      const sp = data.specialties[index];
      if (!sp) return;
      activeIndex = index;

      tabs.forEach((tab, idx) => {
        const active = idx === index;
        tab.classList.toggle("is-active", active);
        tab.setAttribute("aria-selected", String(active));
      });

      const applyContent = () => {
        if (numEl) numEl.textContent = sp.number;
        if (tagEl) tagEl.textContent = sp.tag;
        if (titleEl) titleEl.textContent = sp.title;
        if (descEl) descEl.textContent = sp.shortDesc;
        if (durEl) durEl.textContent = sp.duration;
        if (recEl) recEl.textContent = sp.recovery;
        if (listEl) {
          listEl.innerHTML = sp.highlights.map((h) => `<li>${h}</li>`).join("");
        }
      };

      if (animate && detailBox && !prefersReducedMotion) {
        detailBox.classList.add("is-switching");
        setTimeout(() => {
          applyContent();
          detailBox.classList.remove("is-switching");
        }, 180);
      } else {
        applyContent();
      }
    }

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const idx = parseInt(tab.dataset.specialtyIdx || "0", 10);
        if (idx !== activeIndex) renderDetail(idx, true);
      });
    });

    if (bookBtn) {
      bookBtn.addEventListener("click", () => {
        const chosen = data.specialties[activeIndex]?.title;
        openBookingModal(chosen);
      });
    }

    renderDetail(0, false);
  }

  /* --------------------------------------------------------------------------
   * 9. TESTIMONIALS CAROUSEL (AUTO-PROGRESS, KEYBOARD & SWIPE)
   * -------------------------------------------------------------------------- */
  function initTestimonials() {
    const slides = Array.from(document.querySelectorAll(".testimonial-slide"));
    const dots = Array.from(document.querySelectorAll(".testimonial-dot"));
    const prevBtn = document.getElementById("prev-testimonial");
    const nextBtn = document.getElementById("next-testimonial");
    const stage = document.getElementById("testimonial-stage");
    const bar = document.getElementById("testimonial-progress-bar");

    if (slides.length === 0) return;

    const AUTOPLAY_MS = 6500;
    let current = 0;
    let elapsed = 0;
    let paused = false;
    let lastTick = performance.now();

    function goTo(nextIdx) {
      const total = slides.length;
      const target = (nextIdx + total) % total;

      slides.forEach((slide, idx) => {
        slide.classList.remove("is-active", "is-prev");
        if (idx === target) {
          slide.classList.add("is-active");
        } else if (idx === current) {
          slide.classList.add("is-prev");
        }
      });

      dots.forEach((dot, idx) => dot.classList.toggle("is-active", idx === target));
      current = target;
      elapsed = 0;
    }

    if (prevBtn) prevBtn.addEventListener("click", () => goTo(current - 1));
    if (nextBtn) nextBtn.addEventListener("click", () => goTo(current + 1));

    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        const idx = parseInt(dot.dataset.dotIdx || "0", 10);
        goTo(idx);
      });
    });

    if (stage) {
      stage.addEventListener("mouseenter", () => (paused = true));
      stage.addEventListener("mouseleave", () => (paused = false));

      // Touch swipe
      let touchStartX = 0;
      stage.addEventListener(
        "touchstart",
        (e) => {
          touchStartX = e.touches[0].clientX;
        },
        { passive: true }
      );
      stage.addEventListener(
        "touchend",
        (e) => {
          const delta = e.changedTouches[0].clientX - touchStartX;
          if (Math.abs(delta) > 45) {
            goTo(delta < 0 ? current + 1 : current - 1);
          }
        },
        { passive: true }
      );
    }

    function tick(now) {
      const dt = now - lastTick;
      lastTick = now;

      if (!paused && !prefersReducedMotion) {
        elapsed += dt;
        if (bar) {
          bar.style.width = `${Math.min((elapsed / AUTOPLAY_MS) * 100, 100)}%`;
        }
        if (elapsed >= AUTOPLAY_MS) {
          goTo(current + 1);
        }
      }
      requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  /* --------------------------------------------------------------------------
   * 10. FAQ ACCORDION
   * -------------------------------------------------------------------------- */
  function initFaq() {
    const items = Array.from(document.querySelectorAll(".faq-item"));
    items.forEach((item) => {
      const btn = item.querySelector(".faq-trigger");
      if (!btn) return;
      btn.addEventListener("click", () => {
        const willOpen = !item.classList.contains("is-open");
        items.forEach((other) => {
          other.classList.remove("is-open");
          const otherBtn = other.querySelector(".faq-trigger");
          if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
        });
        if (willOpen) {
          item.classList.add("is-open");
          btn.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
   * 11. BOOKING MODAL, SLOT CHIPS & FORM HANDLING
   * -------------------------------------------------------------------------- */
  const modal = document.getElementById("booking-modal");
  const modalFormView = document.getElementById("modal-form-view");
  const modalSuccessView = document.getElementById("modal-success-view");
  const successSummary = document.getElementById("success-summary");

  function openBookingModal(preselectedService) {
    if (!modal) return;
    if (modalFormView) modalFormView.hidden = false;
    if (modalSuccessView) modalSuccessView.hidden = true;

    const modalSelect = document.getElementById("modal-service-select");
    if (preselectedService && modalSelect) {
      modalSelect.value = preselectedService;
    }

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
  }

  function closeBookingModal() {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
  }

  function showBookingSuccess({ name, service, date, slot }) {
    if (modal && !modal.classList.contains("is-open")) {
      openBookingModal();
    }
    if (modalFormView) modalFormView.hidden = true;
    if (modalSuccessView) modalSuccessView.hidden = false;

    if (successSummary) {
      const dateStr = date ? ` ngày ${date.split("-").reverse().join("/")}` : "";
      successSummary.textContent = `Cảm ơn ${name}. Lịch dự kiến cho dịch vụ "${service}"${dateStr} (${slot}) đã được ghi nhận. Trợ lý ${data.shortName} sẽ gọi xác nhận trong ít phút.`;
    }
  }

  function initBooking() {
    // Set default date = tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const isoDate = tomorrow.toISOString().split("T")[0];
    ["inline-date-input", "modal-date-input"].forEach((id) => {
      const input = document.getElementById(id);
      if (input) {
        input.min = new Date().toISOString().split("T")[0];
        input.value = isoDate;
      }
    });

    // Open & Close modal triggers
    document.querySelectorAll("[data-open-booking]").forEach((btn) => {
      btn.addEventListener("click", () => openBookingModal());
    });
    document.querySelectorAll("[data-close-modal]").forEach((el) => {
      el.addEventListener("click", closeBookingModal);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal?.classList.contains("is-open")) {
        closeBookingModal();
      }
    });

    // Slot chips interaction
    document.querySelectorAll("[data-slot-group]").forEach((group) => {
      const hiddenInput = group.parentElement.querySelector('input[name="slot"]');
      const chips = Array.from(group.querySelectorAll(".slot-chip"));
      chips.forEach((chip) => {
        chip.addEventListener("click", () => {
          chips.forEach((c) => c.classList.remove("is-selected"));
          chip.classList.add("is-selected");
          if (hiddenInput) hiddenInput.value = chip.dataset.slot || chip.textContent.trim();
        });
      });
    });

    // Handle both forms
    ["inline-booking-form", "modal-booking-form"].forEach((formId) => {
      const form = document.getElementById(formId);
      if (!form) return;

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const fd = new FormData(form);
        const name = (fd.get("name") || "").toString().trim();
        const phone = (fd.get("phone") || "").toString().trim();
        const service = (fd.get("service") || "").toString().trim();
        const date = (fd.get("date") || "").toString().trim();
        const slot = (fd.get("slot") || "").toString().trim();

        if (!name || phone.replace(/\D/g, "").length < 9) {
          showToast("Vui lòng nhập họ tên và số điện thoại hợp lệ (ít nhất 9 số).");
          const invalidField = !name ? form.querySelector('[name="name"]') : form.querySelector('[name="phone"]');
          if (invalidField) invalidField.focus();
          return;
        }

        showBookingSuccess({ name, service, date, slot });
        form.reset();
        // Reset default date after form.reset()
        const dateField = form.querySelector('input[type="date"]');
        if (dateField) dateField.value = isoDate;
      });
    });
  }

  /* --------------------------------------------------------------------------
   * 12. TOAST NOTIFICATION
   * -------------------------------------------------------------------------- */
  let toastTimer = null;
  function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("is-visible");
    }, 3200);
  }

  /* --------------------------------------------------------------------------
   * BOOTSTRAP
   * -------------------------------------------------------------------------- */
  hydrateBindings();
  renderDynamicSections();
  initPreloader();
  initTheme();
  initNavigation();
  initScrollReveal();
  initPointerEffects();
  initScrollChoreography();
  initSpecialties();
  initTestimonials();
  initFaq();
  initBooking();
})();
