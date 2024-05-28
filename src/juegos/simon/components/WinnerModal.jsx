//Modal commented bc we dont want user to see if he lost or won

// import React from 'react'

// function WinnerModal({ lost, points, onClick }) {
//   const className = lost
//     ? `grid place-items-center absolute w-screen h-screen top-0 left-0 bg-neutral-800 bg-opacity-50`
//     : 'hidden'

//   return (
//     <section className={className}>
//       <div className="bg-neutral-800 w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] border-2  border-white text-neutral-300 rounded-md flex flex-col justify-center items-center gap-10 text-[26px] font-bold">
//         <h2 className="text-red-500">Lost</h2>
//         <p>
//           You've got <span className="text-red-500">{points}</span>{' '}
//           {points > 1 ? 'points' : 'point'}
//         </p>
//         <footer>
//           <button
//             className="py-1 px-4 rounded-md border border-white"
//             onClick={onClick}
//           >
//             X
//           </button>
//         </footer>
//       </div>
//     </section>
//   )
// }

// export default WinnerModal
