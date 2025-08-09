'use client'

import { useRouter } from 'next/navigation';
import { Lightbulb, Database, Share2, FileCode, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import ChatWidget from '@/components/ChatWidget';

// Tech logos as SVG components
const TechLogos = () => {
  const logos = [
  
    <svg key="mysql" viewBox="0 0 24 24" className="w-8 h-8 fill-current text-blue-400/20">
      <path d="M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.273.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.14-.04-.067-.126-.1-.18-.153zM5.77 18.695h-.927a50.854 50.854 0 00-.27-4.41h-.008l-1.41 4.41H2.45l-1.4-4.41h-.01a72.892 72.892 0 00-.195 4.41H.002C.055 17.923.111 16.94.173 15.95h1.38l1.217 3.896h.014l1.34-3.896h1.434c.065.988.123 1.97.18 2.744zM9.97 18.695h-.956a7.571 7.571 0 01-1.064-3.562c-.06-.526-.211-.994-.633-1.294-.263-.192-.735-.326-1.617-.326C5.64 13.508 5.6 13.513 5.565 13.513v5.18H4.57c0-.704.013-1.11.013-1.11V13.513c-.362.003-.743.016-1.113.016v-.956c.37-.002.751-.016 1.113-.016 0 0-.013-.333-.013-.956h.956c0 .623.013.956.013.956.396 0 .742-.002 1.15-.002.454 0 .825.062 1.204.244.757.364 1.016 1.074 1.016 1.894 0 1.475-.619 2.775-1.274 3.562h1.285c.65-.787 1.235-2.087 1.235-3.562 0-.82-.26-1.53-1.016-1.894-.38-.182-.75-.244-1.204-.244-.408 0-.754.002-1.15.002 0 0-.013-.333-.013-.956h.956c0 .623.013.956.013.956.37 0 .751.014 1.113.016v.956c-.362 0-.743-.013-1.113-.016v5.18h-.956V13.513c-.035 0-.075-.005-.136-.005.882 0 1.354.134 1.617.326.422.3.573.768.633 1.294.09 1.325.505 2.565 1.064 3.562zm1.247-4.415c-.016 1.185-.026 2.37-.026 3.415h-.956c0-1.045.01-2.23.026-3.415h.956zm6.294 3.415c-.654.787-1.234 2.087-1.234 3.562 0 .82.26 1.53 1.016 1.894.38.182.75.244 1.204.244.408 0 .754-.002 1.15-.002 0 0 .013.333.013.956h-.956c0-.623-.013-.956-.013-.956-.37 0-.751-.014-1.113-.016v-.956c.362 0 .743.013 1.113.016v-5.18h.956c0 .704-.013 1.11-.013 1.11v5.18c.035 0 .075.005.136.005-.882 0-1.354-.134-1.617-.326-.422-.3-.573-.768-.633-1.294-.09-1.325-.505-2.565-1.064-3.562h1.285zm3.233 1.147c-.016-1.185-.026-2.37-.026-3.415h.956c0 1.045-.01 2.23-.026 3.415h-.956z"/>
    </svg>,
 
    <svg key="postgresql" viewBox="0 0 24 24" className="w-8 h-8 fill-current text-blue-300/20">
      <path d="M23.111 5.266c-.047 1.075-.611 1.83-1.268 2.49-.657.661-1.415 1.226-2.49 1.268-1.075.047-1.83-.611-2.49-1.268C16.201 7.096 15.636 6.34 15.594 5.266c-.047-1.075.611-1.83 1.268-2.49.657-.661 1.415-1.226 2.49-1.268 1.075-.047 1.83.611 2.49 1.268.661.657 1.226 1.415 1.268 2.49zm-9.85 7.32c-.042-.937-.697-1.662-1.465-1.617-.768.042-1.35.826-1.307 1.763.042.937.697 1.662 1.465 1.617.768-.042 1.35-.826 1.307-1.763z"/>
    </svg>,
    
    <svg key="mongodb" viewBox="0 0 24 24" className="w-8 h-8 fill-current text-green-400/20">
      <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.75-.741-1.057C11.75.179 11.635 0 11.635 0c-.054.229-.127.459-.238.709-.297.651-.652 1.379-1.01 2.229C8.914 6.625 8.5 8.818 8.5 10.229c0 2.016.666 3.496 1.229 4.496.563 1 1.229 1.229 1.229 2.496 0 1.496-.666 2.229-1.229 2.996-.563.767-1.229 1.229-1.229 2.229 0 .666.666 1.229 1.229 1.229.563 0 1.229-.563 1.229-1.229 0-1 .666-1.496 1.229-2.229.563-.733 1.229-1.5 1.229-2.996 0-1.267-.666-1.496-1.229-2.496-.563-1-1.229-2.48-1.229-4.496 0-1.411.414-3.604 1.887-7.291.358-.85.713-1.578 1.01-2.229.111-.25.184-.48.238-.709 0 0-.115.179-.245.583-.211.307-.461.663-.741 1.057-.321.701-3.309 2.535-4.573 8.115z"/>
    </svg>,
   
    <svg key="sqlite" viewBox="0 0 24 24" className="w-8 h-8 fill-current text-yellow-400/20">
      <path d="M21.678 2.115c-.208-.026-.416-.04-.626-.04H2.946c-.21 0-.418.014-.626.04C1.022 2.206.322 2.906.23 4.204c-.026.208-.04.416-.04.626v14.34c0 .21.014.418.04.626.092 1.298.792 1.998 2.09 2.09.208.026.416.04.626.04h18.106c.21 0 .418-.014.626-.04 1.298-.092 1.998-.792 2.09-2.09.026-.208.04-.416.04-.626V4.83c0-.21-.014-.418-.04-.626-.092-1.298-.792-1.998-2.09-2.089z"/>
    </svg>,
  
    <svg key="nodejs" viewBox="0 0 24 24" className="w-8 h-8 fill-current text-green-500/20">
      <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.570,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.276-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z"/>
    </svg>,
  
    <svg key="react" viewBox="0 0 24 24" className="w-8 h-8 fill-current text-cyan-400/20">
      <path d="M14.23 12.004a2.236 2.236 0 01-2.235 2.236 2.236 2.236 0 01-2.236-2.236 2.236 2.236 0 012.235-2.236 2.236 2.236 0 012.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.36-.034-.47 0-.92.014-1.36.034.44-.572.895-1.096 1.36-1.564zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.866.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.099-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.36.034.47 0 .92-.014 1.36-.034-.44.572-.895 1.095-1.36 1.56-.455-.42-.91-.94-1.36-1.56z"/>
    </svg>,

    <svg key="javascript" viewBox="0 0 24 24" className="w-8 h-8 fill-current text-yellow-500/20">
      <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
    </svg>,

    <svg key="typescript" viewBox="0 0 24 24" className="w-8 h-8 fill-current text-blue-500/20">
      <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0H1.125zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 011.306.34v2.458a3.95 3.95 0 00-.643-.361 5.093 5.093 0 00-.717-.26 5.453 5.453 0 00-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 00-.623.242c-.17.104-.3.229-.393.374a.888.888 0 00-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 01-1.012 1.085 4.38 4.38 0 01-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 01-1.84-.164 5.544 5.544 0 01-1.512-.493v-2.63a5.033 5.033 0 003.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 00-.074-1.089 2.12 2.12 0 00-.537-.5 5.597 5.597 0 00-.807-.444 27.72 27.72 0 00-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 011.47-.629 7.536 7.536 0 011.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/>
    </svg>,
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {logos.map((logo, index) => (
        <div
          key={index}
          className={`absolute animate-float-${index % 6 + 1}`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${15 + Math.random() * 10}s`,
          }}
        >
          {logo}
        </div>
      ))}
    </div>
  );
};

export default function HowToUsePage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const steps = [
    {
      icon: <Lightbulb className="h-8 w-8 text-yellow-400" />,
      title: "1. Describe Your Idea",
      description: "Start by writing a natural language description of what you need. For example, 'A blog with users, posts, and comments' or 'An e-commerce store with products and orders.' The more detail, the better!",
      gradient: "from-yellow-400/20 to-orange-400/20"
    },
    {
      icon: <Database className="h-8 w-8 text-sky-400" />,
      title: "2. Generate Everything",
      description: "Click the 'Generate' button. Our AI will instantly analyze your request and create a complete database design, including tables, columns, and relationships.",
      gradient: "from-sky-400/20 to-blue-400/20"
    },
    {
      icon: <Share2 className="h-8 w-8 text-green-400" />,
      title: "3. Review Your Results",
      description: "Your results appear in two clear sections: a visual ER Diagram showing how your tables connect, and the complete SQL code, ready to be used.",
      gradient: "from-green-400/20 to-emerald-400/20"
    },
    {
      icon: <FileCode className="h-8 w-8 text-purple-400" />,
      title: "4. Copy or Download",
      description: "Use the 'Copy' and 'Download' buttons to get your generated SQL. Paste it directly into your database tool or save it as a .sql file for later.",
      gradient: "from-purple-400/20 to-pink-400/20"
    }
  ];

  if (!mounted) return null;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white relative overflow-hidden">
      {/* Floating Tech Logos Background */}
      <TechLogos />
      
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/5 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-500/20 mb-6">
            <span className="text-sm font-medium text-blue-400 px-3 py-1">How It Works</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 animate-gradient-x">
              Transform Ideas Into
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 animate-gradient-x">
              Database Schemas
            </span>
          </h1>
          <p className="text-xl text-gray-300 mt-6 max-w-3xl mx-auto leading-relaxed">
            Experience the magic of AI-powered database design. From concept to complete schema in just four simple steps.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-20">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`group relative bg-gradient-to-br ${step.gradient} backdrop-blur-sm p-8 rounded-3xl border border-white/10 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105`}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 rounded-3xl transition-all duration-500"></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-gradient-to-r from-gray-800/80 to-gray-700/80 backdrop-blur-sm p-4 rounded-2xl border border-white/10 group-hover:border-purple-400/50 transition-all duration-300">
                    {step.icon}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white group-hover:text-purple-200 transition-colors duration-300">
                    {step.title}
                  </h2>
                </div>
                <p className="text-gray-300 leading-relaxed text-lg group-hover:text-gray-200 transition-colors duration-300">
                  {step.description}
                </p>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="inline-flex flex-col items-center gap-6">
            <div className="text-gray-400 text-lg font-medium">
              Ready to build your database?
            </div>
            <button
              onClick={() => router.push('/main')}
              className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold py-5 px-10 rounded-full shadow-2xl hover:shadow-purple-500/40 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-500/50 overflow-hidden"
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 animate-gradient-x"></div>
              
              {/* Button content */}
              <span className="relative z-10 text-lg">Get Started Now</span>
              <ArrowRight className="relative z-10 h-6 w-6 transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110" />
              
              {/* Glow effect */}
              <div className="absolute inset-0 bg-white/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Additional info */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">⚡</div>
              <div className="text-sm text-gray-400">Lightning Fast</div>
              <div className="text-xs text-gray-500 mt-1">Generate schemas in seconds</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">🎯</div>
              <div className="text-sm text-gray-400">AI Powered</div>
              <div className="text-xs text-gray-500 mt-1">Smart analysis & optimization</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">🚀</div>
              <div className="text-sm text-gray-400">Production Ready</div>
              <div className="text-xs text-gray-500 mt-1">Copy & paste into your DB</div>
            </div>
          </div>
        </div>

        {/* Shortcuts & FAQ */}
        <div className="max-w-6xl mx-auto mt-20 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-2xl font-semibold mb-4">Keyboard Shortcuts</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><span className="text-white">Enter</span> to send in chat</li>
              <li><span className="text-white">Shift + Enter</span> for newline</li>
              <li><span className="text-white">Ctrl/Cmd + Enter</span> to submit prompt</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-2xl font-semibold mb-4">FAQ</h3>
            <details className="mb-3">
              <summary className="cursor-pointer text-white">Can I edit the generated schema?</summary>
              <p className="mt-2 text-sm text-gray-300">Yes, open the ER Diagram Editor to tweak entities and relationships.</p>
            </details>
            <details className="mb-3">
              <summary className="cursor-pointer text-white">Which databases are supported?</summary>
              <p className="mt-2 text-sm text-gray-300">PostgreSQL, MySQL, MongoDB, and Prisma schema are generated.</p>
            </details>
            <details>
              <summary className="cursor-pointer text-white">How do I export?</summary>
              <p className="mt-2 text-sm text-gray-300">Use copy or download in the output panels, or export from the editor.</p>
            </details>
          </div>
        </div>
      </div>

      {/* Custom styles */}
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        
        @keyframes float-1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes float-2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-180deg); }
        }
        
        @keyframes float-3 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(90deg); }
        }
        
        @keyframes float-4 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-18px) rotate(-90deg); }
        }
        
        @keyframes float-5 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-22px) rotate(270deg); }
        }
        
        @keyframes float-6 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-16px) rotate(-270deg); }
        }
        
        .animate-float-1 { animation: float-1 20s ease-in-out infinite; }
        .animate-float-2 { animation: float-2 18s ease-in-out infinite; }
        .animate-float-3 { animation: float-3 22s ease-in-out infinite; }
        .animate-float-4 { animation: float-4 19s ease-in-out infinite; }
        .animate-float-5 { animation: float-5 21s ease-in-out infinite; }
        .animate-float-6 { animation: float-6 17s ease-in-out infinite; }
        
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
        
        .bg-grid-pattern {
          background-image: radial-gradient(circle, #374151 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}</style>
    {/* Floating chat widget */}
    <ChatWidget />
    </div>
  );
}