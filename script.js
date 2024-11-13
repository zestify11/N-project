// Mengambil elemen halaman
const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');
const page3 = document.getElementById('page3');
const page4 = document.getElementById('page4');
const namaInput = document.getElementById('namaInput');
const namaSpan = document.getElementById('nama');

// Mengambil elemen iframe untuk musik
const musikIframe = document.getElementById("musikLatar");
const playButton = document.getElementById('playButton');
const nextButton = document.getElementById('nextButton');
const waitingMessage = document.getElementById('waitingMessage');

// Variabel untuk mengecek status musik
let musikDimulai = false;

// Fungsi untuk memainkan musik
playButton.addEventListener("click", () => {
    if (!musikDimulai) {
        musikIframe.style.display = "block"; // Menampilkan iframe musik
        musikIframe.src = "https://www.youtube.com/embed/XcQb07nwle4&ab_channel=JuicyLuicy?autoplay=1&loop=1&playlist=XcQb07nwle4&ab_channel=JuicyLuicy";
        waitingMessage.style.display = "block"; // Menampilkan pesan "Tunggu sampai musik dimulai"
        playButton.style.display = "none"; // Menyembunyikan tombol play
        musikDimulai = true;

        // Menunggu musik dimulai, kemudian menampilkan tombol next
        setTimeout(() => {
            waitingMessage.style.display = "none";
            nextButton.style.display = "inline-block"; // Menampilkan tombol Next
        }, 5000); // Tunggu 5 detik agar musik mulai
    }
});

// Fungsi untuk melanjutkan ke halaman masukan nama setelah musik dimulai
nextButton.addEventListener("click", () => {
    // Arahkan ke halaman masukan nama (page 2)
    page1.classList.remove('active');
    page2.classList.add('active');
});

// Fungsi untuk melanjutkan ke halaman 3 setelah nama dimasukkan
function lanjutkan() {
    const nama = namaInput.value;
    if (nama.trim() !== "") {
        namaSpan.textContent = nama;
        page2.classList.remove('active');
        page3.classList.add('active');
        jalankanConfetti(); // Panggil confetti saat melanjutkan
    } else {
        alert("Masukkan nama dulu ya!");
    }
}

// Fungsi untuk menuju halaman pesan-pesan
function keHalamanPesan() {
    page3.classList.remove('active');
    page4.classList.add('active'); // Mengarahkan ke halaman 4, bukan halaman 3
    buatBalon(); // Membuat animasi balon warna-warni saat halaman pesan ditampilkan
}

// Fungsi untuk kembali ke halaman awal
function keHalamanAwal() {
    page3.classList.remove('active');
    page1.classList.add('active');
    musikIframe.src = ""; // Menghentikan musik ketika kembali ke halaman awal
    playButton.style.display = "inline-block"; // Tombol Play muncul lagi
    nextButton.style.display = "none"; // Menyembunyikan tombol Next
    musikDimulai = false;
    namaInput.value = ""; // Mengosongkan input nama
}

// Memulai di halaman pertama
window.onload = () => {
    page1.classList.add('active');
};

// Fungsi untuk menjalankan animasi confetti
function jalankanConfetti() {
    var duration = 3 * 1000; // Durasi 3 detik
    var end = Date.now() + duration;

    (function frame() {
        // Konfigurasi animasi confetti
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}

// Fungsi untuk membuat animasi balon warna-warni
function buatBalon() {
    const balonContainer = document.getElementById("balonContainer");
    const jumlahBalon = 20; // Jumlah balon yang akan ditampilkan
    const warnaBalon = ["#ff0000", "#ff7f00", "#ffff00", "#00ff00", "#00ffff", "#0000ff", "#8b00ff"];
    
    // Hapus balon sebelumnya
    balonContainer.innerHTML = '';

    // Membuat balon
    for (let i = 0; i < jumlahBalon; i++) {
        const balon = document.createElement("div");
        balon.classList.add("balon");

        // Mengatur warna dan posisi balon secara acak
        const warnaAcak = warnaBalon[Math.floor(Math.random() * warnaBalon.length)];
        const posisiKiri = Math.random() * 100; // posisi kiri 0% - 100%
        const durasiAnimasi = 5 + Math.random() * 5; // durasi animasi 5 - 10 detik
        
        balon.style.backgroundColor = warnaAcak;
        balon.style.left = `${posisiKiri}%`;
        balon.style.animationDuration = `${durasiAnimasi}s`;

        balonContainer.appendChild(balon);
    }
}
