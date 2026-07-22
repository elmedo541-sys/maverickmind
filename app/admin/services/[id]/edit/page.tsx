import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ServiceForm from "../../ServiceForm";
import { updateService } from "../../actions";

export default async function EditServicePage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (Number.isNaN(id)) notFound();

  const service = await prisma.service.findUnique({ where: { id } });
  if (!service) notFound();

  const boundUpdate = updateService.bind(null, id);

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy mb-8">Edit Service</h1>
      <ServiceForm
        action={boundUpdate}
        mode="edit"
        defaultValues={{
          serviceName: service.serviceName,
          description: service.description,
          image: service.image,
        }}
      />
    </div>
  );
}
