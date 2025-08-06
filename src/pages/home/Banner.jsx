import React from 'react'
import bannerImg from "../../assets/banner.png"
const Banner = () => {
 return (
    <div className='flex flex-col items-center justify-between gap-12 py-10 md:flex-row-reverse'>
        <div className='flex items-center w-full md:w-1/2 md:justify-end'>
            <img src={bannerImg} alt="banner"/>
        </div>
        <div className='w-full md:w-1/2'>
            <h1 className="text-2xl font-medium md-text-5xl mb-7">New Releases This week</h1>
            <p>It's time to update your reading list with some of the 
                latest and greatest releases in the literary world. 
                From heart-pumping thrillers to captivating memoirs, 
                this week's new releases offer something for everyone</p>
              <button className="px-4 py-2 font-semibold text-white bg-pink-500 rounded hover:bg-pink-600">
  Subscribe
</button>

        </div> 

        

    </div>
  )
}

export default Banner
