import Header from "@/components/Header";
import { CSPBudgetTable } from "./CSPBudgetTable";
import { NetworthSection } from "./NetworthSection";
import type { Group } from "@/types/groups";
import type { Networth } from "@/types/networth";

export const metadata = {
  title: 'CSP Budget',
  description: 'Networth and monthly amount',
};

export default async function BudgetPage() {
  const [groupsRes, networthRes] = await Promise.all([
    fetch('http://localhost:3000/api/groups', { cache: 'no-store' }),
    fetch('http://localhost:3000/api/networth', { cache: 'no-store' })
  ]);

  const groupData: Group[] = (await groupsRes.json()).data.groups;
  const networthData: Networth[] = (await networthRes.json()).data.networth;

  return (
    <div className='page-wrapper'>
      <Header title="CSP Budget" subtitle="" />
      <div className="content-wrapper">
        <div className="card-wrapper">
            <div className="csp-budget-table table-content">  
              <NetworthSection networthData={networthData} groupData={groupData} />                                                                                                                                                                                                                                                                                                                                                                     
            </div>                                              
        </div> 
      </div>
    </div>          
  )
}
