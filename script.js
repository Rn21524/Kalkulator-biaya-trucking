function calculateCost() {
    var distance = parseFloat(document.getElementById('distance').value);
    var fuelPrice = parseFloat(document.getElementById('fuelPrice').value);
    var fuelConsumption = parseFloat(document.getElementById('fuelConsumption').value);
    var toll = parseFloat(document.getElementById('toll').value);
    var laborCost = parseFloat(document.getElementById('laborCost').value);
    var duration = parseFloat(document.getElementById('duration').value);
    var overhead = parseFloat(document.getElementById('overhead').value);
    var cargoWeight = parseFloat(document.getElementById('cargoWeight').value);
    var roundTrips = parseFloat(document.getElementById('roundTrips').value);
    var vehicleType = document.getElementById('vehicleType').value;

    // Menyesuaikan konsumsi bahan bakar berdasarkan jenis kendaraan
    if (vehicleType == 'small') {
        fuelConsumption = 10; // Truk Kecil
    } else if (vehicleType == 'medium') {
        fuelConsumption = 8; // Truk Sedang
    } else if (vehicleType == 'large') {
        fuelConsumption = 6; // Truk Besar
    }

    // Menghitung biaya
    var fuelCost = (distance / fuelConsumption) * fuelPrice;
    var laborCostTotal = duration * laborCost;
    var totalCost = (fuelCost + laborCostTotal + toll + overhead) * roundTrips;
    var costPerTon = totalCost / cargoWeight;

    // Menampilkan hasil perhitungan
    var resultText = `
        Biaya Bahan Bakar: Rp ${fuelCost.toFixed(2)} <br>
        Biaya Tenaga Kerja: Rp ${laborCostTotal.toFixed(2)} <br>
        Biaya Tol: Rp ${toll.toFixed(2)} <br>
        Biaya Overhead: Rp ${overhead.toFixed(2)} <br>
        Total Biaya (untuk ${roundTrips} perjalanan): Rp ${totalCost.toFixed(2)} <br>
        Biaya per Ton: Rp ${costPerTon.toFixed(2)}
    `;

    document.getElementById('result').innerHTML = resultText;
    drawChart(fuelCost, laborCostTotal, toll, overhead);
}

function drawChart(fuelCost, laborCostTotal, toll, overhead) {
    google.charts.load('current', {'packages':['corechart', 'piechart']});
    google.charts.setOnLoadCallback(function() {
        var data = google.visualization.arrayToDataTable([
            ['Kategori', 'Biaya'],
            ['Bahan Bakar', fuelCost],
            ['Tenaga Kerja', laborCostTotal],
            ['Tol', toll],
            ['Overhead', overhead]
        ]);

        var options = {
            title: 'Distribusi Biaya Trucking',
            pieSliceText: 'percentage',
            slices: { 0: {offset: 0.1}, 1: {offset: 0.1}, 2: {offset: 0.1}, 3: {offset: 0.1} },
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));
        chart.draw(data, options);
    });
}
