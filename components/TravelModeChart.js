// components/TravelModeChart.js
import { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function TravelModeChart() {
  const [data, setData] = useState(null); // API data
  const fallbackData = [12, 19, 7, 5]; // dummy fallback

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/travel") // <-- Replace with Member 4's API URL later
      .then((res) => {
        // Convert API response into counts for each mode
        const counts = { Bus: 0, Car: 0, Bike: 0, Walk: 0 };
        res.data.forEach((entry) => {
          const mode = entry.mode;
          if (counts[mode] !== undefined) counts[mode] += 1;
        });
        setData([counts.Bus, counts.Car, counts.Bike, counts.Walk]);
      })
      .catch((err) => {
        console.log("API fetch failed, using fallback data", err);
        setData(fallbackData); // Use dummy if API fails
      });
  }, []);

  const chartData = {
    labels: ["Bus", "Car", "Bike", "Walk"],
    datasets: [
      {
        label: "Travel Mode Distribution",
        data: data || fallbackData,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div style={{ width: "400px", height: "400px", margin: "0 auto" }}>
      <Pie data={chartData} options={chartOptions} />
    </div>
  );
}
