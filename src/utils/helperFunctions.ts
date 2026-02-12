export function formatCurrency(
  value: number,
  locale: string = 'en-AU',
  currency: string = 'AUD'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value)
}

export function getPercentage(
  fixedCosts: number,
  income: number
): number {
  if (income === 0) return 0

  return (fixedCosts / income) * 100
}

export function isDateBetween(
  date: string,
  startDate: string,
  endDate: string
 ) {
  const toDateOnly = (date: string) => new Date(date + "T00:00:00").getTime();

  const target = toDateOnly(date);
  const start = toDateOnly(startDate);
  const end = toDateOnly(endDate);

  return target >= start && target <= end
}

export function getCurrentDate() {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() // 0 = Jan, 6 = July
  
  return {
    year,
    month
  }
}

export function getFinancialYearRange(selectedYear?: number) {
  // current financial year - default
  const { year, month } = getCurrentDate();

  const startYear = month >= 6 ? year : year - 1

  let startDate = new Date(startYear, 6, 1)   // July 1
  let endDate = new Date(startYear + 1, 5, 30) // June 30        

  // selected financial year
  if(selectedYear) {
    startDate = new Date(selectedYear, 6, 1)   
    endDate = new Date((selectedYear + 1) + 1, 5, 30) 
  }

  return {
    startDate,
    endDate
  }
}

export function isInCurrentMonth(date: string) {
  const now = new Date()
  const d = new Date(date)

  return (
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear()
  )
}


export function toISODate(date: Date) {
    return date.toISOString().split("T")[0]  
}

export const namesOfMonths = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December"
]

export function getCurrentMonth() {
  const now = new Date()
  const month = now.getMonth() 
    
  return month
}
