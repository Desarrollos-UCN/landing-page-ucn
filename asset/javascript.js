const track = document.getElementById('carouselTrack');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  let index = 0;
  let visibleCards = 4;

  function updateVisibleCards() {
    if (window.innerWidth < 576) visibleCards = 1;
    else if (window.innerWidth < 992) visibleCards = 2;
    else visibleCards = 4;
  }

  function slideTo(index) {
    const cardWidth = track.querySelector('.carousel-card').offsetWidth + 20;
    track.style.transform = `translateX(-${index * cardWidth}px)`;
  }

  function slideNext() {
    const totalCards = track.querySelectorAll('.carousel-card').length;
    console.log(totalCards);
    updateVisibleCards();
    index++;
    if (index > totalCards - visibleCards) index = 0;
    slideTo(index);
  }

  function slidePrev() {
    const totalCards = track.querySelectorAll('.carousel-card').length;
    updateVisibleCards();
    index--;
    if (index < 0) index = totalCards - visibleCards;
    slideTo(index);
  }

  nextBtn.addEventListener('click', slideNext);
  prevBtn.addEventListener('click', slidePrev);
  window.addEventListener('resize', updateVisibleCards);

//   setInterval(slideNext, 5000); // Auto deslizamiento cada 1 segundo

const navbar = document.getElementById('miNavbar');

window.addEventListener('scroll', () => {
const scrollY = window.scrollY || window.pageYOffset;
const threshold = window.innerHeight / 2;

if (scrollY > threshold) {
    navbar.classList.add('fixed-visible');
} else {
    navbar.classList.remove('fixed-visible');
}
});