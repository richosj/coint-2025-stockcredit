(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
console.log("Main JS loaded");
document.addEventListener("DOMContentLoaded", function() {
  if (document.querySelector(".main-visual .swiper")) {
    new Swiper(".main-visual .swiper", {
      loop: true,
      pagination: {
        el: ".main-visual-pagination .swiper-pagination",
        clickable: true
      },
      navigation: false
    });
  }
  const hamburgerMenus = document.querySelectorAll(".header-hamburger .hamburger-menu");
  const mobileNav = document.querySelector(".mobile-nav");
  const menuClose = document.querySelector(".btn-back");
  const body = document.body;
  let overlay = document.querySelector(".mobile-nav-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "mobile-nav-overlay";
    document.body.appendChild(overlay);
  }
  hamburgerMenus.forEach(function(hamburgerMenu) {
    hamburgerMenu.addEventListener("click", function() {
      const isActive = mobileNav.classList.contains("active");
      if (mobileNav) {
        if (!isActive) {
          mobileNav.classList.add("active");
          overlay.classList.add("active");
          body.style.overflow = "hidden";
        } else {
          mobileNav.classList.remove("active");
          overlay.classList.remove("active");
          body.style.overflow = "";
        }
      }
    });
  });
  if (menuClose) {
    menuClose.addEventListener("click", function() {
      mobileNav.classList.remove("active");
      overlay.classList.remove("active");
      body.style.overflow = "";
    });
  }
  overlay.addEventListener("click", function() {
    if (mobileNav) {
      mobileNav.classList.remove("active");
    }
    overlay.classList.remove("active");
    body.style.overflow = "";
  });
  const mobileNavLinks = document.querySelectorAll(".mobile-gnb a");
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", function() {
      if (mobileNav) {
        mobileNav.classList.remove("active");
      }
      if (overlay) {
        overlay.classList.remove("active");
      }
      body.style.overflow = "";
    });
  });
  const header = document.querySelector(".header");
  const scrollThreshold = 40;
  if (header) {
    window.addEventListener("scroll", function() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > scrollThreshold) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }, false);
  }
  const headerBg = document.querySelector(".header-bg");
  const nav = document.querySelector("#nav");
  const headerElement = document.querySelector(".header");
  if (nav && headerBg && headerElement) {
    nav.addEventListener("mouseenter", function() {
      headerElement.classList.add("menu-open");
      headerBg.classList.add("active");
    });
    nav.addEventListener("mouseleave", function() {
      headerElement.classList.remove("menu-open");
      headerBg.classList.remove("active");
    });
    headerBg.addEventListener("click", function() {
      headerElement.classList.remove("menu-open");
      headerBg.classList.remove("active");
    });
  }
  const modalTriggers = document.querySelectorAll("[data-modal]");
  modalTriggers.forEach((trigger) => {
    trigger.addEventListener("click", function(e) {
      e.preventDefault();
      const modalId = this.getAttribute("data-modal");
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add("active");
        body.style.overflow = "hidden";
      }
    });
  });
  const modalCloses = document.querySelectorAll(".modal-close");
  modalCloses.forEach((closeBtn) => {
    closeBtn.addEventListener("click", function() {
      const modal = this.closest(".modal");
      if (modal) {
        modal.classList.remove("active");
        body.style.overflow = "auto";
      }
    });
  });
  const modalOverlays = document.querySelectorAll(".modal");
  modalOverlays.forEach((modal) => {
    modal.addEventListener("click", function(e) {
      if (e.target === modal) {
        modal.classList.remove("active");
        body.style.overflow = "auto";
      }
    });
  });
  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" || e.key === "Esc") {
      const activeModal = document.querySelector(".modal.active");
      if (activeModal) {
        activeModal.classList.remove("active");
        body.style.overflow = "auto";
      }
    }
  });
  const findPwForm = document.getElementById("find_pw-form");
  const verificationId = document.getElementById("verification-id");
  const verificationConfirm = document.getElementById("verification-confirm");
  if (findPwForm && verificationId && verificationConfirm) {
    verificationConfirm.style.display = "none";
    findPwForm.addEventListener("submit", function(e) {
      e.preventDefault();
      if (verificationId.style.display !== "none") {
        const findId = document.getElementById("find-id").value;
        verificationId.style.display = "none";
        verificationConfirm.style.display = "flex";
        document.getElementById("confirm-id").value = findId;
      } else {
        console.log("본인인증 제출");
      }
    });
  }
  const carrierButtons = document.querySelectorAll(".carrier-btn");
  carrierButtons.forEach((button) => {
    button.addEventListener("click", function() {
      carrierButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
    });
  });
  const termsAll = document.getElementById("terms-all");
  const termsService = document.getElementById("terms-service");
  const termsPrivacy = document.getElementById("terms-privacy");
  const termsUnique = document.getElementById("terms-unique");
  const termsMarketing = document.getElementById("terms-marketing");
  const individualTerms = [termsService, termsPrivacy, termsUnique, termsMarketing].filter(Boolean);
  if (termsAll) {
    termsAll.addEventListener("change", function() {
      const isChecked = this.checked;
      individualTerms.forEach((checkbox) => {
        if (checkbox) {
          checkbox.checked = isChecked;
        }
      });
    });
    individualTerms.forEach((checkbox) => {
      if (checkbox) {
        checkbox.addEventListener("change", function() {
          const allChecked = individualTerms.every((cb) => cb && cb.checked);
          termsAll.checked = allChecked;
        });
      }
    });
  }
  const signupArrows = document.querySelectorAll(".signup-arrow");
  signupArrows.forEach((arrow) => {
    arrow.addEventListener("click", function() {
    });
  });
  const signupForm = document.getElementById("signup-form");
  const signupStep1 = document.getElementById("signup-step1");
  const signupStep2 = document.getElementById("signup-step2");
  const signupStep3 = document.getElementById("signup-step3");
  const signupStep4 = document.getElementById("signup-step4");
  const signupStep5 = document.getElementById("signup-step5");
  const breadcrumbSpan = document.querySelector(".breadcrumb-item span");
  const stepTexts = {
    2: "회원가입 Step2 (본인인증)",
    3: "회원가입 Step3 (문자인증)",
    4: "회원가입 Step4 (비밀번호 입력)",
    5: "회원가입 Step5 (가입완료)"
  };
  if (signupForm && signupStep1 && signupStep2 && signupStep3 && signupStep4 && signupStep5) {
    let showError2 = function(input, message) {
      let errorDiv = input.parentElement.querySelector(".error-message");
      if (!errorDiv || errorDiv.textContent.includes("회원가입을 위해서는")) {
        errorDiv = document.createElement("div");
        errorDiv.className = "error-message";
        input.parentElement.appendChild(errorDiv);
      }
      errorDiv.textContent = message;
      errorDiv.style.display = "block";
      errorDiv.style.color = "#df0000";
      input.style.borderColor = "#df0000";
    }, hideError2 = function(input) {
      const errorDiv = input.parentElement.querySelector(".error-message");
      if (errorDiv && !errorDiv.textContent.includes("회원가입을 위해서는")) {
        errorDiv.style.display = "none";
      }
      input.style.borderColor = "";
    }, validateEmail2 = function(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }, validatePhone2 = function(phone) {
      const phoneRegex = /^[0-9]{10,11}$/;
      return phoneRegex.test(phone.replace(/[^0-9]/g, ""));
    }, validateStep12 = function() {
      const termsService2 = document.getElementById("terms-service");
      const termsPrivacy2 = document.getElementById("terms-privacy");
      if (!termsService2 || !termsService2.checked) {
        alert("서비스 이용약관에 동의해주세요.");
        return false;
      }
      if (!termsPrivacy2 || !termsPrivacy2.checked) {
        alert("개인정보수집 및 이용동의에 동의해주세요.");
        return false;
      }
      return true;
    }, validateStep22 = function() {
      const confirmId2 = document.getElementById("confirm-id");
      const confirmPhone2 = document.getElementById("confirm-phone");
      const carrierBtn = document.querySelector(".carrier-btn.active");
      if (!confirmId2 || !confirmId2.value.trim()) {
        if (confirmId2) showError2(confirmId2, "아이디(이메일)를 입력해주세요.");
        return false;
      }
      if (!validateEmail2(confirmId2.value.trim())) {
        showError2(confirmId2, "올바른 이메일 형식이 아닙니다.");
        return false;
      }
      hideError2(confirmId2);
      if (!confirmPhone2 || !confirmPhone2.value.trim()) {
        if (confirmPhone2) showError2(confirmPhone2, "전화번호를 입력해주세요.");
        return false;
      }
      if (!validatePhone2(confirmPhone2.value)) {
        showError2(confirmPhone2, "올바른 전화번호 형식이 아닙니다.");
        return false;
      }
      hideError2(confirmPhone2);
      if (!carrierBtn) {
        alert("통신사를 선택해주세요.");
        return false;
      }
      return true;
    }, validateStep32 = function() {
      const verificationCode = document.getElementById("verification-code");
      if (!verificationCode || !verificationCode.value.trim()) {
        if (verificationCode) showError2(verificationCode, "인증번호를 입력해주세요.");
        return false;
      }
      if (verificationCode.value.trim().length < 4) {
        showError2(verificationCode, "인증번호는 4자리 이상 입력해주세요.");
        return false;
      }
      hideError2(verificationCode);
      return true;
    }, validateStep42 = function() {
      const signupId2 = document.getElementById("signup-id");
      const signupPassword2 = document.getElementById("signup-password");
      const confirmPassword2 = document.getElementById("confirm-password");
      if (!signupId2 || !signupId2.value.trim()) {
        if (signupId2) showError2(signupId2, "아이디(이메일)를 입력해주세요.");
        return false;
      }
      if (!validateEmail2(signupId2.value.trim())) {
        showError2(signupId2, "올바른 이메일 형식이 아닙니다.");
        return false;
      }
      hideError2(signupId2);
      if (!signupPassword2 || !signupPassword2.value.trim()) {
        if (signupPassword2) showError2(signupPassword2, "비밀번호를 입력해주세요.");
        return false;
      }
      if (signupPassword2.value.length < 6) {
        showError2(signupPassword2, "비밀번호를 6자리 이상 입력해 주세요.");
        return false;
      }
      hideError2(signupPassword2);
      if (!confirmPassword2 || !confirmPassword2.value.trim()) {
        if (confirmPassword2) showError2(confirmPassword2, "비밀번호 확인을 입력해주세요.");
        return false;
      }
      if (signupPassword2.value !== confirmPassword2.value) {
        showError2(confirmPassword2, "비밀번호가 일치하지 않습니다.");
        return false;
      }
      hideError2(confirmPassword2);
      return true;
    };
    var showError = showError2, hideError = hideError2, validateEmail = validateEmail2, validatePhone = validatePhone2, validateStep1 = validateStep12, validateStep2 = validateStep22, validateStep3 = validateStep32, validateStep4 = validateStep42;
    signupStep2.style.display = "none";
    signupStep3.style.display = "none";
    signupStep4.style.display = "none";
    signupStep5.style.display = "none";
    let currentStep = 1;
    const carrierBtns = document.querySelectorAll(".carrier-btn");
    carrierBtns.forEach((btn) => {
      btn.addEventListener("click", function() {
        carrierBtns.forEach((b) => b.classList.remove("active"));
        this.classList.add("active");
      });
    });
    const confirmId = document.getElementById("confirm-id");
    if (confirmId) {
      confirmId.addEventListener("blur", function() {
        if (this.value.trim() && !validateEmail2(this.value.trim())) {
          showError2(this, "올바른 이메일 형식이 아닙니다.");
        } else {
          hideError2(this);
        }
      });
    }
    const confirmPhone = document.getElementById("confirm-phone");
    if (confirmPhone) {
      confirmPhone.addEventListener("blur", function() {
        if (this.value.trim() && !validatePhone2(this.value)) {
          showError2(this, "올바른 전화번호 형식이 아닙니다.");
        } else {
          hideError2(this);
        }
      });
    }
    const signupId = document.getElementById("signup-id");
    if (signupId) {
      signupId.addEventListener("blur", function() {
        if (this.value.trim() && !validateEmail2(this.value.trim())) {
          showError2(this, "올바른 이메일 형식이 아닙니다.");
        } else {
          hideError2(this);
        }
      });
    }
    const signupPassword = document.getElementById("signup-password");
    if (signupPassword) {
      signupPassword.addEventListener("input", function() {
        const errorMsg = this.parentElement.querySelector(".error-message");
        if (this.value.length > 0 && this.value.length < 6) {
          if (errorMsg && !errorMsg.textContent.includes("회원가입을 위해서는")) {
            showError2(this, "비밀번호를 6자리 이상 입력해 주세요.");
          }
        } else {
          hideError2(this);
        }
      });
    }
    const confirmPassword = document.getElementById("confirm-password");
    if (confirmPassword) {
      confirmPassword.addEventListener("blur", function() {
        const password = (signupPassword == null ? void 0 : signupPassword.value) || "";
        if (this.value && password !== this.value) {
          showError2(this, "비밀번호가 일치하지 않습니다.");
        } else {
          hideError2(this);
        }
      });
    }
    signupForm.addEventListener("submit", function(e) {
      e.preventDefault();
      if (currentStep === 1) {
        if (validateStep12()) {
          signupStep1.style.display = "none";
          signupStep2.style.display = "flex";
          currentStep = 2;
          if (breadcrumbSpan) breadcrumbSpan.textContent = stepTexts[2];
        }
      } else if (currentStep === 2) {
        if (validateStep22()) {
          signupStep2.style.display = "none";
          signupStep3.style.display = "flex";
          currentStep = 3;
          if (breadcrumbSpan) breadcrumbSpan.textContent = stepTexts[3];
        }
      } else if (currentStep === 3) {
        if (validateStep32()) {
          signupStep3.style.display = "none";
          signupStep4.style.display = "flex";
          currentStep = 4;
          if (breadcrumbSpan) breadcrumbSpan.textContent = stepTexts[4];
        }
      } else if (currentStep === 4) {
        if (validateStep42()) {
          signupStep4.style.display = "none";
          signupStep5.style.display = "flex";
          currentStep = 5;
          if (breadcrumbSpan) breadcrumbSpan.textContent = stepTexts[5];
        }
      } else ;
    });
  }
});
