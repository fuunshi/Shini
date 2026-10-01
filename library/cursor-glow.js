/*
 * Pointer-following glow: a soft radial gradient that trails the cursor.
 *
 * Skipped entirely for reduced-motion users and on touch devices, where there
 * is no pointer to follow. The transform is driven by rAF with a lerp and the
 * loop stops once it settles, so it costs nothing while the cursor is still.
 */
document.addEventListener('DOMContentLoaded', function () {
    const glow = document.getElementById('cursor-glow');
    if (!glow) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const noPointer = window.matchMedia('(hover: none)');
    if (reducedMotion.matches || noPointer.matches) return;

    const EASE = 0.14;

    let targetX = 0, targetY = 0;   // where the cursor is
    let currentX = 0, currentY = 0; // where the glow currently is
    let frame = null;
    let visible = false;

    function step() {
        currentX += (targetX - currentX) * EASE;
        currentY += (targetY - currentY) * EASE;
        glow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;

        if (Math.abs(targetX - currentX) > 0.5 || Math.abs(targetY - currentY) > 0.5) {
            frame = requestAnimationFrame(step);
        } else {
            frame = null;
        }
    }

    window.addEventListener('mousemove', function (e) {
        targetX = e.clientX;
        targetY = e.clientY;

        if (!visible) {
            // jump straight to the cursor on first move, so it doesn't sweep in
            currentX = targetX;
            currentY = targetY;
            glow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
            glow.classList.add('is-visible');
            visible = true;
        }

        if (!frame) frame = requestAnimationFrame(step);
    });

    document.addEventListener('mouseleave', function () {
        glow.classList.remove('is-visible');
        visible = false;
    });

    window.addEventListener('blur', function () {
        glow.classList.remove('is-visible');
        visible = false;
    });
});
