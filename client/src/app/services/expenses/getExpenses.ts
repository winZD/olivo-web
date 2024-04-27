import axios from "axios";

export async function getExpenses() {
  try {
    const response = await axios.get("http://localhost:1337/api/expenses", {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsImlhdCI6MTcxMzM2NDg4OCwiZXhwIjoxNzE1OTU2ODg4fQ.U0tjEKLL6sjPGXtxe1PzQKmnIM0R2L1IEl9tT7Ik1l4`,
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
}
