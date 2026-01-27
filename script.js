const newsletterBtn = document.querySelector('.popup-container button');
const popup = document.querySelector('.popup')
const cancelBtn = document.querySelector('.cancel')
const mainContainer = document.querySelector('.main-popup')

newsletterBtn.addEventListener('click', (e) => {
  e.stopPropagation()
  popup.classList.add('active')
  mainContainer.classList.add('overlay')
})

popup.addEventListener('click', (e) => {
  e.stopPropagation();
});

cancelBtn.addEventListener('click', () => {
  popup.classList.remove('active')
  mainContainer.classList.remove('overlay')
})

window.addEventListener('click', () => {
  popup.classList.remove('active')
  mainContainer.classList.remove('overlay')

})