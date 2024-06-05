const beispielStories = [{
  title: `Erster Titel`,
  subtitle: `Erster Untertitel, der ein wenig länger ist.`,
  author: `Erster Erzähler`,
  image: `erstes-bild.jpg`,
  caption: `Erste Bildbeschreibung`,
  description: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
    dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
    clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
    consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
    sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.`,
  audiofile: `erstes-audiofile.mp3`,
}, {
  title: `Zweiter Titel`,
  subtitle: `Zweiter Untertitel, der ein wenig länger ist.`,
  author: `Zweiter Erzähler`,
  image: `zweites-bild.jpg`,
  caption: `Zweite Bildbeschreibung`,
  description: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
    dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
    clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
    consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
    sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.`,
  audiofile: `zweites-audiofile.mp3`,
}];

const stories = [{
  id: `1.1`,
  title: `Der rote Overall`,
  audiofile: `Tandem1.13 - Overall04.06.24, 15.mp3`,
}, {
  id: `1.2`,
  title: `LeViSu`,
  audiofile: `Tandem1.13 - LeViSu04.06.24, 15.mp3`,
}, {
  id: `1.3`,
  title: `Eugen Jans`,
  audiofile: `Tandem1.13 - EugenJans04.06.24, 15.mp3`,
}, {
  id: `1.4`,
  title: `Sweet Sounds`,
  audiofile: `Tandem1.13 - SweetSounds04.06.24, 15.mp3`,
}, {
  id: `Intro`,
  title: `Die Wunderboxerin`,
  audiofile: `WunderboxerIn - 17.02.24, 22.mp3`,
},];

const storyContainer = document.getElementById('stories');
const audio = new Audio();
let currentlyPlaying = null;

for (let i = 0; i < stories.length; i++) {
  const story = stories[i];
  const storyId = `story-${i + 1}`;
  const direction = (i % 2 === 0) ? 'left' : 'right';
  let innerHTML = ``;

  if (story.title) {
    if (story.id) {
      innerHTML += `<h2 class="story-title"><span class="story-id">${story.id || 'no id'} | </span>${story.title || 'no title'}</h4>`
    } else {
      innerHTML += `<h2 class="story-title">${story.title}</h4>`;
    }
  }

  if (story.subtitle) {
    innerHTML += `<p class="story-subtitle">${story.subtitle}</p>`;
  }

  if (story.author) {
    innerHTML += `<p class="story-author">von ${story.author}</p>`;
  }

  if (story.image) {
    if (story.caption) {
      innerHTML += `<img class="story-image ${direction}" src="stories/${story.image}" alt="${story.caption}"></img>`;
    } else {
      innerHTML += `<img class="story-image ${direction}" src="stories/${story.image}"></img>`;
    }
  }

  if (story.description) {
    innerHTML += `<p class="story-descr">${story.description || 'no description'}</p>`;

  }

  innerHTML += `
    <div class="audio-player">
      <img class="audio-button" src="./images/play.png" />
      <span class=audio-text>Podcast abspielen</span>
      <span class="audio-progress hidden"><span class="audio-bar"></span>
    </div>`;

  if (i < stories.length - 1) {
    innerHTML += '<hr />';
  }

  const storyDiv = document.createElement('div');
  storyDiv.id = storyId;
  storyDiv.classList.add('story');
  storyDiv.innerHTML = innerHTML;
  storyContainer.appendChild(storyDiv);

  const audioButton = document.querySelector(`#${storyId} .audio-player .audio-button`);
  const audioProgress = document.querySelector(`#${storyId} .audio-player .audio-progress`);
  const audioBar = document.querySelector(`#${storyId} .audio-player .audio-bar`);
  const audioText = document.querySelector(`#${storyId} .audio-player .audio-text`);

  story.state = {
    id: storyId,
    button: audioButton,
    progress: audioProgress,
    bar: audioBar,
    text: audioText,
    playing: false,
  };

  function onPlayToggle() {
    const story = stories[i];

    if (currentlyPlaying !== story) {
      if (currentlyPlaying !== null) {
        stopPlaying(currentlyPlaying, true);
      }

      audio.src = `stories/${story.audiofile}`;
      currentlyPlaying = story;
    }

    if (!story.state.playing) {
      startPlaying(story);
    } else {
      stopPlaying(story)
    }
  }

  audioButton.addEventListener('click', onPlayToggle);
  audioText.addEventListener('click', onPlayToggle);

  audioProgress.addEventListener('click', (e) => {
    if (currentlyPlaying === story) {
      const state = currentlyPlaying.state;
      const rect = state.progress.getBoundingClientRect();
      const seek = audio.duration * (e.pageX - rect.x) / rect.width;
      audio.currentTime = seek;
    }
  });
}

function startPlaying(story) {
  const state = story.state;
  audio.play();
  state.button.src = './images/pause.png';
  state.progress.classList.remove('hidden');
  state.text.classList.add('hidden');
  state.playing = true;
}


function stopPlaying(story, hideProgress) {
  const state = story.state;
  audio.pause();
  state.button.src = './images/play.png';
  state.bar.style.width = 0;
  state.playing = false;

  if (hideProgress) {
    state.progress.classList.add('hidden');
    state.text.classList.remove('hidden');
  }
}

audio.addEventListener('timeupdate', () => {
  if (currentlyPlaying !== null) {
    const state = currentlyPlaying.state;
    const progress = audio.currentTime / audio.duration;
    state.bar.style.width = `${100 * progress}%`;
  }
});
