export type NetworthData = {
    networth: Networth[];
}

export type Networth = {
    id: number; 
    name: string; 
    createdDate: ISODateString;
    financialYear: number;
    items: Item[];
}

export type Item = {
    id: number;
    name: string; 
    amount?: number; 
}

type ISODateString = string;