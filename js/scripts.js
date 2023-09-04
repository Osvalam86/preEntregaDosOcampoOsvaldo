$(document).ready(function () {
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
    <a href="${info.link}" class="font-link btn btn-primary mt-4"
      >Saber más</a
    >
    `;
    $introContainer.innerHTML = $content;
  };

  // SLIDER
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
});
