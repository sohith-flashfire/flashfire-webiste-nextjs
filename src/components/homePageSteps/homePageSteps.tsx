import Image from "next/image";

export default function HomePageSteps() {
  return (
    <section className="bg-white py-12 px-6 text-center font-['Space_Grotesk',sans-serif]">
      {/* === Header === */}
      <div className="w-[90%] mx-auto mb-16">
        <h2 className="w-[65%] mx-auto mb-4 text-[2.8rem] font-bold text-[#111] leading-[1.3] max-[1024px]:w-[80%] max-[1024px]:text-[2.2rem] max-[768px]:w-full max-[768px]:text-[1.8rem] max-[480px]:text-[1.6rem]">
          From searching to interviewing,
          <br />
          just 4 simple steps.
        </h2>
        <p className="w-[60%] mx-auto text-[1.15rem] text-[#444] leading-[1.6] max-[1024px]:w-[75%] max-[1024px]:text-[1rem] max-[768px]:w-[95%] max-[768px]:text-[1rem] max-[480px]:text-[0.9rem]">
          We turn your endless job hunt into a smooth, automated path to
          interview
          <br />
          calls.{" "}
          <span className="text-[#ff4c00] font-medium">
            You set the goal, Flashfire takes care of the journey.
          </span>
        </p>
      </div>

      {/* === Steps Grid === */}
      <div className="grid grid-cols-2 gap-6 justify-center items-stretch w-[85%] mx-auto max-[1024px]:w-[90%] max-[768px]:grid-cols-1 max-[768px]:w-[95%]">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-[#faf1ed] border border-[#f1e1d8] rounded-[0.6rem] p-6 flex flex-col justify-between text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_4px_10px_rgba(0,0,0,0.05)]"
          >
            <div className="bg-white rounded-[0.3rem] p-5 pb-0">
              <h3 className="text-[2.6rem] font-bold tracking-[0.08em] mb-2 max-[768px]:text-[2.2rem] bg-gradient-to-r from-[rgba(245,93,29,1)] to-[rgba(0,0,0,1)] text-transparent bg-clip-text">
                \\STEP {index + 1}
              </h3>
              <h4 className="text-[1.8rem] font-bold text-[#111] mb-3 max-[1024px]:text-[1.5rem] max-[768px]:text-[1.3rem]">
                {step.heading}
              </h4>
              <p className="text-[1.1rem] text-[#333] leading-[1.6] max-[768px]:text-[0.95rem]">
                {step.description}
              </p>
            </div>
            <div className="flex justify-center items-center mt-6">
              <Image
                src={step.image}
                alt={step.heading}
                width={200}
                height={200}
                className="max-w-full h-auto object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const steps = [
  {
    heading: "You share your goals.",
    description:
      "Tell us what you are aiming for, your dream role, location, and experience. We learn your story so we can find the right opportunities for you.",
    image: "/images/step1.png",
  },
  {
    heading: "We build your winning profile.",
    description:
      "Our AI rewrites your resume and LinkedIn to match top U.S. recruiter searches. Your profile starts showing up where it matters, on the right screens.",
    image: "/images/step2.png",
  },
  {
    heading: "Flashfire AI applies for you.",
    description:
      "We apply to 1000+ curated roles for you, based on your goals and visa needs. No spam, no mass blasts, only smart, targeted applications.",
    image: "/images/step3.png",
  },
  {
    heading: "You start getting interview calls.",
    description:
      "As applications go out, you start getting real calls from real recruiters. We track, follow up, and optimize every step so you can focus on preparing.",
    image: "/images/step4.png",
  },
];
