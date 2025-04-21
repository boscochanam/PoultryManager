import { BarGraph } from '@/components/finance/finance-data/BarGraph';
import { FinanceData } from '@/types/FinanceData';

interface FinanceDashboardProps {
    graphData: FinanceData[];
}

export default function FinanceDashboard({graphData}: FinanceDashboardProps) {
    

    return (
        <div className='flex flex-col gap-4 relative z-0'>
            <BarGraph 
                graphData={graphData}
                xKey="date"
                yKeys={["income", "expenses"]}
                labels={{ income: "Total Income", expenses: "Total Expenses" }}
                title="Revenue Metrics"
                description="Income vs Expenses Over Time"
                height={300}
                dateFormat={{ month: "long", day: "numeric" }}
                tooltipWidth={200}
            />
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
        </div>
    );
}