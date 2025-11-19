import Image from "next/image";
import { FaLinkedin } from "react-icons/fa";

export default function HomePageFoundersNote() {
  return (
    <section className="bg-[rgba(249,238,234,1)] py-24 px-6 font-['Space_Grotesk',sans-serif] max-[768px]:py-12 max-[768px]:px-4">
      <div className="max-w-[1200px] mx-auto flex justify-between items-start gap-12 max-[1024px]:flex-col max-[1024px]:items-center max-[1024px]:text-center">
        {/* === LEFT COLUMN === */}
        <div className="flex-[1.6] font-semibold text-left text-black text-[1.1rem] leading-[1.7] max-[1024px]:order-2 max-[1024px]:w-[90%] max-[768px]:text-base">
          <p className="font-bold text-black text-[1.2rem] mb-6">
            To Every Job Seeker Who’s Ready to Move Forward,
          </p>

          <p className="mb-5">
            I know how exhausting the job search can be. You keep sending out
            applications, waiting for replies, and start to wonder if it’s you.
            Especially in the U.S., where hundreds apply for the same role, even
            the most talented people begin to lose hope.
          </p>

          <p className="mb-5">
            Flashfire was born from that same feeling. I watched my sister—
            smart, capable, and hardworking—apply to hundreds of roles and still
            get no response. It wasn’t her fault. The system had stopped seeing
            people for who they are.
          </p>

          <blockquote className="text-[1.4rem] font-normal italic text-black border-l-4 border-[#ff4c00] pl-4 my-8 leading-[1.6]">
            The problem was never the people. It was the process.
          </blockquote>

          <p className="mb-5">
            That’s when{" "}
            <span className="text-[#ff4c00] font-bold">Pranjal</span> joined me.
            He had been through the same struggle—preparing hard, clearing
            rounds, yet still falling short. Not because he wasn’t good enough,
            but because the process wasn’t fair.
          </p>

          <p>
            Together, we started building Flashfire with belief, empathy, and
            persistence. What began as a way to help one person is now helping
            hundreds find their “yes.”
          </p>
        </div>

        {/* === RIGHT COLUMN === */}
        <div className="flex-1 flex flex-col items-center gap-8 max-[1024px]:order-1 max-[1024px]:mb-8">
          <Image
            src="/images/hat.png"
            alt="Graduation Icon"
            width={320}
            height={320}
            className="w-48 h-48 object-contain max-[768px]:w-32 max-[768px]:h-32 -mt-10"
          />
          <div className="relative w-full max-w-[330px] -mt-10 max-[1024px]:mt-0 max-[1024px]:max-w-[280px]">
            <div className="border-[5px] border-white outline outline-2 outline-[#ff4c00] overflow-hidden shadow-[0_6px_20px_rgba(0,0,0,0.1)] w-full">
              <Image
                src="/images/Adit.jpg"
                alt="Adit Jain"
                width={280}
                height={400}
                className="w-full h-[26rem] object-cover object-center transition-transform duration-300 hover:scale-[1.03] max-[1024px]:h-[22rem] max-[768px]:h-[18rem]"
              />

              <div className="absolute bottom-2 left-2 right-2 bg-black/90 text-white flex items-center justify-between px-4 py-3 backdrop-blur-[3px] text-left border border-white rounded-lg">
                <div className="space-y-1">
                  <p className="text-sm text-[#bbb] m-0">Partner</p>
                  <p className="text-base font-semibold m-0">Adit</p>
                </div>
                <a
                  href="https://www.linkedin.com/in/adit-jain-907555218/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-xl transition-transform duration-200 hover:scale-110 hover:text-[#0077b5]"
                >
                  <FaLinkedin />
                </a>
              </div>
            </div>
            <Image
              src="/images/character2.png"
              alt="Flashfire Mascot"
              width={220}
              height={220}
              className="absolute -top-16 -right-10 w-[10rem] h-[10rem] max-[768px]:w-[6rem] max-[768px]:h-[6rem]"
            />
          </div>
          <Image
            src="/images/boy.png"
            alt="Pixel Person Icon"
            width={320}
            height={320}
            className="w-48 h-48 object-contain max-[768px]:w-32 max-[768px]:h-32 -mb-10"
          />
        </div>
      </div>
    </section>
  );
}
