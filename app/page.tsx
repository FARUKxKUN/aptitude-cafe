import Nav      from "@/components/Nav";
import Hero     from "@/components/Hero";
import Identity from "@/components/Identity";
import Marquee  from "@/components/Marquee";
import Origins  from "@/components/Origins";
import MenuCTA  from "@/components/MenuCTA";
import Visit    from "@/components/Visit";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Identity />
      <Marquee />
      <Origins />
      <MenuCTA />
      <Visit />
    </main>
  );
}
