let setRewardIframeAutoReload = function () {
  return false // for debug
  setTimeout(() => {
     $('#RewardIframe').attr("src", $('#RewardIframe').attr("src"))
     setRewardIframeAutoReload()
  }, 3 * 60 * 1000)
}

let drawPlayers = function () {
  let container = $('#main')
  
  let player = $(`<div class="player">
  <button type="button" class="ui fluid button not-playing-button">Not Playing</button>
  <button type="button" class="ui fluid positive button playing-button">Playing</button>
  <iframe src="https://odysee.com/$/big_hits"></iframe>
</div>`)
  
  player.find('button').click(function () {
    let localPlayer = $(this).parents('.player:first')
    localPlayer.toggleClass('playing')
  })
  
  let max = 15
  for (let i = max; i > 0; i--) {
    let copiedPlayer = player.clone(true)
    
    copiedPlayer.find('button').each((j, button) => {
      button.innerText = '[' + i + '/' + max + '] ' 
              + button.innerText
    })
    
    copiedPlayer.prependTo(container)
  }
}

$(() => {
  
  setRewardIframeAutoReload()
  
  drawPlayers()
})