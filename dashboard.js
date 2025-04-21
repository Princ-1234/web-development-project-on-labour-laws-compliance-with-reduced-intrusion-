// Compliance Doughnut Chart
new Chart(document.getElementById("complianceDoughnut"), {
  type: 'doughnut',
  data: {
    labels: ["Compliant", "Pending"],
    datasets: [{
      label: "Compliance Status",
      data: [19, 6], // Data representing compliant and pending items
      backgroundColor: ["#4CAF50", "#FF9800"]
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  }
});

// Compliance Trend (Line Chart)
new Chart(document.getElementById("complianceTrend"), {
  type: 'line',
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr"],
    datasets: [{
      label: "Compliance %", 
      data: [68, 72, 78, 82], // Compliance percentage trend data
      borderColor: "#3e95cd", 
      fill: false,
      tension: 0.3
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: true
      }
    }
  }
});

// Article Search Filter
function filterArticles() {
  const input = document.getElementById("articleSearch").value.toLowerCase();
  const articles = document.querySelectorAll("#articlesContainer .article-card");

  articles.forEach(article => {
    const tags = article.getAttribute("data-tags").toLowerCase();
    const title = article.querySelector("h3").innerText.toLowerCase();
    if (title.includes(input) || tags.includes(input)) {
      article.style.display = "block"; // Show article
    } else {
      article.style.display = "none"; // Hide article
    }
  });
}

// Salary Calculation and Breakdown
function calculateSalary() {
  const basic = parseFloat(document.getElementById('basic').value);
  const daPercent = parseFloat(document.getElementById('da').value);
  const hraPercent = parseFloat(document.getElementById('hra').value);

  // Validate input fields
  if (isNaN(basic) || basic <= 0) {
    alert("Please enter a valid Basic Salary.");
    return;
  }
  if (isNaN(daPercent) || daPercent < 0) {
    alert("Please enter a valid DA percentage.");
    return;
  }
  if (isNaN(hraPercent) || hraPercent < 0) {
    alert("Please enter a valid HRA percentage.");
    return;
  }

  // Calculate salary components
  const da = (basic * daPercent) / 100;
  const hra = (basic * hraPercent) / 100;
  const pf = (basic * 0.12); // Assuming PF is 12% of basic salary
  const grossSalary = basic + da + hra;
  const netSalary = grossSalary - pf;

  // Update table with calculated values
  document.getElementById('basicVal').textContent = basic.toFixed(2);
  document.getElementById('daVal').textContent = da.toFixed(2);
  document.getElementById('hraVal').textContent = hra.toFixed(2);
  document.getElementById('pfVal').textContent = pf.toFixed(2);
  document.getElementById('grossVal').textContent = grossSalary.toFixed(2);
  document.getElementById('netVal').textContent = netSalary.toFixed(2);

  // Create the salary chart (if it doesn't already exist)
  const ctx = document.getElementById('salaryChart').getContext('2d');
  if (window.salaryChart) {
    window.salaryChart.destroy(); // Destroy previous chart if exists
  }
  window.salaryChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Basic Salary', 'DA', 'HRA', 'PF'],
      datasets: [{
        label: 'Salary Components',
        data: [basic, da, hra, pf],
        backgroundColor: ['#4CAF50', '#FFC107', '#2196F3', '#F44336'],
        borderColor: ['#fff', '#fff', '#fff', '#fff'],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        tooltip: {
          callbacks: {
            label: function(tooltipItem) {
              return tooltipItem.label + ': ₹' + tooltipItem.raw.toFixed(2);
            }
          }
        }
      }
    }
  });

  // Show breakdown details
  document.getElementById('salaryBreakdown').classList.remove('hidden');
}


