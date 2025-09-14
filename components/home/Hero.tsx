import Image from "next/image";

import Link from "next/link";


const Hero = () => {
  return (
    <div className=" bg-slate-900 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
        {/* Left Side: Title, Subtitle, and Search Bar */}
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl font-bold text-gray-800">
          Hire the <span className="text-4xl font-bold text-blue-600 ">Best Candidate</span> 
          {/* <h1 className="text-4xl font-bold ">for Your Vacancy</h1> */}
          </h1>
          <p className="text-lg text-gray-600">
          Join thousands of job seekers and employers on Job Global.
          </p>
          <div className="flex">
            {/* <input
              type="text"
              placeholder="Search jobs by title, location, or skills..."
              className="w-full px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            /> */}

            <Link href={`/candidates`} className="w-full">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
             Get Started
            </button>
          </Link>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="md:w-1/2 mt-8 md:mt-0 ml-30">
                    <Image
                      src="/images/befound-image.png"
                      alt="bookmark"
                      width={500}
                      height={500}
                    />
        </div>
      </div>
    </div>
  );
};

export default Hero;