import { FaBullseye, FaTrophy, FaRocket, FaHandshake } from "react-icons/fa";

export const stepsData = {
  heading: "From searching to interviewing, just 4 simple steps.",
  subheading:
    "We turn your endless job hunt into a smooth, automated path to interview calls. You set the goal, Flashfire takes care of the journey.",
  steps: [
    {
      id: 1,
      title: "\\ STEP 1",
      subtitle: "You share your goals.",
      description:
        "Tell us what you're aiming for — your dream role, location, and experience. We learn your story so we can find the right opportunities for you.",
      icon: FaBullseye,
    },
    {
      id: 2,
      title: "\\ STEP 2",
      subtitle: "We build your winning profile.",
      description:
        "Our AI rewrites your resume and LinkedIn to match top U.S. recruiter searches. Your profile starts showing up where it matters most.",
      icon: FaTrophy,
    },
    {
      id: 3,
      title: "\\ STEP 3",
      subtitle: "Flashfire AI applies for you.",
      description:
        "We apply to 1000+ curated roles for you, based on your goals and visa needs. No spam, no mass blasts — only smart, targeted applications.",
      icon: FaRocket,
    },
    {
      id: 4,
      title: "\\ STEP 4",
      subtitle: "You start getting interview calls.",
      description:
        "As applications go out, you start getting real calls from real recruiters. We track, follow up, and optimize every step — you focus on preparing.",
      icon: FaHandshake,
    },
  ],
};
