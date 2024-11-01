import { curve, heroBackground, heroimg } from "../assets";
import Button from "./Button";
// import Section from "./Section";
// import { BackgroundCircles, BottomLine, Gradient } from "./design/Hero";
// import { heroIcons } from "../constants";
// import { ScrollParallax } from "react-just-parallax";
// import { useRef } from "react";
// import Generating from "./Generating";
// import Notification from "./Notification";
// import CompanyLogos from "./CompanyLogos";

// const Hero = () => {
//   const parallaxRef = useRef(null);

//   return (
//     <Section
//       className="pt-[12rem] -mt-[5.25rem]"
//       crosses
//       crossesOffset="lg:translate-y-[5.25rem]"
//       customPaddings
//       id="hero"
//     >
//       <div className="container relative" ref={parallaxRef}>
//         <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
//           <h1 className="h1 mb-6">
//             Empower Your &nbsp;Solar Grid Management&nbsp;with {` `}
//             <span className="inline-block relative">
//               SolarOps{" "}
//               <img
//                 src={curve}
//                 className="absolute top-full left-0 w-full xl:-mt-2"
//                 width={624}
//                 height={28}
//                 alt="Curve"
//               />
//             </span>
//           </h1>
//           <p className="body-1 max-w-3xl mx-auto mb-6 text-n-2 lg:mb-8">
//             Optimize solar panel placement and boost grid performance with
//             actionable insights
//           </p>
//           <Button href="/pricing" white>
//             Find Best Installation Sites Now
//           </Button>
//         </div>
//         <div className="relative max-w-[23rem] mx-auto md:max-w-5xl xl:mb-24">
//           <div className="relative z-1 p-0.5 rounded-2xl bg-conic-gradient">
//             <div className="relative bg-n-8 rounded-[1rem]">
//               <div className="h-[1.4rem] bg-n-10 rounded-t-[0.9rem]" />

//               <div className="aspect-[33/40] rounded-b-[0.9rem] overflow-hidden md:aspect-[688/490] lg:aspect-[1024/490]">
//                 <img
//                 src={heroimg}
//                 className="w-full scale-[1.2] translate-y-[5%] md:scale-[1] md:-translate-y-[2%] lg:-translate-y-[1%] object-cover"
//                 width={1024}
//                 height={490}
//                 alt="AI"
//               />


//                 <Generating className="absolute left-4 right-4 bottom-5 md:left-1/2 md:right-auto md:bottom-8 md:w-[31rem] md:-translate-x-1/2" />

//                 <ScrollParallax isAbsolutelyPositioned>
//                   <ul className="hidden absolute -left-[5.5rem] bottom-[7.5rem] px-1 py-1 bg-n-9/40 backdrop-blur border border-n-1/10 rounded-2xl xl:flex">
//                     {heroIcons.map((icon, index) => (
//                       <li className="p-5" key={index}>
//                         <img src={icon} width={24} height={25} alt={icon} />
//                       </li>
//                     ))}
//                   </ul>
//                 </ScrollParallax>

//                 <ScrollParallax isAbsolutelyPositioned>
//                   <Notification
//                     className="hidden absolute -right-[5.5rem] bottom-[11rem] w-[18rem] xl:flex"
//                     title="Code generation"
//                   />
//                 </ScrollParallax>
//               </div>
//             </div>

//             <Gradient />
//           </div>
//           <div className="absolute -top-[54%] left-1/2 w-[234%] -translate-x-1/2 md:-top-[46%] md:w-[138%] lg:-top-[104%]">
//             <img
//               src={heroBackground}
//               className="w-full"
//               width={1440}
//               height={1800}
//               alt="hero"
//             />
//           </div>

//           <BackgroundCircles />
//         </div>

//         <CompanyLogos className="hidden relative z-10 mt-20 lg:block" />
//       </div>

//       <BottomLine />
//     </Section>
//   );
// };

// export default Hero;

import Section from "./Section";
import { BackgroundCircles, BottomLine, Gradient } from "./design/Hero";
import { heroIcons } from "../constants";
import { ScrollParallax } from "react-just-parallax";
import { useRef } from "react";
import Generating from "./Generating";
import Notification from "./Notification";
import CompanyLogos from "./CompanyLogos";

const Hero = () => {
  const parallaxRef = useRef(null);

  return (
    <Section
      className="pt-[0rem] mt-0" // Adjusted padding
      crosses
      crossesOffset="lg:translate-y-[5rem]" // Adjusted translate offset
      customPaddings
      id="hero"
    >
      <div className="container relative" ref={parallaxRef}>
        {/* Container for the content and GIF */}
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between mx-auto max-w-[80rem]">
          {/* Left side with text */}
          <div className="lg:w-1/2 text-left mb-8 lg:mb-0 lg:mr-20">
            {" "}
            {/* Added margin-right for spacing */}
            <h1 className="h1 mb-6 ml-8 text-left">
              {" "}
              {/* Centered to the left */}
              Empower Your Solar Grid Management&nbsp;with {` `}
              <span className="inline-block relative">
                SolarOps{" "}
                <img
                  src={curve}
                  className="absolute top-full left-0 w-full xl:-mt-2"
                  width={624}
                  height={28}
                  alt="Curve"
                />
              </span>
            </h1>
            <p className="body-1 mt-6 max-w-3xl mb-6 text-n-2 lg:mb-8">
              Optimize solar panel placement and boost grid performance with
              actionable insights
            </p>
            <div className="flex justify-center px-20 my-14">
              {" "}
              {/* Centering the button */}
              <Button href="/pricing" white>
                Find Best Installation Sites Now
              </Button>
            </div>
          </div>

          {/* Right side with GIF */}
          <div className="lg:w-1/2 flex justify-end">
            {" "}
            {/* Align the GIF to the right */}
            <div className="relative rounded-lg overflow-hidden shadow-lg aspect-w-16 aspect-h-9 ">
              <img
                src="/video.gif"
                alt="Animated solar grid management"
                className="object-cover w-full h-full max-h-[800px] lg:max-h-[900px]" // Increased max height here
              />
            </div>
          </div>
        </div>

        {/* Additional content like Generating component, Background circles, etc. */}
        <div className="relative max-w-[23rem] mx-auto md:max-w-5xl xl:mb-24">
          <div className="relative z-10 p-0.5 rounded-2xl bg-conic-gradient">
            <div className="relative bg-n-8 rounded-[1rem]">
              <div className="h-[1.4rem] bg-n-10 rounded-t-[0.9rem]" />
              <div className="aspect-[33/40] rounded-b-[0.9rem] overflow-hidden md:aspect-[688/490] lg:aspect-[1024/490]">
                <img
                  src={heroimg}
                  className="w-full scale-[1.2] translate-y-[5%] md:scale-[1] md:-translate-y-[2%] lg:-translate-y-[1%] object-cover"
                  width={1024}
                  height={490}
                  alt="AI"
                />
                <Generating className="absolute left-4 right-4 bottom-5 md:left-1/2 md:right-auto md:bottom-8 md:w-[31rem] md:-translate-x-1/2" />
                <ScrollParallax isAbsolutelyPositioned>
                  <ul className="hidden absolute -left-[5.5rem] bottom-[7.5rem] px-1 py-1 bg-n-9/40 backdrop-blur border border-n-1/10 rounded-2xl xl:flex">
                    {heroIcons.map((icon, index) => (
                      <li className="p-5" key={index}>
                        <img src={icon} width={24} height={25} alt={icon} />
                      </li>
                    ))}
                  </ul>
                </ScrollParallax>
                <ScrollParallax isAbsolutelyPositioned>
                  <Notification
                    className="hidden absolute -right-[5.5rem] bottom-[11rem] w-[18rem] xl:flex"
                    title="Power generation"
                  />
                </ScrollParallax>
              </div>
            </div>
            <Gradient />
          </div>
          <div className="absolute -top-[54%] left-1/2 w-[234%] -translate-x-1/2 md:-top-[46%] md:w-[138%] lg:-top-[104%]">
            <img
              src={heroBackground}
              className="w-full"
              width={2000}
              height={3500}
              alt="hero"
              style={{ opacity: 0.3 }} // Adjust the opacity value as needed
            />
          </div>
          <BackgroundCircles />
        </div>

        <CompanyLogos className="hidden relative z-10 mt-20 lg:block" />
      </div>

      <BottomLine />
    </Section>
  );
};

export default Hero;