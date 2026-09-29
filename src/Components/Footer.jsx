import React from 'react'

const Footer = () => {
  return (
    <>
      <div className='w-full py-8  bg-black flex items-center  '>
        <div className='md:max-w-[55vw] max-h-[8vh] grid md:grid-cols-3 grid-rows-3 place-items-center md:gap-0 gap-8 mx-auto  md:px-8 md:py-4  items-center  '>

            <div>
            <span className="font-extrabold text-[clamp(1.4rem,1.4vw,2rem)] tracking-[-0.03em] text-white font-display">
            VIS<span className="text-[#00F5FF]">OR</span>
             </span>
             </div>

            <div><p className='text-gray-400 text-[clamp(0.7rem,0.7vw,1.2rem)] '>© 2026 VISOR Technologies Inc. All Rights Reserved.</p></div>

            <div className='text-gray-400 md:justify-self-end space-x-3 text-[clamp(0.8rem,0.9vw,1.2rem)]'>
                <span>Privacy</span>
                <span>Term</span>
                <span>contact</span>
            </div>
         

        </div>
      </div>
    </>
  )
}

export default Footer
