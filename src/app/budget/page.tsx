import Header from "@/components/Header";
import type { GroupsData, Category } from "@/types/groups";
import { formatCurrency, getPercentage } from "@/utils/helperFunctions";


export const Metadata = {
  title: 'CSP amount',
  description: 'Networth and monthly amount',
};

export default async function amount() {

  const response = await fetch('http://localhost:3000/api/groups');
  const fetchedData: { data: GroupsData} = await response.json();

  // networth
  const networthGroupData: Category[] = fetchedData.data.groups.find((g) => g.id === 6)?.categories ?? [];
  const networthTotal = networthGroupData.reduce((total, category) => total + (category.amount ?? 0), 0);  

  // income
  const incomeGroupData: Category[] = fetchedData.data.groups.find((g) => g.id === 7)?.categories ?? [];
  const incomeTotal = incomeGroupData.reduce((total, category) => total + (category.amount ?? 0), 0);  

  // fixed costs
  const fixedCostsGroupData: Category[] = fetchedData.data.groups.find((g) => g.id === 1)?.categories ?? [];
  const fixedCostTotal = fixedCostsGroupData.reduce((total, category) => total + (category.amount ?? 0), 0);

  // guilt free spend
  const guiltFreeSpendGroupData: Category[] = fetchedData.data.groups.find((g) => g.id === 2)?.categories ?? [];
  const guiltFreeSpendCostTotal = guiltFreeSpendGroupData.reduce((total, category) => total + (category.amount ?? 0), 0);  

  // investments & savings
  const investmentsSavingsGroupData: Category[] = fetchedData.data.groups.find((g) => g.id === 3)?.categories ?? [];
  const investmentsSavingsCostTotal = investmentsSavingsGroupData.reduce((total, category) => total + (category.amount ?? 0), 0);  

  return (
    <div className="page-wrapper">
      <Header title="CSP amount" subtitle="Networth and monthly amount" />
      <div className="content-wrapper">

        <div className="card-wrapper">
          {
            fetchedData ? (
              <div className="csp-amount-table table-content">            
                {                
                  /* networth */      
                  networthGroupData ? (
                    <>
                      <div className="group-header hr-row">
                        <div className="group-title t-col">Networth:</div>
                        <div className="date-title s-col"></div>
                      </div>                      
                      {
                        networthGroupData.map(category => (
                          <div className="row" key={category.id}>
                            <div className="t-col">{category.name}</div>
                            <div className="s-col">{formatCurrency(category.amount ?? 0)}</div>        
                          </div> 
                        ))
                      }
                      <div className="footer-row">
                        <div className="t-col">Total:</div>
                        <div className="s-col">{formatCurrency(networthTotal)}</div>        
                      </div>                          
                    </>
                  ) : (
                    <p>No fixed costs</p>
                  )                     
                }                                          

                {
                  /* income */       
                  incomeGroupData ? (
                    <>
                      <div className="group-header hr-row">
                        <div className="group-title t-col">Net income:</div>
                        <div className="date-title s-col"></div>
                      </div>                      
                      {
                        incomeGroupData.map(category => (
                          <div className="row" key={category.id}>
                            <div className="t-col">{category.name}</div>
                            <div className="s-col">{formatCurrency(category.amount ?? 0)}</div>        
                          </div> 
                        ))
                      }
                      <div className="footer-row">
                        <div className="t-col">Total:</div>
                        <div className="s-col">{formatCurrency(incomeTotal)}</div>        
                      </div>                          
                    </>
                  ) : (
                    <p>No income</p>
                  )                   
                }       
                       
                {     
                  /* fixed costs */            
                  fixedCostsGroupData ? (
                    <>
                      <div className="group-header hr-row">
                        <div className="group-title t-col">Fixed costs:</div>
                        <div className="date-title s-col">{getPercentage(fixedCostTotal, incomeTotal).toFixed(1)}%</div>
                      </div>                      
                      {
                        fixedCostsGroupData.map(category => (
                          <div className="row" key={category.id}>
                            <div className="t-col">{category.name}</div>
                            <div className="s-col">{formatCurrency(category.amount ?? 0)}</div>        
                          </div> 
                        ))
                      }
                      <div className="footer-row">
                        <div className="t-col">Total:</div>
                        <div className="s-col">{formatCurrency(fixedCostTotal)}</div>        
                      </div>                          
                    </>
                  ) : (
                    <p>No fixed costs</p>
                  )                                     
                }    

                {
                  /* guilt free spend */
                  guiltFreeSpendGroupData ? (
                    <>
                      <div className="group-header hr-row">
                        <div className="group-title t-col">Guilt Free Spend:</div>
                        <div className="date-title s-col">{getPercentage(guiltFreeSpendCostTotal, incomeTotal).toFixed(1)}%</div>
                      </div>                      
                      {
                        guiltFreeSpendGroupData.map(category => (
                          <div className="row" key={category.id}>
                            <div className="t-col">{category.name}</div>
                            <div className="s-col">{formatCurrency(category.amount ?? 0)}</div>        
                          </div> 
                        ))
                      }
                      <div className="footer-row">
                        <div className="t-col">Total:</div>
                        <div className="s-col">{formatCurrency(guiltFreeSpendCostTotal)}</div>        
                      </div>                          
                    </>
                  ) : (
                    <p>No Guilt Free Spend</p>
                  )                   
                }               
 
                {
                  /* investments & savings */
                  investmentsSavingsGroupData ? (
                    <>
                      <div className="group-header hr-row">
                        <div className="group-title t-col">Investments & Savings:</div>
                        <div className="date-title s-col">{getPercentage(investmentsSavingsCostTotal, incomeTotal).toFixed(1)}%</div>
                      </div>                      
                      {
                        investmentsSavingsGroupData.map(category => (
                          <div className="row" key={category.id}>
                            <div className="t-col">{category.name}</div>
                            <div className="s-col align-right">{formatCurrency(category.amount ?? 0)}</div>        
                          </div> 
                        ))
                      }
                      <div className="footer-row">
                        <div className="t-col">Total:</div>
                        <div className="s-col">{formatCurrency(investmentsSavingsCostTotal)}</div>        
                      </div>                          
                    </>
                  ) : (
                    <p>No Investments & Savings</p>
                  )                    
                }                                                                                                                                                                                                                                
              </div>          
            ) : (
              <p>no amount</p>
            )
          }                                       
        </div>  
      </div>
    </div>
  );
}
