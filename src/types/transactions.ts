export type TransactionsData = {
    transactions: Transaction[];
}

export type Transaction = {
    id: number; 
    createdDate: ISODateString;
    date: ISODateString; 
    amount: number; // negative allowed
    purchasedBy: string;
    groupId: number;
    categoryId?: number;
    subCategoryId?: number;
    notes?: string;
}

type ISODateString = string;
