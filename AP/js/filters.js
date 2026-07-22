/* ==========================================================================
   filters.js — Category filter logic
   ========================================================================== */

(function () {
  'use strict';

  var state = {
    categories: [],
    activeCategory: 'All Exhibits',
    counts: {},
    projects: [],
    onSelectCallback: null,
  };

  /**
   * Initialize the filter with project data.
   */
  function init(categories, projects, onSelect) {
    state.categories = categories;
    state.projects = projects;
    state.onSelectCallback = onSelect;
    computeCounts();
    renderFilter();
  }

  /**
   * Compute how many projects belong to each category.
   */
  function computeCounts() {
    state.counts = {};
    state.counts['All Exhibits'] = state.projects.length;

    state.categories.forEach(function (cat) {
      if (cat === 'All Exhibits') return;
      state.counts[cat] = state.projects.filter(function (p) {
        return p.categories.indexOf(cat) !== -1;
      }).length;
    });
  }

  /**
   * Render the filter tabs.
   */
  function renderFilter() {
    var nav = document.getElementById('category-filter');
    if (!nav) return;
    nav.innerHTML = '';

    state.categories.forEach(function (category) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'filter-tab' + (category === state.activeCategory ? ' is-active' : '');
      btn.setAttribute('aria-pressed', category === state.activeCategory ? 'true' : 'false');
      btn.textContent = '';

      var label = document.createElement('span');
      label.className = 'filter-tab-label';

      var name = document.createElement('span');
      name.textContent = category;

      var count = document.createElement('span');
      count.className = 'filter-tab-count';
      count.textContent = state.counts[category] || 0;

      label.appendChild(name);
      label.appendChild(count);
      btn.appendChild(label);

      btn.addEventListener('click', function () {
        selectCategory(category);
      });

      nav.appendChild(btn);
    });
  }

  /**
   * Select a category and trigger the callback.
   */
  function selectCategory(category) {
    if (category === state.activeCategory) return;
    state.activeCategory = category;

    // Update aria-pressed and active class on all tabs
    var tabs = document.querySelectorAll('.filter-tab');
    tabs.forEach(function (tab) {
      var isActive = tab.textContent.indexOf(category) !== -1 && tab.querySelector('.filter-tab-count');
      // More reliable: compare text content of the name span
    });

    // Re-render to update active states
    renderFilter();

    if (state.onSelectCallback) {
      state.onSelectCallback(category);
    }
  }

  function getActiveCategory() {
    return state.activeCategory;
  }

  function getFilteredProjects() {
    if (state.activeCategory === 'All Exhibits') return state.projects;
    return state.projects.filter(function (p) {
      return p.categories.indexOf(state.activeCategory) !== -1;
    });
  }

  window.MuseumFilters = {
    init: init,
    selectCategory: selectCategory,
    getActiveCategory: getActiveCategory,
    getFilteredProjects: getFilteredProjects,
  };
})();
