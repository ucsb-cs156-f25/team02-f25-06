import { toast } from "react-toastify";

export function onDeleteSuccess(message) {
  console.log(message);
  toast(message);
} // when something is deleted this puts up a box confirming it was deleted for testing purposes

export function cellToAxiosParamsDelete(cell) {
  return {
    url: "/api/articles",
    method: "DELETE",
    params: {
      id: cell.row.original.id,
    },
  };
} // axios lets out frontend talk to the backend, so we dont have to use swagger
