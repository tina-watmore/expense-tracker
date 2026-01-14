export type GroupsData = {
    groups: Group[]
}

export type Group = {
    id: number, 
    name: string, 
    categories: Category[]
}

export type Category = {
    id: number, 
    name: string, 
    amount?: number, 
    subCategories: SubCategory[]
}

export type SubCategory = {
    id: number,
    name: string    
}