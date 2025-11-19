// "use client";

// import { useEffect, useMemo, useState, useCallback } from "react";
// import Image from "next/image";
// import {
//   us_cities,
//   first_names,
//   actions,
//   products,
// } from "../utils/PopupNotifications";

// const API_KEY = "pk.9d0f80f1c9d0d19a47fe25a8d51c5f49";

// export default function SalesPopup({
//   isBookingFlow = false,
//   isAnyModalOpen = false,
// }: {
//   isBookingFlow?: boolean;
//   isAnyModalOpen?: boolean;
// }) {
//   const generateNotification = useCallback(() => {
//     const [city, , lat, lng] =
//       us_cities[Math.floor(Math.random() * us_cities.length)];
//     const name = first_names[Math.floor(Math.random() * first_names.length)];
//     const action = actions[Math.floor(Math.random() * actions.length)];
//     const product = products[Math.floor(Math.random() * products.length)];
//     const time = `about ${Math.floor(Math.random() * 59) + 1} minutes ago`;

//     const mapImg = `https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${lat},${lng}&zoom=12&size=300x200&format=png&maptype=streets&markers=icon:small-red-cutout|${lat},${lng}`;

//     return { name, location: `${city}, USA`, action, product, time, mapImg };
//   }, []);

//   const [visibleSales, setVisibleSales] = useState(false);
//   const [visibleOptimizer, setVisibleOptimizer] = useState(false);
//   const [visibleVisitors, setVisibleVisitors] = useState(false);
//   const [current, setCurrent] = useState<{
//     name: string;
//     location: string;
//     action: string;
//     product: string;
//     time: string;
//     mapImg: string;
//   } | null>(null);
//   const [visitors, setVisitors] = useState<number | null>(null);

//   const isSuppressed = useMemo(
//     () => isBookingFlow || isAnyModalOpen,
//     [isBookingFlow, isAnyModalOpen],
//   );

//   // Initialize values in useEffect to avoid calling Math.random during render
//   useEffect(() => {
//     if (current === null) {
//       setCurrent(generateNotification());
//     }
//     if (visitors === null) {
//       setVisitors(300 + Math.floor(Math.random() * 300));
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   useEffect(() => {
//     if (isSuppressed) {
//       setVisibleSales(false);
//       setVisibleOptimizer(false);
//       setVisibleVisitors(false);
//     }
//   }, [isSuppressed]);

//   useEffect(() => {
//     const showSequence = () => {
//       if (isSuppressed) return;

//       setCurrent(generateNotification());
//       setVisibleSales(true);
//       setTimeout(() => setVisibleSales(false), 3000);

//       setTimeout(() => {
//         if (!isBookingFlow) {
//           setVisibleOptimizer(true);
//           setTimeout(() => setVisibleOptimizer(false), 3000);
//         }
//       }, 11000);

//       setTimeout(() => {
//         if (!isBookingFlow) {
//           setVisitors(100 + Math.floor(Math.random() * 151));
//           setVisibleVisitors(true);
//           setTimeout(() => setVisibleVisitors(false), 3000);
//         }
//       }, 22000);
//     };

//     showSequence();
//     const interval = setInterval(showSequence, 33000);
//     return () => clearInterval(interval);
//   }, [isSuppressed, isBookingFlow, generateNotification]);

//   return (
//     <>
//       {/* SALES POPUP */}
//       <div
//         className={`fixed bottom-6 left-6 bg-white shadow-lg border border-gray-200 rounded-lg p-3 w-80 flex items-center gap-3 transition-all duration-500 ${
//           visibleSales
//             ? "translate-y-0 opacity-100"
//             : "translate-y-10 opacity-0 pointer-events-none"
//         }`}
//         style={{ zIndex: 9999 }}
//       >
//         {current && (
//           <>
//             <div className="w-14 h-14 rounded-md overflow-hidden relative">
//               <Image
//                 src={current.mapImg}
//                 alt="Location"
//                 fill
//                 className="object-cover"
//                 unoptimized
//               />
//             </div>
//             <div className="flex flex-col text-sm gap-0.5">
//               <span className="font-medium text-gray-800">
//                 {current.name} from {current.location}
//               </span>
//               <span className="text-gray-700">
//                 {current.action}{" "}
//                 <span className="font-semibold text-gray-900">
//                   {current.product}
//                 </span>
//               </span>
//               <span className="text-gray-500 text-xs mt-0.5">
//                 {current.time}
//               </span>
//             </div>
//           </>
//         )}
//       </div>

//       {/* AI OPTIMIZER POPUP – WITH Lightbulb EMOJI */}
//       <div
//         className={`fixed bottom-6 left-6 bg-white shadow-lg border border-gray-200 rounded-lg p-4 w-80 flex items-center gap-3 transition-all duration-500 ${
//           visibleOptimizer
//             ? "translate-y-0 opacity-100"
//             : "translate-y-10 opacity-0 pointer-events-none"
//         }`}
//         style={{ zIndex: 9998 }}
//       >
//         <div className="bg-yellow-100 text-yellow-600 rounded-full p-2 text-xl">
//           💡
//         </div>
//         <div className="flex flex-col text-sm">
//           <span className="font-medium text-gray-800">
//             Try our AI Optimizer
//           </span>
//           <span className="text-gray-500">
//             Boost your resume instantly — it&apos;s free!
//           </span>
//         </div>
//       </div>

//       {/* VISITORS POPUP */}
//       <div
//         className={`fixed bottom-6 left-6 bg-white shadow-lg border border-gray-200 rounded-lg p-4 w-80 flex items-center gap-3 transition-all duration-500 ${
//           visibleVisitors
//             ? "translate-y-0 opacity-100"
//             : "translate-y-10 opacity-0 pointer-events-none"
//         }`}
//         style={{ zIndex: 9997 }}
//       >
//         <div className="rounded-full p-2 bg-green-100">
//           <Image
//             src="/images/profile.png"
//             alt="visitor"
//             width={24}
//             height={24}
//             className="rounded-full object-cover"
//           />
//         </div>
//         <div className="flex flex-col text-sm">
//           <span className="font-medium text-gray-800">
//             {visitors ?? 0} users online
//           </span>
//           <span className="text-gray-500">
//             exploring FlashFireJobs right now
//           </span>
//         </div>
//       </div>
//     </>
//   );
// }
"use client";

import { useEffect, useMemo, useState } from "react";
import { us_cities, first_names, actions, products } from "../utils/PopupNotifications";

const API_KEY = "pk.9d0f80f1c9d0d19a47fe25a8d51c5f49";

export default function SalesPopup({
  isBookingFlow = false,
  isAnyModalOpen = false,
}: {
  isBookingFlow?: boolean;
  isAnyModalOpen?: boolean;
}) {
  const generateNotification = () => {
    const [city, , lat, lng] = us_cities[Math.floor(Math.random() * us_cities.length)];
    const name = first_names[Math.floor(Math.random() * first_names.length)];
    const action = actions[Math.floor(Math.random() * actions.length)];
    const product = products[Math.floor(Math.random() * products.length)];
    const time = `about ${Math.floor(Math.random() * 59) + 1} minutes ago`;

    const mapImg = `https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${lat},${lng}&zoom=12&size=300x200&format=png&maptype=streets&markers=icon:small-red-cutout|${lat},${lng}`;

    return { name, location: `${city}, USA`, action, product, time, mapImg };
  };

  const [visibleSales, setVisibleSales] = useState(false);
  const [visibleOptimizer, setVisibleOptimizer] = useState(false);
  const [visibleVisitors, setVisibleVisitors] = useState(false);
  const [current, setCurrent] = useState<{ name: string; location: string; action: string; product: string; time: string; mapImg: string } | null>(null);
  const [visitors, setVisitors] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const isSuppressed = useMemo(() => isBookingFlow || isAnyModalOpen, [isBookingFlow, isAnyModalOpen]);

  // Initialize random data only on client side to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
    setCurrent(generateNotification());
    setVisitors(300 + Math.floor(Math.random() * 300));
  }, []);

  useEffect(() => {
    if (isSuppressed) {
      setVisibleSales(false);
      setVisibleOptimizer(false);
      setVisibleVisitors(false);
    }
  }, [isSuppressed]);

  useEffect(() => {
    const showSequence = () => {
      if (isSuppressed) return;

      setCurrent(generateNotification());
      setVisibleSales(true);
      setTimeout(() => setVisibleSales(false), 3000);

      setTimeout(() => {
        if (!isBookingFlow) {
          setVisibleOptimizer(true);
          setTimeout(() => setVisibleOptimizer(false), 3000);
        }
      }, 11000);

      setTimeout(() => {
        if (!isBookingFlow) {
          setVisitors(100 + Math.floor(Math.random() * 151));
          setVisibleVisitors(true);
          setTimeout(() => setVisibleVisitors(false), 3000);
        }
      }, 22000);
    };

    showSequence();
    const interval = setInterval(showSequence, 33000);
    return () => clearInterval(interval);
  }, [isSuppressed, isBookingFlow]);

  // Don't render until mounted to avoid hydration mismatch
  if (!isMounted || !current || visitors === null) {
    return null;
  }

  return (
    <>
      {/* SALES POPUP */}
      <div
        className={`fixed bottom-6 left-6 bg-white shadow-lg border border-gray-200 rounded-lg p-3 w-80 flex items-center gap-3 transition-all duration-500 ${
          visibleSales ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
        }`}
        style={{ zIndex: 9999 }}
      >
        <img
          src={current.mapImg}
          alt="Location"
          className="w-14 h-14 rounded-md object-cover"
          onError={(e) => {
            e.currentTarget.src = "https://via.placeholder.com/56?text=Map";
          }}
        />
        <div className="flex flex-col text-sm">
          <span className="font-medium text-black">
            {current.name || "Someone"} from {current.location || "USA"}
          </span>
          <span className="text-gray-700">
            {current.action || "just bought"}{" "}
            <span className="text-gray-500 font-semibold">{current.product || "Flashfire's Plan"}</span>
          </span>
          <span className="text-gray-500 text-xs">{current.time || "recently"}</span>
        </div>
      </div>

      {/* AI OPTIMIZER POPUP – WITH Lightbulb EMOJI */}
      <div
        className={`fixed bottom-6 left-6 bg-white shadow-lg border border-gray-200 rounded-lg p-4 w-80 flex items-center gap-3 transition-all duration-500 ${
          visibleOptimizer ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
        }`}
        style={{ zIndex: 9998 }}
      >
        <div className="bg-yellow-100 text-yellow-600 rounded-full p-2 text-xl">
         💡
        </div>
        <div className="flex flex-col text-sm">
          <span className="font-medium text-gray-800">Try our AI Optimizer</span>
          <span className="text-gray-500">Boost your resume instantly — it's free!</span>
        </div>
      </div>

      {/* VISITORS POPUP */}
      <div
        className={`fixed bottom-6 left-6 bg-white shadow-lg border border-gray-200 rounded-lg p-4 w-80 flex items-center gap-3 transition-all duration-500 ${
          visibleVisitors ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
        }`}
        style={{ zIndex: 9997 }}
      >
        <div className="rounded-full p-2 bg-green-100">
          <img src="/images/profile.png" alt="visitor" className="w-6 h-6 rounded-full object-cover" />
        </div>
        <div className="flex flex-col text-sm">
          <span className="font-medium text-gray-800">{visitors} users online</span>
          <span className="text-gray-500">exploring FlashFireJobs right now</span>
        </div>
      </div>
    </>
  );
}
