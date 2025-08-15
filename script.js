const tabs = document.querySelectorAll('.tab');
const items = document.querySelectorAll('.portfolio-item');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Ubah tab aktif
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const category = tab.dataset.category;

        // Step 1: Hilangkan semua dulu dengan efek fade
        items.forEach(item => {
            item.classList.add('hide');
        });

        // Step 2: Setelah fade-out selesai (300ms), filter dan tampilkan
        setTimeout(() => {
            items.forEach((item, index) => {
                if (category === 'all') {
                    item.style.display = 'flex';
                } else if (category === 'limited') {
                    item.style.display = index < 4 ? 'flex' : 'none';
                } else if (item.dataset.category === category) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });

            // Step 3: Fade-in lagi
            setTimeout(() => {
                items.forEach(item => {
                    if (item.style.display !== 'none') {
                        item.classList.remove('hide');
                    }
                });
            }, 50);
        }, 300);
    });
});

function loadPortfolio(file) {
    const container = document.getElementById('portfolio-container');
    container.style.opacity = 0; // mulai fade out

    fetch(file)
        .then(res => res.text())
        .then(data => {
            setTimeout(() => {
                container.innerHTML = data;
                container.style.opacity = 1; // fade in lagi
            }, 300); // delay biar fade out selesai
        });
}
