document.addEventListener("DOMContentLoaded", function(){
  function autoplayCarousel() {
    const carouselEl = document.getElementById("carousel");
    const slideContainerEl = carouselEl.querySelector("#slide-container");
    const slideEl = carouselEl.querySelector(".slide");
    const indicators = carouselEl.querySelector(".slide-indicators");
    let slideWidth = slideEl.offsetWidth;

    // Añadir el Active al primer Slide-Indicator
    indicators.querySelector(".slide-indicator").classList.add("active");

    // Add click handlers
    document
      .querySelector("#back-buttonCarrousel")
      .addEventListener("click", () => navigate("backward"));
    document
      .querySelector("#forward-buttonCarrousel")
      .addEventListener("click", () => navigate("forward"));
    document.querySelectorAll(".slide-indicator").forEach((dot, index) => {
      dot.addEventListener("click", () => navigate(index));
      dot.addEventListener("mouseenter", () => clearInterval(autoplay));
    });
    // Add keyboard handlers
    document.addEventListener("keydown", (e) => {
      if (e.code === "ArrowLeft") {
        clearInterval(autoplay);
        navigate("backward");
      } else if (e.code === "ArrowRight") {
        clearInterval(autoplay);
        navigate("forward");
      }
    });
    // Add resize handler
    window.addEventListener("resize", () => {
      slideWidth = slideEl.offsetWidth;
    });
    // Autoplay
    const autoplay = setInterval(() => navigate("forward"), 3000);
    slideContainerEl.addEventListener("mouseenter", () =>
      clearInterval(autoplay)
    );
    // Slide transition
    const getNewScrollPosition = (arg) => {
      const gap = 10;
      const maxScrollLeft = slideContainerEl.scrollWidth - slideWidth;
      if (arg === "forward") {
        const x = slideContainerEl.scrollLeft + slideWidth + gap;
        return x <= maxScrollLeft ? x : 0;
      } else if (arg === "backward") {
        const x = slideContainerEl.scrollLeft - slideWidth - gap;
        return x >= 0 ? x : maxScrollLeft;
      } else if (typeof arg === "number") {
        const x = arg * (slideWidth + gap);
        return x;
      }
    };
    const navigate = (arg) => {
      slideContainerEl.scrollLeft = getNewScrollPosition(arg);
    };
    // Slide indicators
    const slideObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const slideIndex = entry.target.dataset.slideindex;
            carouselEl
              .querySelector(".slide-indicator.active")
              .classList.remove("active");
            carouselEl
              .querySelectorAll(".slide-indicator")
              [slideIndex].classList.add("active");
            // console.log( carouselEl
            //   .querySelectorAll(".slide-indicator")
            //   [slideIndex]);
          }
        });
      },
      { root: slideContainerEl, threshold: 0.1 }
    );
    document.querySelectorAll(".slide").forEach((slide) => {
      slideObserver.observe(slide);
      // console.log(slide);
    });
  }

  autoplayCarousel();


});
