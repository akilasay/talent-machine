
import { Instagram, FacebookIcon , Linkedin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className="w-full z-[60] bg-blue-950 p-5 sm:py-10 sm:px-20">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        {/* Footer Left Section */}
        <section className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow items-start mt-2 max-md:mt-10 max-md:max-w-full">
             <Image
               src="/images/logo2.png"
               alt="bookmark"
               width={100}
              height={100}
                                />
            <p className="self-stretch mt-10 text-base text-white max-md:max-w-full">
              Discover top talent across industries. Find the perfect fit for your team. Streamline hiring. Unlock your workforces potential.
            </p>
            <div className="flex gap-4 mt-7">
              <a
                href="https://www.facebook.com/profile.php?id=61585235332303"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookIcon color="#ffffff" />
              </a>
              <a
                href="https://www.linkedin.com/company/nextgen-talent-machine"
                target="_blank"
                rel="noopener noreferrer"
              >

                <Linkedin color="#ffffff" />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* <img
                  loading="lazy"
                  src="/img/instagram-white-icon.png"
                  alt="Instagram"
                  className="shrink-0 aspect-[1.23] w-[32px] h-[32px]"
                /> */}

                <Instagram color="#ffffff" />
              </a>
            </div>
          </div>
        </section>

        {/* Footer Middle Section */}
        <section className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow max-md:mt-10 max-md:max-w-full">
            <div className="max-md:max-w-full">
              <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                {/* Company Links */}
                <div className="flex flex-col ml-5 w-[31%] max-md:ml-0 max-md:w-full">
                  <div className="text-lg text-white max-md:mt-10">
                    <span className="text-2xl font-bold text-indigo-50">Company</span>
                    <br />
                    <Link className="" href="/about-us">
                      <span className="text-base leading-5">About Us</span>
                    </Link>
                    <br />
                    <Link className="" href="/contactus">
                      <span className="text-base leading-5">Contact Us</span>
                    </Link>
                    <br />
                    <Link className="" href="/faq">
                      <span className="text-base leading-5">FAQ</span>
                    </Link>
                  </div>
                </div>

                {/* Our Services Links */}
                <div className="flex flex-col ml-5 w-[31%] max-md:ml-0 max-md:w-full">
                  <div className="text-lg text-white max-md:mt-10">
                    <span className="text-2xl font-bold text-indigo-50">Our Services</span>
                    <br />
                    <Link className="" href="/candidates">
                      <span className="text-base leading-5">Find Talents</span>
                    </Link>
                    <br />
                    <Link className="" href="/job-seekers">
                      <span className="text-base leading-5">Job Seekers</span>
                    </Link>
                    <br />
                    <Link className="" href="/employers">
                      <span className="text-base leading-5">Employers</span>
                    </Link>
                  </div>
                </div>

                {/* Legal Links */}
                <div className="flex flex-col ml-5 w-[31%] max-md:ml-0 max-md:w-full">
                  <div className="text-lg text-white max-md:mt-10">
                    <span className="text-2xl font-bold text-indigo-50">Legal</span>
                    <br />
                    <Link className="" href="/terms">
                      <span className="text-base leading-5">Terms of Service</span>
                    </Link>
                    <br />
                    <Link className="" href="/privacy-policy">
                      <span className="text-base leading-5">Privacy Policy</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <p className="mt-12 ml-5 text-xs lg:text-base text-white max-md:mt-10 max-md:max-w-full">
            © 2025 NextGen Talent Machine Limited. All Rights Reserved
          </p>
        </section>
      </div>
    </div>
  );
};

export default Footer;
