"use client";

import {
  Badge,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  Image,
  Input,
  Link,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import axios from "axios";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import PieChart from "@/app/components/charts/PieChart";
import { Orchard } from "@/app/models/orchard";
Chart.register(CategoryScale);

const OrchardPage = ({ params }: { params: { id: string } }) => {
  const [data, setData] = useState<{ data: Orchard } | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/orchards/${params.id}?populate=expenses,harvests`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsImlhdCI6MTcxMzM2NDg4OCwiZXhwIjoxNzE1OTU2ODg4fQ.U0tjEKLL6sjPGXtxe1PzQKmnIM0R2L1IEl9tT7Ik1l4`,
            },
          }
        );

        // Use the data from the response here

        setData(response.data);
      } catch (error) {
        // Handle errors here
        console.error(error);
      }
    };

    if (params.id) {
      console.log(params.id);
      fetchData();
    }

    // This is the cleanup function (return a function or undefined)
    return () => {
      // Cleanup logic (if needed)
    };
  }, [params.id]);
  console.log(data);

  const d = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "Harvests",
        data: data?.data.attributes?.harvests?.data.map(
          (data) => data?.attributes.harvest_amount
        ),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const [chartData, setChartData] = useState({
    labels: data?.data.attributes?.harvests?.data.map((data) =>
      console.log(data.attributes.harvest_amount)
    ),
    datasets: [
      {
        label: "Harvests ",
        data: data?.data.attributes?.harvests?.data.map(
          (data) => data?.attributes.harvest_amount
        ),
        backgroundColor: [
          "rgba(75,192,192,1)",

          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
      },
    ],
  });

  return (
    <>
      <h1>Troškovi po zemljištu</h1>
      <Card className="max-w-[400px]">
        <CardHeader className="flex gap-3">
          <Image
            alt="nextui logo"
            height={40}
            radius="sm"
            src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
            width={40}
          />
          <div className="flex flex-col">
            <p className="text-md">OLIVO</p>
            <p className="text-small text-default-500">nextui.org</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody style={{ rowGap: "1rem" }}>
          <Input label="Location" value={data?.data.attributes?.location} />
          <Input label="Harvest date" value={"No data available"} />
          <Input
            label="Olive trees number"
            value={data?.data.attributes?.olive_trees.toString() || ""}
          />
          <Input
            label="Size"
            value={data?.data.attributes?.size.toString() + " m2" || ""}
          />
          <Input
            label="Percentage of oil"
            value={
              data?.data.attributes?.percentage_of_oil.toString() + "%" || ""
            }
          />
        </CardBody>
        <Divider />
        <CardFooter>
          <Link
            isExternal
            showAnchorIcon
            href="https://github.com/nextui-org/nextui"
          >
            Visit source code on GitHub.
          </Link>
        </CardFooter>
      </Card>
      {data?.data.attributes?.expenses?.data.length && (
        <PieChart chartData={d} />
      )}
      <>
        <Chip color="primary">Overview expenses by year for orchard</Chip>
        {data?.data.attributes?.expenses?.data.length && (
          <Table isStriped aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>Created at</TableColumn>
              <TableColumn>Fertilization</TableColumn>
            </TableHeader>
            <TableBody>
              {data?.data.attributes.expenses.data.map((n, index) => (
                <TableRow key={n.id}>
                  <TableCell>{n.attributes.createdAt}</TableCell>
                  <TableCell>{n.attributes.fertilization}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        <Chip color="secondary">Overview harvests by year for orchard</Chip>
        {data?.data.attributes?.harvests?.data.length && (
          <Table isStriped aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>Created at</TableColumn>
              <TableColumn>Date of harvest</TableColumn>
              <TableColumn>Harvest amount</TableColumn>
              <TableColumn>Note</TableColumn>
            </TableHeader>
            <TableBody>
              {data?.data.attributes?.harvests?.data.map((n, index) => (
                <TableRow key={n.id}>
                  <TableCell>
                    {new Date(n.attributes.createdAt).toDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(n.attributes.date_of_harvest).toDateString()}
                  </TableCell>
                  <TableCell>{n.attributes.harvest_amount}</TableCell>
                  <TableCell>{n.attributes.note}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </>
    </>
  );
};

export default OrchardPage;
