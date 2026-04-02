import AboutSection from "@/components/home/abuout-section";
import Banner from "@/components/home/banner";
import HowWeWork from "@/components/home/how-we-work";
import StackedSlider from "@/components/home/work-slider";
import AboutMissionVision from "@/components/about/AboutMissionVision";
export const metadata = {
  title: "Bayan Run - Home",
  description: "The best agency for Web, Graphics and SEO services",
};

export default function Home() {
  return (
    <main>
      <section className="min-h-screen flex flex-col">
        <div className="flex-grow-[2] flex-shrink-0 basis-3/5">
          <Banner />
        </div>
      </section>
      <AboutSection />
      <AboutMissionVision />
      <HowWeWork />
      {/* <ServiceSection /> */}
            {/*    <Racepack />*/}
      <StackedSlider />
    </main>
  );
}
