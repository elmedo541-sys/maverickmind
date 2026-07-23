import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import SlideForm from "../../SlideForm";
import { updateSlide } from "../../actions";

export default async function EditSlidePage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (Number.isNaN(id)) notFound();

  const slide = await prisma.slide.findUnique({ where: { id } });
  if (!slide) notFound();

  const boundUpdate = updateSlide.bind(null, id);

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy mb-8">Edit Slide</h1>
      <SlideForm
        action={boundUpdate}
        mode="edit"
        defaultValues={{
          title: slide.title,
          subtitle: slide.subtitle ?? undefined,
          linkUrl: slide.linkUrl ?? undefined,
          linkLabel: slide.linkLabel ?? undefined,
          active: slide.active,
          image: slide.image,
        }}
      />
    </div>
  );
}