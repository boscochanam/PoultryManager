import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import cardGenerator from "./finance-data/getFinanceData";



export default function FinanceDashboard() {
    return (
        <div>
            {cardGenerator()}
        </div>
    );
}