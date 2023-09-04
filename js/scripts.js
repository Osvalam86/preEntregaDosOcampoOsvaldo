document.addEventListener("DOMContentLoaded", () => {
  const path = document.location.pathname;

  // Home functionality
  if (path.includes("index.html")) {
    //DATA
    const $introContainer = document.getElementById("introContainer");

    const getInfo = () => {
      let $slideActive = document
        .querySelector(".slick-slide.is-active")
        .getAttribute("data-position");
      const info = dataHome[parseInt($slideActive)];
      if (!info) {
        return false;
      }
      const $content = `
    <h2 class="font-title">${info.title}</h2>
    ${info.intro}
    <a href="javascript:;" class="btn btn-primary btn--width mt-4 js-modal"
      >Saber más</a
    >
    `;
      $introContainer.innerHTML = $content;
    };

    // SLIDER HOME
    const $mainSlider = $("#mainSlider");

    $mainSlider.on("init", function (event, slick, currentSlide, nextSlide) {
      const $element = $(slick.$slides.get(currentSlide));
      const $prevSlide = $element[0].previousElementSibling;
      $prevSlide.classList.add("is-active");
      getInfo();
    });

    $mainSlider.slick({
      infinite: true,
      autoplay: false,
      slidesToShow: 3,
      slidesToScroll: 1,
      speed: 300,
      autoplaySpeed: 2000,
      centerMode: true,
      responsive: [
        {
          breakpoint: 1023,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    });

    $mainSlider.on(
      "afterChange",
      function (event, slick, currentSlide, nextSlide) {
        const $prevSlide = document.querySelector(".is-active");
        $prevSlide && $prevSlide.classList.remove("is-active");
        const $element = $(slick.$slides.get(currentSlide));
        const $mainSlide = $element.context.previousElementSibling;
        $mainSlide.classList.add("is-active");
        getInfo();
      }
    );
  }

  // MODAL WORKING
  const $modal = new bootstrap.Modal(document.getElementById("modalWorking"));

  document.addEventListener("click", (e) => {
    if (e.target.matches(".js-modal")) {
      $modal.show();
    }
  });
});
