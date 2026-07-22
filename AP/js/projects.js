/* ==========================================================================
   projects.js — Load project data, render cards, manage filter transitions
   ========================================================================== */

(function () {
  'use strict';

  var DATA_URL = 'data/projects.json';
  var data = null;

  /**
   * Tech icon resolver — maps tech names to SVG paths + brand colors.
   * Mirrors the Next.js tech-icons.ts mapping.
   */
  var TECH_ICONS = [
    { match: ['react'], color: '#61dafb', svg: '<circle cx="12" cy="12" r="2"/><ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" stroke-width="1"/><ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" stroke-width="1" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" stroke-width="1" transform="rotate(120 12 12)"/>' },
    { match: ['typescript', 'ts'], color: '#3178c6', svg: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>' },
    { match: ['javascript', 'js'], color: '#f7df1e', svg: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>' },
    { match: ['css', 'scss'], color: '#e6c55c', svg: '<path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/>' },
    { match: ['html'], color: '#e34f26', svg: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>' },
    { match: ['python'], color: '#3776ab', svg: '<path d="M12 2v6"/><path d="M12 22v-6"/><circle cx="12" cy="12" r="2"/>' },
    { match: ['opencv', 'cv', 'vision'], color: '#c9a227', svg: '<path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 2a10 10 0 0 1 10 10"/><circle cx="12" cy="12" r="3"/>' },
    { match: ['shell', 'bash', 'cli', 'terminal'], color: '#2f6b4f', svg: '<polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>' },
    { match: ['vite', 'webpack', 'bundler'], color: '#c9a227', svg: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>' },
    { match: ['node', 'nodejs'], color: '#2f6b4f', svg: '<rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>' },
    { match: ['next', 'nextjs'], color: '#e6c55c', svg: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>' },
    { match: ['tailwind'], color: '#38bdf8', svg: '<path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/>' },
  ];

  var DEFAULT_ICON = {
    color: '#c9a227',
    svg: '<line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/>',
  };

  function resolveTechIcon(name) {
    var lower = name.toLowerCase();
    for (var i = 0; i < TECH_ICONS.length; i++) {
      var t = TECH_ICONS[i];
      for (var j = 0; j < t.match.length; j++) {
        if (lower.indexOf(t.match[j]) !== -1) {
          return t;
        }
      }
    }
    return DEFAULT_ICON;
  }

  /**
   * Create an SVG icon element string.
   */
  function iconSvg(pathData, color) {
    return (
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="' +
      color +
      '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
      pathData +
      '</svg>'
    );
  }

  // SVG icons for action buttons
  var EYE_ICON = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>';
  var GITHUB_ICON = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>';
  var EXTERNAL_ICON = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>';

  /**
   * Build the HTML for a single project card.
   */
  function renderCard(project, fallbackUrl) {
    var previewUrl = project.previewUrl || fallbackUrl;

    // Tech badges
    var techHtml = project.techStack
      .map(function (tech) {
        var icon = resolveTechIcon(tech.name);
        var color = icon.color;
        return (
          '<li class="tech-badge" style="border-color: ' +
          color +
          '40; background-color: ' +
          color +
          '14; color: ' +
          color +
          ';">' +
          iconSvg(icon.svg, color) +
          '<span>' +
          tech.name +
          '</span>' +
          '</li>'
        );
      })
      .join('');

    return (
      '<article class="exhibit-card" aria-label="' +
      project.title +
      ' exhibit" data-artifact-id="' +
      project.artifactId +
      '">' +
      '<div class="exhibit-card-body" tabindex="0">' +
      '<div class="exhibit-thumbnail">' +
      '<img class="exhibit-thumbnail-img" src="' +
      project.image +
      '" alt="' +
      (project.imageAlt || project.title + ' project thumbnail') +
      '" loading="lazy" />' +
      '<div class="exhibit-overlay"></div>' +
      '<div class="exhibit-scanlines"></div>' +
      '<div class="exhibit-dust"></div>' +
      '<span class="artifact-id">' +
      project.artifactId +
      '</span>' +
      '<div class="exhibit-actions">' +
      '<div class="exhibit-actions-inner">' +
      '<a class="action-btn glass-gold" href="' +
      previewUrl +
      '" target="_blank" rel="noopener noreferrer" aria-label="View live preview of ' +
      project.title +
      '">' +
      EYE_ICON +
      '<span>View Preview</span>' +
      '<span class="external-icon">' +
      EXTERNAL_ICON +
      '</span>' +
      '</a>' +
      '<a class="action-btn glass-gold" href="' +
      project.repoUrl +
      '" target="_blank" rel="noopener noreferrer" aria-label="View GitHub repository for ' +
      project.title +
      '">' +
      GITHUB_ICON +
      '<span>Repository</span>' +
      '</a>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '<div class="exhibit-info">' +
      '<div class="exhibit-spotlight"></div>' +
      '<div class="exhibit-info-content">' +
      '<div class="exhibit-title-row">' +
      '<h3 class="exhibit-title">' +
      project.title +
      '</h3>' +
      '<span class="exhibit-year">' +
      project.year +
      '</span>' +
      '</div>' +
      '<p class="exhibit-description">' +
      project.description +
      '</p>' +
      '<ul class="exhibit-tech">' +
      techHtml +
      '</ul>' +
      '</div>' +
      '</div>' +
      '<div class="exhibit-shimmer"></div>' +
      '</div>' +
      '</article>'
    );
  }

  /**
   * Render the gallery with filtered projects.
   */
  function renderGallery(animated) {
    var grid = document.getElementById('gallery-grid');
    var emptyState = document.getElementById('empty-state');
    if (!grid || !data) return;

    var filtered = window.MuseumFilters.getFilteredProjects();

    function doRender() {
      grid.innerHTML = '';

      if (filtered.length === 0) {
        emptyState.hidden = false;
        return;
      }
      emptyState.hidden = true;

      var html = filtered
        .map(function (p) {
          return renderCard(p, data.previewFallbackUrl);
        })
        .join('');
      grid.innerHTML = html;

      // Attach tilt to each card
      var cards = grid.querySelectorAll('.exhibit-card');
      cards.forEach(function (card) {
        if (window.MuseumTilt) {
          window.MuseumTilt.attach(card);
        }
      });

      // Stagger entrance
      if (window.MuseumAnimations && animated) {
        window.MuseumAnimations.staggerEntrance(grid, 0);
      }
    }

    if (animated && window.MuseumAnimations) {
      window.MuseumAnimations.animateCardsOut(grid).then(doRender);
    } else {
      doRender();
    }
  }

  /**
   * Load project data from JSON.
   */
  function load(callback) {
    fetch(DATA_URL)
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(function (json) {
        data = json;
        callback(null, json);
      })
      .catch(function (err) {
        callback(err);
      });
  }

  /**
   * Initialize the projects module.
   */
  function init() {
    load(function (err, json) {
      if (err) {
        console.error('Failed to load project data:', err);
        return;
      }

      // Populate hero
      populateHero(json.curator, json.projects.length);

      // Initialize filters
      window.MuseumFilters.init(json.categories, json.projects, function () {
        renderGallery(true);
      });

      // Initial render (no animation on first load)
      renderGallery(false);

      // Init scroll reveal
      if (window.MuseumAnimations) {
        window.MuseumAnimations.initScrollReveal();
      }
    });
  }

  /**
   * Populate the hero section with curator data.
   */
  function populateHero(curator, projectCount) {
    var avatar = document.getElementById('curator-avatar');
    if (avatar) {
      avatar.src = curator.avatar;
      avatar.alt = curator.name;
    }

    var eyebrow = document.getElementById('curator-eyebrow');
    if (eyebrow) eyebrow.textContent = 'Curated by ' + curator.name;

    var tagline = document.getElementById('curator-tagline');
    if (tagline) tagline.textContent = curator.tagline;

    var bio = document.getElementById('curator-bio');
    if (bio) bio.textContent = curator.bio;

    // Meta
    var meta = document.getElementById('curator-meta');
    if (meta) {
      meta.innerHTML =
        '<span class="hero-meta-item">' +
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>' +
        curator.location +
        '</span>' +
        '<span class="hero-meta-item">' +
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>' +
        curator.company +
        '</span>';
    }

    // Links
    var links = document.getElementById('curator-links');
    if (links) {
      var githubIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>';
      var twitterIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>';
      var externalIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>';

      links.innerHTML =
        '<a class="hero-link glass-gold" href="' + curator.github + '" target="_blank" rel="noopener noreferrer" aria-label="Visit ' + curator.name + '\'s GitHub profile">' + githubIcon + '<span>GitHub</span></a>' +
        '<a class="hero-link glass-gold" href="' + curator.twitter + '" target="_blank" rel="noopener noreferrer" aria-label="Visit ' + curator.name + '\'s Twitter profile">' + twitterIcon + '<span>Twitter</span></a>' +
        '<a class="hero-link glass-gold" href="' + curator.site + '" target="_blank" rel="noopener noreferrer" aria-label="Visit ' + curator.name + '\'s personal website">' + externalIcon + '<span>Website</span></a>';
    }

    // Footer
    var footer = document.getElementById('footer-plaque');
    if (footer) {
      footer.textContent = 'Est. 2019 · ' + projectCount + ' artifacts catalogued · Curated by ' + curator.name;
    }
  }

  window.MuseumProjects = {
    init: init,
    renderGallery: renderGallery,
  };
})();
