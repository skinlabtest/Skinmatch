window.cekResiko = function () {
  const kandungan = document.getElementById("kandungan").value;
  const persentase = parseFloat(document.getElementById("persentase").value);
  const rekomendasiElement = document.getElementById("rekomendasi");
  let rekomendasi = "";

  const tipeKulit = localStorage.getItem("tipeKulit");
  const daftarRekomendasi = {
    berminyak: ["salicylic_acid", "niacinamide", "glycolic_acid", "retinol"],
    kering: [
      "hyaluronic_acid",
      "glycerin",
      "ceramide",
      "squalane",
      "vitamin_e",
      "aloe_vera",
    ],
    kombinasi: [
      "niacinamide",
      "salicylic_acid",
      "glycerin",
      "tea_tree_oil",
      "vitamin_e",
    ],
    sensitif: [
      "hyaluronic_acid",
      "ceramide",
      "niacinamide",
      "squalane",
      "aloe_vera",
    ],
    normal: ["hyaluronic_acid", "niacinamide", "vitamin_c", "vitamin_e"],
  };
  const ambangTurunan = {
    sensitif: 0.5,
    kering: 1,
    normal: 1.5,
    kombinasi: 2,
    berminyak: 2.5,
  };

  const batasPersenMaksimum = {
    salicylic_acid: 2,
    niacinamide: 10,
    glycolic_acid: 10,
    retinol: 1,
    hyaluronic_acid: 4,
    glycerin: 10,
    ceramide: 5,
    squalane: 12,
    vitamin_e: 5,
    aloe_vera: 100,
    tea_tree_oil: 1,
    vitamin_c: 20,
  };

  function hitungEfekDanTurunan(kandungan, x) {
    const koefisien = {
      salicylic_acid: 0.08,
      niacinamide: 0.02,
      glycolic_acid: 0.06,
      retinol: 0.15,
      hyaluronic_acid: 0.01,
      glycerin: 0.01,
      ceramide: 0.015,
      squalane: 0.015,
      vitamin_e: 0.03,
      aloe_vera: 0.005,
      tea_tree_oil: 0.12,
      vitamin_c: 0.05,
    };
    const a = koefisien[kandungan] || 0.01;
    return { efek: a * x * x, turunan: 2 * a * x };
  }

  function formatNamaKandungan(nama) {
    return nama
      .split("_")
      .map((k) => k.charAt(0).toUpperCase() + k.slice(1))
      .join(" ");
  }

  if (!tipeKulit) {
    rekomendasi = "Tipe kulit tidak terdeteksi. Kembali ke halaman sebelumnya.";
  } else if (!kandungan || isNaN(persentase)) {
    rekomendasi = "Mohon pilih kandungan dan isi persentasenya dengan benar.";
  } else {
    const { efek, turunan } = hitungEfekDanTurunan(kandungan, persentase);
    const namaKandungan = formatNamaKandungan(kandungan);
    const tipe = tipeKulit.toLowerCase();
    const rekomendasiList = daftarRekomendasi[tipe];
    const batasTurunan = ambangTurunan[tipe];
    const batasPersen = batasPersenMaksimum[kandungan];

    if (!rekomendasiList) {
      rekomendasi = "Tipe kulit tidak dikenali.";
    } else if (persentase > batasPersen) {
      rekomendasi = `⛔ ${namaKandungan} ${persentase}% melebihi batas maksimal yang dianjurkan (${batasPersen}%). Risiko iritasi sangat tinggi.`;
    } else if (turunan > batasTurunan) {
      rekomendasi = `⚠️ ${namaKandungan} ${persentase}% berisiko tinggi menyebabkan iritasi untuk kulit ${tipe}.`;
    } else if (rekomendasiList.includes(kandungan)) {
      rekomendasi = `✅ ${namaKandungan} ${persentase}% aman digunakan untuk kulit ${tipe}.`;
    } else {
      rekomendasi = `⛔ ${namaKandungan} tidak direkomendasikan untuk kulit ${tipe}.`;
    }
  }

  rekomendasiElement.textContent = rekomendasi;
};
