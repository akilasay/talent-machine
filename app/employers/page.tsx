// import Image from 'next/image'
// import Link from 'next/link'
// import React from 'react'

// const Profile = () => {
//   return (
//            <section className="mx-auto bg-[#2c2c2c] text-white rounded-2xl px-7 py-10 flex flex-col items-center text-center gap-5 w-1/3 max-lg:w-1/2 max-md:w-full">
//             <div className="bg-[#fccc41] rounded-2xl px-3 py-1.5 text-black">Find best candidate for your requirements.</div>
//             <h2 className="text-3xl font-bold">
//                 Find best candidate for your requirements.
//             </h2>
//             <p>Create profile and see the best.</p>
//             <Image src="images/cta.svg" alt="cta" width={362} height={232} />
//             <button className="bg-[#fe5933] text-white rounded-xl cursor-pointer px-4 py-2 flex items-center gap-2">
//                 <Image src="/icons/plus.svg" alt="plus" width={12} height={12}/>
//                 <Link href="/candidates/new">
//                     <p> Create Profile</p>
//                 </Link>
//             </button>
//         </section>
//   )
// }

// export default Profile

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function EmployerProfilePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <Card className="w-full max-w-xl shadow-xl rounded-2xl border border-blue-100 bg-white">
        <CardContent className="p-10 text-center space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-blue-700 cursor-default select-none"
          >
            Find Top Talent
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-gray-600 text-lg leading-relaxed"
          >
            Creating your employer profile allows you to showcase your company and
            discover talented candidates faster. A complete profile helps attract
            the best professionals to your team.
          </motion.p>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Link href="/employers/new">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-lg shadow-md">
                Create Profile
              </Button>
            </Link>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}
