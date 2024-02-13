import Link from "next/link";
import { links } from "@/app/constants";
import Image from "next/image";
import qr from "@/assets/images/qr.png"
export default function Home() {
  return (
    <main className="">
      <ul className="flex flex-wrap justify-center gap-4 text-[16px] font-semibold mt-4">
        {links.map(({ label, route, src, alt }) => (
          <li key={route} className="relative md:w-1/4 w-52 overflow-hidden rounded-md shadow-lg mb-8">
          <Link href={route}>
            <div className="block w-full h-52 relative group">
              <p className="bg-black w-full text-white text-center p-4 absolute bottom-0 z-10 transition-all group-hover:opacity-0">{label}</p>
              <Image
                className="w-full h-full object-cover transition-transform transform scale-100 group-hover:scale-105"
                src={`/assets/images${src}`}
                alt={alt}
                width={180}
                height={180}
                priority={true}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-75 transition-opacity">
              </div>
                <p className="absolute bottom-0 w-full text-white text-center p-4">{label}</p>
              {/* <div className="absolute inset-0">
                <p className="absolute bottom-0 w-full h-full text-black text-center p-4">{label}</p>
              </div> */}

            </div>
          </Link>
        </li>
        ))}
          <li className="md:w-1/4 w-52 relative -top-1"><Image className="mx-auto" src={qr} alt="qr" width="auto" height={220} priority={true}/></li>    
      </ul>
    </main>
  );
}
