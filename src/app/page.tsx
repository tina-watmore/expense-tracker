import Header from "@/components/Header";

export const Metadata = {
  title: "Dashboard - TJ Tracker",
  description: "Budgeting and tracking daily expenses"
}

export default function Dashboard() {
  return (
    <div className="page-wrapper">
      <Header title="Dashboard" />
    </div>
  );
}
