// import { useEffect, useState } from 'react';

// export default function Game({ url }) {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollPosition = window.scrollY;
//       if (scrollPosition > 300) {
//         setIsVisible(true);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <section
//       className={`relative grid lg:grid-cols-1`}
//       style={{ height: 'calc(100vh - 5rem)' }}>
//       <div className="absolute z-10 w-32 md:w-64">
//         <img
//           className="w-full h-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:top-0 lg:left-0 lg:translate-x-0 lg:translate-y-0"
//           src="/overlay-oncyber.png"
//           alt="overlay_oncyber"
//         />
//       </div>

//       {isVisible && (
//         <iframe
//           id="game"
//           className="w-full h-full"
//           src={url}
//           allowFullScreen></iframe>
//       )}
//     </section>
//   );
// }