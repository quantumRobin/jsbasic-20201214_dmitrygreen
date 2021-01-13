function initCarousel() {
	
  const carouselHolder = document.querySelector(`[data-carousel-holder]`);
	let clickCounter = 0;
	const rightArrow = document.querySelector(".carousel__arrow_right");
	const leftArrow = document.querySelector(".carousel__arrow_left");
  leftArrow.style.display = 'none';

	carouselHolder.onclick = (e) => {
		if(e.target.closest('.carousel__arrow_right') && e.target.closest(".carousel__arrow_left")) return;

		const offsetStep = document.querySelector(".carousel__inner").offsetWidth;
		const carousel = document.querySelector(".carousel__inner");

		function hideElement(el) { el.style.display = 'none'};
		function showElement(el) { el.style.display = ''};
		
		function showArrow() {
			(clickCounter == 3) ? hideElement(rightArrow) : showElement(rightArrow);
			(clickCounter == 0) ? hideElement(leftArrow) : showElement(leftArrow);
		}

		function translateCarousel() {
			carousel.style.transform = `translateX(-${offsetStep*clickCounter}px)`;
		}

		if(e.target.closest(".carousel__arrow_right")) {
			++clickCounter;
			
			showArrow();
			translateCarousel();
		};

		if(e.target.closest(".carousel__arrow_left")) {
			--clickCounter;

			showArrow();
			translateCarousel();
		};

	}

}
