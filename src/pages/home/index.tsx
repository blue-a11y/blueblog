import { GooeyText } from "@/components/ui/gooey-text-morphing";

function Home() {
  return (
    <div className="flex-1">
      <GooeyText
        textClassName="font-mono font-bold"
        className="pt-20"
        texts={["Building BlueBlog", "React Enthusiast", "Frontend Developer"]}
      />
    </div>
  );
}

export default Home;
