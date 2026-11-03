// ===== Edit your team here =====
const members = [
  { name: "Chea Puthearakwath", role: "Team member", photo: "images/Chea_Puthearakwath.png" },
  { name: "Chem Sokdanit",      role: "Team member", photo: "images/Chem_Sokdanit.jpg" },
  { name: "Dong Sophal",        role: "Team member", photo: "images/Dong_Sophal.jpg" },
  { name: "Roth Reach",         role: "Team member", photo: "images/RothReach.jpg" },
  { name: "Seang Visal",        role: "Team member", photo: "images/Seang_Visal.jpg" },
  { name: "Vong Mony",          role: "Team member", photo: "images/Vong_Mony.jpg" }
];

// ===== Build team cards =====
const grid = document.getElementById("grid");
members.forEach(m => {
  const card = document.createElement("article");
  card.className = "card reveal";
  card.innerHTML =
    '<div class="photo"><img src="' + m.photo + '" alt="Photo of ' + m.name + '"></div>' +
    '<div class="info"><h3>' + m.name + '</h3><p>' + m.role + '</p></div>';
  grid.appendChild(card);
});

// ===== Typing + deleting loop =====
const words = ["GPT.JS Team", "SETEC Institute"];
const typed = document.getElementById("typed");
let wordIndex = 0, charIndex = 0, deleting = false;

function type() {
  const word = words[wordIndex];
  typed.textContent = word.substring(0, charIndex);
  let delay = deleting ? 60 : 120;

  if (!deleting && charIndex === word.length) {
    deleting = true;
    delay = 1500;                       // pause when fully typed
  } else if (deleting && charIndex === 0) {
    deleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    delay = 400;                        // pause before next word
  } else {
    charIndex += deleting ? -1 : 1;
  }
  setTimeout(type, delay);
}
type();

// ===== Scroll reveal (cards come in one by one) =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const siblings = [...entry.target.parentElement.children];
      entry.target.style.transitionDelay = (siblings.indexOf(entry.target) % 3) * 120 + "ms";
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// ===== Scroll progress bar =====
const bar = document.getElementById("progress");
window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  bar.style.width = (window.scrollY / max * 100) + "%";
});
