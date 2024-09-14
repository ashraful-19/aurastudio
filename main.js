document.addEventListener("DOMContentLoaded", function () {
    const line1Videos = [
        "images/video1.mp4",
        "images/video1.mp4",
        "images/video1.mp4",
        "images/reel1.mp4",
        "images/reel1.mp4",
        "images/video1.mp4",
        "images/video1.mp4"
    ];

    const line2Videos = [
        "images/video1.mp4",
        "images/video1.mp4",
        "images/video1.mp4",
        "images/reel1.mp4",
        "images/reel1.mp4",
        "images/video1.mp4",
        "images/video1.mp4"
    ];

    // Array to hold all Plyr instances across the document
    let allPlayers = [];

    const renderVideos = (videoArray, containerId) => {
        const container = document.getElementById(containerId);
        const videoElements = videoArray.map(videoSrc =>
            `
            <div class="video-slider-wrapper">
                <video playsinline controls>
                    <source src="${videoSrc}" type="video/mp4">
                </video>
            </div>
            `
        ).join('');

        // Append HTML string to container
        container.innerHTML = videoElements;

        // Clone videos for seamless scrolling
        container.innerHTML += videoElements;

        // Initialize Plyr on dynamically added videos
        const players = Array.from(container.querySelectorAll("video")).map(video => new Plyr(video, {
          controls: ['play-large', 'play', 'mute', 'volume', 'fullscreen'],
          autoplay: false,
        }));

        // Add new players to global array
        allPlayers = allPlayers.concat(players);

        // Hide the 'play' button initially and handle hover events
        players.forEach(player => {
            // Hide the 'play' button initially
            player.on("ready", () => {
                player.elements.container.querySelector(".plyr__control[data-plyr='play']").style.display = "none";
            });

            // Show play button on hover
            player.elements.container.addEventListener("mouseenter", () => {
                player.elements.container.querySelector(".plyr__control[data-plyr='play']").style.display = "block";
                pauseAnimation(container);
            });

            // Hide play button and resume animation on mouse leave
            player.elements.container.addEventListener("mouseleave", () => {
                player.elements.container.querySelector(".plyr__control[data-plyr='play']").style.display = "none";
                resumeAnimation(container);
            });

            // Stop other videos across the entire document when a new video starts playing
            player.on("play", () => {
                allPlayers.forEach(otherPlayer => {
                    if (otherPlayer !== player && !otherPlayer.paused) {
                        otherPlayer.pause();
                    }
                });
            });
        });
    };

    // Functions to pause and resume animation
    function pauseAnimation(container) {
        container.style.animationPlayState = 'paused';
    }

    function resumeAnimation(container) {
        container.style.animationPlayState = 'running';
    }

    // Render videos for both lines
    renderVideos(line1Videos, "line1");
    renderVideos(line2Videos, "line2");
});

$(document).ready(function () {
    $('.hamburger-menu').click(function () {
        $('.mobile-nav').slideToggle(300); // 300ms for the slide animation
    });
});


// let currentlyPlayingVideo = null;

// // Initialize Swiper
// const swiper = new Swiper(".mySwiper", {
//   effect: "cards",
//   grabCursor: true,
//   initialSlide: 2,
//   speed: 500,
//   loop: true,
//   rotate: true,
//   mousewheel: {
//     invert: true,
//   },
//   on: {
//     slideChangeTransitionStart: function () {
//       // Pause the currently playing video when the slide changes
//       if (currentlyPlayingVideo) {
//         currentlyPlayingVideo.pause();
//         currentlyPlayingVideo.playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
//         currentlyPlayingVideo.playPauseBtn.classList.remove('video-playing');
//         currentlyPlayingVideo.classList.remove('video-playing');
//         currentlyPlayingVideo = null;
//       }
//     },
//     slideChangeTransitionEnd: function () {
//       // Update video details for the new active slide after transition
//       updateVideoDetails();
//     }
//   }
// });

// // Function to update video details
// function updateVideoDetails() {
//   // Get the currently active slide
//   const activeSlide = document.querySelector('.swiper-slide-active');

//   // Debugging: Check if activeSlide is found
//   console.log('Active Slide:', activeSlide);

//   // If no active slide found, exit the function
//   if (!activeSlide) return;

//   // Fetch video details from the active slide attributes
//   const title = activeSlide.getAttribute('data-title');
//   const description = activeSlide.getAttribute('data-description');
//   const photo = activeSlide.getAttribute('data-photo');

//   // Debugging: Log fetched details
//   console.log('Video Title:', title);
//   console.log('Video Description:', description);
//   console.log('Channel Photo:', photo);

//   // Update the video details container
//   document.getElementById('video-title').textContent = title || 'Default Title';
//   document.getElementById('video-description').textContent = description || 'Default Description';
//   document.getElementById('channel-photo').src = photo || 'default-channel-photo.jpg';
// }

// // Function to toggle play/pause state of a video
// function togglePlayPause(video, playPauseBtn) {
//   if (video.paused) {
//     // Pause any currently playing video
//     if (currentlyPlayingVideo && currentlyPlayingVideo !== video) {
//       currentlyPlayingVideo.pause();
//       currentlyPlayingVideo.playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
//       currentlyPlayingVideo.playPauseBtn.classList.remove('video-playing');
//       currentlyPlayingVideo.classList.remove('video-playing');
//     }
//     // Play the clicked video
//     video.play();
//     playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
//     playPauseBtn.classList.add('video-playing');
//     video.classList.add('video-playing');
//     currentlyPlayingVideo = video;
//     currentlyPlayingVideo.playPauseBtn = playPauseBtn; // Store the button reference
//   } else {
//     // Pause the currently playing video
//     video.pause();
//     playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
//     playPauseBtn.classList.remove('video-playing');
//     video.classList.remove('video-playing');
//     currentlyPlayingVideo = null;
//   }
// }

// // Add event listeners to each video and play/pause button
// document.querySelectorAll('.custom-video').forEach((video, index) => {
//   const playPauseBtn = document.querySelectorAll('.playPauseBtn')[index];

//   playPauseBtn.addEventListener('click', () => togglePlayPause(video, playPauseBtn));
//   video.addEventListener('click', () => togglePlayPause(video, playPauseBtn));

//   // Add event listener for video end
//   video.addEventListener('ended', () => {
//     if (currentlyPlayingVideo === video) {
//       playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
//       playPauseBtn.classList.remove('video-playing');
//       video.classList.remove('video-playing');
//       currentlyPlayingVideo = null;
//     }
//   });
// });

// // Add event listeners for custom buttons
// document.querySelector('.custom-next-button').addEventListener('click', function () {
//   swiper.slideNext();
// });

// document.querySelector('.custom-prev-button').addEventListener('click', function () {
//   swiper.slidePrev();
// });

// // Initialize default video details
// updateVideoDetails();




document.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  const scrollPosition = window.scrollY;

  if (scrollPosition > 200) {
    // User scrolled past 200px, move navbar to appear from bottom
    header.classList.add('hidden-bottom');
    header.classList.remove('hidden-top');
  } else {
    // User is within 200px from the top, move navbar back to the top
    header.classList.add('hidden-top');
    header.classList.remove('hidden-bottom');
  }
});


function animateCounter(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    element.innerHTML = Math.floor(progress * (end - start) + start) + "+";
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

function handleIntersection(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll('h2');
      animateCounter(counters[0], 0, 1000, 1000); // 1,000+ Successful Projects
      animateCounter(counters[1], 0, 7, 1000); // 7+ Years of Experience
      animateCounter(counters[2], 0, 12, 1000); // 12+ Team Members
      observer.unobserve(entry.target); // Stop observing after animation
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const counterSection = document.querySelector('.counter-section');
  
  const observer = new IntersectionObserver(handleIntersection, {
    threshold: 0.5 // Trigger when 50% of the element is visible
  });

  observer.observe(counterSection);
});



// Get modal element
const modal = document.getElementById('reg-modal');

// Get the buttons that trigger the modal
const bookCallBtns = document.querySelectorAll('.book-call');

// Get the close button inside the modal
const closeBtn = modal.querySelector('.close');

// Show modal
bookCallBtns.forEach(button => {
  button.addEventListener('click', () => {
    console.log('Showing modal');
    modal.style.display = 'block';
  });
});

// Close modal
if (closeBtn) {
  closeBtn.addEventListener('click', () => {
    console.log('Closing modal');
    modal.style.display = 'none';
  });
}

// Close modal when clicking outside
window.addEventListener('click', event => {
  if (event.target === modal) {
    console.log('Clicked outside modal');
    modal.style.display = 'none';
  }
});



document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    const offset = 20;  // Adjust this value according to your header height

    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  });
});

// Get the button and the icon
let scrollTopBtn = document.getElementById("scrollTopBtn");
let scrollIcon = document.getElementById("scrollIcon");
let isScrolledHalfway = false;

// Function to check the scroll position and show/hide button
function checkScroll() {
  let scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  let halfwayPoint = document.body.scrollHeight / 2;

  // Show button after scrolling 100px
  if (scrollPosition > 100) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }

  // Change arrow direction when scrolling past halfway
  if (scrollPosition > halfwayPoint) {
    scrollIcon.classList.add("rotate-up"); // Rotate to up arrow
    isScrolledHalfway = true;
  } else {
    scrollIcon.classList.remove("rotate-up"); // Default down arrow
    isScrolledHalfway = false;
  }
}

// Add an event listener for scroll
window.addEventListener("scroll", checkScroll);

// Scroll to the top or bottom when the button is clicked
scrollTopBtn.addEventListener("click", function() {
  if (isScrolledHalfway) {
    // Scroll to the top
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  } else {
    // Scroll to the bottom
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth"
    });
  }
});
