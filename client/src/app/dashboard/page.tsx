import axios from "axios";
import { cookies } from "next/headers";

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Link from "next/link";
import ExpensesTable from "../components/tables/ExpensesTable";
import { Expenses } from "../models/expense";

export async function getExpenses(accessToken: string) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/expenses?populate=orchard`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {}
}

export default async function Page() {
  const session = await getServerSession(authOptions);
  const expenses = await getExpenses(session?.user.accessToken!);

  const user = session?.user;
  console.log("----------------->", expenses?.data);

  return (
    <>
      <p>Dashboard Page</p>
      <p>{user?.email}</p>
      {expenses?.data?.map((item: any, index: number) => (
        <div key={index}>
          <p>{item.attributes.location}</p>
          <p>{item.attributes.property_size}</p>
        </div>
      ))}
      <ExpensesTable {...expenses} />
    </>
  );
}
