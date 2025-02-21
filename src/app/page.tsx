'use client';

import { useState } from 'react';
import VideoButton from '@/components/VideoButton';
import VideoPlayer from '@/components/VideoPlayer';
import { VideoProvider, useVideo } from '@/components/VideoContext';
import Image from 'next/image';
import Link from 'next/link';

interface VideoData {
  id: number;
  question: string;
  answer: string;
  videoUrl: string;
}

const videos: VideoData[] = [
  {
    id: 1,
    question: "What academic programs and degrees does the institution offer?",
    answer: "SWAU offers a variety of undergraduate and graduate programs across multiple disciplines, including liberal arts, sciences, education, and psychology. For a comprehensive list of programs and degrees, please refer to the university's academic catalog.",
    videoUrl: "https://res.cloudinary.com/djfiaa34u/video/upload/v1740097355/1_mtklma.mp4"
  },
  {
    id: 2,
    question: "What are the admission requirements?",
    answer: "Admission requirements vary depending on the applicant's background: Freshman Applicants: Typically need to submit high school transcripts and standardized test scores. Transfer Applicants: A minimum GPA of 2.0 is required. Applicants with fewer than 24 credits should also provide high school transcripts. RN to BS Nursing Applicants: Must have completed an associate degree or diploma program from an accredited institution and hold an active, unencumbered RN license. Provisional Applicants: Individuals over 25 who do not meet regular admission criteria may be considered on an individual basis. Placement scores in English and math are also required for both freshman and transfer students.",
    videoUrl: "https://res.cloudinary.com/djfiaa34u/video/upload/v1740097347/2_chsmma.mp4"
  },
  {
    id: 3,
    question: "Is there a financing plan available?",
    answer: "Yes, SWAU offers various financial aid options, including federal and state grants, loans, and scholarships. The Department of Student Financial Services can provide detailed information and assistance.",
    videoUrl: "https://res.cloudinary.com/djfiaa34u/video/upload/v1740097311/3_uh1f2b.mp4"
  },
  {
    id: 4,
    question: "What are the important dates for the admission and registration process?",
    answer: "For international students, application deadlines are May 1 for the fall semester and October 1 for the spring semester. Students must be fully admitted by June 1 for the fall semester and November 1 for the spring semester to allow sufficient time for obtaining an I-20 and student visa.",
    videoUrl: "https://res.cloudinary.com/djfiaa34u/video/upload/v1740097361/4_wipfvf.mp4"
  },
  {
    id: 5,
    question: "Does the university offer scholarships or financial aid? If so, what are the application requirements?",
    answer: "SWAU provides over 140 internal scholarships to undergraduate students, with 80% of undergraduates receiving scholarships. Application requirements vary by scholarship; it's recommended to contact the Student Financial Services office for specific details.",
    videoUrl: "https://res.cloudinary.com/djfiaa34u/video/upload/v1740097358/5_otbuxq.mp4"
  },
  {
    id: 6,
    question: "What is the application process for international students?",
    answer: "International applicants should submit their applications by the specified deadlines and ensure they are fully admitted by the dates mentioned above. Detailed admission requirements for international students can be found in the university's academic catalog.",
    videoUrl: "https://res.cloudinary.com/djfiaa34u/video/upload/v1740097320/6_atgydo.mp4"
  },
  {
    id: 7,
    question: "How can parents stay informed about their child's progress and well-being at the university?",
    answer: "Specific mechanisms for parental involvement are not outlined in the provided sources. Typically, universities offer parent portals or communication channels. For detailed information, please contact SWAU's student affairs or academic services departments.",
    videoUrl: "https://res.cloudinary.com/djfiaa34u/video/upload/v1740097330/7_qcmzo8.mp4"
  }
];

function HomeContent() {
  const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null);
  const { setVideo } = useVideo();

  const handleQuestionClick = (video: VideoData) => {
    console.log('🎥 Question clicked:', video.id);
    if (selectedVideo?.id === video.id) {
      console.log('⚠️ Same video clicked, ignoring');
      return;
    }
    console.log('🔄 Changing video to:', video.id);
    setSelectedVideo(video);
    setVideo(video.videoUrl);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tl from-[#06112a] via-[#04315f] to-[#012954] overflow-hidden">
      {/* Background Pattern */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1600')] opacity-[0.03] bg-cover bg-center mix-blend-overlay" />

        {/* Circular Lines Pattern */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {/* Mobile Circles (centered at top) */}
          <div className="lg:hidden absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2">
            <svg className="w-[600px] h-[600px]" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.4" />
                </linearGradient>
                <style>
                  {`
                    @keyframes scaleUp {
                      0% { 
                        r: 10;
                        opacity: 1;
                      }
                      100% { 
                        r: 45;
                        opacity: 0;
                      }
                    }
                    .circle-animate { 
                      animation: scaleUp 3s ease-out infinite;
                    }
                  `}
                </style>
              </defs>
              <g transform="translate(50, 50)">
                <circle fill="none" stroke="url(#circleGradient)" strokeWidth="0.5"
                  className="circle-animate"
                  style={{ animationDelay: '0s' }} />
                <circle fill="none" stroke="url(#circleGradient)" strokeWidth="0.5"
                  className="circle-animate"
                  style={{ animationDelay: '0.5s' }} />
                <circle fill="none" stroke="url(#circleGradient)" strokeWidth="0.5"
                  className="circle-animate"
                  style={{ animationDelay: '1s' }} />
                <circle fill="none" stroke="url(#circleGradient)" strokeWidth="0.5"
                  className="circle-animate"
                  style={{ animationDelay: '1.5s' }} />
                <circle fill="none" stroke="url(#circleGradient)" strokeWidth="0.5"
                  className="circle-animate"
                  style={{ animationDelay: '2s' }} />
                <circle fill="none" stroke="url(#circleGradient)" strokeWidth="0.5"
                  className="circle-animate"
                  style={{ animationDelay: '2.5s' }} />
              </g>
            </svg>
          </div>

          {/* Desktop Circles (right side) */}
          <div className="hidden lg:block fixed top-[calc(2rem+420px)] right-28 w-1/2 h-full">
            <div className="relative w-full max-w-md mx-auto">
              <svg className="w-[800px] h-[800px] absolute left-[53%] top-1/2 -translate-x-1/2 -translate-y-1/2" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="circleGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0.4" />
                  </linearGradient>
                  <style>
                    {`
                      @keyframes scaleUp {
                        0% { 
                          r: 10;
                          opacity: 1;
                        }
                        100% { 
                          r: 45;
                          opacity: 0;
                        }
                      }
                      .circle-animate { 
                        animation: scaleUp 3s ease-out infinite;
                      }
                    `}
                  </style>
                </defs>
                <g transform="translate(50, 50)">
                  <circle fill="none" stroke="url(#circleGradient2)" strokeWidth="0.5"
                    className="circle-animate"
                    style={{ animationDelay: '0s' }} />
                  <circle fill="none" stroke="url(#circleGradient2)" strokeWidth="0.5"
                    className="circle-animate"
                    style={{ animationDelay: '0.5s' }} />
                  <circle fill="none" stroke="url(#circleGradient2)" strokeWidth="0.5"
                    className="circle-animate"
                    style={{ animationDelay: '1s' }} />
                  <circle fill="none" stroke="url(#circleGradient2)" strokeWidth="0.5"
                    className="circle-animate"
                    style={{ animationDelay: '1.5s' }} />
                  <circle fill="none" stroke="url(#circleGradient2)" strokeWidth="0.5"
                    className="circle-animate"
                    style={{ animationDelay: '2s' }} />
                  <circle fill="none" stroke="url(#circleGradient2)" strokeWidth="0.5"
                    className="circle-animate"
                    style={{ animationDelay: '2.5s' }} />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-gradient-to-r from-[#06112a] to-[#012954] pt-4 pb-6 px-4 border-b border-white/10">
          <div className="container mx-auto">
            {/* Mobile Header */}
            <div className="lg:hidden flex items-center justify-center">
              <Link href="/" className="text-white">
                <Image src="/logo.svg" alt="SWAU Logo" width={180} height={51} className="h-12 w-auto brightness-0 invert" />
              </Link>
            </div>

            {/* Desktop Header */}
            <div className="hidden lg:flex items-center justify-center">
              <Link href="/" className="text-white">
                <Image src="/logo.svg" alt="SWAU Logo" width={240} height={68} className="h-16 w-auto brightness-0 invert" />
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
            {/* Video Section - Always on top in mobile */}
            <div className="order-1 lg:order-2 lg:w-1/2 lg:sticky lg:top-[calc(2rem+100px)] lg:self-start relative z-10">
              <div className="w-full max-w-sm mx-auto lg:max-w-md">
                <div className="rounded-xl overflow-hidden bg-black/40 border border-slate-700/50 shadow-[0_0_25px_rgba(56,189,248,0.15)]">
                  <VideoPlayer />
                </div>
              </div>
            </div>

            {/* Questions List */}
            <div className="order-2 lg:order-1 lg:w-1/2 space-y-3 relative z-10">
              {videos.map((video) => (
                <VideoButton
                  key={video.id}
                  video={video}
                  onClick={() => handleQuestionClick(video)}
                  isActive={selectedVideo?.id === video.id}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <VideoProvider>
      <HomeContent />
    </VideoProvider>
  );
}
