"use client";

import Image from "next/image";
import { MotionDiv } from "@/app/libs/framer-utls";

const About = () => {
  return (
    <>
      {/* <!-- ===== About Start ===== --> */}
      <section>
      <div className="mx-auto max-w-c-1235 px-4 md:px-8 xl:px-0">
        <div className="flex items-center gap-8 lg:gap-32.5">
          <MotionDiv
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0 },
            }}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="relative mx-auto block w-full md:w-1/2"
          >
            {/* Light mode image */}
            <Image
              src="/images/about/foto0001.png"
              alt="Termómetro Migratorio"
              width={1176}      // doble resolución para retina
              height={1053}     // ajusta para mantener proporción 588×526 → 1176×1052
              className="object-contain dark:hidden"
            />

            {/* Dark mode image */}
            <Image
              src="/images/about/.png"
              alt="Termómetro Migratorio (oscuro)"
              width={1176}
              height={1053}
              className="hidden dark:block object-contain"
            />
          </MotionDiv>
            <MotionDiv
              variants={{
                hidden: {
                  opacity: 0,
                  x: 20,
                },

                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_right md:w-1/2 mb-17"
            >
              <h4 className="font-medium uppercase text-black dark:text-white">
                <span className="mb-4 mr-4 inline-flex rounded-full bg-meta px-4.5 py-1 text-metatitle uppercase text-white ">
                  NUEVO
                </span>{" "}
                Producto
              </h4>
  
              <h2 className="relative mb-6 text-3xl font-bold text-black dark:text-white xl:text-hero">
                Termómetro 
                <span className="relative ml-2.5 inline-block before:absolute before:bottom-2.5 before:left-0 before:-z-1 before:h-3 before:w-full before:bg-titlebg dark:before:bg-titlebgdark">
                  Migratorío
                </span>
              </h2>
              <p>
              Calcula las posibilidades de obtener la VISA que deseas.
              </p>

           
              <div> 
                <a
                  href="#"
                  className="group mt-7.5 inline-flex items-center gap-2.5 text-black hover:text-primary dark:text-white dark:hover:text-primary"
                >
                  <span className="duration-300 group-hover:pr-2">
                    Conoce Más
                  </span>

                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.4766 6.16664L6.00658 1.69664L7.18492 0.518311L13.6666 6.99998L7.18492 13.4816L6.00658 12.3033L10.4766 7.83331H0.333252V6.16664H10.4766Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
              </div>

              
            </MotionDiv>
          </div>
        </div>
      </section>
      {/* <!-- ===== About End ===== --> */}

      {/* <!-- ===== About Two Start ===== --> */}
      <section>
        <div className="mx-auto max-w-c-1235 overflow-hidden px-4 md:px-8 2xl:px-0">
          <div className="flex items-center gap-8 lg:gap-32.5 ">
            <MotionDiv
              variants={{
                hidden: {
                  opacity: 0,
                  x: -20,
                },

                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_left md:w-1/2 "
            >
              <h4 className="font-medium uppercase text-black dark:text-white">
                <span className="mb-4 mr-4 inline-flex rounded-full bg-black px-4.5 py-1 text-metatitle uppercase text-white ">
                  PRÓXIMAMENTE
                </span>{" "}
          
              </h4>
              <h2 className="relative mb-6 text-3xl font-bold text-black dark:text-white xl:text-hero">
                Calculadora 
                <span className="relative ml-2.5 inline-block before:absolute before:bottom-2.5 before:left-0 before:-z-1 before:h-3 before:w-full before:bg-titlebg2 dark:before:bg-titlebgdark">
                  Migratoría
                </span>
              </h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                ultricies lacus non fermentum ultrices. Fusce consectetur le.
              </p>
              <div>
                <a
                  href="#"
                  className=" group mt-7.5 inline-flex items-center gap-2.5 text-black hover:text-primary dark:text-white dark:hover:text-primary"
                >
                  <span className="duration-300 group-hover:pr-2">
                    Conoce Más
                  </span>

                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.4766 6.16664L6.00658 1.69664L7.18492 0.518311L13.6666 6.99998L7.18492 13.4816L6.00658 12.3033L10.4766 7.83331H0.333252V6.16664H10.4766Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
              </div>
            </MotionDiv>
            <MotionDiv
              variants={{
                hidden: {
                  opacity: 0,
                  x: 20,
                },

                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_right relative mx-auto hidden aspect-[588/526.5] md:block md:w-1/2 mt-17.5"
            >
              <Image
              src="/images/about/foto0001.png"
              alt="Termómetro Migratorio"
              width={1176}      // doble resolución para retina
              height={1053}     // ajusta para mantener proporción 588×526 → 1176×1052
              className="object-contain dark:hidden"
            />

            {/* Dark mode image */}
            <Image
              src="/images/about/.png"
              alt="Termómetro Migratorio (oscuro)"
              width={1176}
              height={1053}
              className="hidden dark:block object-contain"
            />
            </MotionDiv>
          </div>
        </div>
      </section>
      {/* <!-- ===== About Two End ===== --> */}


 {/* <!-- ===== About Start ===== --> */}
 <section className="overflow-hidden pb-20 lg:pb-25 xl:pb-30">
        <div className="mx-auto max-w-c-1235 px-4 md:px-8 xl:px-0">
          <div className="flex items-center gap-8 lg:gap-32.5 ">
          <MotionDiv
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0 },
            }}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="relative mx-auto block w-full md:w-1/2"
          >
            {/* Light mode image */}
            <Image
              src="/images/about/foto0001.png"
              alt="Termómetro Migratorio"
              width={1176}      // doble resolución para retina
              height={1053}     // ajusta para mantener proporción 588×526 → 1176×1052
              className="object-contain dark:hidden"
            />

            {/* Dark mode image */}
            <Image
              src="/images/about/.png"
              alt="Termómetro Migratorio (oscuro)"
              width={1176}
              height={1053}
              className="hidden dark:block object-contain"
            />
          </MotionDiv>
            <MotionDiv
              variants={{
                hidden: {
                  opacity: 0,
                  x: 20,
                },

                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_right md:w-1/2 mb-17"
            >
              <h4 className="font-medium uppercase text-black dark:text-white">
              <span className="mb-4 mr-4 inline-flex rounded-full bg-black px-4.5 py-1 text-metatitle uppercase text-white ">
                  PRÓXIMAMENTE
                </span>{" "}
              </h4>
  
              <h2 className="relative mb-6 text-3xl font-bold text-black dark:text-white xl:text-hero">
                Metricas 
                <span className="relative ml-2.5 inline-block before:absolute before:bottom-2.5 before:left-0 before:-z-1 before:h-3 before:w-full before:bg-titlebg dark:before:bg-titlebgdark">
                  Embajadas
                </span>
              </h2>
              <p>
              Conoce las embajadas que mas 
              </p>

           
              <div> 
                <a
                  href="#"
                  className="group mt-7.5 inline-flex items-center gap-2.5 text-black hover:text-primary dark:text-white dark:hover:text-primary"
                >
                  <span className="duration-300 group-hover:pr-2">
                    Conoce Más
                  </span>

                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.4766 6.16664L6.00658 1.69664L7.18492 0.518311L13.6666 6.99998L7.18492 13.4816L6.00658 12.3033L10.4766 7.83331H0.333252V6.16664H10.4766Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
              </div>

              
            </MotionDiv>
          </div>
        </div>
      </section>
      
    </>
  );
};

export default About;
