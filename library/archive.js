/*
 * Renders the full project archive.
 * Loaded only by archive/index.html, so the JSON path is relative to that page.
 */
document.addEventListener('DOMContentLoaded', function () {
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    const rows = document.getElementById('archive-rows');
    if (!rows) return;

    fetch('../json/projects.json')
        .then(response => response.json())
        .then(projects => {
            if (!projects || !projects.length) {
                rows.innerHTML = '<p class="archive-empty">No projects to show yet.</p>';
                return;
            }

            // Newest first. The year repeats on every row so no cell reads as missing,
            // and a group-start class adds breathing room between year blocks.
            const sorted = [...projects].sort((a, b) => String(b.year || '').localeCompare(String(a.year || '')));
            let lastYear = null;
            let count = 0;

            sorted.forEach(project => {
                // The title links to the live site when there is one, otherwise to the source
                const primaryLink = project.demoLink || project.codeLink;
                const titleHTML = primaryLink
                    ? `<a href="${escapeHtml(primaryLink)}" target="_blank" rel="noopener noreferrer">${escapeHtml(project.title)}</a>`
                    : escapeHtml(project.title);

                // Link column: the source repo when there is one, otherwise the site's domain
                let linkHTML = '';
                if (project.codeLink) {
                    linkHTML = `<a href="${escapeHtml(project.codeLink)}" target="_blank" rel="noopener noreferrer">GitHub</a>`;
                } else if (project.demoLink) {
                    let host = 'Website';
                    try { host = new URL(project.demoLink).hostname.replace(/^www\./, ''); } catch { /* keep fallback */ }
                    linkHTML = `<a href="${escapeHtml(project.demoLink)}" target="_blank" rel="noopener noreferrer">${escapeHtml(host)}</a>`;
                }

                const year = project.year || '';
                const startsGroup = lastYear !== null && year !== lastYear;
                lastYear = year;

                const row = document.createElement('div');
                row.classList.add('archive-row');
                if (startsGroup) row.classList.add('group-start');
                row.innerHTML = `
                    <span class="archive-year">${escapeHtml(year)}</span>
                    <span class="archive-title">${titleHTML}</span>
                    <span class="archive-made-at">${escapeHtml(project.madeAt || '')}</span>
                    <span class="archive-built-with">${(project.tags || []).map(tag => escapeHtml(tag)).join(', ')}</span>
                    <span class="archive-link">${linkHTML}</span>
                `;
                rows.appendChild(row);
                count++;
            });

            const counter = document.getElementById('archive-count');
            if (counter) counter.textContent = `${count} projects`;
        })
        .catch(error => {
            console.error('Error loading projects from JSON:', error);
            rows.innerHTML = '<p class="archive-empty">Could not load the project list.</p>';
        });
});
