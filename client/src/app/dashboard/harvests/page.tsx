"use client";

import axios from "axios";

import {
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  divider,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Harvest } from "@/app/models/harvest";
import { useSession, getSession } from "next-auth/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

const HarvestPage = () => {
  const [harvestData, setHarvestData] = useState<{
    data: [{ id: number; attributes: Harvest }];
  }>();

  const { data: session, status } = useSession();

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = harvestData?.data.filter(
    (n) =>
      n.attributes.harvest_amount
        .toString()
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      new Date(n.attributes.date_of_harvest)
        .toDateString()
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const fetchHarvests = async () => {
      try {
        /*  const session=await getSession() */
        if (session) {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/harvests`,
            {
              headers: {
                Authorization: `Bearer ${session?.user?.accessToken}`,
              },
            }
          );

          // Use the data from the response here
          setHarvestData(response.data);
          return response.data;
        }
      } catch (error) {
        // Handle errors here
        console.error(error);
        return error;
      }
    };
    if (status !== "loading") {
      fetchHarvests();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  console.log(harvestData);

  return (
    <>
      <div className="mb-4">
        {" "}
        <span>Harvests</span>
        <Input
          label="Search by any field"
          startContent={<MagnifyingGlassIcon className="w-4" />}
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search..."
        />
      </div>

      {filteredData?.length ? (
        <Table isStriped aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>Date of harvest</TableColumn>
            <TableColumn>Harvest amount</TableColumn>
          </TableHeader>
          <TableBody>
            {filteredData?.map((n) => (
              <TableRow
                key={n.id}
                /*  onClick={() =>
                  router.push(
                    `dashboard/orchard/${n.attributes.orchard.data.id}`
                  )
                } */
              >
                <TableCell>
                  {new Date(n.attributes.date_of_harvest).toDateString()}
                </TableCell>
                <TableCell>{n.attributes.harvest_amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default HarvestPage;
