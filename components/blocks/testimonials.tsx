import React from 'react';
import Image from 'next/image';

const TestimonialsConveyor = () => {
  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      role: "Product Manager",
      company: "TechnoVision",
      content: "This platform revolutionized our entire workflow. The seamless integration and intuitive design made adoption effortless across our team.",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      id: 2,
      name: "Arjun Patel",
      role: "Software Engineer",
      company: "CodeCraft Solutions",
      content: "Exceptional performance and reliability. The robust architecture and clean codebase make it a developer's dream to work with.",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg"
    },
    {
      id: 3,
      name: "Sneha Gupta",
      role: "CEO",
      company: "InnovateNext",
      content: "Outstanding customer support and flawless execution. This solution delivered beyond our expectations and transformed our business operations.",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg"
    },
    {
      id: 4,
      name: "Rahul Verma",
      role: "Tech Lead",
      company: "DigitalForge",
      content: "The scalability and performance improvements are remarkable. Our system efficiency increased by 300% after implementation.",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg"
    },
    {
      id: 5,
      name: "Ananya Singh",
      role: "UX Designer",
      company: "CreativeMinds",
      content: "Beautiful interface with powerful functionality. The user experience is intuitive and the design system is incredibly well thought out.",
      avatar: "https://randomuser.me/api/portraits/women/5.jpg"
    },
    {
      id: 6,
      name: "Vikram Reddy",
      role: "Operations Director",
      company: "LogiFlow",
      content: "Streamlined our entire operation with measurable results. The automation features saved us countless hours and improved accuracy.",
      avatar: "https://randomuser.me/api/portraits/men/6.jpg"
    },
    {
      id: 7,
      name: "Kavya Nair",
      role: "Marketing Head",
      company: "BrandBoost",
      content: "The analytics and insights provided are game-changing. Our campaign performance improved dramatically with these powerful tools.",
      avatar: "https://randomuser.me/api/portraits/women/7.jpg"
    },
    {
      id: 8,
      name: "Amit Kumar",
      role: "CTO",
      company: "TechSphere",
      content: "Robust architecture and enterprise-grade security. This platform scales beautifully and handles our growing user base effortlessly.",
      avatar: "https://randomuser.me/api/portraits/men/8.jpg"
    },
    {
      id: 9,
      name: "Riya Mehta",
      role: "Data Scientist",
      company: "AnalyticsPro",
      content: "The machine learning capabilities are outstanding. Our predictive models improved accuracy by 40% using this platform.",
      avatar: "https://randomuser.me/api/portraits/women/9.jpg"
    },
    {
      id: 10,
      name: "Karthik Krishnan",
      role: "DevOps Engineer",
      company: "CloudTech",
      content: "Deployment became seamless with zero downtime. The automation tools saved us weeks of manual work.",
      avatar: "https://randomuser.me/api/portraits/men/10.jpg"
    }
  ];

  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <>
      <section className="bg-black py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              What Our Developers Say
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Don&apos;t just take our word for it - hear from our satisfied Developers
            </p>
          </div>

          <div className="relative">
            {/* Conveyor belt container */}
            <div className="overflow-hidden py-4">
              <div className="flex animate-scroll gap-6 items-start">
                {duplicatedTestimonials.map((testimonial, index) => (
                  <div
                    key={`${testimonial.id}-${index}`}
                    className="flex-shrink-0 w-80"
                  >
                    <div className="bg-black border border-gray-800 rounded-xl p-8 min-h-[320px] shadow-2xl hover:shadow-3xl transition-all duration-300 hover:border-gray-600 hover:bg-gray-950 flex flex-col justify-between hover:scale-[1.02] relative overflow-hidden">
                      {/* Subtle gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 to-transparent pointer-events-none"></div>
                      
                      {/* Quote icon */}
                      <div className="mb-6 relative z-10">
                        <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 32 32">
                          <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                        </svg>
                      </div>

                      {/* Testimonial content */}
                      <p className="text-gray-200 leading-relaxed text-sm mb-6 flex-grow relative z-10">
                        {testimonial.content}
                      </p>

                      {/* Star rating */}
                      <div className="flex text-yellow-400 mb-6 relative z-10">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-5 h-5 fill-current mr-1"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>

                      {/* Profile section */}
                      <div className="flex items-center relative z-10">
                        <div className="relative">
                          <Image
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            width={56}
                            height={56}
                            className="rounded-full object-cover border-2 border-gray-700 shadow-lg"
                          />
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-black"></div>
                        </div>
                        <div className="ml-4">
                          <h3 className="text-white font-bold text-base mb-1">
                            {testimonial.name}
                          </h3>
                          <p className="text-gray-300 text-sm font-medium">
                            {testimonial.role}
                          </p>
                          <p className="text-gray-400 text-sm">
                            {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 10s linear infinite;
          will-change: transform;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
        
        /* Ensure smooth scrolling */
        .animate-scroll > * {
          flex-shrink: 0;
        }
      `}</style>
    </>
  );
};

export default TestimonialsConveyor;