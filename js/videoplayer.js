var player = videojs('#videoPlayer', {
    //autoplay: 'muted',
    controls: true,
    poster: 'https://serving.photos.photobox.com/670497520f7eb82059981cdbfb0a9f519df5f30ce433ea01e97e8bfc7b467fea9a087f7a.jpg',
    loop: true,
    fluid: true,
    playbackRates: [0.25, 0.5, 1, 1.5, 2],
    userActions: {
        hotkeys: true
    }
});