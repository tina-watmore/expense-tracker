"use client";

import { useTransactions } from "@/context/TransactionsContext";
import { useState, useEffect } from "react";

export const AddExpenseForm = () => {
    const { groups, addTransaction } = useTransactions();

    const today = new Date().toISOString().split('T')[0];

    const [selectedDate, setSelectedDate] = useState<string>(today);
    const [amount, setAmount] = useState('');
    const [purchasedBy, setPurchasedBy] = useState<'Combined' | 'Tina' | 'Jason'>('Combined');
    const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<number | null>(null);
    const [notes, setNotes] = useState('');

    useEffect(() => {
        setSelectedSubCategoryId(null)
    }, [selectedCategoryId]);

    useEffect(() => {
        setSelectedCategoryId(null);
        setSelectedSubCategoryId(null)
    }, [selectedGroupId]);  

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!selectedGroupId) return;

        const transaction = {
            createdDate: new Date().toISOString(), 
            date: selectedDate, 
            amount: Number(amount),
            purchasedBy, 
            groupId: selectedGroupId,
            categoryId: selectedCategoryId ? selectedCategoryId : undefined,
            subCategoryId: selectedSubCategoryId ? selectedSubCategoryId : undefined,
            notes: notes || undefined
        };

        const res = await fetch('/api/transactions', {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(transaction)
        });

        if(!res.ok) {
            console.error('Failed to save transaction');
            return;
        }

        // save returned transaction and add it to the transactions list in memory        
        const savedTransaction = await res.json();
        addTransaction(savedTransaction.transaction);

        // reset form fields
        setSelectedDate(today);
        setAmount('');
        setPurchasedBy('Combined');
        setSelectedGroupId(null);
        setSelectedCategoryId(null);
        setSelectedSubCategoryId(null);
        setNotes('');        
    }
      
  return (
    <div className="card-wrapper">
        <form className="form expense-form" onSubmit={handleSubmit}>
            <div className="form-group-wrapper">
                {/* date */}
                <div className="form-group third-width">
                    <label htmlFor="date">Date</label>
                    <input 
                        required
                        type="date" 
                        id="date" 
                        name="date"
                        value={selectedDate}
                        onChange={e => setSelectedDate(e.target.value)}    
                    />
                </div>                

                {/* amount */}
                <div className="form-group third-width">
                    <label htmlFor="amount">Amount ($)</label>
                    <input
                        required
                        type="number"
                        id="amount"
                        name="amount"
                        step="0.01"
                        placeholder="0.00"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                    />
                </div>     

                {/* purchased by */}
                <div className="form-group third-width">
                    <label htmlFor="who">Purchased by:</label>
                    <select
                        required 
                        id="who" 
                        name="who"
                        value={purchasedBy}
                        onChange={e => setPurchasedBy(e.target.value as any)}
                    >
                        <option value="Combined">Combined</option>
                        <option value="Tina">Tina</option>
                        <option value="Jason">Jason</option>
                    </select>
                </div>                            
            </div>

            <div className="form-group-wrapper">
            
                {/* expense type */}
                <div className="form-group third-width">
                    <label htmlFor="group">Expense type</label>
                    <select 
                        id="group" 
                        name="group" 
                        value={selectedGroupId ?? ''} 
                        onChange={e => setSelectedGroupId(Number(e.target.value))}
                        required
                    >
                    <option value="" disabled>Select Expense Type</option>
                    {
                        groups ? (
                            groups.map(group => (
                                <option value={group.id} key={group.id}>{group.name}</option>
                            ))
                        ) : (
                            <option value="">No Expense Types</option>
                        )
                    }                
                    </select>
                </div>   

                {/* category */}
                <div className="form-group third-width">
                    <label htmlFor="category">Category</label>
                    <select                         
                        id="category" 
                        name="category"
                        value={selectedCategoryId ?? ''} 
                        onChange={sc => (setSelectedCategoryId(Number(sc.target.value)))}                            
                    >
                        <option value="" disabled>Select category</option>
                        {
                            groups.find(g => g.id === selectedGroupId)?.categories ? (
                                groups.find(g => g.id === selectedGroupId)?.categories.map(cat => (
                                    <option value={cat.id} key={cat.id}>{cat.name}</option>
                                ))
                            ) : (
                                <option>No categories</option>
                            )
                        }
                    </select>
                </div>       

                { /* sub category */ }
                <div className="form-group third-width">
                    <label htmlFor="sub-category">Sub Category</label>
                    <select                     
                        id="sub-category" 
                        name="sub-category" 
                        value={selectedSubCategoryId ?? ''}
                        onChange={ssc => setSelectedSubCategoryId(Number(ssc.target.value))}
                    >
                        <option value="" disabled>Select category</option>
                        {   
                            groups.find(g => g.id === selectedGroupId)?.categories.find(c => c.id === selectedCategoryId)?.subCategories ? (
                                groups.find(g => g.id === selectedGroupId)?.categories.find(c => c.id === selectedCategoryId)?.subCategories.map(sc => (
                                    <option value={sc.id} key={sc.id}>{sc.name}</option>
                                ))
                            ) : (
                                <option>No sub categories</option>
                            )
                        }
                    </select>
                </div>                     
                
            </div>                               

            {/* notes (optional) */}
            <div className="form-group">
                <label htmlFor="notes">Notes (optional)</label>
                <textarea
                    id="notes"
                    name="notes"
                    placeholder="Add a note about this expense..."
                    rows={3}
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                ></textarea>
            </div>

            {/* Submit */}
            <button type="submit" className="submit-btn">
                Add Expense
            </button>
        </form>            
    </div>                           
  );
}
