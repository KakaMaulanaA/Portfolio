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

document.addEventListener("DOMContentLoaded", () => {
  const portfolioContainer = document.getElementById("portfolio-container");

  // Bikin overlay
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  document.body.appendChild(overlay);

  // Event delegation (tetap jalan meski isinya dimuat pakai fetch)
  portfolioContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {
      e.target.classList.toggle("expanded");
      overlay.style.display = e.target.classList.contains("expanded")
        ? "block"
        : "none";
    }
  });

  // Tutup fullscreen kalau overlay diklik
  overlay.addEventListener("click", () => {
    document.querySelectorAll(".portfolio-grid img.expanded").forEach((img) => {
      img.classList.remove("expanded");
    });
    overlay.style.display = "none";
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const sertifikatContainer = document.getElementById("sertifikat-container");

  // Bikin overlay khusus sertifikat
  const overlaySertif = document.createElement("div");
  overlaySertif.classList.add("overlay");
  document.body.appendChild(overlaySertif);

  // Event delegation buat sertifikat
  sertifikatContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {
      e.target.classList.toggle("expanded");
      overlaySertif.style.display = e.target.classList.contains("expanded")
        ? "block"
        : "none";
    }
  });

  // Tutup fullscreen kalau overlay diklik
  overlaySertif.addEventListener("click", () => {
    document.querySelectorAll(".sertifikat-grid img.expanded").forEach((img) => {
      img.classList.remove("expanded");
    });
    overlaySertif.style.display = "none";
  });
});

