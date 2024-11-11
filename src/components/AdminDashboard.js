import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2"; 
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";
import Papa from "papaparse"; 
import { Button } from "@mui/material"; 

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

export default function ProductionDashboard() {
  const [productions, setProductions] = useState([]);

  useEffect(() => {
    const fetchProductions = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/getProduction");
        const data = await response.json();

        console.log('Fetched Productions:', data.productions);

        const activeProductions = data.productions.filter((prod) => !prod.deleted); 
        console.log('Filtered Active Productions:', activeProductions);

        setProductions(activeProductions);
      } catch (error) {
        console.error("Failed to fetch productions", error);
      }
    };

    fetchProductions();
  }, []);

  const prepareChartData = () => {
    const labels = productions.map((prod) => prod.date);
    const data = productions.map((prod) => prod.production);

    return {
      labels,
      datasets: [
        {
          label: "Production Over Time",
          data,
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 2,
          fill: false,
        },
      ],
    };
  };

  const downloadCSV = () => {
    const csvData = productions.map((prod) => ({
      date: prod.date,
      production: prod.production,
    }));

    const csv = Papa.unparse(csvData);

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "production_data.csv";
    link.click();
  };

  return (
    <div>
      <h2>Production Analysis</h2>
      <Button
        variant="contained"
        color="primary"
        onClick={downloadCSV}
        style={{ marginBottom: "20px" }}
      >
        Download CSV
      </Button>

      {productions.length > 0 ? (
        <Line data={prepareChartData()} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
      ) : (
        <p>No production data available</p> 
      )}
    </div>
  );
}
