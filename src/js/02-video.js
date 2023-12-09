import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.getElementById('vimeo-player');
const player = new Player(iframe);

const STORAGE_KEY = 'videoplayer-current-time';

const saveTimeToLocalStorage = () => {
  player.getCurrentTime().then((time) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(time));
  });
};

const restoreTimeFromLocalStorage = () => {
  const savedTime = localStorage.getItem(STORAGE_KEY);
  if (savedTime) {
    const parsedTime = JSON.parse(savedTime);
    player.setCurrentTime(parsedTime);
  }
};

player.on('timeupdate', throttle(saveTimeToLocalStorage, 1000));

player.ready().then(() => {
  restoreTimeFromLocalStorage();
});

