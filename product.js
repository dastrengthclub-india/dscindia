(() => {
  const programs = [
    {
      number: "04",
      title: "SPORTS REHABILITATION",
      image: "sports-rehabilitation.svg",
      alt: "Sports Rehabilitation",
      copy: "Return-to-training work built around mobility, stability, strength rebuilding, and confident movement after injury.",
      pill: "Recovery · Mobility · Rebuild",
      delay: "reveal-d3"
    },
    {
      number: "05",
      title: "CROSSFIT",
      image: "crossfit.svg",
      alt: "CrossFit",
      copy: "Constantly varied strength, skill, and conditioning sessions designed to build broad athletic capacity.",
      pill: "WOD · Skills · Engine",
      delay: "reveal-d1"
    },
    {
      number: "06",
      title: "FUNCTIONAL BODYBUILDING",
      image: "functional-bodybuilding.svg",
      alt: "Functional Bodybuilding",
      copy: "Hypertrophy training with purpose — controlled tempo, quality movement, and strength that carries over.",
      pill: "Muscle · Control · Symmetry",
      delay: "reveal-d2"
    },
    {
      number: "07",
      title: "POWERLIFTING",
      image: "powerlifting.svg",
      alt: "Powerlifting",
      copy: "Focused squat, bench, and deadlift coaching for stronger numbers, sharper technique, and meet-ready confidence.",
      pill: "Squat · Bench · Deadlift",
      delay: "reveal-d3"
    }
  ];

  function createTrainingCard(program) {
    const card = document.createElement("div");
    card.className = `training-card reveal ${program.delay}`;
    card.innerHTML = `
      <div class="tc-img"><img src="${program.image}" alt="${program.alt}" loading="lazy" decoding="async" /></div>
      <div class="tc-body">
        <div class="tc-number">${program.number}</div>
        <h3>${program.title}</h3>
        <p>${program.copy}</p>
        <span class="tc-pill">${program.pill}</span>
      </div>`;
    return card;
  }

  function addTrainingCards() {
    const grid = document.querySelector(".training-cards");
    if (!grid) return;

    const existingTitles = new Set(
      Array.from(grid.querySelectorAll("h3")).map((title) => title.textContent.trim().toUpperCase())
    );

    programs.forEach((program) => {
      if (!existingTitles.has(program.title)) {
        grid.appendChild(createTrainingCard(program));
      }
    });
  }

  function revealNewCards() {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".training-cards .reveal").forEach((el) => el.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll(".training-cards .reveal:not(.visible)").forEach((el) => observer.observe(el));
  }

  function initExpandedTraining() {
    addTrainingCards();
    revealNewCards();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initExpandedTraining);
  } else {
    initExpandedTraining();
  }
})();
