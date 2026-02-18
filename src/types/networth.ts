export type NetworthData = {
    networth: Networth[];
}

export type Networth = {
    id: number; 
    name: string; 
    items: Item[];
}

export type Item = {
    id: number;
    name: string; 
    amount?: number; 
}
