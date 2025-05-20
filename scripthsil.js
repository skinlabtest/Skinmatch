document.addEventListener("DOMContentLoaded", function () {
  // Ambil skor dari localStorage
  const storedScores = localStorage.getItem("hasilSkor");
  let scores = {
    B: 0,
    K: 0,
    C: 0,
    S: 0,
    N: 0,
  };

  if (storedScores) {
    scores = JSON.parse(storedScores);
    console.log("Skor dari localStorage di hasil.html:", scores); // Untuk debugging
  } else {
    console.warn("Tidak ada skor ditemukan di localStorage di hasil.html.");
    // Anda bisa menambahkan logika default di sini jika skor tidak ditemukan
  }

  // Data tipe kulit
  const skinTypes = {
    B: {
      name: "Kulit Berminyak",
      color: "red",
      kandungan: "Salicylic Acid, Niacinamide, Glycolic Acid, Retinol",
      tips: "Bersihkan wajah dengan pembersih yang lembut, mengandung salicylic acid untuk membantu mengontrol minyak. Gunakan pelembap ringan yang berbasis air dan bersifat non-comedogenic. Lakukan eksfoliasi 1–2 kali seminggu, dan hindari menyentuh wajah untuk mencegah penyebaran bakteri.",
    },
    K: {
      name: "Kulit Kering",
      color: "pink",
      kandungan:
        "Hyaluronic Acid, Glycerin, Ceramide, Squalane, Vitamin E, Aloe Vera",
      tips: "Lindungi kulit dengan tabir surya minimal SPF 30 setiap pagi dan ulangi jika perlu. Bersihkan wajah menggunakan pembersih yang lembut. Gunakan pelembap intens yang mengandung ceramide atau hyaluronic acid setelah mencuci wajah. Lakukan eksfoliasi ringan satu kali seminggu dengan produk yang lembut.",
    },
    C: {
      name: "Kulit Kombinasi",
      color: "yellow",
      kandungan:
        "Niacinamide, Salicylic Acid, Glycerin, Tea Tree Oil, Vitamin E",
      tips: "Gunakan tabir surya minimal SPF 30 di pagi hari. Bersihkan wajah dengan pembersih ringan yang menyeimbangkan area berminyak dan kering. Gunakan pelembap ringan di seluruh wajah, fokus pada area kering jika perlu. Lakukan eksfoliasi seminggu sekali, dan hindari penggunaan produk yang terlalu keras agar keseimbangan kulit tetap terjaga.",
    },
    S: {
      name: "Kulit Sensitif",
      color: "brown",
      kandungan: "Hyaluronic Acid, Ceramide, Niacinamide, Squalane, Aloe Vera",
      tips: "Lindungi kulit dengan tabir surya minimal SPF 30. Bersihkan wajah dengan pembersih non-fragrance dan tanpa alkohol. Gunakan pelembap yang menenangkan dan bebas dari bahan iritan. Lakukan eksfoliasi maksimal satu kali seminggu dengan produk yang sangat lembut. Hindari paparan bahan aktif tinggi dan jangan menyentuh wajah terlalu sering untuk mencegah iritasi.",
    },
    N: {
      name: "Kulit Normal",
      color: "green",
      kandungan: "Hyaluronic Acid, Niacinamide, Vitamin C, Vitamin E",
      tips: "Gunakan tabir surya SPF 30 setiap pagi untuk menjaga kesehatan kulit. Bersihkan wajah dua kali sehari dengan pembersih ringan. Gunakan pelembap sesuai kebutuhan agar kulit tetap terhidrasi. Eksfoliasi ringan satu kali seminggu untuk menjaga kulit tetap cerah dan halus. Hindari menyentuh wajah terlalu sering agar kulit tetap bersih dari kotoran.",
    },
  };

  // Hitung total skor
  const total = Object.values(scores).reduce((a, b) => a + b, 0);

  // Tampilkan progress bar
  const barContainer = document.getElementById("barContainer");
  for (let key in scores) {
    const persen = total > 0 ? Math.round((scores[key] / total) * 100) : 0;
    const skin = skinTypes[key];

    const bar = document.createElement("div");
    bar.className = "bar";
    bar.innerHTML = `
      <div class="label">${skin.name}</div>
      <div class="bar-bg">
        <div class="bar-fill ${skin.color}" style="width: ${persen}%">${persen}%</div>
      </div>
    `;
    if (barContainer) {
      barContainer.appendChild(bar);
    }
  }

  // Cari tipe dominan
  let dominanKey = null;
  let maxScore = -Infinity;

  for (const key in scores) {
    if (scores[key] > maxScore) {
      maxScore = scores[key];
      dominanKey = key;
    }
  }

  const hasilDominanElement = document.getElementById("hasilDominan");
  const tipsPerawatanElement = document.getElementById("tipsPerawatan");

  if (dominanKey && skinTypes[dominanKey]) {
    const dominan = skinTypes[dominanKey];

    const tipeKeyMap = {
      "Kulit Berminyak": "berminyak",
      "Kulit Kering": "kering",
      "Kulit Kombinasi": "kombinasi",
      "Kulit Sensitif": "sensitif",
      "Kulit Normal": "normal",
    };
    localStorage.setItem("tipeKulit", tipeKeyMap[dominan.name]);

    if (hasilDominanElement) {
      hasilDominanElement.innerHTML = `
        <h3>Tipe Kulit Dominan: <strong>${dominan.name}</strong></h3>
        <p>Rekomendasi Kandungan Skincare: ${dominan.kandungan}</p>
      `;
    }
    if (tipsPerawatanElement) {
      tipsPerawatanElement.innerHTML = `
        <h3>Tips Perawatan Kulit</h3>
        <p>${dominan.tips}</p>
      `;
    }
  } else {
    if (hasilDominanElement) {
      hasilDominanElement.textContent =
        "Tidak dapat menentukan tipe kulit dominan.";
    }
    if (tipsPerawatanElement) {
      tipsPerawatanElement.textContent = "";
    }
  }

  // Bersihkan localStorage setelah menampilkan hasil (opsional)
  // localStorage.removeItem("hasilSkor");
});
