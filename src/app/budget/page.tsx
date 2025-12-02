import Header from "@/components/Header";

export const Metadata = {
  title: 'CSP Budget',
  description: 'Monthly budget goals based on income',
};

export default function Budget() {
  return (
    <div className="page-wrapper">
      <Header title="CSP Budget" />
      <p>Monthly budget goals based on income.</p>
    </div>
  );
}
