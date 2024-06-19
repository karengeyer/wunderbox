const beispielStories = [{
  chapter: 1,
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
}];

const stories = [{
  chapter: 7,
  title: 'Das Gebet der Gemeindeältesten',
  audiofile: 'Tandem7.13 - Das Gebet der Gemeindeältesten.mp3',

}, {
  chapter: 7,
  title: 'Landsend to John o`Groats',
  audiofile: 'Tandem7.13 - Landsend to John o groats.mp3',

}, {
  chapter: 7,
  title: 'Lost in the Rainforest',
  audiofile: 'Tandem7.13 - Lost in the rainforest.mp3',

}, {
  chapter: 7,
  title: 'My Italian Affair',
  audiofile: 'Tandem7.13 - My italian Affair.mp3',

}, {
  chapter: 5,
  title: 'Alquarah Mountain',
  audiofile: 'Tandem5.13 - Alquarah Mountain KSA12.06.24, 12.mp3',

}, {
  chapter: 5,
  title: 'Das Kulistempel',
  audiofile: 'Tandem5.13 - Das Kulistempel Date 12.06.24, 13.mp3',
}, {
  chapter: 5,
  title: 'Der Zytturm aus Architektenperspektive',
  audiofile: 'Tandem5.13 - Der Zytturm aus Architektenperspektive12.06.24, 14.mp3',
}, {
  chapter: 5,
  title: 'Sisters of Jesus Christ',
  audiofile: 'Tandem5.13 - Sisters of Jesus ChristUSA12.06.24, 12.mp3',
}, {
  chapter: 5,
  title: 'Wein in Rumänien',
  audiofile: 'Tandem5.13 - Wein in Rumänien12.06.24, 13.mp3',
}, {
  chapter: 4,
  title: 'Islandpferde',
  audiofile: 'Tandem4.13 - Islandpferde_08.06.24, 16.mp3',
}, {
  chapter: 4,
  title: 'Kiel',
  audiofile: 'Tandem4.13 - Kiel08.06.24, 17.mp3',
}, {
  chapter: 2,
  title: 'Fern',
  audiofile: 'Tandem2.13 - Fern08.06.24, 11.mp3',
}, {
  chapter: 2,
  title: 'Mit 93',
  audiofile: 'Tandem2.13 - Mit93_08.06.24, 11.mp3',
}, {
  chapter: 2,
  title: 'Japanisch',
  audiofile: 'Tandem2.13 - japanisch08.06.24, 11.mp3',
}, {
  chapter: 1,
  title: 'Der rote Overall',
  audiofile: 'Tandem1.13 - Overall04.06.24, 15.mp3',
}, {
  chapter: 1,
  title: 'LeViSu',
  audiofile: 'Tandem1.13 - LeViSu04.06.24, 15.mp3',
}, {
  chapter: 1,
  title: 'Eugen Jans',
  audiofile: 'Tandem1.13 - EugenJans04.06.24, 15.mp3',
}, {
  chapter: 1,
  title: 'Sweet Sounds',
  audiofile: 'Tandem1.13 - SweetSounds04.06.24, 15.mp3',
}, {
  chapter: 0,
  title: 'Die Wunderboxerin',
  audiofile: 'WunderboxerIn - 17.02.24, 22.mp3',
}];

const chapterContainer = document.getElementById('chapters');
const audio = new Audio();
let currentlyPlaying = null;

const numChapters = 13;
let chapterIndex = 0;
let chapterDiv = null;
let storyInChapterIndex = null;

for (let i = 0; i < stories.length; i++) {
  const story = stories[i];
  const storyId = `story-${i + 1}`;

  if (story.chapter === 0 || story.chapter !== chapterIndex) {
    // create new chapter
    chapterIndex = story.chapter;
    storyInChapterIndex = 0;

    chapterDiv = document.createElement('div');
    chapterDiv.classList.add('chapter');
    chapterContainer.appendChild(chapterDiv);

    if (chapterIndex > 0) {
      chapterDiv.innerHTML = `<h2 class="chapter-title">${chapterIndex}/${numChapters}</h2>`;
    } else {
      chapterDiv.innerHTML = `<h2 class="chapter-title">Intro</h2>`;
    }
  }

  const storyDiv = document.createElement('div');
  storyDiv.id = storyId;
  storyDiv.classList.add('story');
  chapterDiv.appendChild(storyDiv);

  let innerHTML = ``;
  const direction = (i % 2 === 0) ? 'left' : 'right';

  storyInChapterIndex++;

  if (story.title) {
    if (chapterIndex > 0) {
      innerHTML += `<h3 class="story-title"><span class="story-id">${storyInChapterIndex} | </span>${story.title}</h3>`
    } else {
      innerHTML += `<h3 class="story-title">${story.title}</h3>`
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
    innerHTML += `<p class="story-descr">${story.description}</p>`;
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

  storyDiv.innerHTML = innerHTML;

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

audio.addEventListener('ended', () => {
  if (currentlyPlaying !== null) {
    stopPlaying(currentlyPlaying);
  }
});
