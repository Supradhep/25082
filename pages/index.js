import TravelModeChart from "../components/TravelModeChart";
import HouseholdChart from "../components/HouseholdChart";
export default function Home() {
  return (
    <div style={{ width: "800px", margin: "50px auto" }}>
      <h1>Analytics Dashboard</h1>
      <TravelModeChart />
      <HouseholdChart />
    </div>
  );
}