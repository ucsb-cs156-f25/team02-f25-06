import React from "react";
import OurTable from "main/components/OurTable";

import { useBackendMutation } from "main/utils/useBackend";
import { cellToAxiosParamsDelete, onDeleteSuccess } from "main/utils/helpRequestUtils";
import { useNavigate } from "react-router";
import { hasRole } from "main/utils/useCurrentUser";

export default function HelpRequestTable({
    helpRequests,
    currentUser,
    testIdPrefix = "HelpRequestTable",
}) {
    const navigate = useNavigate();
    const editCallback = (cell) => {
        navigate(`/helprequests/edit/${cell.row.original.id}`);
    };

    // Stryker disable all
    const deleteMutation = useBackendMutation(
        cellToAxiosParamsDelete,
        { onSuccess: onDeleteSuccess },
        ["/api/helprequests/all"],
    );
    // Stryker restore all

    // Stryker disable next-line all
    const deleteCallback = async (cell) => {
        deleteMutation.mutate(cell);
    };

    const columns = [
        { header: "Id", accessorKey: "id" },
        { header: "RequesterEmail", accessorKey: "requesterEmail" },
        { header: "TeamId", accessorKey: "teamId" },
        { header: "TableOrBreakoutRoom", accessorKey: "tableOrBreakoutRoom" },
        { header: "RequestTime", accessorKey: "requestTime" },
        { header: "Explanation", accessorKey: "explanation" },
        { header: "Solved", accessorKey: "solved", cell: ({ getValue }) => String(getValue()) },
    ];

    if (hasRole(currentUser, "ROLE_ADMIN")) {
        columns.push(ButtonColumn("Edit", "primary", editCallback, testIdPrefix));
        columns.push(ButtonColumn("Delete", "danger", deleteCallback, testIdPrefix));
    }

    return (
        <OurTable
            data={helpRequests || []}
            columns={columns}
            testid="HelpRequestTable"
        />
    );
}
