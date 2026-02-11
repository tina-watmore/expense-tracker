"use client";

import { useTransactions } from "@/context/TransactionsContext";
import type { Group, Category } from "@/types/groups";
import { useState, useEffect } from "react";
import {
  Trash
} from 'lucide-react';

export const TransactionList = () => {
    const { transactions, groups, sortTransactions } = useTransactions();    
    const [sortBy, setSortBy] = useState<"date" | "createdDate" | ''>('');

    const getGroupById = (groupId: number) => groups.find(g => g.id === groupId);

    const getCategoryById = (group: Group | undefined, catergoryId?: number) => group?.categories.find(c => c.id === catergoryId);

    const getSubCategoryById = (category: Category | undefined, subCategoryId?: number) => category?.subCategories?.find(sc => sc.id === subCategoryId);

    useEffect(() => {
        if(!sortBy) return;
        sortTransactions(sortBy);
    }, [sortBy]);

    if(transactions.length === 0) {
        return <p>No transactions</p>
    }

    return (
        <div className="card-wrapper">
            {
                <div className="table-content">
                    <div className="group-header hr-row">
                        <div className="group-title t-col">Transaction History: {transactions.length} transactions</div>
                        <div className="date-title s-col">
                            <select
                                required 
                                className="sort-by-filter"
                                id="sort" 
                                name="sort"
                                value={sortBy}
                                onChange={e => setSortBy(e.target.value as any)}
                            >
                                <option value="" disabled>Sort by:</option>
                                <option value="createdDate">Latest added</option>
                                <option value="date">Date</option>
                            </select>
                        </div>
                    </div>
                    {
                        transactions.map((t) => {
                            const group = getGroupById(t.groupId);
                            const category = getCategoryById(group, t.categoryId);
                            const subCategory = getSubCategoryById(category, t.subCategoryId);
                            let isPositiveValue = true;
                            if(t.groupId === 1 || t.groupId === 2 || t.groupId === 4 || t.groupId === 5) {
                                isPositiveValue = false;
                            }

                            return (
                                <div className="row" key={t.id}>
                                    <div className="t-col">
                                        <div className="transaction-title">
                                            {category?.name}
                                            {subCategory && ` - ${subCategory.name}`}
                                            {t.notes && ` - ${t.notes}`}
                                        </div>
                                        <div className="transaction-subtitle">
                                            {group?.name} | {t.date}    
                                        </div>
                                    </div>
                                    <div className="s-col with-side-btn">
                                        <span className={isPositiveValue ? "positive-value strong" : "negative-value strong"}>
                                            {isPositiveValue ? "-" : "+"}${Number(t.amount).toFixed(2)}
                                        </span>
                                        <button className="delete-btn">
                                            <Trash strokeWidth={1} className="trash-icon" />
                                        </button>
                                    </div>        
                                </div>                                   
                            )
                        })
                    }                    
                </div>  
            }
        </div>           
    )
}