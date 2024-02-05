// 'use client'
import Image from 'next/image'
import logoUnl from '../../public/assets/images/unl.png'
import Link from 'next/link';

export default function Navigation() {
  return (
    <header className="px-5 py-4">
      <nav className="flex justify-between items-center">
        <Image src={logoUnl} alt="Logo UNL" height="auto" width={180} priority={true}/>
        <div className="flex text-[16px] font-semibold ">
          <Link href="/">Menú Principal</Link>
        </div>
      </nav>
    </header>
  );
}
