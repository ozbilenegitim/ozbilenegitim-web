/* Ozbilen Egitim - App JS */

(function () {
    'use strict';

    // Mobile nav toggle
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');

    if (navToggle && nav) {
        navToggle.addEventListener('click', function () {
            nav.classList.toggle('active');
        });

        // Close nav when clicking a link
        nav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                nav.classList.remove('active');
            });
        });
    }

    // Header shrink on scroll
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 60) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Scroll reveal with IntersectionObserver
    var animEls = document.querySelectorAll('[data-anim]');
    if (animEls.length > 0 && 'IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        animEls.forEach(function (el) {
            observer.observe(el);
        });
    } else {
        // Fallback: show all
        animEls.forEach(function (el) {
            el.classList.add('visible');
        });
    }

    // IBAN copy button
    var copyBtn = document.getElementById('copyIban');
    var ibanEl = document.getElementById('ibanNumber');
    if (copyBtn && ibanEl) {
        copyBtn.addEventListener('click', function () {
            var iban = ibanEl.textContent.replace(/\s/g, '');
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(iban).then(function () {
                    showCopied();
                }).catch(function () {
                    fallbackCopy(iban);
                });
            } else {
                fallbackCopy(iban);
            }
        });
    }

    function fallbackCopy(text) {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try {
            document.execCommand('copy');
            showCopied();
        } catch (e) {
            // silent
        }
        document.body.removeChild(ta);
    }

    function showCopied() {
        var btn = document.getElementById('copyIban');
        if (!btn) return;
        var origHTML = btn.innerHTML;
        btn.classList.add('copied');
        btn.querySelector('span').textContent = 'Kopyalandi!';
        setTimeout(function () {
            btn.classList.remove('copied');
            btn.querySelector('span').textContent = 'Kopyala';
        }, 2000);
    }

})();
