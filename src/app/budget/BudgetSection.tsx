"use client";

import { formatCurrency, getPercentage } from "@/utils/helperFunctions";
import type { Category } from "@/types/groups";

type Props = {
    title: string,
    data: { id: number, name: string, amount?: number }[],
    total: number,
    showPercentage?: boolean,
    incomeTotal?: number 
}

export const BudgetSection = ({ title, data, total, showPercentage, incomeTotal }: Props) => {

    if(!data.length) {
        return <p>No {title} data</p>
    }

    return (
        <>
            <div className="group-header hr-row">
            <div className="group-title t-col">{title}:</div>
            <div className="date-title s-col">
                {showPercentage && (incomeTotal ?? 0) > 0 
                    ? `${getPercentage(total, incomeTotal ?? 0).toFixed(1)}%`
                    : ""}
            </div>
            </div>                      
            {
            data.map(category => (
                <div className="row" key={category.id}>
                <div className="t-col">{category.name}</div>
                <div className="s-col">{formatCurrency(category.amount ?? 0)}</div>        
                </div> 
            ))
            }
            <div className="ft-row">
            <div className="t-col">Total:</div>
            <div className="s-col">{formatCurrency(total)}</div>        
            </div>         
        </>
    )
}