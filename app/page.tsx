import Hero from "./components/Hero";
import EquipmentSection from "./components/EquipmentSection";
import TestimonialsSection from "./components/ui/TestimonialsSection";
import EquipmentList from "./components/EquipmentList";

export default function Home() {
  return (
    <main>
      <Hero delay={6} />
      <EquipmentSection />
      <EquipmentList />
      <TestimonialsSection />
    </main>
  );
}