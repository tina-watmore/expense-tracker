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
    const currentMonth = new Date().getMonth();

    // years required for filter dropdown
    const getYears = networthData.map(n => {
        return n.financialYear;
    });
    const years = [...new Set(getYears)].sort((a, b) => b - a);


    const [selectedFinancialYear, setSelectedFinancialYear] = useState<number>(currentFinYear);
    const netentry = networthData.find((n) => {n.financialYear === selectedFinancialYear});
    // working on this - trying to get the latest networth entry
    const [networthEntry, setNetworthEntry] = useState();

    useEffect(() => {
        console.log("networth entry: ", netentry)
    }, [selectedFinancialYear]);
    

    //const networthTotal = networthData.items.reduce((total, item) => total + (item.items.amount ?? 0), 0);  

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
                networthData.map(item => (
                    <div className="row" key={item.id}>
                    <div className="t-col">{item.name}</div>
                    <div className="s-col">item total goes here</div>        
                    </div> 
                ))
            }
            <div className="ft-row">
                <div className="t-col">Total:</div>
                <div className="s-col">networth total value goes here</div>        
            </div>                          
        </>  
    )
}