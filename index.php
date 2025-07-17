<?php include 'includes/config.php'; ?>
<!DOCTYPE html>
<html>
<head>
  <title>Hitung KM per Liter</title>
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
</head>
<body>
  <h2>Hitung Konsumsi KM per Liter</h2>
  <form id="form-kml">
    <label>Jumlah Bahan Bakar (Liter):</label>
    <input type="number" id="fuel_used" required><br><br>

    <div id="map" style="height: 400px;"></div>
    <p id="jarak"></p>
    <p id="hasil_kml"></p>

    <button type="button" onclick="hitungKML()">Hitung KM/L</button>

  </form>
    <br>
<a href="estimasi.php">
  <button type="button">Lanjut ke Estimasi Bahan Bakar</button>
</a>

  <script>
    const ORS_API_KEY = '<?php echo ORS_API_KEY; ?>';
  </script>
  <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
  <script src="js/maps.js"></script>
</body>
</html>
