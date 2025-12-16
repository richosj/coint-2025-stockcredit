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

    // GNB 전체 메뉴 토글
    const headerBg = document.querySelector('.header-bg');
    const nav = document.querySelector('#nav');
    const headerElement = document.querySelector('.header');
    
    if (nav && headerBg && headerElement) {
        // 메뉴 영역 hover 시 전체 메뉴 표시
        nav.addEventListener('mouseenter', function() {
            headerElement.classList.add('menu-open');
            headerBg.classList.add('active');
        });
        
        nav.addEventListener('mouseleave', function() {
            headerElement.classList.remove('menu-open');
            headerBg.classList.remove('active');
        });
        
        // header-bg 클릭 시 메뉴 닫기
        headerBg.addEventListener('click', function() {
            headerElement.classList.remove('menu-open');
            headerBg.classList.remove('active');
        });
    }

    const modalTriggers = document.querySelectorAll('[data-modal]');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
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

    // 회원가입 - 모두 동의 체크박스 기능
    const termsAll = document.getElementById('terms-all');
    const termsService = document.getElementById('terms-service');
    const termsPrivacy = document.getElementById('terms-privacy');
    const termsUnique = document.getElementById('terms-unique');
    const termsMarketing = document.getElementById('terms-marketing');
    
    // 개별 약관 체크박스들
    const individualTerms = [termsService, termsPrivacy, termsUnique, termsMarketing].filter(Boolean);
    
    if (termsAll) {
        // "모두 동의" 체크박스 클릭 시
        termsAll.addEventListener('change', function() {
            const isChecked = this.checked;
            individualTerms.forEach(checkbox => {
                if (checkbox) {
                    checkbox.checked = isChecked;
                }
            });
        });
        
        // 개별 약관 체크박스 변경 시 "모두 동의" 상태 업데이트
        individualTerms.forEach(checkbox => {
            if (checkbox) {
                checkbox.addEventListener('change', function() {
                    const allChecked = individualTerms.every(cb => cb && cb.checked);
                    termsAll.checked = allChecked;
                });
            }
        });
    }
    
    const signupArrows = document.querySelectorAll('.signup-arrow');
    
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

        // 에러 메시지 표시 함수
        function showError(input, message) {
            let errorDiv = input.parentElement.querySelector('.error-message');
            if (!errorDiv || errorDiv.textContent.includes('회원가입을 위해서는')) {
                errorDiv = document.createElement('div');
                errorDiv.className = 'error-message';
                input.parentElement.appendChild(errorDiv);
            }
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';
            errorDiv.style.color = '#df0000';
            input.style.borderColor = '#df0000';
        }

        // 에러 메시지 숨기기
        function hideError(input) {
            const errorDiv = input.parentElement.querySelector('.error-message');
            if (errorDiv && !errorDiv.textContent.includes('회원가입을 위해서는')) {
                errorDiv.style.display = 'none';
            }
            input.style.borderColor = '';
        }

        // 이메일 유효성 검사
        function validateEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        // 전화번호 유효성 검사
        function validatePhone(phone) {
            const phoneRegex = /^[0-9]{10,11}$/;
            return phoneRegex.test(phone.replace(/[^0-9]/g, ''));
        }

        // Step1 검증: 필수 약관 동의
        function validateStep1() {
            const termsService = document.getElementById('terms-service');
            const termsPrivacy = document.getElementById('terms-privacy');
            
            if (!termsService || !termsService.checked) {
                alert('서비스 이용약관에 동의해주세요.');
                return false;
            }
            
            if (!termsPrivacy || !termsPrivacy.checked) {
                alert('개인정보수집 및 이용동의에 동의해주세요.');
                return false;
            }
            
            return true;
        }

        // Step2 검증: 아이디, 전화번호, 통신사
        function validateStep2() {
            const confirmId = document.getElementById('confirm-id');
            const confirmPhone = document.getElementById('confirm-phone');
            const carrierBtn = document.querySelector('.carrier-btn.active');
            
            // 아이디 검증
            if (!confirmId || !confirmId.value.trim()) {
                if (confirmId) showError(confirmId, '아이디(이메일)를 입력해주세요.');
                return false;
            }
            if (!validateEmail(confirmId.value.trim())) {
                showError(confirmId, '올바른 이메일 형식이 아닙니다.');
                return false;
            }
            hideError(confirmId);
            
            // 전화번호 검증
            if (!confirmPhone || !confirmPhone.value.trim()) {
                if (confirmPhone) showError(confirmPhone, '전화번호를 입력해주세요.');
                return false;
            }
            if (!validatePhone(confirmPhone.value)) {
                showError(confirmPhone, '올바른 전화번호 형식이 아닙니다.');
                return false;
            }
            hideError(confirmPhone);
            
            // 통신사 선택 검증
            if (!carrierBtn) {
                alert('통신사를 선택해주세요.');
                return false;
            }
            
            return true;
        }

        // Step3 검증: 인증번호
        function validateStep3() {
            const verificationCode = document.getElementById('verification-code');
            
            if (!verificationCode || !verificationCode.value.trim()) {
                if (verificationCode) showError(verificationCode, '인증번호를 입력해주세요.');
                return false;
            }
            if (verificationCode.value.trim().length < 4) {
                showError(verificationCode, '인증번호는 4자리 이상 입력해주세요.');
                return false;
            }
            hideError(verificationCode);
            
            return true;
        }

        // Step4 검증: 아이디, 비밀번호, 비밀번호 확인
        function validateStep4() {
            const signupId = document.getElementById('signup-id');
            const signupPassword = document.getElementById('signup-password');
            const confirmPassword = document.getElementById('confirm-password');
            
            // 아이디 검증
            if (!signupId || !signupId.value.trim()) {
                if (signupId) showError(signupId, '아이디(이메일)를 입력해주세요.');
                return false;
            }
            if (!validateEmail(signupId.value.trim())) {
                showError(signupId, '올바른 이메일 형식이 아닙니다.');
                return false;
            }
            hideError(signupId);
            
            // 비밀번호 검증
            if (!signupPassword || !signupPassword.value.trim()) {
                if (signupPassword) showError(signupPassword, '비밀번호를 입력해주세요.');
                return false;
            }
            if (signupPassword.value.length < 6) {
                showError(signupPassword, '비밀번호를 6자리 이상 입력해 주세요.');
                return false;
            }
            hideError(signupPassword);
            
            // 비밀번호 확인 검증
            if (!confirmPassword || !confirmPassword.value.trim()) {
                if (confirmPassword) showError(confirmPassword, '비밀번호 확인을 입력해주세요.');
                return false;
            }
            if (signupPassword.value !== confirmPassword.value) {
                showError(confirmPassword, '비밀번호가 일치하지 않습니다.');
                return false;
            }
            hideError(confirmPassword);
            
            return true;
        }

        // 통신사 버튼 클릭 이벤트
        const carrierBtns = document.querySelectorAll('.carrier-btn');
        carrierBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                carrierBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // 입력 필드 실시간 검증
        const confirmId = document.getElementById('confirm-id');
        if (confirmId) {
            confirmId.addEventListener('blur', function() {
                if (this.value.trim() && !validateEmail(this.value.trim())) {
                    showError(this, '올바른 이메일 형식이 아닙니다.');
                } else {
                    hideError(this);
                }
            });
        }

        const confirmPhone = document.getElementById('confirm-phone');
        if (confirmPhone) {
            confirmPhone.addEventListener('blur', function() {
                if (this.value.trim() && !validatePhone(this.value)) {
                    showError(this, '올바른 전화번호 형식이 아닙니다.');
                } else {
                    hideError(this);
                }
            });
        }

        const signupId = document.getElementById('signup-id');
        if (signupId) {
            signupId.addEventListener('blur', function() {
                if (this.value.trim() && !validateEmail(this.value.trim())) {
                    showError(this, '올바른 이메일 형식이 아닙니다.');
                } else {
                    hideError(this);
                }
            });
        }

        const signupPassword = document.getElementById('signup-password');
        if (signupPassword) {
            signupPassword.addEventListener('input', function() {
                const errorMsg = this.parentElement.querySelector('.error-message');
                if (this.value.length > 0 && this.value.length < 6) {
                    if (errorMsg && !errorMsg.textContent.includes('회원가입을 위해서는')) {
                        showError(this, '비밀번호를 6자리 이상 입력해 주세요.');
                    }
                } else {
                    hideError(this);
                }
            });
        }

        const confirmPassword = document.getElementById('confirm-password');
        if (confirmPassword) {
            confirmPassword.addEventListener('blur', function() {
                const password = signupPassword?.value || '';
                if (this.value && password !== this.value) {
                    showError(this, '비밀번호가 일치하지 않습니다.');
                } else {
                    hideError(this);
                }
            });
        }

        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();

            if (currentStep === 1) {
                if (validateStep1()) {
                    signupStep1.style.display = 'none';
                    signupStep2.style.display = 'flex';
                    currentStep = 2;
                    if (breadcrumbSpan) breadcrumbSpan.textContent = stepTexts[2];
                }
            } else if (currentStep === 2) {
                if (validateStep2()) {
                    signupStep2.style.display = 'none';
                    signupStep3.style.display = 'flex';
                    currentStep = 3;
                    if (breadcrumbSpan) breadcrumbSpan.textContent = stepTexts[3];
                }
            } else if (currentStep === 3) {
                if (validateStep3()) {
                    signupStep3.style.display = 'none';
                    signupStep4.style.display = 'flex';
                    currentStep = 4;
                    if (breadcrumbSpan) breadcrumbSpan.textContent = stepTexts[4];
                }
            } else if (currentStep === 4) {
                if (validateStep4()) {
                    signupStep4.style.display = 'none';
                    signupStep5.style.display = 'flex';
                    currentStep = 5;
                    if (breadcrumbSpan) breadcrumbSpan.textContent = stepTexts[5];
                }
            } else if (currentStep === 5) {
                // 완료 페이지
            }
        });
    }
});