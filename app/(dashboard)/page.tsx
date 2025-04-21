import FinanceDashboard from '@/components/finance/FinanceDashboard';
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/tabs';

export default async function ProductsPage() {
  const response = await fetch('http://localhost:3000/api/finance');
  const financeData = await response.json();
  
  return (
    <Tabs defaultValue="finance">
      <TabsList className="justify-center flex">
        <TabsTrigger 
          value="finance" 
          className="w-[100px] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          Finance
        </TabsTrigger>
        <TabsTrigger 
          value="sales" 
          className="w-[100px] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          Sales
        </TabsTrigger>
        <TabsTrigger 
          value="inventory" 
          className="w-[100px] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          Inventory
        </TabsTrigger>
      </TabsList>
      <TabsContent value="finance">
        <FinanceDashboard graphData={financeData}/>
      </TabsContent>
      <TabsContent value="sales">
        <div>Sales</div>
      </TabsContent>
      <TabsContent value="inventory">
        <div>Inventory</div>
      </TabsContent>
    </Tabs>
      
  );
}
