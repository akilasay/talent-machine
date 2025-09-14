
import Image from 'next/image';

const Testimonials = () => {
  return (
    <section className=" py-16">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-semibold text-gray-800">What Our Clients Are Saying</h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            
          {/* Testimonial Card 1 */}
          <div className="bg-sky-50 p-6 rounded-lg shadow-lg">
            <p className="text-gray-600 text-base mb-4">
              &quot;JobNet has helped us find the perfect candidates every time. The platform is user-friendly and makes hiring so much easier.&quot;
            </p>
            <div className="flex items-center">
              <Image
                src="/images/client1.jpg"
                alt="Client 1"
                width={48}
                height={48}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <p className="text-lg font-semibold text-gray-800">John Doe</p>
                <p className="text-sm text-gray-500">CEO, Example Company</p>
              </div>
            </div>
          </div>

          {/* Testimonial Card 2 */}
          <div className="bg-sky-50  p-6 rounded-lg shadow-lg">
            <p className="text-gray-600 text-base mb-4">
              &quot;We&apos;ve been able to streamline our recruitment process significantly. Highly recommend JobNet for both job seekers and employers.&quot;
            </p>
            <div className="flex items-center">
              <Image
                src="/images/client2.jpg"
                alt="Client 2"
                width={48}
                height={48}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <p className="text-lg font-semibold text-gray-800">Jane Smith</p>
                <p className="text-sm text-gray-500">HR Director, ABC Corp</p>
              </div>
            </div>
          </div>

          {/* Testimonial Card 3 */}
          <div className="bg-sky-50  p-6 rounded-lg shadow-lg">
            <p className="text-gray-600 text-base mb-4">
              &quot;As a job seeker, the experience on JobNet was smooth and efficient. The job search was personalized, and I found my dream role!&quot;
            </p>
            <div className="flex items-center">
              <Image
                src="/images/client3.jpg"
                alt="Client 3"
                width={48}
                height={48}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <p className="text-lg font-semibold text-gray-800">Samuel Green</p>
                <p className="text-sm text-gray-500">Software Engineer, XYZ Ltd.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
