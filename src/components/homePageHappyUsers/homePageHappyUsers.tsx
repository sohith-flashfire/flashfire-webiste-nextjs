// "use client";

// import Image from "next/image";
// import { useState } from "react";

// export default function HomePageHappyUsers() {
//   const videos = [
//     {
//       src: "/videos/anjali-shah-ff-review.mp4",
//       name: "Anjali Shah",
//       company: "Skyworks Solutions, Inc.",
//       linkedinUrl: "https://www.linkedin.com/in/anjalishah6198/",
//       profileImage: "/images/anjali.jpeg",
//     },
//     {
//       src: "/videos/rijul-jain-ff-review.mp4",
//       name: "Rijul Jain",
//       company: "Wise",
//       linkedinUrl: "https://www.linkedin.com/in/-rijuljain-/",
//       profileImage: "/images/rijul.jpg",
//     },
//     {
//       src: "/videos/aryan-gupta-ff-review.mp4",
//       name: "Aryan Gupta",
//       company: "IBM",
//       linkedinUrl: "#",
//       profileImage: "/images/aryan.jpg",
//     },
//   ];

//   // Images from happy-users-sc folder
//   const reviewImages = [
//     "/images/happy-users-sc/image1.jpg",
//     "/images/happy-users-sc/image2.jpg",
//     "/images/happy-users-sc/image3.jpg",
//     "/images/happy-users-sc/image4.jpg",
//     "/images/happy-users-sc/image5.jpg",
//     "/images/happy-users-sc/image6.jpg",
//     "/images/happy-users-sc/image7.jpg",
//     "/images/happy-users-sc/image8.jpg",
//     "/images/happy-users-sc/image9.png",
//     "/images/happy-users-sc/image10.jpg",
//     "/images/happy-users-sc/image11.jpg",
//     "/images/happy-users-sc/image12.jpg",
//     "/images/happy-users-sc/image13.png",
//     "/images/happy-users-sc/image14.jpg",
//     "/images/happy-users-sc/image15.jpg",
//     "/images/happy-users-sc/image16.png",
//     "/images/happy-users-sc/image17.png",
//     "/images/happy-users-sc/image18.jpg",
//     "/images/happy-users-sc/image19.png",
//     "/images/happy-users-sc/image20.png",
//     "/images/happy-users-sc/image21.png",
//     "/images/happy-users-sc/image22.png",
//     "/images/happy-users-sc/image23.png",
//     "/images/happy-users-sc/image24.png",
//     "/images/happy-users-sc/image25.png",
//   ];

//   const [playingIndex, setPlayingIndex] = useState<number | null>(null);

//   const handlePlay = (index: number) => {
//     // Pause all other videos
//     videos.forEach((_, i) => {
//       if (i !== index) {
//         const otherVideoEl = document.getElementById(
//           `userVideo-${i}`,
//         ) as HTMLVideoElement;
//         if (otherVideoEl) {
//           otherVideoEl.pause();
//           otherVideoEl.currentTime = 0;
//         }
//       }
//     });

//     setPlayingIndex(index);
//     const videoEl = document.getElementById(
//       `userVideo-${index}`,
//     ) as HTMLVideoElement;
//     if (videoEl) {
//       videoEl.play();
//     }
//   };

//   const handleVideoPlay = (index: number) => {
//     // Pause all other videos when this one starts playing
//     videos.forEach((_, i) => {
//       if (i !== index) {
//         const otherVideoEl = document.getElementById(
//           `userVideo-${i}`,
//         ) as HTMLVideoElement;
//         if (otherVideoEl) {
//           otherVideoEl.pause();
//           otherVideoEl.currentTime = 0;
//         }
//       }
//     });
//     setPlayingIndex(index);
//   };

//   return (
//     <section
//       id="testimonials"
//       className="w-full overflow-hidden font-['Space_Grotesk',sans-serif]"
//     >
//       {/* === Top Orange Section === */}
//       <div className="bg-[#f55d1d] text-white text-center py-20 px-8 pb-40 relative">
//         <h2
//           className="mb-12 max-[600px]:text-[2rem]"
//           style={{
//             fontFamily: "Space Grotesk, sans-serif",
//             fontWeight: 700,
//             fontStyle: "normal",
//             fontSize: "76.26px",
//             lineHeight: "110%",
//             letterSpacing: "-2.29px", // -3% of 76.26px
//             textAlign: "center",
//           }}
//         >
//           100+ Happy Users&rsquo; Love!
//         </h2>

//         {/* Masonry Layout */}
//         <div className="columns-5 gap-4 max-w-[1100px] mx-auto max-[1200px]:columns-4 max-[900px]:columns-3 max-[600px]:columns-2 max-[400px]:columns-1">
//           {reviewImages.map((imageSrc, i) => (
//             <div
//               key={i}
//               className="inline-block w-full mb-4 [break-inside:avoid] rounded-[0.6rem] overflow-hidden bg-[#fffaf8] shadow-[0_3px_10px_rgba(0,0,0,0.25)]"
//             >
//               <Image
//                 src={imageSrc}
//                 alt={`Flashfire user review ${i + 1}`}
//                 width={400}
//                 height={600}
//                 className="w-full h-auto object-contain block rounded-[0.4rem]"
//                 style={{ width: "100%", height: "auto" }}
//               />
//             </div>
//           ))}
//         </div>

//         <Image
//           src="/images/character1.png"
//           alt="Flashfire Mascot Shape"
//           width={300}
//           height={300}
//           className="absolute left-1/2 -bottom-28 -translate-x-1/2 z-[3] w-64 h-64 max-[600px]:w-40 max-[600px]:h-40 max-[600px]:-bottom-18 "
//         />
//       </div>

//       {/* === Bottom White Section === */}
//       <div className="bg-[#fffaf8] py-32 px-8 pb-20 text-center">
//         <div className="flex justify-center items-stretch flex-nowrap gap-6 w-full">
//           {videos.map((video, index) => (
//             <div
//               key={index}
//               className="relative w-80 h-[32rem] rounded-none overflow-hidden bg-[#fffaf8] p-2 shadow-[0_8px_20px_rgba(0,0,0,0.25)] transition-all duration-300 flex-shrink-0 hover:shadow-[0_14px_28px_rgba(0,0,0,0.3)]"
//             >
//               <div className="relative w-full h-full rounded-none overflow-hidden">
//                 <video
//                   id={`userVideo-${index}`}
//                   className={`w-full h-full object-cover block rounded-none cursor-pointer ${playingIndex === index ? "block" : "hidden"}`}
//                   controls={playingIndex === index}
//                   muted
//                   loop
//                   playsInline
//                   onPlay={() => handleVideoPlay(index)}
//                   onPause={() => {
//                     if (playingIndex === index) {
//                       setPlayingIndex(null);
//                     }
//                   }}
//                 >
//                   <source src={video.src} type="video/mp4" />
//                   Your browser does not support HTML video.
//                 </video>

//                 {/* Thumbnail Image Overlay - Show when video is not playing */}
//                 {playingIndex !== index && (
//                   <>
//                     <Image
//                       src={video.profileImage}
//                       alt={`${video.name} - Click to play video`}
//                       fill
//                       className="w-full h-full object-cover rounded-none"
//                       onClick={() => handlePlay(index)}
//                     />
//                     {/* Play Button Overlay */}
//                     <div
//                       className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70px] h-[70px] rounded-full bg-black/60 text-white text-[2rem] font-bold flex justify-center items-center cursor-pointer transition-all duration-250 backdrop-blur-[2px] hover:bg-black/75 hover:scale-105 z-10"
//                       onClick={() => handlePlay(index)}
//                     >
//                       ▶
//                     </div>
//                   </>
//                 )}

//                 {/* User Info - Always visible, overlaid on video */}
//                 <div className="absolute bottom-2 left-2 right-2 h-[5.5rem] bg-black border border-[#ff4c00] text-white text-left py-3 px-4 flex items-center z-20">
//                   <div className="flex items-center gap-3 w-full h-full">
//                     <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-white/50">
//                       <Image
//                         src={video.profileImage}
//                         alt={video.name}
//                         width={40}
//                         height={40}
//                         className="w-full h-full object-cover rounded-full"
//                         onError={(e) => {
//                           const target = e.target as HTMLImageElement;
//                           target.style.display = "none";
//                         }}
//                       />
//                     </div>
//                     <div className="flex-1 min-w-0 flex flex-col justify-center">
//                       <p className="text-xl font-semibold m-0 text-white leading-tight truncate drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
//                         {video.name}
//                       </p>
//                       <p className="text-sm m-0 text-white/90 leading-tight mt-0.5 truncate drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
//                         {video.company}
//                       </p>
//                     </div>
//                     <a
//                       href={video.linkedinUrl !== "#" ? video.linkedinUrl : "#"}
//                       target={video.linkedinUrl !== "#" ? "_blank" : undefined}
//                       rel={
//                         video.linkedinUrl !== "#"
//                           ? "noopener noreferrer"
//                           : undefined
//                       }
//                       className={`flex-shrink-0 w-6 h-6 bg-white rounded flex items-center justify-center transition-colors ${
//                         video.linkedinUrl !== "#"
//                           ? "hover:bg-[#ff4c00] cursor-pointer"
//                           : "cursor-default opacity-50"
//                       }`}
//                       aria-label="LinkedIn Profile"
//                       onClick={(e) => {
//                         if (video.linkedinUrl === "#") {
//                           e.preventDefault();
//                         }
//                       }}
//                     >
//                       <svg
//                         className="w-4 h-4 text-black"
//                         viewBox="0 0 24 24"
//                         fill="currentColor"
//                       >
//                         <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
//                       </svg>
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import Image from "next/image";
import { useState } from "react";

export default function HomePageHappyUsers() {
  const videos = [
    {
      videoUrl: "https://www.youtube.com/embed/p41OvikonKo",
      name: "Anjali Shah",
      company: "Skyworks Solutions, Inc.",
      linkedinUrl: "https://www.linkedin.com/in/anjalishah6198/",
      profileImage: "/images/anjali.jpeg",
    },
    {
      videoUrl: "https://www.youtube.com/embed/nYEO8K0q38c",
      name: "Rijul Jain",
      company: "Wise",
      linkedinUrl: "https://www.linkedin.com/in/-rijuljain-/",
      profileImage: "/images/rijul.jpg",
    },
    {
      videoUrl: "https://www.youtube.com/embed/p9kzhLHjJuI",
      name: "Aryan Gupta",
      company: "IBM",
      linkedinUrl: "#",
      profileImage: "/images/aryan.jpg",
    },
  ];

  // Images from happy-users-sc folder
  const reviewImages = [
    "/images/happy-users-sc/image1.jpg",
    "/images/happy-users-sc/image2.jpg",
    "/images/happy-users-sc/image3.jpg",
    "/images/happy-users-sc/image4.jpg",
    "/images/happy-users-sc/image5.jpg",
    "/images/happy-users-sc/image6.jpg",
    "/images/happy-users-sc/image7.jpg",
    "/images/happy-users-sc/image8.jpg",
    "/images/happy-users-sc/image9.png",
    "/images/happy-users-sc/image10.jpg",
    "/images/happy-users-sc/image11.jpg",
    "/images/happy-users-sc/image12.jpg",
    "/images/happy-users-sc/image13.png",
    "/images/happy-users-sc/image14.jpg",
    "/images/happy-users-sc/image15.jpg",
    "/images/happy-users-sc/image16.png",
    "/images/happy-users-sc/image17.png",
    "/images/happy-users-sc/image18.jpg",
    "/images/happy-users-sc/image19.png",
    "/images/happy-users-sc/image20.png",
    "/images/happy-users-sc/image21.png",
    "/images/happy-users-sc/image22.png",
    "/images/happy-users-sc/image23.png",
    "/images/happy-users-sc/image24.png",
    "/images/happy-users-sc/image25.png",
  ];

  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  const handlePlay = (index: number) => {
    // Close all other videos
    setPlayingIndex(index);
  };

  return (
    <section
      id="testimonials"
      className="w-full overflow-hidden font-['Space_Grotesk',sans-serif]"
    >
      {/* === Top Orange Section === */}
      <div className="bg-[#f55d1d] text-white text-center py-20 px-8 pb-40 relative">
        <h2
          className="mb-12 max-[600px]:text-[2rem]"
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontWeight: 700,
            fontStyle: "normal",
            fontSize: "76.26px",
            lineHeight: "110%",
            letterSpacing: "-2.29px", // -3% of 76.26px
            textAlign: "center",
          }}
        >
          100+ Happy Users&rsquo; Love!
        </h2>

        {/* Masonry Layout */}
        <div className="columns-5 gap-4 max-w-[1100px] mx-auto max-[1200px]:columns-4 max-[900px]:columns-3 max-[600px]:columns-2 max-[400px]:columns-1">
          {reviewImages.map((imageSrc, i) => (
            <div
              key={i}
              className="inline-block w-full mb-4 [break-inside:avoid] rounded-[0.6rem] overflow-hidden bg-[#fffaf8] shadow-[0_3px_10px_rgba(0,0,0,0.25)]"
            >
              <Image
                src={imageSrc}
                alt={`Flashfire user review ${i + 1}`}
                width={400}
                height={600}
                className="w-full h-auto object-contain block rounded-[0.4rem]"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          ))}
        </div>

        <Image
          src="/images/character1.png"
          alt="Flashfire Mascot Shape"
          width={300}
          height={300}
          className="absolute left-1/2 -bottom-28 -translate-x-1/2 z-[3] w-64 h-64 max-[600px]:w-40 max-[600px]:h-40 max-[600px]:-bottom-18 "
        />
      </div>

      {/* === Bottom White Section === */}
      <div className="bg-[#fffaf8] py-32 px-8 pb-20 text-center">
        <div className="flex justify-center items-stretch flex-nowrap gap-6 w-full">
          {videos.map((video, index) => (
            <div
              key={index}
              className="relative w-80 h-[32rem] rounded-none overflow-hidden bg-[#fffaf8] p-2 shadow-[0_8px_20px_rgba(0,0,0,0.25)] transition-all duration-300 flex-shrink-0 hover:shadow-[0_14px_28px_rgba(0,0,0,0.3)]"
            >
              <div className="relative w-full h-full rounded-none overflow-hidden">
                {/* YouTube Video Embed - Show when playing */}
                {playingIndex === index && (
                  <>
                    <iframe
                      id={`userVideo-${index}`}
                      src={`${video.videoUrl}?autoplay=1&rel=0`}
                      className="w-full h-full object-cover block rounded-none"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      frameBorder="0"
                    />
                    {/* Close Button */}
                    <button
                      onClick={() => setPlayingIndex(null)}
                      className="absolute top-2 right-2 w-8 h-8 bg-black/70 hover:bg-black/90 text-white rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 z-30"
                      aria-label="Close video"
                    >
                      ✕
                    </button>
                  </>
                )}

                {/* Thumbnail Image Overlay - Show when video is not playing */}
                {playingIndex !== index && (
                  <>
                    <Image
                      src={video.profileImage}
                      alt={`${video.name} - Click to play video`}
                      fill
                      className="w-full h-full object-cover rounded-none"
                      onClick={() => handlePlay(index)}
                    />
                    {/* Play Button Overlay */}
                    <div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70px] h-[70px] rounded-full bg-black/60 text-white text-[2rem] font-bold flex justify-center items-center cursor-pointer transition-all duration-250 backdrop-blur-[2px] hover:bg-black/75 hover:scale-105 z-10"
                      onClick={() => handlePlay(index)}
                    >
                      ▶
                    </div>
                  </>
                )}

                {/* User Info - Always visible, overlaid on video */}
                <div className="absolute bottom-2 left-2 right-2 h-[5.5rem] bg-black border border-[#ff4c00] text-white text-left py-3 px-4 flex items-center z-20">
                  <div className="flex items-center gap-3 w-full h-full">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-white/50">
                      <Image
                        src={video.profileImage}
                        alt={video.name}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover rounded-full"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <p className="text-xl font-semibold m-0 text-white leading-tight truncate drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                        {video.name}
                      </p>
                      <p className="text-sm m-0 text-white/90 leading-tight mt-0.5 truncate drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                        {video.company}
                      </p>
                    </div>
                    <a
                      href={video.linkedinUrl !== "#" ? video.linkedinUrl : "#"}
                      target={video.linkedinUrl !== "#" ? "_blank" : undefined}
                      rel={
                        video.linkedinUrl !== "#"
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className={`flex-shrink-0 w-6 h-6 bg-white rounded flex items-center justify-center transition-colors ${
                        video.linkedinUrl !== "#"
                          ? "hover:bg-[#ff4c00] cursor-pointer"
                          : "cursor-default opacity-50"
                      }`}
                      aria-label="LinkedIn Profile"
                      onClick={(e) => {
                        if (video.linkedinUrl === "#") {
                          e.preventDefault();
                        }
                      }}
                    >
                      <svg
                        className="w-4 h-4 text-black"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}






