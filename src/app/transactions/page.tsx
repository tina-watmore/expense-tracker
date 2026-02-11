import { AddExpenseForm } from "./AddExpenseForm";
import { TransactionList } from "./TransactionsList";
import Header from "@/components/Header";

export const Metadata = {
  title: 'Transactions',
  description: 'Add expense and view transactions',
};

export default async function TransactionPage() {
  return (
    <div className='page-wrapper'>
      <Header title="Transactions" subtitle="" />
      <div className="content-wrapper">
          <AddExpenseForm  />        
          <TransactionList />
      </div>
    </div>          
  )
}
