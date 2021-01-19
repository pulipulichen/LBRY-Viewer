let setRewardIframeAutoReload = function () {
  return false // for debug
  setTimeout(() => {
     $('#RewardIframe').attr("src", $('#RewardIframe').attr("src"))
     setRewardIframeAutoReload()
  }, 3 * 60 * 1000)
}

let url = "https://odysee.com/$/big_hits"
//url = '_blank'

let drawPlayers = function () {
  let container = $('#main')
  
  let player = $(`<div class="player">
  <button type="button" class="ui fluid button not-playing-button">Not Playing</button>
  <button type="button" class="ui fluid positive button playing-button">Playing</button>
  <iframe src="${url}"></iframe>
</div>`)
  
  player.find('button').click(function () {
    let localPlayer = $(this).parents('.player:first')
    localPlayer.toggleClass('playing')
  })
  
  let max = 12
  for (let i = max; i > 0; i--) {
    let copiedPlayer = player.clone(true)
    
    copiedPlayer.find('button').each((j, button) => {
      button.innerText = '[' + i + '/' + max + '] ' 
              + button.innerText
    })
    
    copiedPlayer.prependTo(container)
  }
}

let setupLastUpdate = function () {
  let last = localStorage.getItem('last-update')
  
  if (!last) {
    last = new Date().getTime()
  }
  else {
    last = Number(last)
  }
  
  let lastDate = new Date(last)
  
  let container = $('.last-update')
  
  container.text(
          (lastDate.getMonth() + 1) 
          + '/'
          + lastDate.getDate() 
          + ' '
          + lastDate.getHours()
          + ':'
          + lastDate.getMinutes()
  )
  
  let lastDateTime = lastDate.getTime()
  let currentDateTime = new Date().getTime()
  let intervalHours = Math.floor( (currentDateTime - lastDateTime) / (1000 * 60 * 60) )
  
  let intervalContainer = $('.last-update-interval')
  intervalContainer.text(intervalHours)
  if (intervalHours > 24) {
    intervalContainer.addClass('green')
  }
  
  $('.last-update-button').click(() => {
    onLastUpdateButtonClick()
  })
}

let onLastUpdateButtonClick = function () {
  let lastDate = new Date()
  localStorage.setItem('last-update', lastDate.getTime())
  
  $('.last-update-interval').removeClass('green').text(0)
  let container = $('.last-update')
  
  container.text(
          (lastDate.getMonth() + 1) 
          + '/'
          + lastDate.getDate() 
          + ' '
          + lastDate.getHours()
          + ':'
          + lastDate.getMinutes()
  )
}

$(() => {
  
  setRewardIframeAutoReload()
  
  drawPlayers()
  
  setupLastUpdate()
})