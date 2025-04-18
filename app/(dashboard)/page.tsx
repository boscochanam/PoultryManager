import FinanceDashboard from '@/components/finance/FinanceDashboard';

export default async function ProductsPage() {
  const response = await fetch('http://localhost:3000/api/finance');
  const financeData = await response.json();
  
  return (
    <FinanceDashboard graphData={financeData}/>
  );
}
