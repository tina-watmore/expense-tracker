"use client";

import { formatCurrency, getFinancialYearRange } from "@/utils/helperFunctions";
import type { Networth } from "@/types/networth";
import type { Group } from "@/types/groups";
import { useState, useEffect } from "react";

type Props = {
    networthData: Networth[], 
    groupData: Group[]    
}

export const NetworthSection = ({ networthData, groupData }: Props) => {    
    const currentFinYear = getFinancialYearRange().startDate.getFullYear();   
    const [selectedFinancialYear, setSelectedFinancialYear] = useState<number>(currentFinYear);
    const currentMonth = new Date().getMonth();    
    
    // years required for filter dropdown
    const getYears = networthData.map(n => {
        return n.financialYear;
    });
    const years = [...new Set(getYears)].sort((a, b) => b - a);

    // intital networth entries
    const intialNetworthEntry: Networth[] = networthData.filter(n => n.financialYear === selectedFinancialYear);        
    const intialNetworthEntryTotal: number = intialNetworthEntry[0].items.reduce((total, item) => total + (item.amount ?? 0), 0);

    // networth setter functions
    const [networthEntry, setNetworthEntry] = useState<Networth[]>(intialNetworthEntry);
    const [networthEntryTotal, setNetworthEntryTotal] = useState<number>(intialNetworthEntryTotal);

    // update networth entry on financial year change
    useEffect(() => {
        let selectedNetworth: Networth[] = networthData.filter(n => n.financialYear === selectedFinancialYear);
        let networthEntryTotal: number = selectedNetworth[0].items.reduce((total, item) => total + (item.amount ?? 0), 0);  
        setNetworthEntry(selectedNetworth);
        setNetworthEntryTotal(networthEntryTotal);
    }, [selectedFinancialYear]);
    


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
                                    if(currentMonth >= 6 && index === 0) return; // removing next financial year if current month is before January                            
                                    return <option key={index} value={y}>{`${y} / ${y + 1}`}</option>                  
                                })
                            }            
                        </select>                
                    </div>                    
                </div>
            </div>                      
            {
                networthEntry[0].items.map(item => (
                    <div className="row" key={item.id}>
                    <div className="t-col">{item.name}</div>
                    <div className="s-col">{formatCurrency(item.amount ?? 0)}</div>        
                    </div> 
                ))
            }
            <div className="ft-row">
                <div className="t-col">Total:</div>
                <div className="s-col">{formatCurrency(networthEntryTotal)}</div>        
            </div>                          
        </>  
    )
}