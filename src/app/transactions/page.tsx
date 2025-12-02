import Header from "@/components/Header";

export const Metadata = {
  title: 'Trasaction history',
  description: 'List of all expenses',
};

export default function Transactions() {
  return (
    <div className="page-wrapper">
      <Header title="Transactions" />
    </div>
  );
}
