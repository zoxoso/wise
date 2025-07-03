import React from 'react'
import Image from 'next/image';

function Main() {
  // Calculate current time minus 30 minutes
  const getTimeMinusThirtyMinutes = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - 30);
    return now.toLocaleTimeString('th-TH', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
    };


  return (
   <div className="max-w-screen-xl mx-auto py-8 px-4 lg:py-16 lg:px-6">
  <div className="text-center mb-10">
    <h2 className="text-4xl tracking-tight font-bold text-primary-800">Jí Lóhng</h2>
  </div>
  <div className="flex flex-col md:flex-row">
    {/* can help image */}
    <div className="mr-0 md:mr-8 mb-6 md:mb-0">
   <div className="p-1 m-1 min-w-xs w-full mx-auto max-w-sm outline outline-2 outline-offset-0 outline-slate-300 shadow-xl shadow-slate-500/50 dark:shadow-cyan-500/50 dark:outline-cyan-300 rounded-xl">
  <div className="h-1/2 p-1 place-items-center block text-center sm:flex sm:justify-between">
    <img className="rounded-full sm:rounded-xl size-20 sm:size-[10rem] object-cover" src="https://images.unsplash.com/photo-1466112928291-0903b80a9466?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw1fHxwcm9maWxlfGVufDB8MHx8fDE3NTA1MDA4MDB8MA&ixlib=rb-4.1.0&q=80&w=1080" alt="profile" />
    <div className="m-2 py-2">
        <h2>Last Update - {getTimeMinusThirtyMinutes()}</h2>
        <h4></h4>
      <main>  
        <div className="flex justify-end gap-4">
  <div className="flex">
    <svg xmlns="http://www.w3.org/2000/svg" className="text-yellow-500 w-5 h-auto fill-current hover:text-red-600" viewBox="0 0 16 16">
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" className="text-yellow-500 w-5 h-auto fill-current hover:text-yellow-600" viewBox="0 0 16 16">
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" className="text-yellow-500 w-5 h-auto fill-current hover:text-yellow-600" viewBox="0 0 16 16">
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
    </svg>
   
  <svg xmlns="http://www.w3.org/2000/svg" className="text-yellow-500 w-5 h-auto fill-current hover:text-yellow-600" viewBox="0 0 16 16">
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
    </svg> <svg xmlns="http://www.w3.org/2000/svg" className="text-yellow-500 w-5 h-auto fill-current hover:text-green-600" viewBox="0 0 16 16">
      <path d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z" />
    </svg>
  </div>
  <span className="text-slate-400 font-medium">100/94</span>
</div>


        
          </main>
 
      <div className="p-2 m-2 rounded-xl bg-blue-300 border-none text-emerald-50 font-semibold focus:text-slate-100 hover:text-slate-100 transition delay-150 duration-300 ease-in hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 ">

  <div className="font-semibold text-lg text-left">Balance (USD)</div>
  <div className="font-semibold text-4xl tracking-tight text-right">2,181.27</div>



      </div>

     <div className="p-2 m-2 rounded-xl bg-blue-300 border-none text-emerald-50 font-semibold focus:text-slate-100 hover:text-slate-100 transition delay-150 duration-300 ease-in hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 ">
  <div className="font-semibold text-lg text-left">Month (USD)</div>

  <div className="font-semibold text-4xl tracking-tight text-right text-orange-500">322.56</div>



      </div>

    </div>
  </div>


  
  <div className="border border-b-1 m-1 border-slate-200 dark:border-cyan-300 flex flex-row" />
  <div className="m-auto flex flex-row gap-2 p-2 m-2 justify-around">
    
    <div className="text-center">
      <button className="relative z-10 block p-1 transition-colors duration-300 transform rounded-full focus:outline-none border-2 border-blue-500 bg-blue-100 hover:bg-amber-200">
        <Image
          src="/send.svg"
          alt="send"
          width={35}
          height={35}
        />
      </button>
    </div>
 <div className="text-center">
      <button className="peer relative z-10 block p-1 transition-colors duration-300 transform rounded-full focus:outline-none border-2 border-blue-500 bg-blue-100 hover:bg-amber-200">
        <Image
          src="/add.svg"
          alt="add"
          width={35}
          height={35}
        />
      </button>
    </div>
    <div className="text-center">
      <button className="relative z-10 block p-1 transition-colors duration-300 transform rounded-full focus:outline-none border-2 border-blue-500 bg-blue-100 hover:bg-amber-200">
        <Image
          src="/receive.svg"
          alt="receive"
          width={35}
          height={35}
          className="p-1"
        />
      </button>
    </div>

   

  </div>




   
    </div>
    {/* end can help image */}
    <div className="flex-1 flex flex-col sm:flex-row flex-wrap -mb-4 -mx-2">
      <div className="w-full sm:w-1/2 mb-4 px-2 ">
        <div className="h-full py-4 px-6 border border-green-500 border-t-0 border-l-0 rounded-br-xl">
        <h2 className="text-3xl md:text-5xl text-blue-600 font-semibold">
                        Bank Account (2)
                    </h2>
        <div className="mx-8 text-gray-500">
          <p className="text-md"> 
            DBS BANK - XXXXX3162
          </p>
                 <p className="text-md"> 
            BANK OF CHINA - XXXX444
          </p>
<div className="flex justify-end">
          <button type="button"className="text-blue-500 hover:text-blue-700">

<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style={{enableBackground: 'new 0 0 496 496'}} xmlSpace="preserve" width={32} height={32}><path style={{fill: '#008BF2'}} d="M32 20.697c0 6.245 -5.058 11.303 -11.303 11.303H11.303C5.058 32 0 26.942 0 20.697V11.303C0 5.058 5.058 0 11.303 0h9.394C26.942 0 32 5.058 32 11.303z" /><path style={{fill: '#0078EF'}} d="M0 11.303C0 5.058 5.058 0 11.303 0h9.394C26.942 0 32 5.058 32 11.303v9.394c0 6.245 -5.058 11.303 -11.303 11.303" /><path style={{fill: '#0071E2'}} d="M20.697 0C26.942 0 32 5.058 32 11.303v9.394c0 6.245 -5.058 11.303 -11.303 11.303" /><g><path style={{fill: '#FFFFFF'}} d="M19.303 16.774h-7.742c-0.413 0 -0.774 -0.361 -0.774 -0.774s0.361 -0.774 0.774 -0.774h7.742c0.413 0 0.774 0.361 0.774 0.774s-0.31 0.774 -0.774 0.774" /><path style={{fill: '#FFFFFF'}} d="M17.394 19.768c-0.206 0 -0.413 -0.052 -0.568 -0.206 -0.31 -0.31 -0.31 -0.774 0 -1.084l2.477 -2.477 -2.477 -2.477c-0.31 -0.31 -0.31 -0.774 0 -1.084s0.774 -0.31 1.084 0l2.994 2.994c0.31 0.31 0.31 0.774 0 1.084l-2.994 2.994c-0.155 0.206 -0.31 0.258 -0.516 0.258" /></g></svg>


</button>
</div>

          </div>
       </div>


      </div>

         <div className="w-full sm:w-1/2 mb-4 px-2 ">
        <div className="h-full py-4 px-6 border border-green-500 border-t-0 border-l-0 rounded-br-xl">
        <h2 className="text-3xl md:text-5xl text-amber-400 font-semibold">
                        Card (3)
                    </h2>
        <div className="mx-8 text-gray-500">
          <p className="text-md"> 
            MASTERCARD - XXXXXX4418
          </p>
                 <p className="text-md"> 
            VISA - XXXXXX1349
          </p>
          
<div className="flex justify-end">
          <button type="button"className="text-blue-500 hover:text-blue-700">

<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style={{enableBackground: 'new 0 0 496 496'}} xmlSpace="preserve" width={32} height={32}><path style={{fill: '#008BF2'}} d="M32 20.697c0 6.245 -5.058 11.303 -11.303 11.303H11.303C5.058 32 0 26.942 0 20.697V11.303C0 5.058 5.058 0 11.303 0h9.394C26.942 0 32 5.058 32 11.303z" /><path style={{fill: '#0078EF'}} d="M0 11.303C0 5.058 5.058 0 11.303 0h9.394C26.942 0 32 5.058 32 11.303v9.394c0 6.245 -5.058 11.303 -11.303 11.303" /><path style={{fill: '#0071E2'}} d="M20.697 0C26.942 0 32 5.058 32 11.303v9.394c0 6.245 -5.058 11.303 -11.303 11.303" /><g><path style={{fill: '#FFFFFF'}} d="M19.303 16.774h-7.742c-0.413 0 -0.774 -0.361 -0.774 -0.774s0.361 -0.774 0.774 -0.774h7.742c0.413 0 0.774 0.361 0.774 0.774s-0.31 0.774 -0.774 0.774" /><path style={{fill: '#FFFFFF'}} d="M17.394 19.768c-0.206 0 -0.413 -0.052 -0.568 -0.206 -0.31 -0.31 -0.31 -0.774 0 -1.084l2.477 -2.477 -2.477 -2.477c-0.31 -0.31 -0.31 -0.774 0 -1.084s0.774 -0.31 1.084 0l2.994 2.994c0.31 0.31 0.31 0.774 0 1.084l-2.994 2.994c-0.155 0.206 -0.31 0.258 -0.516 0.258" /></g></svg>


</button>
</div>

          </div>
       </div>

       
      </div>

         <div className="w-full sm:w-1/2 mb-4 px-2 ">
        <div className="h-full py-4 px-6 border border-green-500 border-t-0 border-l-0 rounded-br-xl">
        <h2 className="text-3xl md:text-5xl text-emerald-300 font-semibold">
                        Currency (3)
                    </h2>
        <div className="mx-8 text-gray-500">
          <p className="text-md"> 
            USD - Dollar
          </p>
                 <p className="text-md"> 
            CNY - China Yuan
          </p>
             <p className="text-md"> 
            THB - Thai Baht
          </p>
<div className="flex justify-end">
          <button type="button"className="text-blue-500 hover:text-blue-700">

<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style={{enableBackground: 'new 0 0 496 496'}} xmlSpace="preserve" width={32} height={32}><path style={{fill: '#008BF2'}} d="M32 20.697c0 6.245 -5.058 11.303 -11.303 11.303H11.303C5.058 32 0 26.942 0 20.697V11.303C0 5.058 5.058 0 11.303 0h9.394C26.942 0 32 5.058 32 11.303z" /><path style={{fill: '#0078EF'}} d="M0 11.303C0 5.058 5.058 0 11.303 0h9.394C26.942 0 32 5.058 32 11.303v9.394c0 6.245 -5.058 11.303 -11.303 11.303" /><path style={{fill: '#0071E2'}} d="M20.697 0C26.942 0 32 5.058 32 11.303v9.394c0 6.245 -5.058 11.303 -11.303 11.303" /><g><path style={{fill: '#FFFFFF'}} d="M19.303 16.774h-7.742c-0.413 0 -0.774 -0.361 -0.774 -0.774s0.361 -0.774 0.774 -0.774h7.742c0.413 0 0.774 0.361 0.774 0.774s-0.31 0.774 -0.774 0.774" /><path style={{fill: '#FFFFFF'}} d="M17.394 19.768c-0.206 0 -0.413 -0.052 -0.568 -0.206 -0.31 -0.31 -0.31 -0.774 0 -1.084l2.477 -2.477 -2.477 -2.477c-0.31 -0.31 -0.31 -0.774 0 -1.084s0.774 -0.31 1.084 0l2.994 2.994c0.31 0.31 0.31 0.774 0 1.084l-2.994 2.994c-0.155 0.206 -0.31 0.258 -0.516 0.258" /></g></svg>


</button>
</div>

          </div>
       </div>

       
      </div>

           <div className="w-full sm:w-1/2 mb-4 px-2 ">
        <div className="h-full py-4 px-6 border border-green-500 border-t-0 border-l-0 rounded-br-xl">
        <h2 className="text-3xl md:text-5xl text-indigo-300 font-semibold">
                        Receiver (3)
                    </h2>
        <div className="mx-8 text-gray-500">
          <p className="text-md"> 
            SAMAPORN J. - Kasokorn Bank - XXXXXXX359
          </p>
                 <p className="text-md"> 
            PIYATHIDA S. - Bangkok Bank - XXXXXXX210
          </p>
             <p className="text-md"> 
            SARANYA P. - Bank of Ayudthaya - XXXXXXX774
          </p>
<div className="flex justify-end">
          <button type="button"className="text-blue-500 hover:text-blue-700">

<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style={{enableBackground: 'new 0 0 496 496'}} xmlSpace="preserve" width={32} height={32}><path style={{fill: '#008BF2'}} d="M32 20.697c0 6.245 -5.058 11.303 -11.303 11.303H11.303C5.058 32 0 26.942 0 20.697V11.303C0 5.058 5.058 0 11.303 0h9.394C26.942 0 32 5.058 32 11.303z" /><path style={{fill: '#0078EF'}} d="M0 11.303C0 5.058 5.058 0 11.303 0h9.394C26.942 0 32 5.058 32 11.303v9.394c0 6.245 -5.058 11.303 -11.303 11.303" /><path style={{fill: '#0071E2'}} d="M20.697 0C26.942 0 32 5.058 32 11.303v9.394c0 6.245 -5.058 11.303 -11.303 11.303" /><g><path style={{fill: '#FFFFFF'}} d="M19.303 16.774h-7.742c-0.413 0 -0.774 -0.361 -0.774 -0.774s0.361 -0.774 0.774 -0.774h7.742c0.413 0 0.774 0.361 0.774 0.774s-0.31 0.774 -0.774 0.774" /><path style={{fill: '#FFFFFF'}} d="M17.394 19.768c-0.206 0 -0.413 -0.052 -0.568 -0.206 -0.31 -0.31 -0.31 -0.774 0 -1.084l2.477 -2.477 -2.477 -2.477c-0.31 -0.31 -0.31 -0.774 0 -1.084s0.774 -0.31 1.084 0l2.994 2.994c0.31 0.31 0.31 0.774 0 1.084l-2.994 2.994c-0.155 0.206 -0.31 0.258 -0.516 0.258" /></g></svg>


</button>
</div>

          </div>
       </div>

       
      </div>
 
    </div>
  </div>
</div>

    </div>
  
  )
}
export default Main
