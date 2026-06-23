import type { Metadata } from "next";
import Nav from "@/components/Nav";
import MenuView from "@/components/MenuView";

export const metadata: Metadata = {
  title: "Menu | Aptitude Cafe & Eatery",
  description: "Specialty coffee and an all-day kitchen at the Louvre Abu Dhabi Park, Saadiyat Island.",
};

export default function MenuPage() {
  return (
    <main>
      <Nav solid />
      <MenuView />
    </main>
  );
}
