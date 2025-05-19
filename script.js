const caption = document.querySelector('.caption');
var player = document.querySelector('.player');
const previewImg = document.querySelector('.preview-img');
var video = document.querySelector('.show-video');
var playPauseBtn = document.querySelector('.playpause');
const muteBtn = document.querySelector(".mute-btn");
var currentTime = document.querySelector('.current-time');
var totalTime = document.querySelector('.total-time');
var timelineContainer = document.querySelector('.timeline-container');
var captionsBtn = document.querySelector('.captions-btn');
var captionsBr = document.querySelector('.caption-border');
var fullScreenBtn = document.querySelector('.full-screen-btn');
var miniPlayerBtn = document.querySelector('.mini-player-btn');
var speedBtn = document.querySelector('.speed-btn');
var loopToggleBtn = document.querySelector('.loop-toggle-btn');
var sleepBtn = document.querySelector('.sleep-btn');
var volumeSlider = document.querySelector('input');
var title = document.querySelector('.title');
var durationTimer = document.querySelector('.duration-container');
var volumeContainer = document.querySelector('.volume-container');
var thumbnailImg = document.getElementsByClassName('thumbnail-img')[0];
var lsa = document.querySelector('.lsa');
var rsa = document.querySelector('.rsa');
const msa = document.querySelector('.msa')
const volpro = document.querySelector('.volume-pro')
const progress = document.querySelector('.volume-pro')
const vignette = document.querySelector('.vignette')
const vignettett = document.querySelector('.vignettett')
const skipArea = document.querySelector('.skiparea');
const back = document.querySelector('.back');
const source = document.querySelector('source');
const time = document.querySelector('.time');
const loader = document.querySelector('.loader');

function updateTime() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert hours from 24-hour to 12-hour format
  const displayHours = hours % 12 || 12;

  const currentTime = `${displayHours}:${minutes}:${seconds} ${ampm}`;
  time.innerText = currentTime;
}

// Update the time every second
setInterval(updateTime, 1000);
updateTime(); // Initial call to display time immediately





video.addEventListener("waiting", () => {
  loader.style.display = "flex"
})
video.addEventListener("playing", () => {
  loader.style.display = "none"
})
window.addEventListener('load', () => {
  if (player.classList.contains('captions')) {
    captionsBr.classList.add('captions')
  } else {
    captionsBr.classList.remove('captions')
  }
})

captionsBtn.addEventListener('click', toggleCaption)

back.addEventListener('click', () => {
  document.querySelector('.player').style.display = 'block'
  document.querySelector('.uploadarea').style.display = 'none'
})

volumeSlider.oninput = function () {
  progress.value = volumeSlider.value;
}


document.addEventListener('keydown', function (event) {
  if (event.code === 'Space') {
    const activeElement = document.activeElement.tagName;

    // Allow default action if the active element is an input or textarea
    if (activeElement !== 'VIDEO' || activeElement !== 'BODY') {
      event.preventDefault(); // Prevent the default action

      togglePlayPause()
    }

    // Prevent the default action if the active element is the video
    if (activeElement == 'VIDEO' || activeElement == 'BODY') {
      togglePlayPause()
    }
  }
});


msa.addEventListener('click', togglePlayPause)
msa.addEventListener('dblclick', toggleFullScreen)
//how to get div in center?

const lang = document.querySelector('.lang')
const langSlide = document.querySelector('.lang-slide')
document.addEventListener('mouseenter', () => {
  previewImg.src = video.src
})

langSlide.addEventListener('mouseenter', (e) => {
  langSlide.style.display = 'block'
  lang.style.transform = 'scale(1.5)'
  timelineContainer.style.display = 'none'
})
function rls() {
  lang.style.transform = 'scale(1)'
  langSlide.style.display = 'none'
  timelineContainer.style.display = 'block'
}
langSlide.addEventListener('mouseleave', rls)
lang.addEventListener('mouseenter', (e) => {
  lang.style.transform = 'scale(1.5)'
  langSlide.style.display = 'block'
  timelineContainer.style.display = 'none'
})
lang.addEventListener('mouseleave', (e) => {
  rls()
})
document.addEventListener('mouseover', () => {
  video.controls = false;
})

lsa.addEventListener('dblclick', () => {
  skip(-10)
})
rsa.addEventListener('dblclick', () => {
  skip(10)
})
lsa.addEventListener('click', () => {
  togglePlayPause();
})
rsa.addEventListener('click', () => {
  togglePlayPause();
})

subcribtion = true;

// canvas




document.addEventListener('ready', () => {
  if (timelineContainer.classList.contains('scrubbing')) {
    thumbnailImg.style.display = 'block'
  } else {
    thumbnailImg.style.display = 'none'
  }
})

timelineContainer.addEventListener('mouseenter', () => {
  justHidden = true;
})
timelineContainer.addEventListener('mouseleave', () => {
  justHidden = false;
})
volumeContainer.addEventListener('mouseenter', () => {
  volumeSlider.style.transform = 'scale(1.5)'
  volumeSlider.style.width = '90px'
  durationTimer.style.left = '250px'
})
volumeContainer.addEventListener('mouseleave', () => {
  volumeSlider.style.transform = 'scale(0)'
  volumeSlider.style.width = '0px'
  durationTimer.style.left = '120px'
})
volumeContainer.addEventListener('mouseenter', () => {
  progress.style.transform = 'scale(1.5)'
  progress.style.width = '88px'
  durationTimer.style.left = '250px'
})
volumeContainer.addEventListener('mouseleave', () => {
  progress.style.transform = 'scale(0)'
  progress.style.width = '0px'
  durationTimer.style.left = '120px'
})
window.addEventListener("beforeunload", function () {
  var volume = volumeSlider.value;
  localStorage.setItem('last_volume', volume);
  var currentTime = video.currentTime;
  localStorage.setItem('last_watch', currentTime);
  return;
});

var lasttime = localStorage.getItem('last_watch');
video.currentTime = lasttime;
var lastvol = localStorage.getItem('last_volume');
video.volume = lastvol;
progress.value = lastvol



document.addEventListener('DOMContentLoaded', function () {
  // Fetch the video file

  const orsrc = source.src
  fetch(orsrc)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.blob();
    })
    .then(blob => {
      // Create a Blob URL from the video file
      const videoBlobUrl = URL.createObjectURL(blob);

      // Set the Blob URL as the source of the <source> element
      source.src = videoBlobUrl;

      // Load the new video source
      video.load(); // Reload the video player with the new source
    })
    .catch(error => console.error('There was an issue fetching the video:', error));
});
function toggleCaption() {
  if (player.classList.contains('captions')) {
    player.classList.remove('captions');
    captionsBr.classList.remove('captions')
    caption.style.display = 'none'
  }
  else {
    player.classList.add('captions');
    captionsBr.classList.add('captions')
    caption.style.display = 'block'
  }
  if (document.querySelector('.effect').classList.contains('touched')) {
    setTimeout(() => {
      document.querySelector('.effect').classList.remove('touched')
    }, 100);
  } else {
    setTimeout(() => {
      document.querySelector('.effect').classList.add('touched')
    }, 0);
    setTimeout(() => {
      document.querySelector('.effect').classList.remove('touched')
    }, 500);
  }

  if (player.classList.contains('captions')) {
    document.querySelector('.effect').innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="150" style="scale: 5;transform:translateY(65%)" height="20" fill="currentColor" class="bi bi-badge-cc-fill" viewBox="0 0 16 16">
        <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm3.027 4.002c-.83 0-1.319.642-1.319 1.753v.743c0 1.107.48 1.727 1.319 1.727.69 0 1.138-.435 1.186-1.05H7.36v.114c-.057 1.147-1.028 1.938-2.342 1.938-1.613 0-2.518-1.028-2.518-2.729v-.747C2.5 6.051 3.414 5 5.018 5c1.318 0 2.29.813 2.342 2v.11H6.213c-.048-.638-.505-1.108-1.186-1.108m6.14 0c-.831 0-1.319.642-1.319 1.753v.743c0 1.107.48 1.727 1.318 1.727.69 0 1.139-.435 1.187-1.05H13.5v.114c-.057 1.147-1.028 1.938-2.342 1.938-1.613 0-2.518-1.028-2.518-2.729v-.747c0-1.7.914-2.751 2.518-2.751 1.318 0 2.29.813 2.342 2v.11h-1.147c-.048-.638-.505-1.108-1.187-1.108z"/>
      </svg>`
  } else {
    document.querySelector('.effect').innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="150" style="scale: 5;transform:translateY(65%)" height="20" fill="currentColor" class="bi bi-badge-cc" viewBox="0 0 16 16">
  <path d="M3.708 7.755c0-1.111.488-1.753 1.319-1.753.681 0 1.138.47 1.186 1.107H7.36V7c-.052-1.186-1.024-2-2.342-2C3.414 5 2.5 6.05 2.5 7.751v.747c0 1.7.905 2.73 2.518 2.73 1.314 0 2.285-.792 2.342-1.939v-.114H6.213c-.048.615-.496 1.05-1.186 1.05-.84 0-1.319-.62-1.319-1.727zm6.14 0c0-1.111.488-1.753 1.318-1.753.682 0 1.139.47 1.187 1.107H13.5V7c-.053-1.186-1.024-2-2.342-2C9.554 5 8.64 6.05 8.64 7.751v.747c0 1.7.905 2.73 2.518 2.73 1.314 0 2.285-.792 2.342-1.939v-.114h-1.147c-.048.615-.497 1.05-1.187 1.05-.839 0-1.318-.62-1.318-1.727z"/>
  <path d="M14 3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"/>
</svg>`
  }


}


volumeSlider.addEventListener("input", e => {
  video.volume = e.target.value;
  video.muted = e.target.value === 0;
})


video.addEventListener("volumechange", () => {
  volumeSlider.value = video.volume;
  let volumeLevel;
  if (video.muted || video.volume === 0) {
    volumeSlider.value = 0;
    volpro.value = 0;
    volumeLevel = "muted";
  } else if (video.volume >= 0.5) {
    volumeLevel = "high";
  } else {
    volumeLevel = "low";
  }

  if(!video.muted) {
    volpro.value = video.volume;
  }

  player.dataset.volumeLevel = volumeLevel;
})

function volumeupdown(volume) {
  video.volume += volume;
}
function skip(duration) {
  video.currentTime += duration;
}
document.addEventListener("keydown", e => {

  const tagName = document.activeElement.tagName.toLowerCase();

  if (tagName === "input") return

  switch (e.key.toLowerCase()) {
    case " ":
      if (tagName === "button") return
    case "k":
      togglePlayPause()
      break
    case "f":
      toggleFullScreen()
      break
    case "t":
      toggleTheaterMode()
      break
    case "s":
      hide()
      break
    case "i":
      toggleMiniPlayerMode()
      break
    case "m":
      toggleMute()
      break
    case "arrowleft":
      skip(-5)
      break
    case "arrowright":
      skip(5)
      break
    case "arrowup":
      volumeupdown(0.1)
      break
    case "arrowdown":
      volumeupdown(-0.1)
      break
    case "c":
      toggleCaption()
      break
  }
})


speedBtn.addEventListener("click", changePlaybackSpeed)

function changePlaybackSpeed() {
  let newPlaybackRate = video.playbackRate + 0.25;
  if (newPlaybackRate > 2) newPlaybackRate = 0.25;
  video.playbackRate = newPlaybackRate;
  speedBtn.textContent = `${newPlaybackRate}x`;
}
miniPlayerBtn.addEventListener('click', toggleMiniPlayerMode)
function toggleMiniPlayerMode() {
  if (player.classList.contains("mini-player")) {
    document.exitPictureInPicture();
  } else {
    player.classList.remove('full-screen')
    video.requestPictureInPicture();
  }
}

function hide() {
  timelineContainer.style.opacity = '0'
  document.querySelector('.controls').style.opacity = '0'
  document.body.style.cursor = 'none'
  document.querySelector('.tom').style.opacity = '0'

  vignette.style.opacity = '0'
vignettett.style.opacity = '0'
  player.classList.add('capsdown')
  document.querySelector('.revtime').style.opacity = '0'
  document.querySelector('.wm').style.display = 'block'
  time.style.opacity = '0.5'

}
function unhide() {
  timelineContainer.style.opacity = '1'
  clearTimeout(j)
  document.querySelector('.tom').style.opacity = '1'
  player.classList.remove('capsdown')
  document.querySelector('.controls').style.opacity = '1'
  document.body.style.cursor = 'default'
  vignette.style.opacity = '1'
vignettett.style.opacity = '1'
  document.querySelector('.revtime').style.opacity = '1'
  document.querySelector('.wm').style.display = 'none'
  time.style.opacity = '1'
}
//   var hid = false
//   var hidet;
// document.addEventListener('mousemove', ()=> {
//  if(!hid) {
//   hid = false;
//   unhide()
//   clearTimeout(hidet)
//  }
// var hidet = setTimeout(hide, 3000);
// }
// )

var justHidden
var j;

function boom() {
  if (video.paused) {
    justHidden = true
  }
  if (!video.paused) {
    justHidden = false;
  }
  if (!justHidden) {
    justHidden = false;
    clearTimeout(j);
    unhide();
    j = setTimeout(hide, 3000);
  }
}
$(document).ready(function () {

  $(document).mousemove(function () {
    if (video.paused) {
      justHidden = true
    }
    if (!video.paused) {
      justHidden = false;
    }
    if (!justHidden) {
      justHidden = false;
      clearTimeout(j);
      unhide();
      j = setTimeout(hide, 3000);
    }
  })
});

video.addEventListener('pause', () => {
  unhide()
  justHidden = true
})
video.addEventListener('play', () => {
  boom()
  justHidden = false
})
timelineContainer.addEventListener('mouseenter', () => {
  unhide()
  justHidden = true
})
timelineContainer.addEventListener('mouseleave', () => {
  justHidden = false
})

document.querySelector('.controls').addEventListener('mouseenter', () => {
  unhide()
  justHidden = true
})
document.querySelector('.controls').addEventListener('mouseleave', () => {
  justHidden = false
})






fullScreenBtn.addEventListener('click', toggleFullScreen);

function toggleFullScreen() {

  //   if(document.querySelector('.effect').classList.contains('touched')) {
  //     setTimeout(() => {
  //       document.querySelector('.effect').classList.remove('touched')
  //     }, 100);
  //   } else {
  // setTimeout(() => {
  //   document.querySelector('.effect').classList.add('touched')
  // }, 0);
  // setTimeout(() => {
  //   document.querySelector('.effect').classList.remove('touched')
  // }, 500);
  // }
  if (player.classList.contains('full-screen')) {
    player.classList.remove('full-screen');
    //   document.querySelector('.effect').innerHTML = `<svg class="open" viewBox="0 0 24 24">
    //   <path fill="currentColor"
    //     d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
    // </svg>`
    document.exitFullscreen();
  } else {
    document.body.requestFullscreen();
    player.classList.add('full-screen');
    //   document.querySelector('.effect').innerHTML = `<svg class="close" viewBox="0 0 24 24">
    //   <path fill="currentColor" d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
    // </svg>`
  }
};


document.querySelector('.thumb-indicator').addEventListener("mousemove", handleTimelineUpdate);
document.querySelector('.thumb-indicator').addEventListener("mousedown", toggleScrubbing);
timelineContainer.addEventListener("mousemove", handleTimelineUpdate);
timelineContainer.addEventListener("mousedown", toggleScrubbing);
document.addEventListener("mouseup", e => {
  if (isScrubbing) toggleScrubbing(e);
});
document.addEventListener("mousemove", e => {
  if (isScrubbing) handleTimelineUpdate(e);
});

let isScrubbing = false;
let wasPaused;
function toggleScrubbing(e) {
  const rect = timelineContainer.getBoundingClientRect();
  const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;
  isScrubbing = (e.buttons & 1) === 1;
  timelineContainer.classList.toggle("scrubbing", isScrubbing);
  timelineContainer.style.setProperty("--progress-position", percent)
  if (isScrubbing) {
    video.currentTime = percent * video.duration;
    timelineContainer.style.setProperty("--progress-position", percent)
    wasPaused;
    video.pause();
  } else {
    video.currentTime = percent * video.duration;
    if (!wasPaused) video.play();
  };

  handleTimelineUpdate(e);
};

document.querySelector('.thumb-indicator').addEventListener(' mousemove', (e) => {
  const rect = document.querySelector('.thumb-indicator').getBoundingClientRect();
  var pospreview = e.clientX - 10;
  const percent = Math.min(Math.max(1, e.x - rect.x), rect.width) / rect.width;
  timelineContainer.style.setProperty("--progress-position", percent)
  document.querySelector('.progress-line').style.width = pospreview + "px"
})

document.querySelector('.thumb-indicator').addEventListener('mousemove', (e) => {
  var pos1 = e.clientX - 85;
  var pospreview2 = e.clientX - 22;
  var pospreview = e.clientX - 10;
  var pospreview3 = e.clientX;
  document.querySelector('#aft').style.left = pospreview2 + "px"
  document.querySelector('.preview-indicator').style.left = pospreview + "px"
  timelineContainer.style.setProperty('--preview-position', pos1 + "px")

  if (pos1 < 0) {
    timelineContainer.style.setProperty('--preview-position', -10)
    document.querySelector('#aft').style.left = 64 + "px"
  }
  if (pos1 > 1741) {
    timelineContainer.style.setProperty('--preview-position', 1741 + "px")
    document.querySelector('#aft').style.left = pos1 + "px"
  }

  // if(pospreview > 1725) {
  //   document.querySelector('.preview-indicator').style.left = 1725 + "px"
  // }
})

function handleTimelineUpdate(e) {
  const rect = timelineContainer.getBoundingClientRect();
  const percent = Math.min(Math.max(1, e.x - rect.x), rect.width) / rect.width;
  const previewImgNumber = Math.floor((percent * video.duration));
  var pos1 = e.clientX - 85;
  var pospreview2 = e.clientX - 20;
  var pospreview = e.clientX - 50;
  var pospreview3 = e.clientX - 10;
  document.querySelector('#aft').style.left = pospreview2 + "px"

  timelineContainer.style.setProperty('--preview-scrubbling-position2', pospreview2 + "px")
  timelineContainer.style.setProperty('--preview-scrubbling-position', pospreview3 + "px")

  if (pospreview2 < -3) {
    timelineContainer.style.setProperty('--preview-scrubbling-position2', -3 + "px")
  }
  if (pospreview3 < 8) {
    timelineContainer.style.setProperty('--preview-scrubbling-position', 8 + "px")
  }
  var pospreview = e.clientX - 0;
  document.querySelector('.preview-indicator').style.left = pospreview + "px"
  timelineContainer.style.setProperty("--preview-position", pos1 + "px");

  if (pos1 < 0) {
    timelineContainer.style.setProperty('--preview-position', -10)
    document.querySelector('#aft').style.left = 64 + "px"
  }
  // if(pos1 > 1430) {
  //   timelineContainer.style.setProperty('--preview-position', pos1 + "px")
  //   document.querySelector('#aft').style.left = 1493 + "px"
  // }
  if (pos1 > 1275) {
    document.querySelector('.preview-indicator').style.left = 1275 + "px"
  }
  if (pos1 < -77) {
    document.querySelector('.preview-indicator').style.left = 0 + "px"
  }


  document.querySelector('.thattime').innerText = formatDuration(percent * video.duration);
  previewImg.currentTime = percent * video.duration
  // timelineContainer.style.setProperty("--preview-position", percent);
  timelineContainer.style.setProperty("--preview-time-position", percent);
  if (percent == 'NaN') {
    location.reload();
  }

  if (isScrubbing) {
    e.preventDefault();
  }
};
timelineContainer.addEventListener('click mousemove', (e) => {
  const rect = timelineContainer.getBoundingClientRect();
  var pospreview = e.clientX - 10;
  const percent = Math.min(Math.max(1, e.x - rect.x), rect.width) / rect.width;
  timelineContainer.style.setProperty("--progress-position", percent)
  document.querySelector('.progress-line').style.width = pospreview + "px"
})

timelineContainer.addEventListener('mousemove', (e) => {
  var pos1 = e.clientX - 85;
  var pospreview2 = e.clientX - 22;
  var pospreview = e.clientX - 17;
  var pospreview3 = e.clientX;
  document.querySelector('#aft').style.left = pospreview2 + "px"
  document.querySelector('.preview-indicator').style.left = pospreview + "px"
  timelineContainer.style.setProperty('--preview-position', pos1 + "px")

  if (pos1 < 0) {
    timelineContainer.style.setProperty('--preview-position', -10)
    document.querySelector('#aft').style.left = 64 + "px"
  }
  if (pos1 > 1741) {
    timelineContainer.style.setProperty('--preview-position', 1741 + "px")
    document.querySelector('#aft').style.left = 1493 + "px"
  }

  // if(pospreview > 1725) {
  //   document.querySelector('.preview-indicator').style.left = 1725 + "px"
  // }
})

function handleTimelineUpdate(e) {
  const rect = timelineContainer.getBoundingClientRect();
  const percent = Math.min(Math.max(1, e.x - rect.x), rect.width) / rect.width;
  const previewImgNumber = Math.floor((percent * video.duration));
  var pos1 = e.clientX - 85;
  var pospreview2 = e.clientX - 22;
  var pospreview = e.clientX - 10;
  var pospreview3 = e.clientX - 10;
  document.querySelector('#aft').style.left = pospreview2 + "px"

  timelineContainer.style.setProperty('--preview-scrubbling-position2', pospreview2 + "px")
  timelineContainer.style.setProperty('--preview-scrubbling-position', pospreview3 + "px")

  if (pospreview2 < -3) {
    timelineContainer.style.setProperty('--preview-scrubbling-position2', -3 + "px")
  }
  if (pospreview3 < 8) {
    timelineContainer.style.setProperty('--preview-scrubbling-position', 8 + "px")
  }
  var pospreview = e.clientX - 10;
  document.querySelector('.preview-indicator').style.left = pospreview + "px"
  timelineContainer.style.setProperty("--preview-position", pos1 + "px");

  if (pos1 < 0) {
    timelineContainer.style.setProperty('--preview-position', -10)
    document.querySelector('#aft').style.left = 64 + "px"
  }
  if (pos1 > 1741) {
    timelineContainer.style.setProperty('--preview-position', 1741 + "px")
    document.querySelector('#aft').style.left = 1493 + "px"
  }
  // if(pos1 > 1275) {
  //   document.querySelector('.preview-indicator').style.left = 1275 + "px"
  // }
  if (pos1 < -77) {
    document.querySelector('.preview-indicator').style.left = 0 + "px"
  }
  // if(pospreview > 1725) {
  //   document.querySelector('.preview-indicator').style.left = 1725 + "px"
  // }


  document.querySelector('.thattime').innerText = formatDuration(percent * video.duration);
  previewImg.currentTime = percent * video.duration
  // timelineContainer.style.setProperty("--preview-position", percent);
  timelineContainer.style.setProperty("--preview-time-position", percent);
  if (percent == 'NaN') {
    location.reload();
  }

  if (isScrubbing) {
    e.preventDefault();
  }
};

video.addEventListener('contextmenu', (e) => {
  e.preventDefault();
})

document.addEventListener('click', (e) => {
  if (document.querySelector('.fakeContextMenu')) {
    if (e.target.className !== "fakeContextMenu" && e.target.className !== "saveVideo" && e.target.className !== "fullscreenCont") {
      document.querySelector('.fakeContextMenu').remove();
    }
  } else { }
})

document.addEventListener('click', (e) => {
  if (document.querySelector('.fakeContextMenu')) {
    if (e.target.className == "saveVideo") {
      document.querySelector('.fakeContextMenu').remove();
      alert("Not Available");
    }

    if (e.target.className == "fullscreenCont") {
      toggleFullScreen();
      document.querySelector('.fakeContextMenu').remove();
    }
  } else { }
})
playPauseBtn.addEventListener('click', togglePlayPause);

video.addEventListener('timeupdate', () => {
  totalTime.textContent = formatDuration(video.duration);
})
video.addEventListener('timeupdate', () => {
  var rev = document.querySelector('.revtime');
  rev.innerHTML = formatDuration(video.duration - video.currentTime)
  currentTime.textContent = formatDuration(video.currentTime);
  const percent = video.currentTime / video.duration;
  timelineContainer.style.setProperty("--progress-position", percent);
})

function formatDuration(time) {
  const seconds = Math.floor(time % 60);
  const minutes = Math.floor(time / 60) % 60;
  const hours = Math.floor(time / 3600);
  if (hours === 0) {
    return `${minutes}:${leadingZeroFormatter.format(seconds)}`;
  } else {
    return `${hours}:${leadingZeroFormatter.format(
      minutes
    )}:${leadingZeroFormatter.format(seconds)}`;
  }
}

const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
  minimumIntegerDigits: 2,
})

video.addEventListener("enterpictureinpicture", () => {
  player.classList.add("mini-player")
})

video.addEventListener("leavepictureinpicture", () => {
  player.classList.remove("mini-player")
})
video.addEventListener('click', togglePlayPause);

function togglePlayPause() {
let effectTimeout; // global or higher-scope variable to track timeout
  const effectEl = document.querySelector('.effect');

  // Clear previous timeout to prevent overlapping
  if (effectTimeout) {
    clearTimeout(effectTimeout);
    effectTimeout = null;
  }

  // Always add touched, then remove it after some time
  effectEl.classList.add('touched');
  effectTimeout = setTimeout(() => {
    effectEl.classList.remove('touched');
  }, 500);

  // Toggle video playback
  video.paused ? video.play() : video.pause();

  // Update UI
  if (player.classList.contains('paused')) {
    playPauseBtn.innerHTML = `<svg class="pause-icon" viewBox="0 0 24 24">
      <path fill="currentColor" d="M14,19H18V5H14M6,19H10V5H6V19Z" />
    </svg>`;
    effectEl.innerHTML = `<svg class="pause-icon" viewBox="0 0 24 24">
      <path fill="currentColor" d="M14,19H18V5H14M6,19H10V5H6V19Z" />
    </svg>`;
  } else {
    playPauseBtn.innerHTML = `<svg class="play-icon" viewBox="0 0 24 24">
      <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
    </svg>`;
    effectEl.innerHTML = `<svg class="play-icon" viewBox="0 0 24 24">
      <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
    </svg>`;
  }

  // Additional flag (if needed)
  if (video.paused) {
    justHidden = true;
  }
}

document.addEventListener('fullscreenchange', () => {
  player.classList.toggle("full-screen", document.fullscreenElement);
}
);

video.addEventListener('play', () => {
  justHidden = false
  player.classList.remove('paused');
  playPauseBtn.innerHTML = `<svg class="pause-icon" viewBox="0 0 24 24">
      <path fill="currentColor" d="M14,19H18V5H14M6,19H10V5H6V19Z" />
    </svg>`;
})
video.addEventListener('pause', () => {
  justHidden = true
  playPauseBtn.innerHTML = `<svg class="play-icon" viewBox="0 0 24 24">
      <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
    </svg>`;
  player.classList.add('paused');
  unhide()
})

muteBtn.addEventListener("click", toggleMute);

function toggleMute() {
  if (document.querySelector('.effect').classList.contains('touched')) {
    setTimeout(() => {
      document.querySelector('.effect').classList.remove('touched')
    }, 100);
  } else {
    setTimeout(() => {
      document.querySelector('.effect').classList.add('touched')
    }, 0);
    setTimeout(() => {
      document.querySelector('.effect').classList.remove('touched')
    }, 500);
  }

// Toggle mute state
video.muted = !video.muted;

// Update dataset volumeLevel based on mute state and volume (assuming volume is a number 0 to 1)
if (video.muted || video.volume === 0) {
  player.dataset.volumeLevel = 'muted';
} else if (video.volume > 0.6) {
  player.dataset.volumeLevel = 'high';
} else {
  player.dataset.volumeLevel = 'low';
}

// Update the SVG icon accordingly
const effect = document.querySelector('.effect');

if (player.dataset.volumeLevel === 'muted') {
  effect.innerHTML = `<svg class="volume-mute-icon" viewBox="0 0 24 24">
    <path fill="currentColor"
      d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />
  </svg>`;
} else if (player.dataset.volumeLevel === 'high') {
  effect.innerHTML = `<svg class="volume-high-icon" viewBox="0 0 24 24">
    <path fill="currentColor"
      d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z" />
  </svg>`;
} else if (player.dataset.volumeLevel === 'low') {
  effect.innerHTML = `<svg class="volume-low-icon" viewBox="0 0 24 24">
    <path fill="currentColor" d="M5,9V15H9L14,20V4L9,9M18.5,12C18.5,10.23 17.5,8.71 16,7.97V16C17.5,15.29 18.5,13.76 18.5,12Z"></path>
  </svg>`;
}
}


durationTimer

function checkAndHide() {
  var myDiv = document.querySelector('.caption');
  if (!myDiv.innerHTML.trim()) {
    myDiv.style.display = 'none'
  } else {
    myDiv.style.display = 'block'
  }
}

// Create a MutationObserver to watch for changes in the div
var observer = new MutationObserver(checkAndHide);

// Configuration of the observer
var config = { childList: true, subtree: true, characterData: true };

// Target node to observe
var targetNode = document.querySelector('.caption');

// Start observing
observer.observe(targetNode, config);

// Initial check
checkAndHide();




// const video = document.getElementById('video');
var d = document.querySelector('.cap').src;
console.log(d)

// Function to parse VTT file
async function loadVTT(url) {
  const response = await fetch(url);
  const text = await response.text();
  const cues = parseVTT(text);
  return cues;
}

// Function to parse VTT text into cues
function parseVTT(vttText) {
  const cues = [];
  const lines = vttText.split('\n');
  let currentCue = {};

  lines.forEach(line => {
    if (/^\d+$/.test(line)) {
      // Cue number
      return;
    }
    if (/-->/.test(line)) {
      // Timecode
      const [start, end] = line.split(' --> ').map(t => t.trim());
      currentCue = { start: parseTime(start), end: parseTime(end), text: '' };
    } else if (line.trim() === '') {
      // Empty line, push cue to array
      if (currentCue.text) {
        cues.push(currentCue);
        currentCue = {};
      }
    } else {
      // Caption text
      currentCue.text += (currentCue.text ? '\n' : '') + line.trim();
    }
  });

  if (currentCue.text) {
    cues.push(currentCue);
  }

  return cues;
}

// Convert time format (HH:MM:SS.MS) to seconds
function parseTime(timeStr) {
  const [hours, minutes, seconds] = timeStr.split(':');
  const [secs, millis] = seconds.split('.');
  return (+hours) * 3600 + (+minutes) * 60 + (+secs) + (+millis) / 1000;
}

// Function to update caption based on video time
function updateCaption(cues) {
  const currentTime = video.currentTime;
  let currentCaption = '';
  for (const cue of cues) {
    if (currentTime >= cue.start && currentTime <= cue.end) {
      currentCaption = cue.text;
      break;
    }
  }
  caption.textContent = currentCaption;
}

let captions = [];
loadVTT(d).then(cues => {
  captions = cues;
  video.addEventListener('timeupdate', () => updateCaption(captions));
});