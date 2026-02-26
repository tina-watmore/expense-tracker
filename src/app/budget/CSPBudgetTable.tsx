"use client";

import type { Category } from "@/types/groups";
import { useTransactions } from "@/context/TransactionsContext";
import { formatCurrency, getPercentage } from "@/utils/helperFunctions";

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
        {
            /* income */       
            incomeGroupData.length > 0 ? (
            <>
                <div className="group-header hr-row">
                <div className="group-title t-col">Net income:</div>
                <div className="date-title s-col"></div>
                </div>                      
                {
                incomeGroupData.map(category => (
                    <div className="row" key={category.id}>
                    <div className="t-col">{category.name}</div>
                    <div className="s-col">{formatCurrency(category.amount ?? 0)}</div>        
                    </div> 
                ))
                }
                <div className="ft-row">
                <div className="t-col">Total:</div>
                <div className="s-col">{formatCurrency(incomeTotal)}</div>        
                </div>                          
            </>
            ) : (
            <p>No income</p>
            )                      
        } 
        {     
            /* fixed costs */            
            fixedCostsGroupData.length > 0 ? (
            <>
                <div className="group-header hr-row">
                <div className="group-title t-col">Fixed costs:</div>
                <div className="date-title s-col">
                    {
                    incomeTotal > 0 ? `${getPercentage(fixedCostTotal, incomeTotal).toFixed(1)}%` : "0%"                        
                    }
                </div>
                </div>                      
                {
                fixedCostsGroupData.map(category => (
                    <div className="row" key={category.id}>
                    <div className="t-col">{category.name}</div>
                    <div className="s-col">{formatCurrency(category.amount ?? 0)}</div>        
                    </div> 
                ))
                }
                <div className="ft-row">
                <div className="t-col">Total:</div>
                <div className="s-col">{formatCurrency(fixedCostTotal)}</div>        
                </div>                          
            </>
            ) : (
            <p>No fixed costs</p>
            )                                     
        } 
        {
            /* savings */
            savingsGroupData.length > 0 ? (
            <>
                <div className="group-header hr-row">
                <div className="group-title t-col">Savings:</div>
                <div className="date-title s-col">
                    {
                    incomeTotal > 0 ? `${getPercentage(savingsCostTotal, incomeTotal).toFixed(1)}%` : "0%"                        
                    }
                </div>                    
                </div>                      
                {
                savingsGroupData.map(category => (
                    <div className="row" key={category.id}>
                    <div className="t-col">{category.name}</div>
                    <div className="s-col align-right">{formatCurrency(category.amount ?? 0)}</div>        
                    </div> 
                ))
                }
                <div className="ft-row">
                <div className="t-col">Total:</div>
                <div className="s-col">{formatCurrency(savingsCostTotal)}</div>        
                </div>                          
            </>
            ) : (
            <p>No fetched savings data</p>
            )                    
        }  
        {
            /* investing */
            investingGroupData.length > 0 ? (
            <>
                <div className="group-header hr-row">
                <div className="group-title t-col">Investing:</div>
                <div className="date-title s-col">
                    {
                    incomeTotal > 0 ? `${getPercentage(investingCostTotal, incomeTotal).toFixed(1)}%` : "0%"                        
                    }
                </div>                       
                </div>                      
                {
                investingGroupData.map(category => (
                    <div className="row" key={category.id}>
                    <div className="t-col">{category.name}</div>
                    <div className="s-col align-right">{formatCurrency(category.amount ?? 0)}</div>        
                    </div> 
                ))
                }
                <div className="ft-row">
                <div className="t-col">Total:</div>
                <div className="s-col">{formatCurrency(investingCostTotal)}</div>        
                </div>                          
            </>
            ) : (
            <p>No fetched investing data</p>
            )                    
        }  
        {
            <div className="table-footer-row">
            <div className="t-col">Budget Remainder (income - expenses/savings):</div>
            <div className="s-col">{formatCurrency(budgetRemainder)}</div>        
            </div>  
        }                                                                                                                                                                                                                                                                                                                                                                         
    
    </>
  );
}
