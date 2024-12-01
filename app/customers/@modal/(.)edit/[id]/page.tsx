// import CustomerForm from "@/app/users/edit/[id]/UserForm"
import CustomerForm from "@/app/customers/edit/[id]/CustomerForm";
import { Modal } from "@/components/Modal";
import { getCustomer } from "@/lib/useCustomer";

type Props = {
  params: {
    id: string;
  };
};

export default async function EditCustomer({ params }: Props) {
  const { id } = params;

  const customer = await getCustomer(id);

  if (!customer?.id) {
    return (
      <Modal title="Not found" description="No Customer Found for that ID">
        <div className="p-8 max-w-md space-y-2">
          {/* <h1 className="text-2xl">No Customer Found for that ID.</h1> */}
        </div>
      </Modal>
    );
  }

  return (
    <Modal title="Update customer" description="Update customer as needed.">
      <div className="p-8 max-w-md space-y-2">
        <CustomerForm customer={customer} />
      </div>
    </Modal>
  );
}
