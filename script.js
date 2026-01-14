// تهيئة عامة للموقع
document.addEventListener('DOMContentLoaded', function() {
    
    // تعيين سنة حقوق النشر الحالية
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // تبديل القائمة في الأجهزة المحمولة
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        menuToggle.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // إغلاق القائمة عند النقر على رابط
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // معالجة نموذج الاتصال
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // الحصول على البيانات من النموذج
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // التحقق من صحة البيانات الأساسية
        if (!name || !email || !message) {
            alert('يرجى ملء جميع الحقول المطلوبة');
            return;
        }
        
        // فتح برنامج البريد الإلكتروني الافتراضي
        const subject = `رسالة جديدة من ${name} - بورتفوليو Tarek Badr`;
        const body = `الاسم: ${name}%0D%0Aالبريد الإلكتروني: ${email}%0D%0A%0D%0Aالرسالة:%0D%0A${message}`;
        
        window.location.href = `mailto:contact@tarekbader.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // إعادة تعيين النموذج
        contactForm.reset();
        
        // إظهار رسالة نجاح
        alert('سيتم فتح بريدك الإلكتروني لإرسال الرسالة. إذا لم يفتح تلقائيًا، يرجى نسخ النص وإرساله يدويًا.');
    });
    
    // إضافة تأثير التمرير السلس للروابط الداخلية
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // إضافة تأثير الظهور عند التمرير
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // مراقبة العناصر لإضافة تأثيرات الظهور
    const animateElements = document.querySelectorAll('.timeline-item, .education-card, .skill-item, .portfolio-card');
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // إضافة تأثيرات CSS للعناصر المتحركة
    const style = document.createElement('style');
    style.textContent = `
        .timeline-item, .education-card, .skill-item, .portfolio-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .timeline-item.animate, 
        .education-card.animate, 
        .skill-item.animate, 
        .portfolio-card.animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // تغيير لون شريط التنقل عند التمرير
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            navbar.style.padding = '10px 0';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
            navbar.style.padding = '15px 0';
        }
    });
});