function initCarousel() {
	
  let carouselHolder = document.querySelector(`[data-carousel-holder]`);
	let clickCounter = 0;
	let rightArrow = document.querySelector(".carousel__arrow_right");
	let leftArrow = document.querySelector(".carousel__arrow_left");
  leftArrow.style.display = 'none';

	carouselHolder.onclick = (e) => {
		if(e.target.closest('.carousel__arrow_right') && e.target.closest(".carousel__arrow_left")) return;

		let offsetStep = document.querySelector(".carousel__inner").offsetWidth;
		let carousel = document.querySelector(".carousel__inner");
		
		function showArrow() {
			(clickCounter == 3) ? rightArrow.style.display = 'none' : rightArrow.style.display = '';
			(clickCounter == 0) ? leftArrow.style.display = 'none' : leftArrow.style.display = '';
		}

		if(e.target.closest(".carousel__arrow_right")) {
			++clickCounter;
			
			showArrow();

			carousel.style.transform = `translateX(-${offsetStep*clickCounter}px)`;
		};

		if(e.target.closest(".carousel__arrow_left")) {
			--clickCounter;

			showArrow();

			carousel.style.transform = `translateX(-${offsetStep*clickCounter}px)`;
		};

	}

}
