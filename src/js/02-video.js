import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const storageKey = 'videoplayer-current-time';
const iframe = document.getElementById('vimeo-player');
const player = new Player(iframe);

const saveTimeToLocalStorage = () => player.getCurrentTime()
    .then((time) => localStorage.setItem(storageKey, JSON.stringify(time)));
const restoreTimeFromLocalStorage = () => {
  const savedTime = localStorage.getItem(storageKey);
  savedTime && player.setCurrentTime(JSON.parse(savedTime));
};

player.on('timeupdate', throttle(saveTimeToLocalStorage, 1000));
player.ready().then(restoreTimeFromLocalStorage);