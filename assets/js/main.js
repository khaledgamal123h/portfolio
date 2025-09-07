/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId)

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle', 'nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
    const scrollDown = window.scrollY

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id'),
            sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

        if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
            sectionsClass.classList.add('active-link')
        } else {
            sectionsClass.classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
    //     reset: true
});


sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text', {});
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img', { delay: 400 });
sr.reveal('.home__social-icon', { interval: 200 });
sr.reveal('.skills__data, .work__img, .contact__input', { interval: 200 });

/* ===== AUTO SCROLL (robust + smooth) ===== */
(function () {
    const el = document.scrollingElement || document.documentElement;
    let rafId = null;
    let active = false;
    let lastTime = null;
    let pxPerSecond = 40; // السرعة

    function step(ts) {
        if (!active) return;
        if (lastTime == null) {
            lastTime = ts;
            rafId = requestAnimationFrame(step);
            return;
        }
        const dt = ts - lastTime;
        lastTime = ts;

        const dy = (pxPerSecond * dt) / 1000;
        el.scrollTop += dy;

        const atBottom = Math.ceil(el.clientHeight + el.scrollTop) >= el.scrollHeight;
        if (atBottom) {
            setTimeout(() => {
                el.scrollTo({ top: 0, behavior: 'auto' });
                lastTime = null;
                rafId = requestAnimationFrame(step);
            }, 800);
        } else {
            rafId = requestAnimationFrame(step);
        }
    }

    function start() {
        if (rafId != null) return;
        active = true;
        lastTime = null;
        rafId = requestAnimationFrame(step);
    }

    function stop() {
        active = false;
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null;
    }

    // ⬅️ جديد: أي تفاعل يوقف نهائي
    const pause = () => {
        stop();
    };
    ['wheel', 'touchstart', 'keydown', 'mousedown'].forEach(ev =>
        window.addEventListener(ev, pause, { passive: true })
    );

    // ⬅️ جديد: دبل كليك = تشغيل/إيقاف يدوي
    document.addEventListener("dblclick", () => {
        if (active) {
            stop();
        } else {
            start();
        }
    });

    // أدوات للكونسول
    window.autoScrollControl = {
        start, stop,
        setSpeed: (s) => { pxPerSecond = Math.max(1, Number(s) || 40); }
    };
})();



window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    setTimeout(() => {
        preloader.classList.add("hidden");
    }, 4000); // 4 ثواني
});


