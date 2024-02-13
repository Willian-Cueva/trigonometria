// 'use client'
import Image from 'next/image'
import logoUnl from '../../public/assets/images/unl.png'
import Link from 'next/link';

export default function Navigation() {
  return (
    <header className="px-5 py-4">
      <nav className="flex justify-between items-center">
        <Image src={logoUnl} alt="Logo UNL" height="auto" width={180} priority={true}/>
        <h1 className="text-3xl font-bold hidden md:block">Trigonometría</h1>
        <div className="flex text-[16px] font-semibold ">
          <Link href="/" className="ml-8 hover:underline hover:text-blue-500">Menú Principal</Link>
        </div>
      </nav>
    </header>
  );
}
