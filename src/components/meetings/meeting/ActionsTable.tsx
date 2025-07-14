import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Action } from "@/types/meeting"

interface ActionsTableProps {
    actions: Action[];
}

const ActionsTable = ({ actions }: ActionsTableProps) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Task</TableHead>
                    <TableHead>Responsible</TableHead>
                    <TableHead>Deadline</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {actions.map((action) => (
                    <TableRow key={action.id}>
                        <TableCell>{action.task}</TableCell>
                        <TableCell>{action.responsible}</TableCell>
                        <TableCell>{action.deadline}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default ActionsTable;