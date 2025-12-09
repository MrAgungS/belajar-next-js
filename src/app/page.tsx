// import Image from "next/image";

import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Home',
  description: 'Test Dulu',
  authors: [{name: "Agung", url: "http://localhost:3000"}],
  icons: {
    icon: '/images/icon.jpg'
  },
  openGraph:{
    title:"coba next"
  },
}


export default function Home() {
  return (
    <div>
      <main>
        <div>
          <p>Hello world</p>
        </div>
      </main>
    </div>
  );
}
