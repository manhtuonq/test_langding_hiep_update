
    // Mobile Menu Toggle
    document.querySelector('.mobile-menu').addEventListener('click', function() {
        document.querySelector('.mobile-nav').classList.add('active');
    });
    
    document.querySelector('.close-menu').addEventListener('click', function() {
        document.querySelector('.mobile-nav').classList.remove('active');
    });
    
    // Mobile Nav Links
    document.querySelectorAll('.mobile-nav ul li a').forEach(link => {
        link.addEventListener('click', function() {
            document.querySelector('.mobile-nav').classList.remove('active');
        });
    });
    
    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Fixed Header Shadow on Scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Scroll to Top Button
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });
    
    scrollTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isActive = this.classList.contains('active');
            
            // Close all
            faqQuestions.forEach(q => {
                q.classList.remove('active');
                q.nextElementSibling.classList.remove('active');
            });
            
            // Toggle current if it wasn't active
            if (!isActive) {
                this.classList.add('active');
                answer.classList.add('active');
            }
        });
    });



    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Hiệu ứng parallax mượt hơn khi scroll
    let ticking = false;
    const heroBackground = document.querySelector('.hero-background');
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const scrollPosition = window.pageYOffset;
                const scrollFactor = 0.4;
                
                heroBackground.style.transform = `translate3d(0, ${scrollPosition * scrollFactor}px, 0)`;
                
                ticking = false;
            });
            
            ticking = true;
        }
    });
    
    // Hiệu ứng hover nổi cho các phần tử
    const hoverElements = document.querySelectorAll('.hero-description-box, .benefit-item, .hero-card, .stat-item');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.25)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.15)';
        });
    });
    
    // Preload ảnh để hiển thị nét hơn
    window.addEventListener('load', function() {
        const img = new Image();
        img.src = 'đa.jpg';
        img.onload = function() {
            heroBackground.style.backgroundImage = `url('${img.src}')`;
        };
    });


    
    document.addEventListener('DOMContentLoaded', function() {
        // Preloader
        const preloader = document.createElement('div');
        preloader.className = 'preloader';
        preloader.innerHTML = '<div class="loader"></div>';
        document.body.appendChild(preloader);
        
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 800);
    
        // Scroll to section on click
        const scrollDown = document.querySelector('.scroll-down');
        if (scrollDown) {
            scrollDown.addEventListener('click', function() {
                const nextSection = document.querySelector('.hero').nextElementSibling;
                if (nextSection) {
                    nextSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    
        // Parallax effect for hero background
        const heroBackground = document.querySelector('.hero-background');
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            if (heroBackground) {
                heroBackground.style.transform = `translateY(${scrollPosition * 0.3}px)`;
            }
        });
    
        // Counter animation
        const counters = document.querySelectorAll('.counter');
        
        function startCountAnimation(counter) {
            const target = parseFloat(counter.textContent);
            const suffix = counter.textContent.match(/[^0-9.]/g)?.join('') || '';
            const decimal = counter.textContent.includes('.') ? 1 : 0;
            const duration = 2000; // Thời gian chạy animation (ms)
            const startTime = Date.now();
            
            counter.textContent = '0' + suffix;
            
            function updateCounter() {
                const now = Date.now();
                const progress = Math.min(1, (now - startTime) / duration);
                const value = progress * target;
                
                counter.textContent = value.toFixed(decimal) + suffix;
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toFixed(decimal) + suffix;
                }
            }
            
            requestAnimationFrame(updateCounter);
        }
        
        // Intersection Observer for animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Nếu là counter thì bắt đầu animation
                    if (entry.target.classList.contains('counter')) {
                        startCountAnimation(entry.target);
                    }
                    
                    // Loại bỏ observer sau khi đã animate
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observer cho tất cả các phần tử cần animation khi scroll
        document.querySelectorAll('.fade-in-section, .counter, .stat-item, .section-title, [data-scroll]').forEach(el => {
            observer.observe(el);
        });
        
        // Add smooth scroll cho tất cả các anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Thêm hiệu ứng hover cho các card
        const cards = document.querySelectorAll('.hero-card, .benefit-item');
        cards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left; // Vị trí X tương đối so với card
                const y = e.clientY - rect.top;  // Vị trí Y tương đối so với card
                
                // Tính toán độ nghiêng dựa trên vị trí chuột
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });
            
            card.addEventListener('mouseleave', function() {
                // Reset về trạng thái ban đầu
                this.style.transform = '';
                setTimeout(() => {
                    this.style.transition = '';
                }, 300);
            });
            
            card.addEventListener('mouseenter', function() {
                this.style.transition = 'transform 0.3s ease';
            });
        });
        
        // Hiệu ứng hover cho nút
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(btn => {
            btn.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                this.style.setProperty('--x', `${x}px`);
                this.style.setProperty('--y', `${y}px`);
            });
        });
        
        // Thêm chức năng chuyển đổi dark/light mode
        const body = document.body;
        const modeToggle = document.createElement('div');
        modeToggle.className = 'mode-toggle';
        modeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        document.body.appendChild(modeToggle);
        
        modeToggle.addEventListener('click', function() {
            body.classList.toggle('light-mode');
            
            if (body.classList.contains('light-mode')) {
                this.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('theme', 'light');
            } else {
                this.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('theme', 'dark');
            }
        });
        
        // Check lưu trữ người dùng cho chế độ theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            body.classList.add('light-mode');
            modeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        // Thêm hiệu ứng parallax cho các phần tử khi scroll
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            // Áp dụng parallax cho các phần tử khác nhau với tốc độ khác nhau
            document.querySelectorAll('.parallax-bg').forEach(bg => {
                const speed = bg.dataset.speed || 0.3;
                bg.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
        
        // Hiệu ứng load dần các phần tử trong hero section
        setTimeout(() => {
            document.querySelectorAll('.hero-text, .hero-image, .hero-badge, .animate-title, .hero-description-box, .hero-benefits, .benefit-item, .hero-buttons, .scroll-down').forEach((el, index) => {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 150);
            });
        }, 200);
        
        // Responsive menu toggle
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', function() {
                navMenu.classList.toggle('active');
                this.classList.toggle('active');
            });
        }
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navMenu && navMenu.classList.contains('active')) {
                if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            }
        });
        
        // Thêm hiệu ứng scroll indicator
        const scrollIndicator = document.createElement('div');
        scrollIndicator.className = 'scroll-indicator';
        document.body.appendChild(scrollIndicator);
        
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            
            scrollIndicator.style.width = scrolled + '%';
        });
        
        // Lazy loading cho hình ảnh
        if ('IntersectionObserver' in window) {
            const imgObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        const src = img.getAttribute('data-src');
                        
                        if (src) {
                            img.src = src;
                            img.removeAttribute('data-src');
                        }
                        
                        observer.unobserve(img);
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imgObserver.observe(img);
            });
        }
    });


    document.addEventListener('DOMContentLoaded', function() {
        // Sticky header
        const header = document.querySelector('.header');
        
        if (header) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > 50) {
                    header.classList.add('sticky');
                } else {
                    header.classList.remove('sticky');
                }
            });
        }
        
        // Ripple effect cho buttons
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', function(e) {
                const x = e.clientX - e.target.getBoundingClientRect().left;
                const y = e.clientY - e.target.getBoundingClientRect().top;
                
                const ripple = document.createElement('span');
                ripple.className = 'ripple';
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
        
        // Back to top button
        const floatingAction = document.createElement('div');
        floatingAction.className = 'floating-action';
        floatingAction.innerHTML = '<i class="fas fa-arrow-up"></i>';
        document.body.appendChild(floatingAction);
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                floatingAction.classList.add('show');
            } else {
                floatingAction.classList.remove('show');
            }
        });
        
        floatingAction.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Page transition cho các link
        const pageTransition = document.createElement('div');
        pageTransition.className = 'page-transition';
        document.body.appendChild(pageTransition);
        
        document.querySelectorAll('a:not([href^="#"])').forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                if (href && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
                    e.preventDefault();
                    
                    pageTransition.classList.add('active');
                    
                    setTimeout(() => {
                        window.location.href = href;
                    }, 500);
                }
            });
        });
        
        // Xử lý hover 3D cho card
        const handleHover3D = (e, element, intensity) => {
            const { left, top, width, height } = element.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;
            
            element.style.transform = `
                perspective(1000px) 
                rotateX(${-y * intensity}deg) 
                rotateY(${x * intensity}deg)
                scale3d(1.02, 1.02, 1.02)
            `;
        };
        
        // Thêm hiệu ứng hover 3D cho hero card
        const heroCard = document.querySelector('.hero-card');
        if (heroCard && window.innerWidth > 992) {
            heroCard.addEventListener('mousemove', (e) => handleHover3D(e, heroCard, 15));
            
            heroCard.addEventListener('mouseleave', () => {
                heroCard.style.transform = '';
                heroCard.style.transition = 'all 0.5s ease';
            });
        }
        
        // Thêm hiệu ứng reveal khi scroll cho các section
        const allSections = document.querySelectorAll('section:not(.hero)');
        
        const revealSection = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-revealed');
                    revealSection.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15
        });
        
        allSections.forEach(section => {
            section.classList.add('section-to-reveal');
            revealSection.observe(section);
        });
        
        // Thêm hiệu ứng animation cho các phần tử con khi section hiện ra
        const revealChildren = (parent, delay = 0) => {
            const children = parent.querySelectorAll('.animated-child');
            
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.classList.add('revealed');
                }, delay + index * 100);
            });
        };
        
        // Thêm class animation cho các phần tử cần thiết
        document.querySelectorAll('.section-title, .card, .benefit-item, .stat-item').forEach(item => {
            item.classList.add('animated-child');
        });
        
        // Theo dõi các section đã được reveal để chạy animation cho con
        const childrenObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    revealChildren(entry.target, 300);
                    childrenObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });
        
        allSections.forEach(section => {
            childrenObserver.observe(section);
        });
        
        // Xử lý responsive menu
        const setupResponsiveMenu = () => {
            // Kiểm tra nếu chưa có toggle button thì tạo mới
            if (!document.querySelector('.nav-toggle')) {
                const navToggle = document.createElement('button');
                navToggle.className = 'nav-toggle';
                navToggle.innerHTML = '<span></span><span></span><span></span>';
                
                const header = document.querySelector('.header');
                if (header) {
                    header.appendChild(navToggle);
                    
                    navToggle.addEventListener('click', function() {
                        this.classList.toggle('active');
                        document.querySelector('.nav-menu')?.classList.toggle('active');
                        document.body.classList.toggle('menu-open');
                    });
                }
            }
        };
        
        // Theo dõi thay đổi kích thước màn hình
        const checkScreenSize = () => {
            if (window.innerWidth <= 992) {
                setupResponsiveMenu();
            }
        };
        
        // Gọi ngay khi tải trang
        checkScreenSize();
        
        // Gắn sự kiện thay đổi kích thước màn hình
        window.addEventListener('resize', checkScreenSize);
        
        // Xử lý tự động đóng menu khi click bên ngoài
        document.addEventListener('click', function(e) {
            const navMenu = document.querySelector('.nav-menu');
            const navToggle = document.querySelector('.nav-toggle');
            
            if (navMenu && navMenu.classList.contains('active')) {
                if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            }
        });
    });

    

    document.addEventListener('DOMContentLoaded', function() {
        // Add js-scroll class to elements we want to animate
        document.querySelector('.section-titl h2').classList.add('js-scroll');
        document.querySelector('.service-descriptiona').classList.add('js-scroll');
        
        const featureBoxes = document.querySelectorAll('.featuresizing');
        featureBoxes.forEach(box => {
          box.classList.add('js-scroll');
        });
        
        // Check if browser supports scroll-driven animations
        const supportsScrollDriven = CSS.supports('animation-timeline: scroll()');
        
        if (!supportsScrollDriven) {
          // Fallback for browsers without scroll()-driven animations
          const scrollElements = document.querySelectorAll('.js-scroll');
          
          const elementInView = (el, offset = 150) => {
            const elementTop = el.getBoundingClientRect().top;
            return (
              elementTop <= (window.innerHeight || document.documentElement.clientHeight) - offset
            );
          };
          
          const displayScrollElement = (element) => {
            element.classList.add('scrolled');
          };
          
          const handleScrollAnimation = () => {
            scrollElements.forEach((el) => {
              if (elementInView(el)) {
                displayScrollElement(el);
              }
            });
          };
          
          // Initial check on page load
          handleScrollAnimation();
          
          // Add scroll event listener
          window.addEventListener('scroll', () => {
            handleScrollAnimation();
          });
        }
        
        // Add ripple effect on click
        const cards = document.querySelectorAll('.featuresizing');
        cards.forEach(card => {
          card.classList.add('ripple');
          card.addEventListener('click', function(e) {
            let x = e.clientX - this.getBoundingClientRect().left;
            let y = e.clientY - this.getBoundingClientRect().top;
            
            let ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
              ripple.remove();
            }, 700);
          });
        });
      });

      document.addEventListener('DOMContentLoaded', function() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal');
                }
            });
        }, {
            threshold: 0.1
        });
        
        // Observe all elements that should animate on scroll
        document.querySelectorAll('.section-titl, .service-descriptiona, .featuresizing').forEach(el => {
            observer.observe(el);
        });
    });

    document.addEventListener('DOMContentLoaded', function() {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.style.visibility = 'visible';
            }
          });
        }, {threshold: 0.1});
        
        document.querySelectorAll('.audience-item-1').forEach(item => {
          observer.observe(item);
          item.style.visibility = 'hidden';
        });
        
        observer.observe(document.querySelector('.section-title-1'));
      });

      document.addEventListener("DOMContentLoaded", function() {
        // Add reveal class to all elements that should animate
        document.querySelector('.section-title-01').classList.add('reveal-on-scroll');
        
        const featureBoxes = document.querySelectorAll('.feature-box0x');
        featureBoxes.forEach(box => {
          box.classList.add('reveal-on-scroll');
        });
        
        // Intersection Observer setup
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('reveal-visible');
              
              // For section title, also animate the underline
              if (entry.target.classList.contains('section-title-01')) {
                setTimeout(() => {
                  entry.target.querySelector('h2::after').style.width = '80px';
                }, 300);
              }
            }
          });
        }, {
          threshold: 0.1,
          rootMargin: "0px 0px -50px 0px"
        });
        
        // Observe all elements with reveal-on-scroll class
        document.querySelectorAll('.reveal-on-scroll').forEach(el => {
          observer.observe(el);
        });
      });

      