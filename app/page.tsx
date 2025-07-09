
import Image from "next/image";
import ListUser from '@/components/ListUser'
import Link from 'next/link'
import { Suspense } from "react";
export default function Home() {
  return (

  <main className="w-screen py-20 flex justify-conter flex-col items-center">
    <div className="flex items-center justify-between gap-1 mb-5">
      <h1 className="text-4xl font-bold"> Next.js 15.3.5  CRUD with MySQL</h1>
    </div>
   <div className="overflow-x-auto">
      <div className="mb-2 w-full text-right">
       
        <Suspense fallback="loading...">
          <ListUser/>
        </Suspense>
    
      </div>
      
   </div>

  </main>
      )
}
