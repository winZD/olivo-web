"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import { ExpensesData } from "@/app/models/expense";
import { useRouter } from "next/navigation";

const ExpensesTable = (expenses: ExpensesData) => {
  const router = useRouter();

  const columns = [
    { key: "attributes.orchard.data.id", label: "ID" },
    { key: "property_size", label: "Property Size" },
    { key: "fertilization", label: "Fertilization" },
    { key: "crop", label: "Crop" },
  ];

  return (
    <>
      {
        <Table isStriped aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>Location</TableColumn>
            <TableColumn>Fertilization</TableColumn>
          </TableHeader>
          <TableBody>
            {expenses?.data?.map((n, index) => (
              <TableRow
                key={n.id}
                onClick={() =>
                  router.push(
                    `dashboard/orchards/${n.attributes.orchard.data.id}`
                  )
                }
              >
                <TableCell>
                  {n.attributes.orchard.data.attributes.location}
                </TableCell>
                <TableCell>{n.attributes.fertilization}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      }

      {/*  <Table aria-label="Example table with dynamic content">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={expenses.data}>
          {(item) => (
            <TableRow
              key={item.id}
              onClick={() =>
                router.push(
                  `dashboard/orchard/${item.attributes.orchard.data.id}`
                )
              }
            >
              {(columnKey) => (
                <TableCell>{getKeyValue(item.attributes, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table> */}
    </>
  );
};

export default ExpensesTable;
