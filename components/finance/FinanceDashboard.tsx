import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import cardGenerator from "@/components/finance/finance-data/getFinanceData";
import { BarGraph } from '@/components/finance/finance-data/BarGraph';
import { FinanceData } from '@/types/FinanceData';

interface FinanceDashboardProps {
    graphData: FinanceData[];
}

export default function FinanceDashboard({graphData}: FinanceDashboardProps) {
    

    return (
        <div>
            <BarGraph 
                graphData={graphData}
                xKey="date"
                yKeys={["income", "expenses"]}
                labels={{ income: "Total Income", expenses: "Total Expenses" }}
                title="Financial Overview"
                description="Income vs Expenses Over Time"
                height={300}
                dateFormat={{ month: "long", day: "numeric" }}
                tooltipWidth={200}
            />
            {cardGenerator()}
        </div>
    );
}