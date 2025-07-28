'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const Hero = () => {
  const router = useRouter()
const { data: session } = useSession()

const handleStartClick = () => {
  if (!session) {
    // Usuario no ha iniciado sesión
    router.push('/auth/signin')
    return
  }

  const hasCompletedTutorial = localStorage.getItem('tutorialCompleted')
  if (hasCompletedTutorial) {
    router.push('/termometro')
  } else {
    router.push('/tutorial')
  }
};

  return (
    <section className="pt-35 xl:pb-5 xl:pt-40 overflow-hidden pb-20 md:pt-40">
      <div className="max-w-c-1390 mx-auto px-4 md:px-8 2xl:px-0">
        <div className="xl:gap-2.5 flex lg:items-center lg:gap-2">
          <div className="md:w-1/2">
            <h4 className="mb-4.5 text-lg ml-5 font-medium text-black dark:text-white">
              ✈️ Viaja - Que Nadie Te Detenga
            </h4>
            <h1 className="xl:text-hero mb-5 ml-5 pr-16 text-3xl font-bold text-black dark:text-white ">
            Obten Tu Visa, Aplica con Cabeza, No Con
              <span className="before:-z-1 before:bg-titlebg dark:before:bg-titlebgdark relative ml-2.5 inline-block before:absolute before:bottom-2.5 before:left-0 before:h-3 before:w-full">
              Suerte
              </span>
            </h1>
         
            <p className="ml-5">Gratis, rápido y sin compromiso.🔥</p>

            <div className="mt-10">
              <button
                onClick={handleStartClick}
                className="ml-5 px-7.5 hover:bg-blackho dark:bg-btndark dark:hover:bg-blackho inline-block rounded-full bg-black py-2.5 text-white duration-300 ease-in-out hover:scale-105 transition-transform"
              >
                Empieza
              </button>
            </div>
          </div>

          <div className="hidden md:w-1/2 lg:block">
            <div className="2xl:-mr-7.5 relative">
              <div className="aspect-700/444 relative w-full">
                <Image
                  src="/images/hero/ventana00.png"
                  alt="Ventana de avión"
                  width={500}
                  height={500}
                  className="rounded-[400px] object-cover shadow-lg"
                />
                <Image
                  className="shadow-solid-l hidden dark:block"
                  src="/images/hero/ventana00.png"
                  alt="Hero"
                  fill
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
