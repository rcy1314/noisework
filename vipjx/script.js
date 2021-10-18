let form = document.querySelector('form')
let returnBtn = document.querySelector('.card-back .return')
let timerBtn = document.querySelector('.card-back .timer')
let timer
let setTimer = document.querySelector('.set-timer')
let timer30 = document.querySelector('.set-timer-30')
let timer60 = document.querySelector('.set-timer-60')
let timer90 = document.querySelector('.set-timer-90')
let cancelBtn = document.querySelector('.cancel-btn')
let delay

window.onresize = function () {
  document.body.style.minHeight = window.innerHeight + 'px'
}
window.onresize()

form.addEventListener('submit', (e) => {
  e.preventDefault()
  let mediaInput = document.querySelector('#media-url')
  let mediaURL = mediaInput.value
  let api = document.querySelector('.api:checked').value
  let card = document.querySelector('.card')
  let player = document.querySelector('.player')
  
  mediaInput.blur()
  card.classList.add('turn-to-back')
  delay = window.setTimeout(function () {
    player.src = api + mediaURL
  }, 800)

  returnBtn.addEventListener('click', (e) => {
    player.src = ''
    card.classList.remove('turn-to-back')
    mediaInput.value = ''
    window.clearTimeout(delay)
  })
})

timerBtn.addEventListener('click', function () {
  console.log('clicked')
  setTimer.classList.toggle('show-set-timer')
})

timer30.addEventListener('click', (e) => {
  setTimer.classList.remove('show-set-timer')
  timer = window.setTimeout(function turnToFront() {
    returnBtn.click()
  }, 1800000)
})

timer60.addEventListener('click', (e) => {
  setTimer.classList.remove('show-set-timer')
  timer = window.setTimeout(function turnToFront() {
    returnBtn.click()
  }, 3600000)
})

timer90.addEventListener('click', (e) => {
  setTimer.classList.remove('show-set-timer')
  timer = window.setTimeout(function turnToFront() {
    returnBtn.click()
  }, 5400000)
})

cancelBtn.addEventListener('click', (e) => {
  setTimer.classList.remove('show-set-timer')
  if(timer) {
    window.clearTimeout(timer)
  }
})