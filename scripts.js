const stories = [
  {
    title: `Der Nudelsiebhut`,
    subtitle: `Wie ich ein altes Nudelsieb auf der Straße fand und daraus einen spacingen Hut machte`,
    teller: `Karen Geyer`,
    image: `Karen-mit-Helm.jpg`,
    caption: `Karen mit Helm`,
    description: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
    dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
    clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
    consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
    sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.`,
    audiofile: `Anpacken statt zaudern - Winfried Kretschmann.mp3`,
  }, {
    title: `Die Tonleiter runter`,
    subtitle: `Wie wir von der Leiter gestolpert sind und sich daraus ein interessantes Gepräch über Klang entwickelte`,
    teller: `Karen und Andres`,
    image: `Karen-bei-der-Arbeit.jpg`,
    caption: `Karen und Andres bei der Arbeit`,
    description: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
    dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
    clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
    consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
    sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.`,
    audiofile: `Mut und Zuversicht - Alexander Van der Bellen.mp3`,
  }
];

const storyContainer = document.getElementById('stories');
const audio = new Audio();
let currentlyPlaying = null;

for (let i = 0; i < stories.length; i++) {
  const story = stories[i];
  const storyId = `story-${i + 1}`;
  const direction = (i % 2 === 0) ? 'left' : 'right';
  let innerHTML = `
    <h2 class="story-title">${story.title || 'no title'}</h4>
    <p class="story-subtitle">${story.subtitle || 'no subtitle'}</p>
    <p class="story-author">von ${story.teller || 'no teller'}</p>
    <img class="story-image ${direction}" src="stories/${story.image}" alt="${story.caption || 'no image caption'}">
    <p class="story-descr">${story.description || 'no description'}</p>
    <div class="audio-player">
      <img class="audio-button" src="./images/play.png" />
      <span class=audio-text>Podcast abspielen</span>
      <span class="audio-progress hidden"><span class="audio-bar"></span>
    </div>
  `;

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
