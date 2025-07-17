<?php include 'includes/config.php'; ?>
<!DOCTYPE html>
<html>
<head>
  <title>Estimasi Bahan Bakar</title>
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
</head>
<body>
  <h2>Estimasi Liter Bahan Bakar</h2>
  <form id="form-liter">
    <label>Konsumsi KM per Liter:</label>
    <input type="number" id="kml" required><br><br>

    <div id="map" style="height: 400px;"></div>
    <p id="jarak"></p>
    <p id="hasil_liter"></p>

    <button type="button" onclick="hitungLiter()">Hitung Estimasi Liter</button>

  </form>
<br>
<a href="index.php">
  <button type="button">Kembali ke Hitung KM/L</button>
</a>

  <script>
    const ORS_API_KEY = '<?php echo ORS_API_KEY; ?>';
  </script>
  <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
  <script src="js/maps.js"></script>
</body>
</html>
