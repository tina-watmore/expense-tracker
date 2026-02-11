"use client";

import { createContext, useContext, useState } from "react";
import type { Transaction } from "@/types/transactions";
import type { Group } from "@/types/groups";

type TransactionsContextType = {
    transactions: Transaction[],
    groups: Group[],
    addTransaction: (Transaction: Transaction) => void, 
    sortTransactions: (sortBy: "date" | "createdDate") => void
}

const TransactionsContext = createContext<TransactionsContextType | null>(null);

export function TransactionsProvider({
    initialTransactions, 
    groupData, 
    children}: {
        initialTransactions: Transaction[],
        groupData: Group[],
        children: React.ReactNode
    }) {
        const [transactions, setTransactions] = useState(initialTransactions);
        const groups = groupData;

        const addTransaction = (transaction: Transaction) => {
            if(!transaction || 
                typeof transaction.id !== "number" ||
                typeof transaction.groupId !== "number" ||
                typeof transaction.amount !== "number" ||
                typeof transaction.date !== "string"                
            ) {
                console.log("Invalid transaction added", transaction)
                return;
            }
            setTransactions(prev => [transaction, ...prev])
        }

        const sortTransactions = (sortBy: "date" | "createdDate") => {
            setTransactions(prev => [...prev].sort((a: Transaction, b: Transaction) => new Date(b[sortBy]).getTime() - new Date(a[sortBy]).getTime()));                
        }

        return (
            <TransactionsContext.Provider value={{ transactions, groups, addTransaction, sortTransactions }}>
                {children}
            </TransactionsContext.Provider>
        )
}

export function useTransactions() {
    const context = useContext(TransactionsContext);
    if(!context) {
        throw new Error("useTransactions must be used within Transaction Provider")
    }
    return context;
}