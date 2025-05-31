import Link from "next/link";

const FeatureSection = () => {
  return (
    <section className="relative flex flex-col justify-end items-end py-12 pl-20 min-h-[613px] max-md:pl-5 pb-20 z-[20]">


      <div className="right-0 md:ml-[70%]">
        <div className="transition-opacity ease-in duration-700 opacity-100">
          {/* Main Heading */}
          <div className="relative self-right mr-5 ml-30 w-auto text-4xl font-bold text-blue-400 max-md:max-w-full">
            <span className="text-blue-500">Discover </span> Untapped Potential.
            <span className="text-blue-500"> Supercharge</span> your hiring process.
          </div>

          {/* Subheading */}
          <div className="flex relative gap-1.5 mt-6 max-md:flex-wrap text-slate-800">
            Join our platform to access talent that perfectly matches your needs. Make hiring decisions based on fit, skills, and future potential instead of surface credentials alone. Your next great team member is just a click away.
          </div>

          {/* Features List */}
          <div className="flex relative gap-1.5 mt-6 ml-7 max-md:flex-wrap text-slate-800">
            <ul className="list-disc pl-5">
              <li>Discover top talent, effortlessly.</li>
              <li>Access screened candidate profiles.</li>
              <li>Find the perfect hire faster and more affordably.</li>
            </ul>
          </div>

          {/* Save Time Text */}
          <div className="relative mt-6 text-base text-slate-800 max-md:max-w-full">
            Save time and connect with ideal talent.
          </div>

          {/* Call-to-Action Buttons */}
          <div className="mt-10 flex relative gap-5 mr-10 text-base font-semibold max-md:flex-wrap">
            <Link href={`/candidates`} className="w-full">
              <button className="justify-center px-7 py-2.5 text-white whitespace-nowrap bg-blue-500 hover:bg-blue-600 hover:border-blue-600 border-blue-500 border-solid max-md:px-5 rounded">
                Explore regular job seekers
              </button>
            </Link>
            <Link href={`/candidates`} className="w-full">
            <button className="justify-center px-7 py-2.5 text-blue-500 whitespace-nowrap bg-green-200 hover:bg-indigo-100 border-blue-500 border-solid max-md:px-5 rounded">
              Explore seasonal job seekers
            </button>
          </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
