import React from 'react'
import Navbar from '@/components/Navbar'        
import Main from '@/components/Main'    
import Image from 'next/image'
import Footer from '@/components/Footer'
function page() {
  return (
    <div>
        <Navbar />
        <Main />
        <Image
          src="/chart.png"
          alt="chart Image"
          width={800}
          height={500}
          className="mx-auto mt-10 shadow-2xs shadow-amber-300 rounded-lg"
        />
        <Footer />
    </div>
  )
}

export default page
