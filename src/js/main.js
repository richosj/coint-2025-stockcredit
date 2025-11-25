import '../scss/main.scss';
console.log("Main JS loaded");

document.addEventListener('DOMContentLoaded', function() {

    if(document.querySelector('.main-visual .swiper')){
        const swiper = new Swiper('.main-visual .swiper', {
            loop: true,
            pagination: {
                el: '.main-visual-pagination .swiper-pagination',
                clickable: true,
            },
            navigation: false,
        });
    }

    const hamburgerMenus = document.querySelectorAll('.header-hamburger .hamburger-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    const body = document.body;

    let overlay = document.querySelector('.mobile-nav-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'mobile-nav-overlay';
        document.body.appendChild(overlay);
    }

    hamburgerMenus.forEach(function(hamburgerMenu) {
        hamburgerMenu.addEventListener('click', function() {
            const isActive = mobileNav.classList.contains('active');

            if (mobileNav) {
                if (!isActive) {
                    mobileNav.classList.add('active');
                    overlay.classList.add('active');
                    body.style.overflow = 'hidden';
                } else {
                    mobileNav.classList.remove('active');
                    overlay.classList.remove('active');
                    body.style.overflow = '';
                }
            }
        });
    });

    overlay.addEventListener('click', function() {
        if (mobileNav) {
            mobileNav.classList.remove('active');
        }
        overlay.classList.remove('active');
        body.style.overflow = '';
    });

    const mobileNavLinks = document.querySelectorAll('.mobile-gnb a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mobileNav) {
                mobileNav.classList.remove('active');
            }
            if (overlay) {
                overlay.classList.remove('active');
            }
            body.style.overflow = '';
        });
    });

    const header = document.querySelector('.header');
    const scrollThreshold = 40;

    if (header) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop > scrollThreshold) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }, false);
    }

    const modalTriggers = document.querySelectorAll('[data-modal]');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);

            if (modal) {
                modal.classList.add('active');
                body.style.overflow = 'hidden';
            }
        });
    });

    const modalCloses = document.querySelectorAll('.modal-close');
    modalCloses.forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
                body.style.overflow = 'auto';
            }
        });
    });

    const modalOverlays = document.querySelectorAll('.modal');
    modalOverlays.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
                body.style.overflow = 'auto';
            }
        });
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' || e.key === 'Esc') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                activeModal.classList.remove('active');
                body.style.overflow = 'auto';
            }
        }
    });

    // 비밀번호 찾기
    const findPwForm = document.getElementById('find_pw-form');
    const verificationId = document.getElementById('verification-id');
    const verificationConfirm = document.getElementById('verification-confirm');

    if (findPwForm && verificationId && verificationConfirm) {
        verificationConfirm.style.display = 'none';

        findPwForm.addEventListener('submit', function(e) {
            e.preventDefault();

            if (verificationId.style.display !== 'none') {
                const findId = document.getElementById('find-id').value;

                verificationId.style.display = 'none';
                verificationConfirm.style.display = 'flex';

                document.getElementById('confirm-id').value = findId;
            } else {
                console.log('본인인증 제출');
            }
        });
    }

    const carrierButtons = document.querySelectorAll('.carrier-btn');

    carrierButtons.forEach(button => {
        button.addEventListener('click', function() {
            carrierButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
});