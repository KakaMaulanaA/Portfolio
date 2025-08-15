// Inisialisasi listener tab khusus di dalam #sertifikat-container
function initSertifikatTabs() {
  const container = document.getElementById('sertifikat-container');
  if (!container) return;

  // Event delegation: klik di mana pun dalam container, cek apakah tombol .tab
  container.addEventListener('click', (e) => {
    const btn = e.target.closest('.tab');
    if (!btn || !container.contains(btn)) return;

    // Toggle active hanya untuk tab di dalam container ini
    container.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');

    filterSertifikat(btn.dataset.category, container);
  });

  // Set default: pakai tab .active kalau ada, kalau tidak pakai tab pertama
  const first = container.querySelector('.tab.active') || container.querySelector('.tab');
  if (first) {
    filterSertifikat(first.dataset.category, container, /*skipAnim*/ true);
  }
}

// Filter dengan animasi, scoped ke container Sertifikat
function filterSertifikat(category, container, skipAnim = false) {
  const items = container.querySelectorAll('.sertifikat-item');

  // Step 1: Fade-out (opsional saat initial)
  if (!skipAnim) items.forEach(el => el.classList.add('hide'));

  setTimeout(() => {
    items.forEach((item, index) => {
      const shouldShow =
        category === 'all' ||
        (category === 'limited' && index < 4) ||
        item.dataset.category === category;

      // Hanya kontrol visibilitas dengan class, jangan set display:flex di JS
      item.classList.toggle('is-hidden', !shouldShow);
    });

    // Step 3: Fade-in
    requestAnimationFrame(() => {
      items.forEach(el => {
        if (!el.classList.contains('is-hidden')) el.classList.remove('hide');
      });
    });
  }, skipAnim ? 0 : 300);
}

// Load file HTML untuk Sertifikat lalu re-init tabnya (SCOPED)
async function loadSertifikat(file) {
  const container = document.getElementById('sertifikat-container');
  if (!container) return;

  container.style.opacity = 0; // fade out
  try {
    const html = await fetch(file).then(r => r.text());
    container.innerHTML = html;  // inject konten baru (tabs + items)
    initSertifikatTabs();        // re-bind listener di konten baru
    requestAnimationFrame(() => (container.style.opacity = 1)); // fade in
  } catch (e) {
    console.error('Gagal load sertifikat:', e);
    container.style.opacity = 1;
  }
}

// Panggil sekali saat halaman siap (misal default “Kompetisi”)
document.addEventListener('DOMContentLoaded', () => {
  // contoh: load pertama kali
  loadSertifikat('Kompetisi.html');
});
