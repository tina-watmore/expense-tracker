"use client";

import { formatCurrency, getFinancialYearRange, generateYearsDescending } from "@/utils/helperFunctions";
import type { Networth } from "@/types/networth";
import type { Group } from "@/types/groups";
import { useState } from "react";

type Props = {
    networthData: Networth[], 
    groupData: Group[]    
}

export const NetworthSection = ({ networthData, groupData }: Props) => {    
    const currentFinYear = getFinancialYearRange().startDate.getFullYear();   
    const currentMonth = new Date().getMonth();
    let filterEarliestYear: number = currentFinYear;
    networthData.map(n => {
        if(n.financialYear < filterEarliestYear) {
            filterEarliestYear = n.financialYear;
        }
    });
    const years = generateYearsDescending(filterEarliestYear);
    const [selectedFinancialYear, setSelectedFinancialYear] = useState<number>(currentFinYear);

    const networthTotal = networthData.items.reduce((total, item) => total + (item.items.amount ?? 0), 0);  

    return (
        <>
            <div className="group-header hr-row">
                <div className="group-title t-col">Networth:</div>
                <div className="date-title s-col">
                    <div className="filter">              
                        <select
                            className="sort-by-filter"
                            id="sort-by-year"
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
            </div>                      
            {
                networthData.map(item => (
                    <div className="row" key={item.id}>
                    <div className="t-col">{item.name}</div>
                    <div className="s-col">{formatCurrency(item.)}</div>        
                    </div> 
                ))
            }
            <div className="ft-row">
                <div className="t-col">Total:</div>
                <div className="s-col">{formatCurrency(networthTotal)}</div>        
            </div>                          
        </>  
    )
}