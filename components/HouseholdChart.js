// components/HouseholdChart.js
import { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function HouseholdChart() {
  const [data, setData] = useState(null);
  const fallbackData = [4, 3, 5]; // dummy fallback

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/household") // <-- Replace with Member 4's API
      .then((res) => {
        // Convert API response into chart format
        const members = res.data.map(h => h.members || 0); 
        setData(members);
      })
      .catch((err) => {
        console.log("API fetch failed, using fallback data", err);
        setData(fallbackData);
      });
  }, []);

  const chartData = {
    labels: ["Household 1", "Household 2", "Household 3"],
    datasets: [
      {
        label: "Number of Members",
        data: data || fallbackData,
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div style={{ width: "400px", height: "400px", margin: "0 auto" }}>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}
