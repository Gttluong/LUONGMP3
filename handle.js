var playList = document.querySelector('.player .playlist');
    var list;

var playControl = document.querySelector('.player .player_control')
// ảnh bài hát
    var cd = playControl.querySelector('.cd');
        var cdThumb = cd.querySelector('.cd-thumb img');
// tên bài hát
    var songName = playControl.querySelector('.header-title h2');
    var singerName = playControl.querySelector('.header-title p');
// tiến độ bài hát
    var progress = playControl.querySelector('.progressBar');
    var current = playControl.querySelector('.current-time');
    var duration = playControl.querySelector('.max-duration');
// nút điều khiển
    var playBtn = playControl.querySelector('.btn-toggle-play');
    var beforeBtn = playControl.querySelector('.btn-prev');
    var afterBtn = playControl.querySelector('.btn-next');
    var repeatBtn = playControl.querySelector('.btn-repeat');
    var randomBtn = playControl.querySelector('.btn-random');
// bài hát
    var audio = playControl.querySelector('#audio');


const app = {
    currentIndex: 0,
    isPlay: false,
    isRepeat: false,
    isFinish: false,
    isRandom: false,
    songs: [
        {
            id: 1,
            name: "Bên trên tầng lầu",
            singer: "Tăng Duy Tân",
            path: "./musicList/1.mp3",
            pathImg: './musicList/image/1.png'
        },
        {
            id: 2,
            name: "Ánh sao và bầu trời",
            singer: "T.R.I",
            path: "./musicList/2.mp3",
            pathImg: './musicList/image/2.png'
        },
        {
            id: 3,
            name: "Night Dancer",
            singer: "imase",
            path: "./musicList/3.mp3",
            pathImg: './musicList/image/3.png'
        },
        {
            id: 4,
            name: "Shock",
            singer: "Ayase",
            path: "./musicList/4.mp3",
            pathImg: './musicList/image/4.png'
        },
        {
            id: 5,
            name: "Đôi mi em đang u sầu",
            singer: "Đông Nhi",
            path: "./musicList/5.mp3",
            pathImg: './musicList/image/5.png'
        },
        {
            id: 6,
            name: "Đế vương",
            singer: "Đình Dũng",
            path: "./musicList/6.mp3",
            pathImg: './musicList/image/6.png'
        },
        {
            id: 7,
            name: "Hai mươi hai",
            singer: "Amee",
            path: "./musicList/7.mp3",
            pathImg: './musicList/image/7.png'
        },
        {
            id: 8,
            name: "Một ngần nỗi đau",
            singer: "Văn Mai Hương",
            path: "./musicList/8.mp3",
            pathImg: './musicList/image/8.png'
        },
        {
            id: 9,
            name: "Sao tiếc người không tốt",
            singer: "Hoài Lâm",
            path: "./musicList/9.mp3",
            pathImg: './musicList/image/9.png'
        },
        {
            id: 10,
            name: "Từng thương",
            singer: "Phan Duy Anh",
            path: "./musicList/10.mp3",
            pathImg: './musicList/image/10.png'
        },
        {
            id: 11,
            name: "Và ngày nào đó",
            singer: "Studio Party",
            path: "./musicList/11.mp3",
            pathImg: './musicList/image/11.png'
        },
        {
            id: 12,
            name: "Vì mẹ anh bắt chia tay",
            singer: "Miu Lê",
            path: "./musicList/12.mp3",
            pathImg: './musicList/image/12.png'
        }
    ],
    render() {
        let htmls = this.songs.map(song => {
            return `<div data-id="${song.id}">
                        <div class="songImage" style="background-image: url('${song.pathImg}');"></div>
                        <div class="content">
                            <h3 class="songName">${song.name}</h3>
                            <p class="singer">${song.singer}</p>
                        </div>
                    </div>`
        }).join('');
        playList.innerHTML = htmls;
    },
    loadCurrentSong() {
        cdThumb.src = `${this.currentSong.pathImg}`;
        songName.innerText = `${this.currentSong.name}`;
        singerName.innerText = `${this.currentSong.singer}`;
        audio.src = `${this.currentSong.path}`;
        setTimeout(() => {    
            let minute = Math.floor(audio.duration / 60);
            let second = Math.floor(audio.duration % 60);
            let songDuration = `${minute >= 10 ? minute: '0' + minute}:${second >= 10 ? second: '0' + second}`;
            duration.innerText = songDuration;
        }, 1000);
    },
    playCurrentSong(songIndex) {
        this.currentIndex = songIndex;
        this.loadCurrentSong();
        audio.play();
    },
    defineProperties() {
        let lastSongIndex = this.songs.length - 1;

        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex];
            }
        })
        Object.defineProperty(this, 'prevSongIndex', {
            get: function() {
                if(this.currentIndex == 0) {
                    return lastSongIndex;
                }
                else {
                    return this.currentIndex - 1;
                }
            }
        })
        Object.defineProperty(this, 'nextSongIndex', {
            get: function() {
                if(this.currentIndex == lastSongIndex) {
                    return 0;
                }
                else {
                    return this.currentIndex + 1;
                }
            }
        })
    },
    handleEvent() {
        const _this = this;

        // bắt sự kiện nhấn play/ pause
        playBtn.onclick = function() {
            if(!_this.isPlay) {
                audio.play();
            } 
            else{
                audio.pause();
            }
        }
        // bắt sự kiện mp3 chạy
        audio.onplay = function() {
            _this.isPlay = true;
            playBtn.classList.add('playing');
        }
        // bắt sự kiện mp3 dừng
        audio.onpause = function() {
            _this.isPlay = false;
            playBtn.classList.remove('playing');
        }
        // bắt sự kiện điểm chạy hiện tại của mp3 và hoàn thành mp3
        audio.addEventListener('timeupdate', function() {
            // thay đổi giá trị thanh kéo
            let currentPoint = audio.currentTime / audio.duration * 100;
            progress.value = `${audio.currentTime == 0 ? 0 : currentPoint}`;

            // thay đổi giá trị thời gian
            let minute = Math.floor(audio.currentTime / 60);
            let second = Math.floor(audio.currentTime % 60);
            let htmls = `${minute > 10 ? minute: '0' + minute}:${second > 10 ? second: '0' + second}`;
            current.innerText = htmls;

            // kiểm tra tiến độ bài hát
            if(audio.currentTime == audio.duration) {
                _this.isFinish = true;
            }
            else{
                _this.isFinish = false;
            }
        });
        // xử lý chế độ bài hát
        audio.addEventListener('timeupdate', function() {
            if(_this.isFinish) {
                if(_this.isRepeat) {
                    _this.currentIndex = _this.nextSongIndex;
                    _this.loadCurrentSong();
                }
                if(_this.isRandom) {
                    let nextSongIndex = Math.floor(Math.random() * (_this.songs.length - 1));
                    console.log(nextSongIndex);
                    _this.currentIndex = nextSongIndex;
                    _this.loadCurrentSong();
                }
                audio.currentTime = 0;
                audio.play();
            }
        })

        // bắt sự kiện kéo thanh tiến độ
        progress.oninput = function() {
            let currentTime = progress.value * audio.duration / 100;
            audio.currentTime = currentTime;
        }
        // bắt sự kiện quay lại bài trước
        beforeBtn.onclick = function() {
            _this.playCurrentSong(_this.prevSongIndex);
        }
        // bắt sự kiện tua đến bài sau
        afterBtn.onclick = function() {
            _this.playCurrentSong(_this.nextSongIndex)
        }
        // bắt sự kiện lặp bài hát
        repeatBtn.onclick = function() {
            if(!_this.isRepeat) {
                _this.isRepeat = true;
                _this.isRandom = false;
                repeatBtn.classList.add('used');
                randomBtn.classList.remove('used');
            }
            else{
                _this.isRepeat = false;
                repeatBtn.classList.remove('used');
            }
        }
        // bắt sự kiện trộn bài hát
        randomBtn.onclick = function() {
            if(!_this.isRandom) {
                _this.isRandom = true;
                _this.isRepeat = false;
                randomBtn.classList.add('used');
                repeatBtn.classList.remove('used');
            }
            else{
                _this.isRandom = false;
                randomBtn.classList.remove('used');
            }
        }

        // bắt sự kiện nhấn vào bài hát
        for (const item of list) {
            item.onclick = function() {
                const dataId = item.getAttribute('data-id');
                let thisSongIndex;
                _this.songs.forEach((song, index) => {
                    if(song.id == dataId) {
                        thisSongIndex = index;
                    }
                })
                _this.playCurrentSong(thisSongIndex)
            }
        }
    },
    start() {
        // định nghĩa hàm trong object
        this.defineProperties();
        
        // đặt bài hát lên trên cùng
        this.loadCurrentSong();
        
        // tạo list bài hát
        this.render();
        list = Array.from(document.querySelectorAll('.playlist > div'));
        
        // xử lý sự kiện
        this.handleEvent();
    }
}

app.start();