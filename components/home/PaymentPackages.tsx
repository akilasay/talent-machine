

const PaymentPackages = () => {
  return (
    <section className="flex flex-col items-center px-20 pt-4 pb-14 bg-slate-900 max-md:px-5 z-[20]">
      {/* Title */}
      <h1 className="text-4xl font-bold text-white max-md:max-w-full pb-6 z-[20]">
      Plans and <span className="text-blue-500">Pricing</span>
      </h1>

      {/* Package Details */}
      <div className="transition-opacity ease-in duration-700 opacity-100 flex flex-col items-center z-[20] w-11/12">
        <div className="mt-4 w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            {/* Package 1: Cost per Candidate */}
            <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow px-5 pt-9 pb-1 w-full text-gray-200 border border-blue-500 border-solid bg-slate-950 max-md:px-5 max-md:mt-10">
                <div className="self-center text-4xl max-md:text-3xl">
                  $ <span className="w-[50px] inline-block text-center">5</span>
                </div>
                <div className="mt-2 mb-2 text-1xl max-md:mr-2.5 text-center">
                  Cost per Candidate
                </div>
              </div>
            </div>

            {/* Package 2: Time Saving */}
            <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow px-4 pt-9 pb-1 w-full text-gray-200 border border-blue-500 border-solid bg-slate-950 max-md:mt-10">
                <div className="self-center text-3xl max-md:text-3xl">
                  <span className="w-[50px] inline-block text-center">1</span>
                  <span className="w-[60px] inline-block"> hour</span>
                </div>
                <div className="mt-2 mb-2 text-1xl text-center">Time Saving</div>
              </div>
            </div>

            {/* Package 3: Jobseeker Visibility */}
            <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow px-4 pt-9 pb-1 w-full text-gray-200 border border-blue-500 border-solid bg-slate-950 max-md:mt-10">
                <div className="self-center text-3xl max-md:text-3xl">
                  1:<span className="w-[80px] inline-block text-left">1000</span>
                </div>
                <div className="mt-2 mb-2 text-1xl text-center">Jobseeker Visibility</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentPackages;
