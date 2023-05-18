import { format } from "date-fns";
import { ColumnFilter } from "./ColumnFilter";
export const COLUMNS = [
  {
    Header: "Id",
    Footer: "Id",
    accessor: "id",
    Filter: ColumnFilter,
    //disableFilters: true,
  },
  {
    Header: "Admin",
    Footer: "Admin",
    accessor: "first_name",
    Filter: ColumnFilter,
  },
  {
    Header: "OLM",
    Footer: "OLM",
    accessor: "last_name",
    Filter: ColumnFilter,
  },
  {
    Header: "Email Id",
    Footer: "Email Id",
    accessor: "email",
    Filter: ColumnFilter,
  },
  {
    Header: "Téléphone",
    Footer: "Téléphone",
    accessor: "phone",
    Filter: ColumnFilter,
  },
];

export const GROUPED_COLUMNS = [
  {
    Header: "Id",
    Footer: "Id",
    accessor: "id",
  },
  {
    Header: "Name",
    Footer: "Name",
    columns: [
      {
        Header: "Admin",
        Footer: "Admin",
        accessor: "Nom et prénom",
      },
      {
        Header: "Last Name",
        Footer: "Last Name",
        accessor: "last_name",
      },
    ],
  },
  {
    Header: "Info",
    Footer: "Info",
    columns: [
      {
        Header: "Date of  Birth",
        Footer: "Date of  Birth",
        accessor: "date_of_birth",
      },
      {
        Header: "Country",
        Footer: "Country",
        accessor: "country",
      },
      {
        Header: "Phone",
        Footer: "Phone",
        accessor: "phone",
      },
    ],
  },
];
