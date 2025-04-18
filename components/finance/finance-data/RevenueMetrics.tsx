import { Table, TableHeader, TableRow, TableHead, TableBody } from "@/components/ui/table";

export default function RevenueMetrics() {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Date</TableHead>
                    <TableHead className="w-[100px]">Revenue</TableHead>
                    <TableHead className="w-[100px]">Expenses</TableHead>
                    <TableHead className="w-[100px]">Profit</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {/* Add your data rows here */}
            </TableBody>
        </Table>
    )
}