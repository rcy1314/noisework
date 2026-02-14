// ===== 获取URL参数 =====
const urlParams = new URLSearchParams(window.location.search);
const babyName = urlParams.get('name') || '卷卷';

// ===== 烟花音效 (Web Audio API) =====
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

function playFireworkSound() {
    if (!audioCtx) {
        audioCtx = new AudioContext();
    }

    // 发射音效 - 上升的"咻"声
    const launchOsc = audioCtx.createOscillator();
    const launchGain = audioCtx.createGain();
    launchOsc.type = 'sine';
    launchOsc.frequency.setValueAtTime(400, audioCtx.currentTime);
    launchOsc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.4);
    launchGain.gain.setValueAtTime(0.4, audioCtx.currentTime);
    launchGain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
    launchOsc.connect(launchGain);
    launchGain.connect(audioCtx.destination);
    launchOsc.start(audioCtx.currentTime);
    launchOsc.stop(audioCtx.currentTime + 0.4);
}

// 红包音效 - 清脆的"叮"
function playHongbaoSound() {
    if (!audioCtx) audioCtx = new AudioContext();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1320, audioCtx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + 0.2);
}

// 金红包音效 - 连续"叮叮叮"
function playGoldenHongbaoSound() {
    if (!audioCtx) audioCtx = new AudioContext();

    [0, 0.08, 0.16].forEach((delay, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sine';
        const baseFreq = 880 + i * 220;
        osc.frequency.setValueAtTime(baseFreq, audioCtx.currentTime + delay);

        gain.gain.setValueAtTime(0.25, audioCtx.currentTime + delay);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + delay + 0.15);

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(audioCtx.currentTime + delay);
        osc.stop(audioCtx.currentTime + delay + 0.15);
    });
}

// 炸弹音效 - 低沉的"嘭"
function playBombSound() {
    if (!audioCtx) audioCtx = new AudioContext();

    // 低频爆炸
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 0.3);

    gain.gain.setValueAtTime(0.5, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + 0.3);

    // 噪声
    const bufferSize = audioCtx.sampleRate * 0.2;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2);
    }

    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;
    const noiseGain = audioCtx.createGain();
    noiseGain.gain.setValueAtTime(0.4, audioCtx.currentTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);

    noise.connect(noiseGain);
    noiseGain.connect(audioCtx.destination);
    noise.start(audioCtx.currentTime);
}

function playExplosionSound() {
    if (!audioCtx) {
        audioCtx = new AudioContext();
    }

    // 爆炸音效 - 白噪声 + 低频
    const bufferSize = audioCtx.sampleRate * 0.4;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 1.5);
    }

    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;

    const noiseGain = audioCtx.createGain();
    noiseGain.gain.setValueAtTime(0.8, audioCtx.currentTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(3000, audioCtx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.4);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(audioCtx.destination);
    noise.start(audioCtx.currentTime);
}

// ===== 像素风烟花 =====
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

// ===== 生成像素星星 =====
function createPixelStars() {
    const container = document.getElementById('pixelStars');
    if (!container) return;
    container.innerHTML = '';

    const count = Math.floor(window.innerWidth / 40);
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'pixel-star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 60 + '%';
        star.style.animationDelay = Math.random() * 2 + 's';

        // 随机大小
        const size = Math.random() > 0.7 ? 6 : 4;
        star.style.width = size + 'px';
        star.style.height = size + 'px';

        container.appendChild(star);
    }
}
createPixelStars();
window.addEventListener('resize', createPixelStars);

// 像素粒子
class Pixel {
    constructor(x, y, color, vx, vy, size = 4) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.vx = vx;
        this.vy = vy;
        this.life = 1;
        this.size = size;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.12; // 重力
        this.life -= 0.018;
    }

    draw() {
        if (this.life <= 0) return;
        ctx.fillStyle = this.color;
        ctx.globalAlpha = Math.floor(this.life * 4) / 4; // 像素化透明度
        // 像素方块
        const px = Math.floor(this.x / this.size) * this.size;
        const py = Math.floor(this.y / this.size) * this.size;
        ctx.fillRect(px, py, this.size, this.size);
        ctx.globalAlpha = 1;
    }
}

// 烟花轨迹粒子
class Trail {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.life = 1;
        this.size = 4;
    }

    update() {
        this.life -= 0.08;
    }

    draw() {
        if (this.life <= 0) return;
        ctx.fillStyle = '#d4a84b';
        ctx.globalAlpha = Math.floor(this.life * 3) / 3;
        const px = Math.floor(this.x / this.size) * this.size;
        const py = Math.floor(this.y / this.size) * this.size;
        ctx.fillRect(px, py, this.size, this.size);
        ctx.globalAlpha = 1;
    }
}

// 烟花
class Firework {
    constructor(x, targetY) {
        this.x = x;
        this.y = canvas.height;
        this.targetY = targetY;
        // 根据目标高度计算初始速度，确保能到达点击位置
        const distance = this.y - targetY;
        // 物理公式: v^2 = 2*a*d, 加点额外速度确保能到达
        this.vy = -Math.sqrt(2 * 0.2 * distance) - 2;
        this.exploded = false;
        this.pixels = [];
        this.trails = [];
        this.trailTimer = 0;
    }

    update() {
        if (!this.exploded) {
            this.y += this.vy;
            this.vy += 0.2;

            // 添加轨迹
            this.trailTimer++;
            if (this.trailTimer % 2 === 0) {
                this.trails.push(new Trail(this.x, this.y));
            }

            // 到达目标高度时爆炸
            if (this.y <= this.targetY) {
                this.explode();
            }
        }

        // 更新轨迹
        this.trails = this.trails.filter(t => {
            t.update();
            return t.life > 0;
        });

        this.pixels = this.pixels.filter(p => {
            p.update();
            return p.life > 0;
        });
    }

    explode() {
        this.exploded = true;
        playExplosionSound();
        const colors = ['#c53a3a', '#d4a84b', '#e8e8e8', '#ff6b6b', '#ffd93d'];
        const count = 36;

        // 主爆炸
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count;
            const speed = 3 + Math.random() * 4;
            const color = colors[Math.floor(Math.random() * colors.length)];

            this.pixels.push(new Pixel(
                this.x,
                this.y,
                color,
                Math.cos(angle) * speed,
                Math.sin(angle) * speed,
                4
            ));
        }

        // 内圈小粒子
        for (let i = 0; i < 12; i++) {
            const angle = (Math.PI * 2 * i) / 12;
            const speed = 1.5 + Math.random() * 2;
            const color = colors[Math.floor(Math.random() * colors.length)];

            this.pixels.push(new Pixel(
                this.x,
                this.y,
                color,
                Math.cos(angle) * speed,
                Math.sin(angle) * speed,
                2
            ));
        }

        showBlessing(this.x, this.y);
    }

    draw() {
        // 画轨迹
        this.trails.forEach(t => t.draw());

        if (!this.exploded) {
            ctx.fillStyle = '#d4a84b';
            const px = Math.floor(this.x / 4) * 4;
            const py = Math.floor(this.y / 4) * 4;
            ctx.fillRect(px - 2, py - 4, 4, 8);
            // 火花
            ctx.fillStyle = '#ff6b6b';
            ctx.fillRect(px - 2, py + 4, 4, 4);
        }

        this.pixels.forEach(p => p.draw());
    }

    isDone() {
        return this.exploded && this.pixels.length === 0 && this.trails.length === 0;
    }
}

let fireworks = [];

function launchFirework(x, y) {
    const targetY = y || Math.random() * canvas.height * 0.4 + canvas.height * 0.1;
    fireworks.push(new Firework(x, targetY));
    playFireworkSound();
}

// 祝福语（动态生成，包含宝宝名字）
const blessings = [
    // 经典祝福
    '新年快乐', '马到成功', '万事如意', '恭喜发财',
    '身体健康', '阖家幸福', '心想事成', '大吉大利',
    '龙马精神', '一马当先', '马年大吉', '福星高照',
    '财源滚滚', '步步高升', '吉祥如意', '幸福美满',
    '前程似锦', '鹏程万里', '金玉满堂', '花开富贵',

    // 有趣祝福
    '暴富!暴富!', '今年脱单!', '永远18岁', '头发茂密',
    '告别加班', '准时下班', 'KPI全满', '年终奖翻倍',
    '不长痘痘', '越吃越瘦', '熬夜不秃', '代码无BUG',
    '一夜暴富', '锦鲤附体', '欧气满满', '天选之人',

    // 给宝宝的
    `${babyName}最棒`, '快高长大', '聪明伶俐', '健康成长',
    '学业有成', '天天开心', '乖乖吃饭', '好好睡觉',

    // 给家人的
    '全家平安', '和和美美', '阖家欢乐', '家庭幸福',
    '全家健康', '家和万事兴', '团团圆圆', '美满幸福',

    // 搞怪
    '咻~砰!', 'BOOM!', '666666', '发发发发',
    '冲鸭!', '奥利给!', 'YYDS!', '绝绝子!'
];

const blessingsEl = document.getElementById('blessings');

function showBlessing(x, y) {
    const el = document.createElement('div');
    el.className = 'blessing';
    el.textContent = blessings[Math.floor(Math.random() * blessings.length)];
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    blessingsEl.appendChild(el);
    setTimeout(() => el.remove(), 1800);
}

// 动画循环
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    fireworks.forEach((fw, i) => {
        fw.update();
        fw.draw();
        if (fw.isDone()) fireworks.splice(i, 1);
    });

    requestAnimationFrame(animate);
}
animate();

// 点击放烟花
document.addEventListener('click', (e) => {
    if (e.target.closest('.modal') || e.target.closest('.pixel-btn')) return;
    launchFirework(e.clientX, e.clientY);
});

// 初始烟花
setTimeout(() => {
    launchFirework(canvas.width * 0.3);
    setTimeout(() => launchFirework(canvas.width * 0.7), 300);
    setTimeout(() => launchFirework(canvas.width * 0.5), 600);
}, 500);

// ===== Modal =====
const modalFortune = document.getElementById('modalFortune');
const modalHongbao = document.getElementById('modalHongbao');

document.getElementById('btnFortune').onclick = () => modalFortune.classList.add('active');
document.getElementById('btnHongbao').onclick = () => modalHongbao.classList.add('active');
document.getElementById('closeFortune').onclick = () => modalFortune.classList.remove('active');
document.getElementById('closeHongbao').onclick = closeHongbaoModal;

[modalFortune, modalHongbao].forEach(m => {
    m.onclick = (e) => {
        if (e.target === m) m.classList.remove('active');
    };
});

// ===== 抽签 =====
const fortuneTube = document.getElementById('fortuneTube');
const fortuneArea = document.getElementById('fortuneArea');
const fortuneResult = document.getElementById('fortuneResult');
const resultText = document.getElementById('resultText');
const resultDetail = document.getElementById('resultDetail');

const fortunes = [
    { text: '马到成功', detail: '新年伊始，好运连连，事业爱情双丰收！' },
    { text: '鸿运当头', detail: '贵人相助，财源广进，万事顺遂如意！' },
    { text: '龙马精神', detail: '精力充沛，斗志昂扬，所向披靡！' },
    { text: '金玉满堂', detail: '财富如潮水般涌来，富贵荣华享不尽！' },
    { text: '天赐良缘', detail: '姻缘天定，有情人终成眷属，幸福美满！' },
    { text: '飞黄腾达', detail: '事业腾飞，青云直上，前途无量！' },
    { text: '福星高照', detail: '福气满满，诸事顺遂，心想事成！' },
    { text: '财运亨通', detail: '横财就手，正财不断，数钱数到手软！' },
    { text: '心想事成', detail: '所求皆如愿，所行皆坦途，喜事接踵来！' },
    { text: '吉星高照', detail: '运势亨通，健康平安，家庭和睦美满！' },
    { text: '步步高升', detail: '前程似锦，才华得展，佳音频传报！' },
    { text: '一马当先', detail: '勇往直前，抢占先机，成功在望！' },
    { text: '喜气洋洋', detail: '喜事连连，笑口常开，福气满门！' },
    { text: '锦上添花', detail: '好上加好，美上加美，惊喜不断！' },
    { text: '如鱼得水', detail: '事事顺心，如有神助，得心应手！' },
    { text: '一帆风顺', detail: '万事亨通，顺风顺水，无往不利！' },
    { text: '百事可乐', detail: '开开心心，快快乐乐，天天好心情！' },
    { text: '贵人相助', detail: '有人暗中帮你，困难迎刃而解！' },
    { text: '桃花朵朵', detail: '人见人爱，魅力四射，缘分不断！' },
    { text: '学业有成', detail: '金榜题名，学有所成，智慧超群！' },
    { text: '否极泰来', detail: '守得云开见月明，好运正在来的路上！' },
    { text: '柳暗花明', detail: '山重水复疑无路，柳暗花明又一村！' },
    { text: '时来运转', detail: '风水轮流转，好运即将降临！' },
    { text: '渐入佳境', detail: '越来越好，越来越顺，静待花开！' },
    { text: '苦尽甘来', detail: '付出终有回报，甜蜜即将到来！' },
    { text: '雨过天晴', detail: '阴霾散去，阳光普照，美好在前方！' },
    { text: '守株待兔', detail: '耐心等待，好运自来，不必强求！' },
    { text: '水到渠成', detail: '条件成熟，自然成功，顺势而为！' },
    { text: '平安是福', detail: '平平淡淡才是真，珍惜眼前人！' },
    { text: '厚积薄发', detail: '暂时蛰伏，静待时机，来年必有大成！' },
    { text: '知足常乐', detail: '珍惜拥有，感恩生活，幸福常伴！' },
    { text: '稳中求进', detail: '脚踏实地，稳扎稳打，终见曙光！' },
    { text: '细水长流', detail: '平稳发展，长长久久，后劲十足！' },
    { text: '随遇而安', detail: '顺其自然，随心所欲，自在逍遥！' },
    { text: '家和万事兴', detail: '家庭和睦，万事顺心，其乐融融！' },
    { text: '健康第一', detail: '身体倍儿棒，吃嘛嘛香，精神焕发！' }
];

// 抽签函数
function drawFortune() {
    if (fortuneTube.classList.contains('shaking')) return;
    fortuneTube.classList.add('shaking');

    setTimeout(() => {
        fortuneTube.classList.remove('shaking');
        fortuneArea.classList.add('hidden');
        fortuneResult.classList.remove('hidden');

        const f = fortunes[Math.floor(Math.random() * fortunes.length)];
        resultText.textContent = f.text;
        resultDetail.textContent = f.detail;

        // 多放几个烟花庆祝
        launchFirework(canvas.width / 2);
        setTimeout(() => launchFirework(canvas.width * 0.3), 200);
        setTimeout(() => launchFirework(canvas.width * 0.7), 400);
    }, 1000);
}

fortuneTube.onclick = drawFortune;

// ===== 摇一摇抽签 =====
let shakeThreshold = 15;
let lastShakeTime = 0;
let lastX = 0, lastY = 0, lastZ = 0;

function handleShake(event) {
    const current = event.accelerationIncludingGravity;
    if (!current) return;

    const deltaX = Math.abs(current.x - lastX);
    const deltaY = Math.abs(current.y - lastY);
    const deltaZ = Math.abs(current.z - lastZ);

    if ((deltaX > shakeThreshold || deltaY > shakeThreshold || deltaZ > shakeThreshold)) {
        const now = Date.now();
        if (now - lastShakeTime > 1500) { // 防止连续触发
            lastShakeTime = now;
            // 只有在抽签弹窗打开且签筒可见时才触发
            if (modalFortune.classList.contains('active') && !fortuneArea.classList.contains('hidden')) {
                drawFortune();
            }
        }
    }

    lastX = current.x;
    lastY = current.y;
    lastZ = current.z;
}

// 请求设备运动权限（iOS 13+ 需要）
function requestShakePermission() {
    if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
        DeviceMotionEvent.requestPermission()
            .then(permission => {
                if (permission === 'granted') {
                    window.addEventListener('devicemotion', handleShake);
                }
            })
            .catch(console.error);
    } else {
        window.addEventListener('devicemotion', handleShake);
    }
}

// 打开抽签弹窗时请求权限
const originalFortuneOpen = document.getElementById('btnFortune').onclick;
document.getElementById('btnFortune').onclick = () => {
    modalFortune.classList.add('active');
    requestShakePermission();
};

document.getElementById('btnRetry').onclick = () => {
    fortuneArea.classList.remove('hidden');
    fortuneResult.classList.add('hidden');
};

// ===== 红包游戏 =====
const gameArea = document.getElementById('gameArea');
const scoreEl = document.getElementById('score');
const timerEl = document.getElementById('timer');
const btnStart = document.getElementById('btnStart');
const gameOver = document.getElementById('gameOver');
const finalScoreEl = document.getElementById('finalScore');
const finalMsg = document.getElementById('finalMsg');

let score = 0;
let time = 20;
let combo = 0;
let lastCatchTime = 0;
let gameLoop = null;
let spawnLoop = null;

const messages = [
    { min: 0, text: '再接再厉!', sub: '下次一定行' },
    { min: 5, text: '初露锋芒!', sub: '有点意思' },
    { min: 10, text: '身手不凡!', sub: '越来越熟练了' },
    { min: 20, text: '红包达人!', sub: '这手速绝了' },
    { min: 30, text: '恭喜发财!', sub: '财神爷看好你' },
    { min: 50, text: '财神附体!', sub: '你就是财神本神' },
    { min: 80, text: '富可敌国!', sub: '请收下我的膝盖' }
];

// 红包点击粒子效果
function createClickParticles(x, y, parent, color = 'gold') {
    for (let i = 0; i < 8; i++) {
        const p = document.createElement('div');
        p.className = 'click-particle';
        p.style.left = x + 'px';
        p.style.top = y + 'px';
        p.style.background = color === 'gold' ? 'var(--gold)' : '#ffd700';
        const angle = (Math.PI * 2 * i) / 8;
        const dist = 25 + Math.random() * 25;
        p.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
        p.style.setProperty('--ty', Math.sin(angle) * dist + 'px');
        parent.appendChild(p);
        setTimeout(() => p.remove(), 400);
    }
}

// 显示得分飘字
function showScoreFloat(x, y, text, type = 'normal') {
    const el = document.createElement('div');
    el.className = 'score-float' + (type === 'big' ? ' big' : '') + (type === 'negative' ? ' negative' : '');
    el.textContent = text;
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    gameArea.appendChild(el);
    setTimeout(() => el.remove(), 800);
}

// 显示连击
function showCombo(x, y) {
    if (combo < 2) return;
    const el = document.createElement('div');
    el.className = 'combo-text combo' + Math.min(combo, 5);
    el.textContent = combo + ' COMBO!';
    el.style.left = x + 'px';
    el.style.top = (y - 20) + 'px';
    gameArea.appendChild(el);
    setTimeout(() => el.remove(), 600);
}

function startGame() {
    score = 0;
    time = 20;
    combo = 0;
    scoreEl.textContent = '0';
    timerEl.textContent = '20';
    btnStart.classList.add('hidden');
    gameOver.classList.add('hidden');

    // 清除旧元素但保留gameOver
    Array.from(gameArea.children).forEach(child => {
        if (child.id !== 'gameOver') child.remove();
    });

    gameLoop = setInterval(() => {
        time--;
        timerEl.textContent = time;
        // 最后5秒闪烁
        if (time <= 5) {
            timerEl.style.color = time % 2 ? 'var(--red)' : 'var(--gold)';
        }
        if (time <= 0) endGame();
    }, 1000);

    spawnLoop = setInterval(spawnHongbao, 300);
}

function spawnHongbao() {
    const hb = document.createElement('div');
    const rand = Math.random();

    // 10% 金红包, 8% 炸弹, 82% 普通红包
    let type = 'normal';
    if (rand < 0.10) {
        type = 'golden';
        hb.className = 'hongbao golden';
    } else if (rand < 0.18) {
        type = 'bomb';
        hb.className = 'hongbao bomb';
    } else {
        hb.className = 'hongbao';
    }

    hb.style.left = Math.random() * (gameArea.offsetWidth - 32) + 'px';
    hb.style.animationDuration = (0.9 + Math.random() * 0.5) + 's';

    hb.onclick = (e) => {
        e.stopPropagation();
        const rect = gameArea.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const now = Date.now();
        if (now - lastCatchTime < 500) {
            combo++;
        } else {
            combo = 1;
        }
        lastCatchTime = now;

        if (type === 'bomb') {
            // 炸弹扣分
            score = Math.max(0, score - 5);
            combo = 0;
            scoreEl.textContent = score;
            showScoreFloat(x, y, '-5', 'negative');
            playBombSound();
            // 屏幕震动
            gameArea.style.animation = 'none';
            gameArea.offsetHeight;
            gameArea.style.animation = 'shake 0.3s steps(4)';
        } else if (type === 'golden') {
            // 金红包+5分
            const bonus = 5 + Math.floor(combo / 2);
            score += bonus;
            scoreEl.textContent = score;
            showScoreFloat(x, y, '+' + bonus, 'big');
            showCombo(x, y);
            createClickParticles(x, y, gameArea, 'bright');
            playGoldenHongbaoSound();
        } else {
            // 普通红包
            const bonus = 1 + Math.floor(combo / 3);
            score += bonus;
            scoreEl.textContent = score;
            showScoreFloat(x, y, '+' + bonus);
            showCombo(x, y);
            createClickParticles(x, y, gameArea);
            playHongbaoSound();
        }

        hb.remove();
    };

    gameArea.appendChild(hb);
    setTimeout(() => { if (hb.parentNode) hb.remove(); }, 2000);
}

function endGame() {
    clearInterval(gameLoop);
    clearInterval(spawnLoop);
    timerEl.style.color = 'var(--gold)';

    // 清除红包但保留gameOver
    Array.from(gameArea.children).forEach(child => {
        if (child.id !== 'gameOver') child.remove();
    });

    // 找到合适的消息
    let msg = messages[0];
    for (const m of messages) {
        if (score >= m.min) msg = m;
    }

    finalScoreEl.textContent = score;
    finalMsg.innerHTML = msg.text + '<br><small style="font-size:0.7rem;color:var(--gray)">' + msg.sub + '</small>';

    gameOver.classList.remove('hidden');

    // 放烟花庆祝
    const fireworkCount = Math.min(3 + Math.floor(score / 15), 8);
    for (let i = 0; i < fireworkCount; i++) {
        setTimeout(() => launchFirework(Math.random() * canvas.width), i * 150);
    }
}

btnStart.onclick = startGame;
document.getElementById('btnAgain').onclick = startGame;

function closeHongbaoModal() {
    clearInterval(gameLoop);
    clearInterval(spawnLoop);

    // 清除红包但保留gameOver
    Array.from(gameArea.children).forEach(child => {
        if (child.id !== 'gameOver') child.remove();
    });

    btnStart.classList.remove('hidden');
    gameOver.classList.add('hidden');
    score = 0;
    time = 20;
    combo = 0;
    scoreEl.textContent = '0';
    timerEl.textContent = '20';
    timerEl.style.color = 'var(--gold)';
    modalHongbao.classList.remove('active');
}

// ===== 像素字符动画 =====
const pixelChars = document.querySelectorAll('.pixel-char');
pixelChars.forEach((char, i) => {
    char.style.animationDelay = i * 0.15 + 's';
});

// ===== 主界面元素点击互动 =====

// 点击马 - 跑一个来回
const horseContainer = document.querySelector('.pixel-horse-container');
const horse = document.querySelector('.pixel-horse');
let horseRunning = false;

horseContainer.style.cursor = 'pointer';
horseContainer.onclick = (e) => {
    e.stopPropagation();
    if (horseRunning) return;
    horseRunning = true;

    horse.style.animation = 'none';
    horse.offsetHeight;
    horse.classList.add('running');

    setTimeout(() => {
        horse.classList.remove('running');
        horse.style.animation = 'horse-run 0.3s steps(2) infinite';
        horseRunning = false;
    }, 2000);

    launchFirework(e.clientX, e.clientY);
};

// 点击年份 2026 - 数字翻滚
const yearBox = document.querySelector('.year-box');
const yearEl = document.querySelector('.year');
yearBox.style.cursor = 'pointer';
yearBox.onclick = (e) => {
    e.stopPropagation();
    yearBox.classList.add('shake-rotate');

    // 数字快速变化效果
    let count = 0;
    const originalText = '2026';
    const interval = setInterval(() => {
        yearEl.textContent = Math.floor(Math.random() * 9000 + 1000);
        count++;
        if (count > 10) {
            clearInterval(interval);
            yearEl.textContent = originalText;
            yearBox.classList.remove('shake-rotate');
        }
    }, 80);

    launchFirework(e.clientX, e.clientY);
};

// 点击"新年快乐"文字 - 彩虹变色 + 弹跳
const title = document.querySelector('.title');
title.style.cursor = 'pointer';
title.onclick = (e) => {
    e.stopPropagation();
    pixelChars.forEach((char, i) => {
        char.classList.add('rainbow-bounce');
        setTimeout(() => char.classList.remove('rainbow-bounce'), 1500);
    });

    // 多发几个烟花
    for (let i = 0; i < 3; i++) {
        setTimeout(() => launchFirework(
            e.clientX + (Math.random() - 0.5) * 100,
            e.clientY
        ), i * 150);
    }
};

// 点击灯笼 - 摇晃加剧 + 发光
const lanterns = document.querySelectorAll('.pixel-lantern');
lanterns.forEach(lantern => {
    lantern.style.cursor = 'pointer';
    lantern.style.pointerEvents = 'auto';
    lantern.onclick = (e) => {
        e.stopPropagation();
        lantern.classList.add('lantern-excited');
        setTimeout(() => lantern.classList.remove('lantern-excited'), 1500);
        launchFirework(e.clientX, e.clientY);
    };
});

// 点击提示文字 - 变换内容
const hint = document.querySelector('.hint');
const hintTexts = [
    '点击放烟花',
    '新年快乐!',
    '马年大吉!',
    '恭喜发财!',
    `${babyName}最棒!`,
    '点我点我!',
    '财源滚滚!',
    '好运连连!'
];
hint.style.cursor = 'pointer';
hint.onclick = (e) => {
    e.stopPropagation();
    hint.classList.add('hint-spin');
    setTimeout(() => {
        hint.innerHTML = `<span class="blink">[</span>${hintTexts[Math.floor(Math.random() * hintTexts.length)]}<span class="blink">]</span>`;
        hint.classList.remove('hint-spin');
    }, 300);
    launchFirework(e.clientX, e.clientY);
};

// 点击底部祝福 - 展开更多祝福
const footer = document.querySelector('.footer');
footer.style.cursor = 'pointer';
footer.onclick = (e) => {
    e.stopPropagation();
    footer.classList.add('footer-burst');
    setTimeout(() => footer.classList.remove('footer-burst'), 800);

    // 放一排烟花
    for (let i = 0; i < 5; i++) {
        setTimeout(() => launchFirework(
            canvas.width * (0.2 + i * 0.15),
            e.clientY
        ), i * 100);
    }
};

// ===== 花园宝宝互动 =====
const gardenBabies = document.querySelectorAll('.pixel-character');
const babyMessages = {
    'igglepiggle': [
        '依古比古~皮古!',
        '叮叮车来啦!',
        '我的毯子呢?',
        '晚安花园宝宝~',
        '呜~呜~呜~',
        '新年好呀!',
        `给${babyName}拜年!`,
        '红包拿来!',
        '要抱抱~',
        '飞毯出发!',
        '玛卡巴卡在哪?',
        '困了要睡觉...',
        '恭喜发财!',
        '我最爱跳舞!',
        `${babyName}新年快乐!`,
        `${babyName}要乖乖哦~`,
        `陪${babyName}玩!`,
        `${babyName}抱抱我~`,
        `${babyName}长高高!`,
        `${babyName}最聪明!`,
        `爱你哦${babyName}~`,
        `${babyName}晚安~`,
        `和${babyName}做朋友!`,
        `${babyName}吃饭饭~`,
        `保护${babyName}!`
    ],
    'upsydaisy': [
        '唔西迪西!',
        '我的床跑哪去啦?',
        '亲亲抱抱~',
        'Daisy Doo!',
        '跳舞时间到!',
        '裙子转转转~',
        '新年快乐呀!',
        `${babyName}最棒!`,
        '一起玩吧!',
        '我要唱歌~',
        '恭喜恭喜!',
        '花开富贵!',
        '谁在叫我?',
        '好漂亮的烟花!',
        '大吉大利!',
        `${babyName}我爱你!`,
        `亲亲${babyName}~`,
        `${babyName}跳舞舞!`,
        `${babyName}真可爱!`,
        `陪${babyName}唱歌~`,
        `${babyName}健康成长!`,
        `${babyName}甜甜梦~`,
        `给${babyName}跳个舞!`,
        `${babyName}越来越帅!`,
        `${babyName}开心每一天!`
    ]
};

gardenBabies.forEach(baby => {
    baby.onclick = (e) => {
        e.stopPropagation();

        // 放烟花
        const rect = baby.getBoundingClientRect();
        launchFirework(rect.left + rect.width / 2, rect.top);

        // 显示消息
        const type = baby.classList.contains('igglepiggle') ? 'igglepiggle' : 'upsydaisy';
        const msgs = babyMessages[type];
        const msg = msgs[Math.floor(Math.random() * msgs.length)];

        const bubble = document.createElement('div');
        bubble.className = 'speech-bubble';
        bubble.textContent = msg;
        bubble.style.left = rect.left + rect.width / 2 + 'px';
        bubble.style.top = rect.top - 10 + 'px';
        document.body.appendChild(bubble);

        setTimeout(() => bubble.remove(), 1200);
    };
});

// ===== 背景音乐控制 =====
const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
const musicList = ['music/bgm1.mp3', 'music/bgm2.mp3', 'music/bgm3.mp3'];
let musicPlaying = false;
let currentMusic = -1;

// 背景音乐音量调低
bgMusic.volume = 0.3;

// 随机播放一首（不重复上一首）
function playRandomMusic() {
    let nextIndex;
    do {
        nextIndex = Math.floor(Math.random() * musicList.length);
    } while (nextIndex === currentMusic && musicList.length > 1);

    currentMusic = nextIndex;
    bgMusic.src = musicList[currentMusic];
    return bgMusic.play();
}

// 一首播放完后自动播放下一首
bgMusic.onended = () => {
    if (musicPlaying) {
        playRandomMusic().catch(() => {});
    }
};

musicBtn.onclick = (e) => {
    e.stopPropagation();
    if (musicPlaying) {
        bgMusic.pause();
        musicBtn.classList.remove('playing');
        musicBtn.classList.add('muted');
        musicPlaying = false;
    } else {
        playRandomMusic().then(() => {
            musicBtn.classList.add('playing');
            musicBtn.classList.remove('muted');
            musicPlaying = true;
        }).catch(err => {
            console.log('音乐播放需要用户交互');
        });
    }
};

// 页面加载时尝试自动播放
window.addEventListener('DOMContentLoaded', () => {
    playRandomMusic().then(() => {
        musicBtn.classList.add('playing');
        musicBtn.classList.remove('muted');
        musicPlaying = true;
    }).catch(() => {
        // 浏览器阻止自动播放，等待用户点击
        document.addEventListener('click', function autoPlay() {
            if (!musicPlaying) {
                playRandomMusic().then(() => {
                    musicBtn.classList.add('playing');
                    musicBtn.classList.remove('muted');
                    musicPlaying = true;
                }).catch(() => {});
            }
            document.removeEventListener('click', autoPlay);
        }, { once: true });
    });
});

console.log('🎮 2026 新年快乐！像素风版本 🐴');
