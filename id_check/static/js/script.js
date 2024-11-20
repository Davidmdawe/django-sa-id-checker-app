document.addEventListener('DOMContentLoaded', function () {
    // Ensure this data is safe for rendering
    const chartData = window.chartData || []; // Safe for rendering

    Highcharts.chart('line-chart', {
        chart: {
            type: 'line'
        },
        title: {
            text: 'Search Trends Over Time'
        },
        xAxis: {
            type: 'datetime',
            title: {
                text: 'Date'
            }
        },
        credits: {
            enabled: false
        },
        yAxis: {
            title: {
                text: 'Search Count'
            }
        },
        series: [{
            name: 'Search Count',
            data: chartData.map(entry => ({
                x: new Date(entry.date).getTime(),
                y: entry.count
            }))
        }]
    });

    const idInput = document.querySelector('input[name="id_number"]');
    const searchButton = document.getElementById('search-button');

    // Function to validate the ID number
    function isValidIdNumber(idNumber) {
        if (!/^\d{13}$/.test(idNumber)) return false;

        const dob = idNumber.slice(0, 6); // YYMMDD
        const year = parseInt(dob.slice(0, 2), 10) + (dob.slice(0, 2) > '22' ? 1900 : 2000);
        const month = parseInt(dob.slice(2, 4), 10);
        const day = parseInt(dob.slice(4, 6), 10);

        const birthDate = new Date(year, month - 1, day);
        if (birthDate.getFullYear() !== year || birthDate.getMonth() + 1 !== month || birthDate.getDate() !== day) return false;
        if (birthDate > new Date()) return false;

        return true;
    }

    // Initially disable the search button
    searchButton.disabled = true;

    // Enable the button only when the input is valid
    idInput.addEventListener('input', () => {
        const idNumber = idInput.value.trim();
        if (isValidIdNumber(idNumber)) {
            searchButton.disabled = false;
        } else {
            searchButton.disabled = true;
        }
    });

    // If the search was successful, the button stays enabled
    if (isValidIdNumber(idInput.value.trim())) {
        searchButton.disabled = false;
    }
});
