const images = document.querySelectorAll("img[data-src]");

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;

        // Переносимо data-src → src
        img.src = img.dataset.src;

        // Коли зображення завантажилось — додаємо клас
        img.onload = () => {
          img.classList.add("loaded");
        };

        // Припиняємо спостереження
        observer.unobserve(img);
      }
    });
  },
  {
    rootMargin: "100px", // починаємо завантаження трохи раніше
    threshold: 0.1,
  }
);

// Починаємо спостереження за кожним зображенням
images.forEach((img) => observer.observe(img));

/**
 * === ДОДАТКОВО ===
 * Ручне завантаження зображень по кнопці
 */
document.getElementById("loadAll").addEventListener("click", () => {
  images.forEach((img) => {
    if (!img.src) {
      img.src = img.dataset.src;
      img.onload = () => img.classList.add("loaded");
      observer.unobserve(img);
    }
  });
});
