
// Initialize all charts on the page
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
});

function initializeCharts() {
    // Enrollment Chart
    const enrollmentCtx = document.getElementById('enrollmentChart');
    if (enrollmentCtx) {
        const enrollmentData = JSON.parse(enrollmentCtx.getAttribute('data-chart'));
        createEnrollmentChart(enrollmentData);
    }
    
    // Grade Distribution Chart
    const gradeCtx = document.getElementById('gradeChart');
    if (gradeCtx) {
        const gradeData = JSON.parse(gradeCtx.getAttribute('data-chart'));
        createGradeChart(gradeData);
    }
    
    // Major Statistics Chart
    const majorCtx = document.getElementById('majorChart');
    if (majorCtx) {
        const majorData = JSON.parse(majorCtx.getAttribute('data-chart'));
        createMajorChart(majorData);
    }
}

function createEnrollmentChart(data) {
    const ctx = document.getElementById('enrollmentChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Number of Students',
                data: data.values,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

function createGradeChart(data) {
    const ctx = document.getElementById('gradeChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: data.labels,
            datasets: [{
                data: data.values,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                }
            }
        }
    });
}

function createMajorChart(data) {
    const ctx = document.getElementById('majorChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: data.labels,
            datasets: [{
                data: data.values,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                }
            }
        }
    });
}

// Export chart as image
function exportChart(chartId, filename) {
    const chartCanvas = document.getElementById(chartId);
    const link = document.createElement('a');
    link.href = chartCanvas.toDataURL('image/png');
    link.download = filename || 'chart.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Update chart with new data
function updateChart(chartId, newData) {
    const chart = Chart.getChart(chartId);
    if (chart) {
        chart.data = newData;
        chart.update();
    }
}