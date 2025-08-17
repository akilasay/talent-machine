import Image from "next/image";

const Page = () => {
  return (
    <section className="flex justify-center p-6">
      <Image
        src="/images/poster/hiringPoster1.png"   // 👈 put your image in /public
        alt="Hiring poster 1"
        width={600}              // adjust as needed
        height={600}            // keep aspect ratio correct
        // className="hover:scale-110"
      />
    </section>
  );
};

export default Page;
