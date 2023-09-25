
import { formatDate, formatTime } from "@/helpers/date";
import { ColumnDef } from "@tanstack/react-table";


export const columnDefMapper: { [key: string]: ColumnDef<any, any>[] } = {
    "users": [
        { accessorKey: "id", header: "ID" },
        { accessorKey: "name", header: "Name" },
        { accessorKey: "email", header: "Email" }

    ]
}