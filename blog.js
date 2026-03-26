/* ==========================================================================
   blog.js — Shared JS for David Kwon's blog
   Features: Giscus comments, share buttons
   ========================================================================== */

/* === Giscus === */
function initGiscus(containerId) {
  var container = document.getElementById(containerId);
  if (!container) return;

  var script = document.createElement('script');
  script.src = 'https://giscus.app/client.js';
  script.setAttribute('data-repo', 'davidkwon1113/davidkwon1113.github.io');
  script.setAttribute('data-repo-id', 'R_kgDORxdvlg');
  script.setAttribute('data-category', 'General');
  script.setAttribute('data-category-id', 'DIC_kwDORxdvls4C5VPX');
  script.setAttribute('data-mapping', 'pathname');
  script.setAttribute('data-strict', '0');
  script.setAttribute('data-reactions-enabled', '1');
  script.setAttribute('data-emit-metadata', '0');
  script.setAttribute('data-input-position', 'top');
  script.setAttribute('data-theme', 'light');
  script.setAttribute('data-lang', 'en');
  script.setAttribute('data-loading', 'lazy');
  script.crossOrigin = 'anonymous';
  script.async = true;
  container.appendChild(script);
}

/* === Share === */
var _shareTitle = '';
var _shareUrl = '';

function initShare(title, url) {
  _shareTitle = title;
  _shareUrl = url;
}

function shareTwitter() {
  var text = encodeURIComponent(_shareTitle);
  var url = encodeURIComponent(_shareUrl);
  window.open('https://x.com/intent/tweet?text=' + text + '&url=' + url, '_blank', 'width=550,height=420');
}

function shareLinkedIn() {
  var url = encodeURIComponent(_shareUrl);
  window.open('https://www.linkedin.com/sharing/share-offsite/?url=' + url, '_blank', 'width=550,height=420');
}

function copyLink() {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(_shareUrl).then(function() {
      var btns = document.querySelectorAll('.share-btn');
      btns.forEach(function(b) {
        if (b.textContent === 'Copy link') {
          b.textContent = 'Copied!';
          setTimeout(function() { b.textContent = 'Copy link'; }, 2000);
        }
      });
    });
  }
}
