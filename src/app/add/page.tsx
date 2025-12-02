import Header from "@/components/Header";

export const Metadata = {
  title: "Add Expense",
  description: "Complete form to add expense to transaction list"
}

export default function Add() {
    return (
        <div className="page-wrapper">
            <Header title="Add Expense" />
            <div className="content-wrapper">
                <div className="card-wrapper half-width">
                    <form className="form expense-form">

                        {/* date */}
                        <div className="form-group half-width">
                            <label htmlFor="date">Date</label>
                            <input type="date" id="date" name="date" required />
                        </div>                

                        {/* amount */}
                        <div className="form-group half-width">
                            <label htmlFor="amount">Amount ($)</label>
                            <input
                                type="number"
                                id="amount"
                                name="amount"
                                step="0.01"
                                placeholder="0.00"
                                required
                            />
                        </div>         

                        {/* expense type */}
                        <div className="form-group">
                            <label htmlFor="category">Expense type</label>
                            <select id="type" name="type" required>
                            <option value="">Select Expense Type</option>
                            <option value="personal">Personal</option>
                            <option value="business">Business</option>
                            <option value="properties">Properties</option>
                            </select>
                        </div>   

                        {/* sub category */}
                        <div className="form-group">
                            <label htmlFor="sub-category">Sub Category</label>
                            <select id="category" name="category" required>
                            <option value="">Select category</option>
                            <option value="food">Food</option>
                            <option value="transport">Transport</option>
                            <option value="shopping">Shopping</option>
                            <option value="bills">Bills</option>
                            <option value="medical">Medical</option>
                            <option value="entertainment">Entertainment</option>
                            <option value="other">Other</option>
                            </select>
                        </div>                       

                        {/* purchased by */}
                        <div className="form-group">
                            <label htmlFor="who">Purchased by:</label>
                            <select id="who" name="who" required>
                                <option value="Combined">Combined</option>
                                <option value="Tina">Tina</option>
                                <option value="Jason">Jason</option>
                            </select>
                        </div>                                 

                        {/* notes (optional) */}
                        <div className="form-group">
                            <label htmlFor="notes">Notes (optional)</label>
                            <textarea
                            id="notes"
                            name="notes"
                            placeholder="Add a note about this expense..."
                            rows={3}
                            ></textarea>
                        </div>

                        {/* Submit */}
                        <button type="submit" className="submit-btn">
                            Add Expense
                        </button>
                    </form>            
                </div>                                       
            </div>
        </div>        
    )
}