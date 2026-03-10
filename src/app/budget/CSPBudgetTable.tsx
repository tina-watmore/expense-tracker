"use client";

import type { Category } from "@/types/groups";
import { useTransactions } from "@/context/TransactionsContext";
import { formatCurrency, getPercentage } from "@/utils/helperFunctions";
import { BudgetSection } from "./BudgetSection";

export const CSPBudgetTable = () => {
  const { groups } = useTransactions();

  // income
  const incomeGroupData: Category[] = groups.find((g) => g.id === 6)?.categories ?? [];
  const incomeTotal = incomeGroupData.reduce((total, category) => total + (category.amount ?? 0), 0);  

  // fixed costs
  const fixedCostsGroupData: Category[] = groups.find((g) => g.id === 1)?.categories ?? [];
  const fixedCostTotal = fixedCostsGroupData.reduce((total, category) => total + (category.amount ?? 0), 0);

  // savings
  const savingsGroupData: Category[] = groups.find((g) => g.id === 2)?.categories ?? [];
  const savingsCostTotal = savingsGroupData.reduce((total, category) => total + (category.amount ?? 0), 0);  

  // investing
  const investingGroupData: Category[] = groups.find((g) => g.id === 3)?.categories ?? [];
  const investingCostTotal = investingGroupData.reduce((total, category) => total + (category.amount ?? 0), 0);   

  // budgetRemainder: income - expenses total
  const budgetRemainder = incomeTotal - (fixedCostTotal + savingsCostTotal + investingCostTotal);

  return (
    <>
        <BudgetSection
            title="Net income:"
            data={incomeGroupData}
            total={incomeTotal}
            showPercentage={false}
        />

        <BudgetSection
            title="Fixed costs:"
            data={fixedCostsGroupData}
            total={fixedCostTotal}
            showPercentage={true}
            incomeTotal={incomeTotal}
        />        

        <BudgetSection
            title="Savings:"
            data={savingsGroupData}
            total={savingsCostTotal}
            showPercentage={true}
            incomeTotal={incomeTotal}
        />        

        <BudgetSection
            title="Investing:"
            data={investingGroupData}
            total={investingCostTotal}
            showPercentage={true}
            incomeTotal={incomeTotal}
        />        

        {
            <div className="table-footer-row">
            <div className="t-col">Budget Remainder (income - expenses/savings):</div>
            <div className="s-col">{formatCurrency(budgetRemainder)}</div>        
            </div>  
        }                                                                                                                                                                                                                                                                                                                                                                         
    
    </>
  );
}
