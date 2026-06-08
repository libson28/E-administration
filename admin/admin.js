const drawers = new Map();

function closeDrawers() {
  document.querySelectorAll('.drawer-panel.open').forEach(panel => panel.classList.remove('open'));
  document.getElementById('drawerBackdrop')?.classList.remove('open');
}

function openDrawer(id) {
  closeDrawers();
  const panel = document.getElementById(id);
  if (!panel) return;
  document.getElementById('drawerBackdrop')?.classList.add('open');
  panel.classList.add('open');
}

function closeModals() {
  document.querySelectorAll('.modal.open').forEach(modal => modal.classList.remove('open'));
}

function openSettingsModal(title, subtitle) {
  const modal = document.getElementById('settingsModal');
  if (!modal) return;
  modal.querySelector('[data-modal-title]').textContent = title;
  modal.querySelector('[data-modal-subtitle]').textContent = subtitle;
  modal.classList.add('open');
}

function initPagination() {
  document.querySelectorAll('[data-paginated]').forEach(table => {
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    const pageSize = Number(table.dataset.pageSize || 5);
    const pager = document.querySelector(`[data-pager-for="${table.id}"]`);
    let page = 1;
    const pages = Math.max(1, Math.ceil(rows.length / pageSize));

    const render = () => {
      rows.forEach((row, index) => {
        row.classList.toggle('hidden', index < (page - 1) * pageSize || index >= page * pageSize);
      });
      if (!pager) return;
      pager.querySelector('[data-page-label]').textContent = `Page ${page} sur ${pages}`;
      pager.querySelector('[data-prev]').disabled = page === 1;
      pager.querySelector('[data-next]').disabled = page === pages;
    };

    pager?.querySelector('[data-prev]')?.addEventListener('click', () => {
      page = Math.max(1, page - 1);
      render();
    });
    pager?.querySelector('[data-next]')?.addEventListener('click', () => {
      page = Math.min(pages, page + 1);
      render();
    });
    render();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-open-drawer]').forEach(button => {
    button.addEventListener('click', () => openDrawer(button.dataset.openDrawer));
  });

  document.querySelectorAll('[data-close-drawer]').forEach(button => {
    button.addEventListener('click', closeDrawers);
  });

  document.getElementById('drawerBackdrop')?.addEventListener('click', closeDrawers);

  document.querySelectorAll('[data-settings]').forEach(button => {
    button.addEventListener('click', () => openSettingsModal(button.dataset.settings, button.dataset.settingsText));
  });

  document.querySelectorAll('[data-close-modal]').forEach(button => {
    button.addEventListener('click', closeModals);
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeDrawers();
      closeModals();
    }
  });

  initPagination();
});
