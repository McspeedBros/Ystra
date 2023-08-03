const yspralines = document.getElementById('box5');
const taarten = document.getElementById('box6');
const frisco = document.getElementById('box7');

yspralines.addEventListener('click', () => {
    window.open('https://www.instagram.com/p/CYzbAWjo9nj/?img_index=1', '_blank');
});

taarten.addEventListener('click', () => {
  window.open('https://www.instagram.com/stories/highlights/18031472161305585/', '_blank');
});

frisco.addEventListener('click', () => {
  window.open('https://www.instagram.com/p/Cfwzo2BoIW7/?img_index=1', '_blank');
});


const vanilla = document.getElementById('box1');
const mokka = document.getElementById('box2');
const straciatella = document.getElementById('box3');
const chocolate = document.getElementById('box4');

vanilla.addEventListener('click', () => {
  window.location.href = 'onsaanbod.html';
});

mokka.addEventListener('click', () => {
  window.location.href = 'onsaanbod.html';
});

straciatella.addEventListener('click', () => {
  window.location.href = 'onsaanbod.html';
});

chocolate.addEventListener('click', () => {
  window.location.href = 'onsaanbod.html';
});


function changeWidth() {
  const sponsors = document.querySelector("#sponsorcontainer");
  const screenWidth = window.innerWidth;

  // Check if the screen width is between the specified range (400px and 800px)
  if (screenWidth >= 767 && screenWidth <= 1693) {
    // change the width of the element
    sponsors.style.width = "90%";
  } else {
    // reset the width of the element
    sponsors.style.width = "70%";
  }
}

// Call the function on page load and whenever the window is resized
window.addEventListener('load', changeWidth);
window.addEventListener('resize', changeWidth);
