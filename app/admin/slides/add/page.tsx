import SlideForm from "../SlideForm";
import { createSlide } from "../actions";

export default function AddSlidePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-navy mb-8">Add Slide</h1>
      <SlideForm action={createSlide} mode="create" />
    </div>
  );
}