// Phần JavaScript cho website sinh nhật hài hước
let currentSection = 'meme';
let currentMemeIndex = 0;
let memeInterval;
let audioContext;
let backgroundMusicPlaying = false;

// Khởi tạo Audio Context
function initAudioContext() {
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        createBackgroundMusic();
    } catch (e) {
        console.log('Audio context not supported');
    }
}

// Tạo nhạc nền bằng Web Audio API
function createBackgroundMusic() {
    if (!audioContext) return;
    
    // Tạo nhạc sinh nhật đơn giản
    const notes = [
        { freq: 261.63, duration: 0.5 }, // C
        { freq: 261.63, duration: 0.5 }, // C  
        { freq: 293.66, duration: 1 },   // D
        { freq: 261.63, duration: 1 },   // C
        { freq: 349.23, duration: 1 },   // F
        { freq: 329.63, duration: 2 },   // E
        { freq: 261.63, duration: 0.5 }, // C
        { freq: 261.63, duration: 0.5 }, // C
        { freq: 293.66, duration: 1 },   // D
        { freq: 261.63, duration: 1 },   // C
        { freq: 392.00, duration: 1 },   // G
        { freq: 349.23, duration: 2 }    // F
    ];
    
    let currentTime = audioContext.currentTime;
    
    function playMelody() {
        notes.forEach((note, index) => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(note.freq, currentTime);
            gainNode.gain.setValueAtTime(0, currentTime);
            gainNode.gain.linearRampToValueAtTime(0.1, currentTime + 0.1);
            gainNode.gain.exponentialRampToValueAtTime(0.01, currentTime + note.duration);
            
            oscillator.start(currentTime);
            oscillator.stop(currentTime + note.duration);
            
            currentTime += note.duration;
        });
        
        // Lặp lại sau khi kết thúc
        setTimeout(() => {
            if (backgroundMusicPlaying) {
                currentTime = audioContext.currentTime;
                playMelody();
            }
        }, (currentTime - audioContext.currentTime) * 1000);
    }
    
    if (backgroundMusicPlaying) {
        playMelody();
    }
}

// Tạo âm thanh click
function playClickSound() {
    if (!audioContext) return;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

// Tạo âm thanh confetti
function playConfettiSound() {
    if (!audioContext) return;
    
    // Tạo âm thanh pháo hoa
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            const freq = 200 + Math.random() * 800;
            oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(freq * 2, audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        }, i * 50);
    }
}

// Tạo âm thanh mở quà
function playGiftOpenSound() {
    if (!audioContext) return;
    
    // Âm thanh "ting" khi mở quà
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(1500, audioContext.currentTime + 0.1);
    oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.5);
    
    gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
}

// Tạo âm thanh chuyển slide
function playSlideTransitionSound() {
    if (!audioContext) return;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
    oscillator.frequency.linearRampToValueAtTime(500, audioContext.currentTime + 0.2);
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
}

// Dữ liệu meme hài hước với hình ảnh online
const memes = [
    {
        image: "https://m.yodycdn.com/blog/meme-chuc-mung-sinh-nhat-yody-vn-48.jpg",
        caption: "Chúc mừng sinh nhật bạn thân! 🎉"
    },
    {
        image: "https://dimensions.edu.vn/public/upload/2025/01/happy-birthday-meme-1.webp", 
        caption: "Happy Birthday! Tuổi mới vui vẻ nhé! 🎂"
    },
    {
        image: "https://bom.edu.vn/public/upload/2024/12/meme-chuc-mung-sinh-nhat-35.webp",
        caption: "Sinh nhật vui vẻ! Chúc bạn nhiều niềm vui! 🎈"
    },
    {
        image: "https://m.yodycdn.com/blog/meme-chuc-mung-sinh-nhat-yody-vn-15.jpg",
        caption: "Tuổi mới hạnh phúc và thành công! 🎁"
    }
];

// Khởi tạo khi trang load
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
    setupEventListeners();
});

function initializeWebsite() {
    // Khởi tạo audio context
    initAudioContext();
    
    // Load screen
    setTimeout(() => {
        document.querySelector('.loading').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('.loading').style.display = 'none';
            startMemeSlideshow();
            startTitleAnimation();
            
            // Bắt đầu phát nhạc nền sau khi load xong
            setTimeout(() => {
                startBackgroundMusic();
            }, 1000);
        }, 500);
    }, 2000);
}

function setupEventListeners() {
    // Music control
    const musicBtn = document.querySelector('.music-control');
    if (musicBtn) {
        musicBtn.addEventListener('click', toggleMusic);
    }

    // Next buttons
    const nextButtons = document.querySelectorAll('.next-button');
    nextButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            if (index === 0) goToCake();
            else if (index === 1) goToGift();
        });
    });

    // Blow button
    const blowBtn = document.querySelector('.blow-button');
    if (blowBtn) {
        blowBtn.addEventListener('click', blowCandles);
    }

    // Gift box
    const giftBox = document.querySelector('.gift-box');
    if (giftBox) {
        giftBox.addEventListener('click', openGift);
    }

    // Troll button
    const trollBtn = document.querySelector('.troll-button');
    if (trollBtn) {
        trollBtn.addEventListener('click', trolled);
    }
}

// Bắt đầu nhạc nền
function startBackgroundMusic() {
    if (audioContext && audioContext.state === 'suspended') {
        audioContext.resume();
    }
    backgroundMusicPlaying = true;
    createBackgroundMusic();
    
    const musicBtn = document.querySelector('.music-control');
    if (musicBtn) {
        musicBtn.innerHTML = '🎵';
    }
}

// Điều khiển nhạc
function toggleMusic() {
    playClickSound(); // Âm thanh khi click
    
    const musicBtn = document.querySelector('.music-control');
    
    if (backgroundMusicPlaying) {
        backgroundMusicPlaying = false;
        if (musicBtn) musicBtn.innerHTML = '🔇';
    } else {
        startBackgroundMusic();
    }
}

// Animation cho title
function startTitleAnimation() {
    setTimeout(() => {
        const title = document.querySelector('.title');
        if (title) {
            title.classList.add('shake');
        }
    }, 1000);
}

// Bắt đầu slideshow meme
function startMemeSlideshow() {
    showMeme(0);
    updateProgress();
    
    memeInterval = setInterval(() => {
        currentMemeIndex = (currentMemeIndex + 1) % memes.length;
        showMeme(currentMemeIndex);
        updateProgress();
        playSlideTransitionSound(); // Âm thanh chuyển slide
        
        // Khi đã hiển thị hết tất cả memes (về slide cuối cùng)
        if (currentMemeIndex === memes.length - 1) {
            setTimeout(() => {
                clearInterval(memeInterval);
                // Âm thanh chuyển section
                playConfettiSound();
                // Tự động chuyển sang phần bánh sau 2 giây
                setTimeout(() => {
                    goToCake();
                }, 2000);
            }, 3000); // Đợi 3 giây để hiển thị meme cuối cùng
        }
    }, 3500); // Thời gian mỗi slide
}

// Hiển thị meme
function showMeme(index) {
    const slides = document.querySelectorAll('.meme-slide');
    slides.forEach(slide => slide.classList.remove('active'));
    
    if (slides[index]) {
        slides[index].classList.add('active');
        
        // Cập nhật nội dung meme với hình ảnh online
        const memeContent = slides[index].querySelector('.meme-content');
        if (memeContent && memes[index]) {
            // Hiển thị loading state trước
            memeContent.innerHTML = `
                <div class="meme-image loading" style="width: 300px; height: 200px; display: flex; align-items: center; justify-content: center; color: white; font-size: 18px;">
                    Đang tải ảnh... 📸
                </div>
                <div class="meme-caption">${memes[index].caption}</div>
            `;
            
            // Tạo img element và load ảnh
            const img = new Image();
            img.onload = function() {
                // Khi ảnh load xong, thay thế content
                memeContent.innerHTML = `
                    <img src="${memes[index].image}" alt="Meme ${index + 1}" class="meme-image" />
                    <div class="meme-caption">${memes[index].caption}</div>
                `;
            };
            img.onerror = function() {
                // Nếu ảnh lỗi, hiển thị emoji thay thế
                memeContent.innerHTML = `
                    <div style="font-size: 4rem; margin-bottom: 20px;">🎂</div>
                    <div class="meme-caption">Ảnh không tải được, nhưng vẫn chúc mừng sinh nhật! ${memes[index].caption}</div>
                `;
            };
            img.src = memes[index].image;
        }
    }
}

// Cập nhật thanh tiến trình
function updateProgress() {
    const progressBar = document.querySelector('.progress-bar');
    const progress = ((currentMemeIndex + 1) / memes.length) * 100;
    if (progressBar) {
        progressBar.style.width = progress + '%';
    }
}

// Chuyển sang phần bánh
function goToCake() {
    playSlideTransitionSound(); // Âm thanh chuyển section
    
    const memeSection = document.querySelector('.meme-section');
    const cakeSection = document.querySelector('.cake-section');
    
    if (memeSection) memeSection.classList.add('hidden');
    if (cakeSection) cakeSection.classList.remove('hidden');
    
    clearInterval(memeInterval);
    currentSection = 'cake';
}

// Thổi nến
function blowCandles() {
    playClickSound(); // Âm thanh click button
    
    const flames = document.querySelectorAll('.flame');
    const result = document.querySelector('.blow-result');
    const blowBtn = document.querySelector('.blow-button');
    
    // Disable button
    if (blowBtn) {
        blowBtn.disabled = true;
        blowBtn.style.opacity = '0.5';
    }
    
    // Âm thanh thổi nến
    playBlowSound();
    
    // Animation thổi nến
    flames.forEach((flame, index) => {
        setTimeout(() => {
            flame.style.opacity = '0';
            flame.style.transform = 'translateX(-50%) scale(0.5) rotate(45deg)';
            flame.style.transition = 'all 0.5s ease';
        }, index * 300);
    });
    
    // Hiển thị kết quả
    setTimeout(() => {
        if (result) {
            result.classList.remove('hidden');
        }
        createConfetti();
        playConfettiSound(); // Âm thanh pháo hoa
    }, 1500);
}

// Sound effect khi thổi nến
function playBlowSound() {
    try {
        // Tạo âm thanh đơn giản
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.5);
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
        console.log('Audio not supported');
    }
}

// Chuyển sang phần quà
function goToGift() {
    playSlideTransitionSound(); // Âm thanh chuyển section
    
    const cakeSection = document.querySelector('.cake-section');
    const giftSection = document.querySelector('.gift-section');
    
    if (cakeSection) cakeSection.classList.add('hidden');
    if (giftSection) giftSection.classList.remove('hidden');
    
    currentSection = 'gift';
}

// Mở quà
function openGift() {
    playClickSound(); // Âm thanh click
    
    const giftBox = document.querySelector('.gift-box');
    const wishReveal = document.querySelector('.wish-reveal');
    const instruction = document.querySelector('.gift-instruction');
    
    // Animation mở quà
    if (giftBox) {
        giftBox.style.transform = 'scale(1.2) rotate(360deg)';
        giftBox.style.opacity = '0';
        giftBox.style.transition = 'all 0.8s ease';
    }
    
    // Âm thanh mở quà
    playGiftOpenSound();
    
    setTimeout(() => {
        if (giftBox) giftBox.style.display = 'none';
        if (instruction) instruction.style.display = 'none';
        if (wishReveal) wishReveal.classList.remove('hidden');
        
        createConfetti();
        createHeartRain();
        playConfettiSound(); // Âm thanh celebration
    }, 800);
}

// Troll function chính
function trolled() {
    playClickSound(); // Âm thanh click
    
    // Tạo popup troll
    const trollMessages = [
        "😂 GOTCHA! Bạn đã bị troll!",
        "🤪 Haha! Bạn thật ngây thơ!",
        "😈 Surprise! Thật ra là...",
        "🎉 CHÚC MỪNG SINH NHẬT BẠN THÂN! 🎉"
    ];
    
    let messageIndex = 0;
    const showMessage = () => {
        playClickSound(); // Âm thanh cho mỗi popup
        
        if (messageIndex < trollMessages.length - 1) {
            alert(trollMessages[messageIndex]);
            messageIndex++;
            setTimeout(showMessage, 500);
        } else {
            // Message cuối cùng
            alert(`${trollMessages[messageIndex]}\n\nMong bạn luôn vui vẻ, hạnh phúc và... 😜\nĐừng tin tui nữa nhé!\n\nHappy Birthday! 🎂❤️`);
            
            // Hiệu ứng cuối cùng
            playConfettiSound(); // Âm thanh celebration lớn
            finalCelebration();
        }
    };
    
    showMessage();
}

// Celebration cuối cùng
function finalCelebration() {
    // Rainbow background
    document.body.style.background = 'linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)';
    document.body.style.backgroundSize = '400% 400%';
    document.body.style.animation = 'gradientShift 1s ease infinite';
    
    // Massive confetti
    for(let i = 0; i < 50; i++) {
        setTimeout(() => createConfetti(), i * 100);
    }
    
    // Heart rain
    for(let i = 0; i < 30; i++) {
        setTimeout(() => createHeartRain(), i * 150);
    }
    
    // Change wish text
    const wishText = document.querySelector('.wish-text');
    if (wishText) {
        wishText.innerHTML = `
            <div style="font-size: 2rem; color: #ff6b6b; margin-bottom: 20px;">🎉 HAPPY BIRTHDAY! 🎉</div>
            <div>Chúc bạn tràn đầy niềm vui, hạnh phúc và thành công!</div>
            <div>Mong bạn luôn giữ được nụ cười tươi và tinh thần vui vẻ như hôm nay!</div>
            <div style="margin-top: 20px; font-style: italic;">❤️ From your silly friend with love ❤️</div>
        `;
    }
}

// Tạo hiệu ứng confetti
function createConfetti() {
    const colors = ['🎉', '🎊', '🎈', '✨', '💫', '🌟', '⭐', '🎁', '🎂'];
    let container = document.querySelector('.confetti-container');
    
    if (!container) {
        container = document.createElement('div');
        container.className = 'confetti-container';
        document.body.appendChild(container);
    }
    
    for(let i = 0; i < 20; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.textContent = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confetti.style.fontSize = (Math.random() * 10 + 15) + 'px';
        
        container.appendChild(confetti);
        
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.remove();
            }
        }, 6000);
    }
}

// Tạo mưa trái tim
function createHeartRain() {
    const hearts = ['❤️', '💖', '💕', '💗', '💓', '💝'];
    let container = document.querySelector('.confetti-container');
    
    if (!container) {
        container = document.createElement('div');
        container.className = 'confetti-container';
        document.body.appendChild(container);
    }
    
    for(let i = 0; i < 10; i++) {
        const heart = document.createElement('div');
        heart.className = 'confetti';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 1 + 's';
        heart.style.animationDuration = (Math.random() * 2 + 3) + 's';
        heart.style.fontSize = (Math.random() * 15 + 20) + 'px';
        
        container.appendChild(heart);
        
        setTimeout(() => {
            if (heart.parentNode) {
                heart.remove();
            }
        }, 5000);
    }
}

// Thêm âm thanh hover cho các nút
document.addEventListener('DOMContentLoaded', function() {
    // Thêm âm thanh hover cho tất cả buttons
    const buttons = document.querySelectorAll('button, .music-control, .gift-box');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            // Âm thanh hover nhẹ
            if (audioContext) {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
                gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.1);
            }
        });
    });
    
    // Thêm âm thanh click cho tất cả elements có thể click
    document.addEventListener('click', function(e) {
        // Tạo hiệu ứng ripple sound khi click bất kỳ đâu
        if (audioContext && e.target.tagName !== 'BUTTON') {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.02, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.2);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.2);
        }
    });
});

// Thêm âm thanh cho animation title shake
function addTitleSoundEffect() {
    const title = document.querySelector('.title');
    if (title && audioContext) {
        // Phát âm thanh nhẹ mỗi 3 giây khi title shake
        setInterval(() => {
            if (backgroundMusicPlaying) {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1);
                
                gainNode.gain.setValueAtTime(0.03, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.3);
            }
        }, 3000);
    }
}

// Gọi function title sound effect sau khi khởi tạo
setTimeout(addTitleSoundEffect, 3000);