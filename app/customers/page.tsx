import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import CustomerRow from "./CustomerRow";

export default async function CustomersPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/");
  }

  const customers = await prisma.customer.findMany();

  return (
    <div className="p-8 container">
      <h1 className="text-2xl">Users List</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>id</TableHead>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <CustomerRow key={customer.id} customer={customer} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
