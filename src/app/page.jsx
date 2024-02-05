import Link from "next/link";
import { links } from "@/app/constants";
export default function Home() {
  return (
    <main className="">
      <h1 className="text-3xl font-bold">Trigonometría</h1>
      <ul className="flex text-[16px] font-semibold mt-4">
        {links.map(({ label, route }) => (
          <li key={route} className="ml-8">
            <Link href={route}>{label}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
