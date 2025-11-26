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
    const menuClose = document.querySelector('.btn-back');
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

    if (menuClose) {
        menuClose.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            overlay.classList.remove('active');
            body.style.overflow = '';
        });
    }

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

    // 회원가입
    const signupCheckboxes = document.querySelectorAll('.signup-content input[type="checkbox"]');
    const signupArrows = document.querySelectorAll('.signup-arrow');

    signupCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
        });
    });

    signupArrows.forEach(arrow => {
        arrow.addEventListener('click', function() {
        });
    });

    const signupForm = document.getElementById('signup-form');
    const signupStep1 = document.getElementById('signup-step1');
    const signupStep2 = document.getElementById('signup-step2');
    const signupStep3 = document.getElementById('signup-step3');
    const signupStep4 = document.getElementById('signup-step4');
    const signupStep5 = document.getElementById('signup-step5');
    const breadcrumbSpan = document.querySelector('.breadcrumb-item span');

    const stepTexts = {
        1: '회원가입 Step1 (약정동의)',
        2: '회원가입 Step2 (본인인증)',
        3: '회원가입 Step3 (문자인증)',
        4: '회원가입 Step4 (비밀번호 입력)',
        5: '회원가입 Step5 (가입완료)'
    };

    if (signupForm && signupStep1 && signupStep2 && signupStep3 && signupStep4 && signupStep5) {
        signupStep2.style.display = 'none';
        signupStep3.style.display = 'none';
        signupStep4.style.display = 'none';
        signupStep5.style.display = 'none';

        let currentStep = 1;

        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();

            if (currentStep === 1) {
                signupStep1.style.display = 'none';
                signupStep2.style.display = 'flex';
                currentStep = 2;
                if (breadcrumbSpan) breadcrumbSpan.textContent = stepTexts[2];
            } else if (currentStep === 2) {
                signupStep2.style.display = 'none';
                signupStep3.style.display = 'flex';
                currentStep = 3;
                if (breadcrumbSpan) breadcrumbSpan.textContent = stepTexts[3];
            } else if (currentStep === 3) {
                signupStep3.style.display = 'none';
                signupStep4.style.display = 'flex';
                currentStep = 4;
                if (breadcrumbSpan) breadcrumbSpan.textContent = stepTexts[4];
            } else if (currentStep === 4) {
                signupStep4.style.display = 'none';
                signupStep5.style.display = 'flex';
                currentStep = 5;
                if (breadcrumbSpan) breadcrumbSpan.textContent = stepTexts[5];
            } else if (currentStep === 5) {
            }
        });
    }
});