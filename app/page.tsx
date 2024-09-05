import WeatherComponent from "@/components/component/weatherComponent";
import { Providers } from "./providers";

export default function Home() {
  return (
    <Providers>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <WeatherComponent />
      </main>
    </Providers>
  );
}
