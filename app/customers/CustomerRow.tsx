"use client";
import { TableCell, TableRow } from "@/components/ui/table";
import { Customer } from "@/lib/schemas";
import Link from "next/link";

type Props = {
  customer: Customer;
};

export default function UserRow({ customer }: Props) {
  // const router = useRouter();

  // const handleClick = () => {
  //   router.push(`/customers/edit/${customer.id}`);
  // };

  return (
    <TableRow>
      <TableCell>{customer.id}</TableCell>
      <TableCell>{customer.name}</TableCell>
      <TableCell>
        <Link
          className="card"
          key={customer.id}
          href={`/customers/edit/${customer.id}`}
          // passHref
        >
          {customer.id}
        </Link>
      </TableCell>
    </TableRow>
  );
}
