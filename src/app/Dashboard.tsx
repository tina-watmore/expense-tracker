"use client";

import { useTransactions } from "@/context/TransactionsContext";
import type { Group, Category } from "@/types/groups";
import { 
  isDateBetween, 
  getFinancialYearRange, 
  toISODate, formatCurrency, 
  isInSelectedDateRange, 
  isInCurrentMonth, 
  namesOfMonths, 
  getCurrentDate, 
  generateYearsDescending } from "@/utils/helperFunctions";
import { useState, useEffect, useMemo } from "react";

export const Dashboard = () => {
    const years = generateYearsDescending(2023);
    const { transactions, groups } = useTransactions();               
    const { currentYear, currentMonth } = getCurrentDate();
    const { startDate, endDate } = getFinancialYearRange();  
    const [selectedFinancialYear, setSelectedFinancialYear] = useState<number>();
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);  
    const [selectedFinYearStart, setSelectedFinYearStart] = useState<Date>(startDate);
    const [selectedFinYearEnd, setSelectedFinYearEnd] = useState<Date>(endDate);    

    const transactionsFilteredByCurrentMonth = transactions.filter(t => isInCurrentMonth(t.date));
   
    const monthlyExpenseTotal = useMemo(() => {
      return transactionsFilteredByCurrentMonth
        .filter(t => t.groupId === 1 || t.groupId === 2)
        .reduce((total, t) => total + t.amount, 0)      
    }, [transactions]);

    const monthlyIncomeTotal = useMemo(() => {
      return transactionsFilteredByCurrentMonth
        .filter(t => t.groupId === 7)
        .reduce((total, t) => total + t.amount, 0)      
    }, [transactions]);      

    const monthlySavedTotal = useMemo(() => {
      return transactionsFilteredByCurrentMonth
        .filter(t => t.groupId === 7)
        .reduce((total, t) => total + t.amount, 0)      
    }, [transactions]);         

    const yearlyIncomeTotal = useMemo(() => {
      return transactions.filter(t => isDateBetween(
            t.date, 
            toISODate(startDate),
            toISODate(endDate)
          )  
        )
        .filter(t => t.groupId === 7)
        .reduce((total, t) => total + t.amount, 0)
    }, [transactions]);

    const yearlyExpenseTotal = useMemo(() => {
      return transactions.filter(t => isDateBetween(
            t.date, 
            toISODate(startDate),
            toISODate(endDate)
          )  
        )
        .filter(t => t.groupId === 1 || t.groupId === 2)
        .reduce((total, t) => total + t.amount, 0)
    }, [transactions]);        
    
    useEffect(() => {
      const { startDate, endDate } = getFinancialYearRange(selectedFinancialYear);
      setSelectedFinYearStart(startDate);
      setSelectedFinYearEnd(endDate);
    }, [selectedFinancialYear]);

    return (
      <>

        {/* card summaries */}

        <div className="bg-cards-wrapper">
          <div className="bg-card">
            <div className="title">
              Total Income: 
            </div>
            <div className="details">
              <div className="item">
                <div className="amount">{formatCurrency(monthlyIncomeTotal)}</div>
                <div className="info">This month</div>
              </div>
              <div className="item">
                <div className="amount">{formatCurrency(yearlyIncomeTotal)}</div>
                <div className="info">This financial year</div>
              </div>
            </div>
          </div>
          <div className="bg-card">
            <div className="title">
              Total Expenses: 
            </div>
            <div className="details">
              <div className="item">
                <div className="amount">{formatCurrency(monthlyExpenseTotal)}</div>
                <div className="info">This month</div>
              </div>
              <div className="item">
                <div className="amount">{formatCurrency(yearlyExpenseTotal)}</div>
                <div className="info">This financial year</div>
              </div>
            </div>                      
          </div>
          <div className="bg-card">
            <div className="title">
              Total Saved: 
            </div>
            <div className="details">
              <div className="item">
                <div className="amount">{formatCurrency(monthlyIncomeTotal)}</div>
                <div className="info">This month</div>
              </div>
              <div className="item">
                <div className="amount">{formatCurrency(yearlyIncomeTotal)}</div>
                <div className="info">This financial year</div>
              </div>
            </div>
          </div>  
          <div className="bg-card">
            <div className="title">
              Total Invested: 
            </div>
            <div className="details">
              <div className="item">
                <div className="amount">{formatCurrency(monthlyIncomeTotal)}</div>
                <div className="info">This month</div>
              </div>
              <div className="item">
                <div className="amount">{formatCurrency(yearlyIncomeTotal)}</div>
                <div className="info">This financial year</div>
              </div>
            </div>
          </div>                  
          <div className="bg-card">
            <div className="title">
              Net Balance: 
            </div>
            <div className="details">
              <div className="item">
                <div className="amount">$0.00</div>
                <div className="info">This month</div>
              </div>
              <div className="item">
                <div className="amount">$0.00</div>
                <div className="info">This financial year</div>
              </div>
            </div>                      
          </div> 
        </div>    

        <div className="progress-overview-wrapper">

          {/* monthly overview */}

          <div className="progress-overview half-width">
            <div className="header">
              <div className="title">Monthly Overview</div>
              <span className="sub-title">Budget remaining by category</span>
              <div className="filter">              
                <select
                  className="sort-by-filter"
                  value={selectedMonth}
                  onChange={e => setSelectedMonth(e.target.value as any)}
                >
                  {
                    namesOfMonths.map((m, index) => (
                      <option key={index} value={index}>{m}</option>
                    ))
                  }
                  

                </select>
                <select
                  className="sort-by-filter"
                  id="sort-by-year"
                  value={selectedYear}
                  onChange={e => setSelectedYear(e.target.value as any)}
                >
                  {
                    years.map((y, index) => (
                      <option key={index} value={y}>{y}</option>
                    ))
                  }
                  

                </select>                
              </div>
            </div>
            <div className="content">
              {
                  groups
                    .filter(g => g.id === 1 || g.id === 2)
                    .map(g => (g.categories.map((c, index) => {
                      const categorySpend = transactions
                        .filter(t => t.groupId === g.id && t.categoryId === c.id)
                        .filter(t => isInSelectedDateRange(t.date, selectedMonth, selectedYear))
                        .reduce((total, item) => total + item.amount, 0);
                      const remainingAmount = (c.amount ?? 0) - categorySpend;
                      const percentageUsed = (categorySpend / (c.amount ?? 0)) * 100;
                      const safePercentage = Math.min(percentageUsed, 100);
                      const progressLevel = () => {
                        if(percentageUsed > 85 && percentageUsed < 100) {
                          return "budget-warning";
                        } else if (percentageUsed > 100) {
                          return "over-budget";
                        }
                        return;                        
                      }
                      return (
                        <div key={index}  className={`${progressLevel()} item`}>
                          <div className="category">
                            {c.name}
                          </div>
                          <div className="amount">
                            {formatCurrency(categorySpend)} / {formatCurrency(c.amount ?? 0)}
                          </div>
                          <div className="progress">
                            <div
                              className="progress-bar"
                              role="progressbar"
                              aria-valuenow={percentageUsed}
                              aria-valuemin={0}
                              aria-valuemax={100}
                              style={{ width: `${safePercentage}%` }}
                            >
                              <span className="sr-only">{percentageUsed}%</span>
                            </div>
                          </div>
                          <div className="progress-info">{percentageUsed.toFixed(2)}% used</div>
                          <div className="remaining-info">
                            {formatCurrency(remainingAmount)} remaining
                          </div>
                        </div>                        
                      )
                    })))
              }                        
            </div>
          </div>                 

          {/* yearly overview */}

          <div className="progress-overview half-width">
            <div className="header">
              <div className="title">Financial year overview</div>
              <span className="sub-title">Budget remaining by category</span>
              <div className="filter">              
                <select
                  id="sort-by-fin-year"
                  className="sort-by-filter"
                  value={selectedFinancialYear}
                  onChange={e => setSelectedFinancialYear(Number(e.target.value))}
                >
                  {                    
                    years.map((y, index) => {      
                      if(currentMonth <= 6 && index === 0) return; // removing next financial year if current month is before July                            
                      return <option key={index} value={y}>{`${y} / ${y + 1}`}</option>                  
                    })
                  }
                </select>                
              </div>              
            </div>
            <div className="content">
              {
                  groups
                    .filter(g => g.id === 1 || g.id === 2)
                    .map(g => (g.categories.map((c, index) => {    

                      const categorySpend = transactions
                        .filter(t => t.groupId === g.id && t.categoryId === c.id)
                        .filter(t => isDateBetween(
                          t.date, 
                          toISODate(selectedFinYearStart),
                          toISODate(selectedFinYearEnd)
                        ))
                        .reduce((total, item) => total + item.amount, 0);

                      let currentMonthCount = currentMonth;
                      if(!selectedFinancialYear) {
                        currentMonthCount <= 5 ? (currentMonthCount += 7) : (currentMonthCount -= 5);   
                      } else {
                        currentMonthCount = 12;
                      }
                                        
                     
                      const remainingAmount = (Number(c.amount) * currentMonthCount) - categorySpend;
                      const percentageUsed = (categorySpend / (Number(c.amount) * currentMonthCount)) * 100;
                      const safePercentage = Math.min(percentageUsed, 100);
                      const progressLevel = (): string => {
                        if(percentageUsed > 85 && percentageUsed < 100) {
                          return "budget-warning";
                        } else if (percentageUsed > 100) {
                          return "over-budget";
                        }
                        return "";                        
                      }

                      return (
                        <div key={index} className={`${progressLevel()} item`}>
                          <div className="category">
                            {c.name}
                          </div>
                          <div className="amount">
                            {formatCurrency(categorySpend)} / {formatCurrency(Number(c.amount) * currentMonthCount)}
                          </div>
                          <div className="progress">
                            <div
                              className="progress-bar"
                              role="progressbar"
                              aria-valuenow={percentageUsed}
                              aria-valuemin={0}
                              aria-valuemax={100}
                              style={{ width: `${safePercentage}%` }}
                            >
                              <span className="sr-only">{percentageUsed}%</span>
                            </div>
                          </div>
                          <div className="progress-info">{percentageUsed.toFixed(2)}% used</div>
                          <div className="remaining-info">
                            {formatCurrency(remainingAmount)} remaining
                          </div>
                        </div>                        
                      )
                    })))
              }                        
            </div>
          </div>          
        </div>
      </>        
    )
}