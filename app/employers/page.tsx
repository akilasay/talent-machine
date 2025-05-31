import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Profile = () => {
  return (
           <section className="mx-auto bg-[#2c2c2c] text-white rounded-2xl px-7 py-10 flex flex-col items-center text-center gap-5 w-1/3 max-lg:w-1/2 max-md:w-full">
            <div className="bg-[#fccc41] rounded-2xl px-3 py-1.5 text-black">Find best candidate for your requirements.</div>
            <h2 className="text-3xl font-bold">
                Find best candidate for your requirements.
            </h2>
            <p>Create profile and see the best.</p>
            <Image src="images/cta.svg" alt="cta" width={362} height={232} />
            <button className="bg-[#fe5933] text-white rounded-xl cursor-pointer px-4 py-2 flex items-center gap-2">
                <Image src="/icons/plus.svg" alt="plus" width={12} height={12}/>
                <Link href="/candidates/new">
                    <p> Create Profile</p>
                </Link>
            </button>
        </section>
  )
}

export default Profile