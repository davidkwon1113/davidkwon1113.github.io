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

/* === Format Tabs (Human / Agent) === */
function initFormatTabs(slug) {
  var tabs = document.querySelectorAll('.format-tab');
  var panels = document.querySelectorAll('.format-panel');
  var mdContainer = document.getElementById('md-content');
  var mdLoaded = false;

  tabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      var target = tab.dataset.tab;

      tabs.forEach(function(t) { t.classList.remove('active'); });
      panels.forEach(function(p) { p.classList.remove('active'); });

      tab.classList.add('active');
      document.getElementById('panel-' + target).classList.add('active');

      if (target === 'agent' && !mdLoaded) {
        mdLoaded = true;
        var mdUrl = slug + '.md';
        fetch(mdUrl)
          .then(function(r) { return r.text(); })
          .then(function(text) {
            var parts = text.split('---');
            if (parts.length >= 3) {
              var frontmatter = parts[1].trim();
              var body = parts.slice(2).join('---').trim();
              mdContainer.innerHTML =
                '<div class="md-frontmatter">---\n' + escapeHtml(frontmatter) + '\n---</div>' +
                escapeHtml(body) +
                '<a class="md-view-link" href="' + mdUrl + '" target="_blank">Open raw .md file</a>';
            } else {
              mdContainer.innerHTML = escapeHtml(text) +
                '<a class="md-view-link" href="' + mdUrl + '" target="_blank">Open raw .md file</a>';
            }
          })
          .catch(function() {
            mdContainer.innerHTML = 'Failed to load .md file.';
          });
      }
    });
  });
}

function escapeHtml(text) {
  var div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
