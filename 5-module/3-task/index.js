function initCarousel() {
	const carouselHolder = document.querySelector(`[data-carousel-holder]`);
	const rightArrow = document.querySelector(".carousel__arrow_right");
	const leftArrow = document.querySelector(".carousel__arrow_left");
	const offsetStep = document.querySelector(".carousel__inner").offsetWidth;
	const carousel = document.querySelector(".carousel__inner");
	
	let clickCounter = 0;
  hideArrow(leftArrow);

	function hideArrow(arrow) { arrow.style.display = 'none'};
	function showArrow(arrow) { arrow.style.display = ''};
		
	function toggleArrow() {
		(clickCounter == 3) ? hideArrow(rightArrow) : showArrow(rightArrow);
		(clickCounter == 0) ? hideArrow(leftArrow) : showArrow(leftArrow);
	}

	function translateCarousel() {
			carousel.style.transform = `translateX(-${offsetStep*clickCounter}px)`;
	}

	carouselHolder.onclick = (e) => {
		if(e.target.closest('.carousel__arrow_right') && e.target.closest(".carousel__arrow_left")) return;

		if(e.target.closest(".carousel__arrow_right")) {
			++clickCounter;
			
			toggleArrow();
			translateCarousel();
		};

		if(e.target.closest(".carousel__arrow_left")) {
			--clickCounter;

			toggleArrow();
			translateCarousel();
		};

	}

}
