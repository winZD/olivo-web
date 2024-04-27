"use client";

import axios from "axios";

import {
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

const HarvestPage = () => {
  const [havestData, setHarvestData] = useState<{
    data: [{ id: number; attributes: Harvest }];
  }>();

  const { data: session, status } = useSession();

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

  /* useEffect(() => {
    const fetchData = async () => {
      const session = await getSession();
      if (session) {
        // Fetch data or send JWT to Strapi here
      }
    };

    if (!loading) {
      fetchData();
    }
  }, [loading]) */

  return (
    <>
      <div>
        {" "}
        <span>Harvests</span>
      </div>

      {havestData ? (
        <Table isStriped aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>Date of harvest</TableColumn>
            <TableColumn>Harvest amount</TableColumn>
          </TableHeader>
          <TableBody>
            {havestData?.data.map((n) => (
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
