import Link from "next/link";
import { links } from "@/app/constants";
import Image from 'next/image'
import logoUnl from '../../public/assets/images/unl.png'

export default function Navigation() {
  return (
    <header className="px-5 py-4">
      <nav className="flex justify-between items-center">
        <Image src={logoUnl} alt="Logo UNL" height={30} width={180} />
        <ul className="flex text-[16px] font-semibold ">
          {links.map(({ label, route }) => (
            <li key={route} className="ml-8">
              <Link href={route}>{label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
