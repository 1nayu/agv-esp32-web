import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getApp } from "@firebase/app";
import AGVControl from "@/components/agvControl";

export default function Home() {
  console.log(getApp());



  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h2 className={"text-3xl"}>agv-esp32-firebase</h2>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
            <AGVControl/>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/1nayu/agv-esp32-web"
          target="_blank"
          rel="noopener noreferrer"
        >
          2025 石黒研究室 Nayu
        </a>
      </footer>
    </div>
  );
}
