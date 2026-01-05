// frontend/js/user.js

const LAPTOP_API = 'http://localhost:3000/api/laptops';
const TOPSIS_API = 'http://localhost:3000/api/topsis';

/* =========================
   AUTH HEADER
========================= */
function authHeader() {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
}

/* =========================
   SIMPAN LAPTOP
========================= */
function saveLaptop() {
  const name = document.getElementById('name').value;
  const price = document.getElementById('price').value;
  const ram = document.getElementById('ram').value;
  const storage = document.getElementById('storage').value;
  const processor = document.getElementById('processor').value;

  if (!name || !price || !ram || !storage || !processor) {
    alert('Semua field wajib diisi');
    return;
  }

  fetch(LAPTOP_API, {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify({
      name: name,
      price: Number(price),
      ram: Number(ram),
      storage: Number(storage),
      processor: Number(processor)
    })
  })
    .then(res => {
      if (!res.ok) throw new Error('Gagal menyimpan laptop');
      return res.json();
    })
    .then(() => {
      alert('Laptop berhasil disimpan');
      getResult(); // refresh hasil TOPSIS
    })
    .catch(err => {
      console.error(err);
      alert('Terjadi kesalahan saat menyimpan data');
    });
}

/* =========================
   AMBIL HASIL TOPSIS
========================= */
function getResult() {
  fetch(TOPSIS_API, { headers: authHeader() })
    .then(res => {
      if (!res.ok) throw new Error('Gagal mengambil hasil TOPSIS');
      return res.json();
    })
    .then(data => {
      let html = '';

      data.forEach((d, i) => {
        html += `
          <li>
            <b>${i + 1}. ${d.name}</b><br>
            Score: <b>${Number(d.score).toFixed(4)}</b>
          </li>
        `;
      });

      document.getElementById('result').innerHTML = html;
    })
    .catch(err => {
      console.error(err);
      document.getElementById('result').innerHTML =
        '<li>Gagal memuat hasil rekomendasi</li>';
    });
}
