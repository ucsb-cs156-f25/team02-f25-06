import React from "react";
import OurTable, { ButtonColumn } from "main/components/OurTable";

import { useBackendMutation } from "main/utils/useBackend";
import {
  cellToAxiosParamsDelete,
  onDeleteSuccess,
} from "main/utils/articlesUtils";
import { useNavigate } from "react-router"; // move between pages on the website
import { hasRole } from "main/utils/useCurrentUser"; // admin or not

export default function ArticlesTable({
  articles,
  currentUser,
  testIdPrefix = "ArticlesTable",
}) {
  const navigate = useNavigate();

  const editCallback = (cell) => {
    navigate(`/articles/edit/${cell.row.original.id}`);
  }; // this is what happens when you click the edit button

  // Stryker disable all : hard to test for query caching

  const deleteMutation = useBackendMutation(
    cellToAxiosParamsDelete,
    { onSuccess: onDeleteSuccess },
    ["/api/articles/all"], // when something is deleted, we refresh the data
  );
  // Stryker restore all

  // Stryker disable next-line all : TODO try to make a good test for this
  const deleteCallback = async (cell) => {
    deleteMutation.mutate(cell);
  }; // call delete on the cell

  const columns = [
    {
      header: "id",
      accessorKey: "id", // accessor is the "key" in the data
    },

    {
      header: "Title",
      accessorKey: "title",
    },
    {
      header: "URL",
      accessorKey: "url",
    },
    {
      header: "Explanation",
      accessorKey: "explanation",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Date Added",
      accessorKey: "dateAdded",
    },
  ];

  if (hasRole(currentUser, "ROLE_ADMIN")) {
    columns.push(ButtonColumn("Edit", "primary", editCallback, testIdPrefix));
    columns.push(
      ButtonColumn("Delete", "danger", deleteCallback, testIdPrefix),
    );
  }

  return <OurTable data={articles} columns={columns} testid={testIdPrefix} />;
}
