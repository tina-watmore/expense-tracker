import Header from "@/components/Header";
import { Dashboard } from "./Dashboard";


export const metadata = {
  title: "Dashboard - TJ Tracker",
  description: "Budgeting and tracking daily expenses"
}

export default function DashboardPage() {


  return (
    <div className="page-wrapper">
      <Header title="Dashboard" subtitle="" />
      <Dashboard />
    </div>
  );
}
