import '../scss/main.scss';
console.log("Main JS loaded");

// 햄버거 메뉴 및 모바일 네비게이션 토글 기능
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

    // 오버레이 생성 (없으면)
    let overlay = document.querySelector('.mobile-nav-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'mobile-nav-overlay';
        document.body.appendChild(overlay);
    }

    // 각 햄버거 메뉴에 이벤트 리스너 추가
    hamburgerMenus.forEach(function(hamburgerMenu) {
        hamburgerMenu.addEventListener('click', function() {
            const isActive = mobileNav.classList.contains('active');

            if (mobileNav) {
                if (!isActive) {
                    mobileNav.classList.add('active');
                    overlay.classList.add('active');
                    body.style.overflow = 'hidden'; // 스크롤 방지
                } else {
                    mobileNav.classList.remove('active');
                    overlay.classList.remove('active');
                    body.style.overflow = ''; // 스크롤 복원
                }
            }
        });
    });

    // 오버레이 클릭 시 메뉴 닫기
    overlay.addEventListener('click', function() {
        if (mobileNav) {
            mobileNav.classList.remove('active');
        }
        overlay.classList.remove('active');
        body.style.overflow = '';
    });

    // 모바일 메뉴 링크 클릭 시 메뉴 닫기
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

    // 스크롤 시 헤더에 클래스 추가
    const header = document.querySelector('.header');
    const scrollThreshold = 40; // 40px

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

    // modal
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
});