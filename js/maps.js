let map = L.map('map').setView([-6.2, 106.8], 10); // Pusat ke Jakarta
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

let markers = [];
let routeLayer;
let lastDistance = 0; // 🔸 Tambahan: untuk simpan jarak terakhir

map.on('click', function(e) {
  if (markers.length >= 2) {
    markers.forEach(m => map.removeLayer(m));
    if (routeLayer) map.removeLayer(routeLayer);
    markers = [];
    lastDistance = 0; // reset
  }

  let marker = L.marker(e.latlng).addTo(map);
  markers.push(marker);

  if (markers.length === 2) {
    getDistance();
  }
});

function getDistance() {
  const coords = markers.map(m => [m.getLatLng().lng, m.getLatLng().lat]);

  fetch('https://api.openrouteservice.org/v2/directions/driving-car/geojson', {
    method: 'POST',
    headers: {
      'Authorization': ORS_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ coordinates: coords })
  })
  .then(res => res.json())
  .then(data => {
    const distance = data.features[0].properties.summary.distance / 1000;
    lastDistance = distance; // 🔸 Simpan jarak ke variabel global

    document.getElementById('jarak').innerText = `Jarak: ${distance.toFixed(2)} km`;

    // Gambar jalur
    routeLayer = L.geoJSON(data).addTo(map);
  });
}

// 🔸 Dipanggil saat tombol "Hitung KM/L" ditekan
function hitungKML() {
  const fuel = parseFloat(document.getElementById('fuel_used').value);
  if (fuel > 0 && lastDistance > 0) {
    const hasil = lastDistance / fuel;
    document.getElementById('hasil_kml').innerText = `Konsumsi: ${hasil.toFixed(2)} km/l`;
  } else {
    alert('Masukkan jumlah bahan bakar dan pilih 2 titik di peta terlebih dahulu.');
  }
}

// 🔸 Dipanggil saat tombol "Hitung Estimasi Liter" ditekan
function hitungLiter() {
  const kml = parseFloat(document.getElementById('kml').value);
  if (kml > 0 && lastDistance > 0) {
    const hasil = lastDistance / kml;
    document.getElementById('hasil_liter').innerText = `Estimasi butuh: ${hasil.toFixed(2)} liter`;
  } else {
    alert('Masukkan nilai konsumsi dan pilih 2 titik di peta terlebih dahulu.');
  }
}
