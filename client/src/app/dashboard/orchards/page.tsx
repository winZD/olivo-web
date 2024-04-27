"use client";

import { Orchard } from "@/app/models/orchard";
import {
  MagnifyingGlassCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
} from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";

import { useEffect, useState } from "react";

const OrchardsPage = () => {
  const [data, setData] = useState<{ data: Orchard[] }>();
  const [searchQuery, setSearchQuery] = useState("");
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchOrchards = async () => {
      /*  const session=await getSession() */
      if (session) {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/orchards?populate=expenses,harvests`,
            {
              headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsImlhdCI6MTcxMzM2NDg4OCwiZXhwIjoxNzE1OTU2ODg4fQ.U0tjEKLL6sjPGXtxe1PzQKmnIM0R2L1IEl9tT7Ik1l4`,
              },
            }
          );

          // Use the data from the response here
          setData(response.data);

          return response.data;
        } catch (error) {
          // Handle errors here
          console.error(error);
          return error;
        }
      }
    };
    if (status !== "loading") {
      fetchOrchards();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  const filteredData = data?.data.filter(
    (n) =>
      n.attributes.olive_trees
        .toString()
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      n.attributes.percentage_of_oil.toString().includes(searchQuery) ||
      n.attributes.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div>
        <h1>Orchards</h1>
        <Input
          label="Search by any field"
          startContent={<MagnifyingGlassIcon className="w-4" />}
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search..."
        />
      </div>
      {filteredData && filteredData.length ? (
        <Table isStriped aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>Olives</TableColumn>
            <TableColumn>Oil percentage</TableColumn>
            <TableColumn>Location</TableColumn>
          </TableHeader>
          <TableBody>
            {filteredData.map((n) => (
              <TableRow key={n.id}>
                <TableCell>{n.attributes.olive_trees}</TableCell>
                <TableCell>{n.attributes.percentage_of_oil + "%"}</TableCell>
                <TableCell>{n.attributes.location}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div>No data found.</div>
      )}
    </>
  );
};

export default OrchardsPage;
