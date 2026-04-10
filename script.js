// Initialize AOS (Animate on Scroll)
AOS.init({
    once: false, 
    mirror: true,
    duration: 1000
});

// Auto-Play Music on First Interaction
let audioStarted = false;
function enableAudio() {
    if (!audioStarted && !isPlaying) {
        const bgMus = document.getElementById('bg-music');
        const ic = document.querySelector('#music-btn i');
        const tx = document.querySelector('.music-text');
        if(bgMus.paused) {
            bgMus.play().then(() => {
                if(ic) { ic.classList.remove('fa-play'); ic.classList.add('fa-pause'); }
                if(tx) tx.innerText = "Музыка играет";
                isPlaying = true;
                audioStarted = true;
            }).catch(e => { console.log(e); });
        }
    }
}
document.addEventListener('click', enableAudio, { once: true });
document.addEventListener('touchstart', enableAudio, { once: true });
document.addEventListener('scroll', enableAudio, { once: true });

// Scroll Progress Bar
window.addEventListener('scroll', () => {
    let scrollTotal = document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrollPosition = (scrollTotal / height) * 100;
    document.getElementById('progress-bar').style.width = scrollPosition + '%';
});

// Music Control 
const musicBtn = document.getElementById('music-btn');
const bgMusic = document.getElementById('bg-music');
bgMusic.volume = 0.5;
let isPlaying = false;

musicBtn.addEventListener('click', () => {
    const icon = musicBtn.querySelector('i');
    const text = musicBtn.querySelector('.music-text');
    if (isPlaying) {
        bgMusic.pause();
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
        text.innerText = "Включи музыку";
    } else {
        bgMusic.play().then(() => {
            icon.classList.remove('fa-play');
            icon.classList.add('fa-pause');
            text.innerText = "Музыка играет";
        }).catch(e => { console.log(e) });
    }
    isPlaying = !isPlaying;
});

// Typing Effect for Hero Section
const phrases = ["С Днём Рождения, Айдана!", "Моя любовь 💖", "Моя вселенная ✨", "Самая нежная"];
let i = 0, j = 0, currentPhrase = [], isDeleting = false, isEnd = false;
const typingText = document.getElementById('typing-text');

function loop() {
    isEnd = false;
    typingText.innerHTML = currentPhrase.join('');
    if (i < phrases.length) {
        if (!isDeleting && j <= phrases[i].length) {
            currentPhrase.push(phrases[i][j]); j++; setTimeout(loop, 120);
        }
        if (isDeleting && j <= phrases[i].length) {
            currentPhrase.pop(phrases[i][j]); j--; setTimeout(loop, 60);
        }
        if (j == phrases[i].length) {
            isEnd = true; isDeleting = true; setTimeout(loop, 2500); 
        }
        if (isDeleting && j === 0) {
            currentPhrase = []; isDeleting = false; i++;
            if (i === phrases.length) { i = 0; }
            setTimeout(loop, 500);
        }
    }
}
setTimeout(loop, 1000); 

// --- NEW FIX: TIMER LOGIC ---
// Вы можете изменить эту дату на дату начала ваших отношений (в формате ГГГГ-ММ-ДД)
const startDate = new Date('2025-01-01T00:00:00').getTime(); 
setInterval(() => {
    const now = new Date().getTime();
    const diff = now - startDate;
    if(diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('days').innerText = days < 10 ? '0'+days : days;
        document.getElementById('hours').innerText = hours < 10 ? '0'+hours : hours;
        document.getElementById('minutes').innerText = minutes < 10 ? '0'+minutes : minutes;
        document.getElementById('seconds').innerText = seconds < 10 ? '0'+seconds : seconds;
    }
}, 1000);

// --- NEW FIX: TENDER REASONS JAR ---
const reasons = [
    "Твой заразительный смех",
    "Твои бездонные и красивые глаза",
    "То, как мило ты злишься на пустяки",
    "Твоя невероятная забота обо мне",
    "Уют, который ты приносишь в мою жизнь",
    "Твоя яркая, очаровательная улыбка",
    "Наши бесконечные разговоры по душам",
    "Твоя поддержка в любую секунду",
    "Твоя нежность и ласка",
    "Твой потрясающий вкус во всём",
    "Просто потому, что ты — это ты!"
];
const jarBtn = document.getElementById('jar-btn');
const noteDiv = document.getElementById('jar-note');
const noteText = document.getElementById('note-text');

jarBtn.addEventListener('click', () => {
    noteDiv.classList.remove('show-note');
    setTimeout(() => {
        const rnd = Math.floor(Math.random() * reasons.length);
        noteText.innerText = `«${reasons[rnd]}»`;
        noteDiv.classList.add('show-note');
    }, 300);
});

// --- NEW FIX: MULTI-STAGE QUEST ENGINE ---
// ВАЖНО: Вы можете добавлять, удалять и изменять эти уровни как угодно!
const questStages = [
    {
        type: "text",
        question: "Уровень 1. Разминка для памяти! Где мы с тобой впервые встретились?",
        hint: "(Напиши аббревиатуру места)",
        answer: "адк"
    },
    {
        type: "choice",
        question: "Уровень 2. Что делает тебя самой шикарной 19-летней девушкой на свете?",
        hint: "Выбери правильный вариант:",
        options: ["Знание всех секретов цветов", "Твоя невероятно яркая энергия и ум!", "Твоя умопомрачительная красота", "Абсолютно всё из этого!"],
        answer: "Абсолютно всё из этого!"
    },
    {
        type: "text",
        question: "Уровень 3. Вопрос к флористу! Какими цветами проще всего растопить твое сердечко?",
        hint: "(Напиши строчными буквами, два слова)",
        answer: "красные гвоздики"
    },
    {
        type: "choice",
        question: "Уровень 4. Какое идеальное блюдо нужно приготовить, чтобы сделать тебя самой счастливой?",
        hint: "Тут вариантов быть не может:",
        options: ["Самые дорогие суши", "Огромную пиццу", "Конечно же, вкуснейший бешбармак!", "Сладкий торт"],
        answer: "Конечно же, вкуснейший бешбармак!"
    },
    {
        type: "text",
        question: "Уровень 5. Финал! Где прошло наше самое первое уютное свидание?",
        hint: "(Напиши два слова, через пробел)",
        answer: "кофе бум"
    }
];

let currentQuestStage = 0;
const questContainer = document.getElementById('multi-quest-container');
const questArea = document.getElementById('quest-dynamic-area');
const questQ = document.getElementById('quest-q');
const questHint = document.getElementById('quest-hint');
const textMode = document.getElementById('quest-text-mode');
const choiceMode = document.getElementById('quest-choice-mode');
const qInput = document.getElementById('multi-quest-input');
const qBtn = document.getElementById('multi-quest-btn');
const qError = document.getElementById('multi-quest-error');
const stageSuccess = document.getElementById('quest-stage-success');
const nextBtn = document.getElementById('next-stage-btn');
const biometricsContainer = document.getElementById('biometrics-container');

let selectedChoice = null;

function loadQuestStage() {
    if (!questContainer) return;
    qError.style.display = 'none';
    stageSuccess.style.display = 'none';
    questArea.style.display = 'block';
    if(qInput) qInput.value = '';
    selectedChoice = null;
    if(qInput) qInput.classList.remove('shake');
    
    if (currentQuestStage >= questStages.length) {
        // ALL STAGES COMPLETED, REVEAL BOSS (BIOMETRICS)
        questContainer.style.opacity = '0';
        setTimeout(() => {
            questContainer.style.display = 'none';
            if(biometricsContainer) biometricsContainer.style.display = 'block';
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }, 500);
        return;
    }
    
    const stage = questStages[currentQuestStage];
    questQ.innerText = stage.question;
    questHint.innerHTML = stage.hint || '&nbsp;'; // Keep height consistent
    
    if (stage.type === "text") {
        textMode.style.display = 'block';
        choiceMode.style.display = 'none';
    } else if (stage.type === "choice") {
        textMode.style.display = 'none';
        choiceMode.style.display = 'flex';
        choiceMode.innerHTML = '';
        stage.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'glass-btn choice-item';
            btn.style.width = '100%';
            btn.style.maxWidth = '350px';
            btn.style.padding = '15px';
            btn.innerText = opt;
            btn.onclick = () => {
                document.querySelectorAll('.choice-item').forEach(b => {
                    b.style.background = 'rgba(255, 107, 152, 0.2)';
                    b.style.transform = 'scale(1)';
                    b.style.boxShadow = 'none';
                });
                btn.style.background = 'rgba(255, 107, 152, 0.8)';
                btn.style.transform = 'scale(1.05)';
                btn.style.boxShadow = '0 0 20px rgba(255, 107, 152, 0.8)';
                selectedChoice = opt;
            };
            choiceMode.appendChild(btn);
        });
    }
}

if(qBtn) qBtn.onclick = checkMultiQuest;
if(qInput) qInput.addEventListener('keypress', (e) => { if(e.key === 'Enter') checkMultiQuest(); });

function checkMultiQuest() {
    const stage = questStages[currentQuestStage];
    let isCorrect = false;
    
    if (stage.type === "text") {
        if (qInput.value.trim().toLowerCase() === stage.answer.toLowerCase()) {
            isCorrect = true;
        }
    } else if (stage.type === "choice") {
        if (selectedChoice === stage.answer) {
            isCorrect = true;
        }
    }
    
    if (isCorrect) {
        questArea.style.display = 'none';
        stageSuccess.style.display = 'flex';
        // Minor confetti celebration for beating a level
        if (window.confetti) {
            confetti({ particleCount: 60, spread: 60, origin: { y: 0.8 }, colors: ['#ff6b98', '#ffd1dc'] });
        }
    } else {
        if(qInput && stage.type === "text") qInput.classList.add('shake');
        if (choiceMode.style.display === 'flex') choiceMode.classList.add('shake');
        qError.style.display = 'block';
        setTimeout(() => {
            if(qInput) qInput.classList.remove('shake');
            choiceMode.classList.remove('shake');
        }, 500);
    }
}

if(nextBtn) {
    nextBtn.onclick = () => {
        currentQuestStage++;
        loadQuestStage();
    };
}

// Init Game System on load
window.addEventListener('DOMContentLoaded', () => {
    loadQuestStage();
});

// Clickable Photo Stack Gallery Logic
const stack = document.getElementById('photo-stack');
const photos = document.querySelectorAll('.stack-item');
let currentPhotoIndex = 0;
if (stack && photos.length > 0) {
    stack.addEventListener('click', () => {
        const current = photos[currentPhotoIndex];
        current.classList.remove('active');
        current.classList.add('fadeOut');
        
        currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
        
        const next = photos[currentPhotoIndex];
        next.classList.remove('fadeOut');
        next.classList.add('active');
    });
}

// Hold to unlock Button feature
const holdBtn = document.getElementById('hold-btn');
const circle = document.querySelector('.progress-ring__circle');
const holdText = document.getElementById('hold-text');
// Hardcoded 60 to prevent SVG baseVal bugs when display is none
const circumference = 60 * 2 * Math.PI; 
circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = circumference;

let holdTimer;
let progress = 0;
let isHolding = false;

function setProgress(percent) {
    const offset = circumference - (percent / 100 * circumference);
    circle.style.strokeDashoffset = offset;
}

function startHolding() {
    if (isHolding) return;
    isHolding = true;
    holdText.innerText = 'Сканируем отпечаток...';
    holdText.style.color = '#ff6b98';
    holdBtn.style.transform = 'scale(0.9)';
    
    const startTime = Date.now();
    holdTimer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        progress = Math.min((elapsed / 3000) * 100, 100);
        setProgress(progress);
        
        if (progress > 30 && progress < 60) holdText.innerText = 'Сверка в базе данных...';
        if (progress > 60 && progress < 90) holdText.innerText = 'Идентификация: Айдана💖';
        if (progress >= 90) holdText.innerText = 'Доступ разрешен!';

        if(progress >= 100) {
            clearInterval(holdTimer);
            unlockGift();
        }
    }, 40);
}

function stopHolding() {
    isHolding = false;
    clearInterval(holdTimer);
    if(progress < 100 && progress > 0) {
        progress = 0;
        setProgress(0);
        holdText.innerText = 'Сбой сканирования! Попробуй еще раз!';
        holdText.style.color = '#ffb8d1';
        holdBtn.style.transform = 'scale(1)';
        setTimeout(() => {
             if(!isHolding && progress === 0) {
                 holdText.innerText = 'Удерживай!';
                 holdText.style.color = '#fff';
             }
        }, 1500);
    } else if(progress === 0) {
        setProgress(0);
        holdText.innerText = 'Удерживай!';
        holdText.style.color = '#fff';
        holdBtn.style.transform = 'scale(1)';
    }
}

holdBtn.addEventListener('pointerdown', (e) => { e.preventDefault(); startHolding(); });
window.addEventListener('pointerup', stopHolding);
window.addEventListener('pointercancel', stopHolding);

// Unlock Modal & Confetti
const modal = document.getElementById('gift-modal');
const closeBtn = document.querySelector('.close-modal');

function unlockGift() {
    modal.classList.add('show');
    holdBtn.style.transform = "scale(0)"; 
    document.querySelector('.progress-ring').style.opacity = '0';
    holdText.innerText = 'Разблокировано!';
    holdText.style.color = '#00ff88';
    
    let duration = 6 * 1000;
    let animationEnd = Date.now() + duration;
    let defaults = { startVelocity: 40, spread: 360, ticks: 100, zIndex: 3000 };

    function randomInRange(min, max) { return Math.random() * (max - min) + min; }

    let interval = setInterval(function() {
        let timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) { return clearInterval(interval); }
        let particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, colors: ['#ff6b98', '#ffffff', '#ffd1dc', '#a60039'], origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
    
    // Auto-open Envelope 1.5 seconds after modal reveals
    setTimeout(() => {
        const env = document.getElementById('envelope');
        if (env) env.classList.add('open');
    }, 1500);
}

closeBtn.addEventListener('click', () => {
    modal.classList.remove('show');
    setTimeout(() => {
        progress = 0;
        setProgress(0);
        holdBtn.style.transform = "scale(1)";
        document.querySelector('.progress-ring').style.opacity = '1';
        // Hide envelope
        const env = document.getElementById('envelope');
        if (env) env.classList.remove('open');
        holdText.innerText = 'Удерживай!';
        holdText.style.color = '#fff';
    }, 500);
});

// Rose Petals Generator (Replaces ParticlesJS)
const petalsContainer = document.getElementById('particles-js');
const colors = ['#ff6b98', '#ffceeb', '#ff4e85', '#ffffff'];

function createPetal() {
    if (!petalsContainer) return;
    const petal = document.createElement('div');
    petal.classList.add('petal');
    petal.style.left = Math.random() * 100 + 'vw';
    petal.style.animationDuration = Math.random() * 4 + 6 + 's'; // 6-10s
    petal.style.opacity = Math.random() * 0.6 + 0.4;
    petal.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    // Varying sizes
    const size = Math.random() * 12 + 10;
    petal.style.width = size + 'px';
    petal.style.height = size + 'px';
    
    // Random side sway offset
    petal.style.setProperty('--sway', (Math.random() * 100 - 50) + 'px');
    
    petalsContainer.appendChild(petal);
    setTimeout(() => {
        if(petalsContainer.contains(petal)) petal.remove();
    }, 10000);
}

// Generate some immediately for initial look
for(let i=0; i<15; i++) {
    setTimeout(createPetal, Math.random() * 2000);
}
setInterval(createPetal, 400);

// --- NEW FIX: MAGIC DUST CURSOR ---
let lastDustTime = 0;
document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastDustTime < 25) return;
    lastDustTime = now;

    const dust = document.createElement('div');
    dust.classList.add('magic-dust');
    
    // Random sizes 4-12px
    const size = Math.random() * 8 + 4;
    dust.style.width = size + 'px';
    dust.style.height = size + 'px';
    
    dust.style.left = (e.clientX - size/2) + 'px';
    dust.style.top = (e.clientY - size/2) + 'px';
    
    // Spread values for translation animation
    const dx = (Math.random() - 0.5) * 50 + 'px';
    const dy = (Math.random() - 0.5) * 50 + 20 + 'px'; // tends to drop
    dust.style.setProperty('--dx', dx);
    dust.style.setProperty('--dy', dy);
    
    document.body.appendChild(dust);
    
    // Clean up
    setTimeout(() => {
        if(document.body.contains(dust)) dust.remove();
    }, 600);
});
