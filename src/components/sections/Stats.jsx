// import { useRef, useEffect } from 'react'
// import gsap from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import { stats } from '../../data/stats'
// import { AnimatedCounter } from '../ui/AnimatedCounter'
// import { RevealText } from '../ui/RevealText'

// gsap.registerPlugin(ScrollTrigger)

// export function Stats() {
//   const sectionRef = useRef(null)
//   const cardsRef = useRef(null)

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       const cards = cardsRef.current?.querySelectorAll('.stat-card')
//       if (!cards) return

//       gsap.fromTo(
//         cards,
//         { opacity: 0, y: 50 },
//         {
//           opacity: 1,
//           y: 0,
//           duration: 0.8,
//           stagger: 0.15,
//           ease: 'power3.out',
//           scrollTrigger: {
//             trigger: cardsRef.current,
//             start: 'top 75%',
//           },
//         }
//       )
//     }, sectionRef)

//     return () => ctx.revert()
//   }, [])

//   return (
//     <section
//       ref={sectionRef}
//       className="section-padding bg-coz-charcoal text-white relative overflow-hidden"
//     >
//       {/* Background Pattern */}
//       <div className="absolute inset-0 opacity-5">
//         <div
//           className="absolute inset-0"
//           style={{
//             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
//           }}
//         />
//       </div>

//       <div className="container-padding relative z-10">
//         {/* Header */}
//         <div className="text-center max-w-3xl mx-auto mb-16">
//           <RevealText>
//             <span className="text-small font-bold uppercase tracking-widest text-coz-orange">
//               By The Numbers
//             </span>
//           </RevealText>
//           <RevealText delay={0.1}>
//             <h2 className="text-h1 mt-4 mb-6">Our Impact</h2>
//           </RevealText>
//           <RevealText delay={0.2}>
//             <p className="text-body-lg text-coz-gray-light">
//               Years of trusted partnerships and successful deliveries across the globe.
//             </p>
//           </RevealText>
//         </div>

//         {/* Stats Grid */}
//         <div
//           ref={cardsRef}
//           className="grid grid-cols-2 lg:grid-cols-4 gap-8"
//         >
//           {stats.map((stat, index) => (
//             <div
//               key={stat.id}
//               className="stat-card text-center p-8 border border-coz-dark rounded-sm"
//             >
//               <div className="text-display mb-2">
//                 <AnimatedCounter
//                   value={stat.value}
//                   suffix={stat.suffix}
//                   className={
//                     index % 3 === 0
//                       ? 'text-coz-orange'
//                       : index % 3 === 1
//                       ? 'text-coz-blue'
//                       : 'text-coz-green'
//                   }
//                 />
//               </div>
//               <h3 className="text-h4 mb-2">{stat.label}</h3>
//               <p className="text-small text-coz-gray-light">{stat.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }
