'use client';

import { useState, useRef, useEffect } from 'react';
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
    question: "Who are the academic authorities of the institution?",
    answer: "Texas A&M University is governed by a Board of Regents appointed by the Governor of Texas. The university's leadership is headed by a Chancellor and a Provost who oversees academic affairs. Deans and department chairs further guide and implement academic policies.",
    videoUrl: "https://res.cloudinary.com/djfiaa34u/video/upload/v1740149817/a_ljjuci.mp4"
  },
  {
    id: 2,
    question: "What academic programs and degrees does the institution offer?",
    answer: "Texas A&M offers a wide range of undergraduate, graduate, and professional programs. Its academic portfolio includes degrees in fields such as engineering, agriculture, business, veterinary medicine, liberal arts, sciences, architecture, and more, reflecting its status as a leading public research institution.",
    videoUrl: "https://res.cloudinary.com/djfiaa34u/video/upload/v1740149723/b_vt6ona.mp4"
  },
  {
    id: 3,
    question: "What are the admission requirements?",
    answer: "Admission requirements vary by program. For undergraduate applicants, the process typically includes submission of high school transcripts, standardized test scores (SAT/ACT), letters of recommendation, and personal essays. Graduate applicants are generally required to hold a bachelor's degree.",
    videoUrl: "https://res.cloudinary.com/djfiaa34u/video/upload/v1740149826/c_wksi6y.mp4"
  },
  {
    id: 4,
    question: "Is there a financing plan available?",
    answer: "The university offers various financing options, including federal and state financial aid, scholarships, grants, work-study programs, and payment plans. The Office of Financial Aid is available to assist students with navigating these options.",
    videoUrl: "https://res.cloudinary.com/djfiaa34u/video/upload/v1740149803/d_kayiec.mp4"
  },
  {
    id: 5,
    question: "What are the important dates for the admission and registration process?",
    answer: "For fall admissions, application deadlines usually range from December to January for early decision/action, with final deadlines in March or April. New student registration typically takes place during the summer prior to the fall semester.",
    videoUrl: "https://res.cloudinary.com/djfiaa34u/video/upload/v1740149767/e_fx2ggo.mp4"
  },
  {
    id: 6,
    question: "Does the university offer scholarships or financial aid? If so, what are the application requirements?",
    answer: "Texas A&M provides numerous scholarships and financial aid packages, both merit- and need-based. Specific application requirements vary by award, so prospective students should consult the financial aid office.",
    videoUrl: "https://res.cloudinary.com/djfiaa34u/video/upload/v1740149726/f_emctv3.mp4"
  },
  {
    id: 7,
    question: "What is the application process for international students?",
    answer: "International applicants must complete the standard application, provide proof of English proficiency (TOEFL or IELTS scores), submit academic transcripts, and meet visa requirements.",
    videoUrl: "https://res.cloudinary.com/djfiaa34u/video/upload/v1740155638/7_bfsp0e.mp4"
  },
  {
    id: 8,
    question: "What are the costs associated with tuition, accommodation, and other expenses?",
    answer: "Tuition fees vary by residency status, with in-state tuition significantly lower than out-of-state rates. On-campus housing costs, along with additional expenses such as meals, textbooks, and personal expenses, are detailed on the university's website.",
    videoUrl: "https://res.cloudinary.com/djfiaa34u/video/upload/v1740155645/8_dxqhyj.mp4"
  },
  {
    id: 9,
    question: "Does the university provide on-campus accommodation? What are the options for student residences?",
    answer: "Texas A&M offers a range of on-campus housing options, including traditional residence halls and apartment-style living arrangements, designed to accommodate the diverse needs of both undergraduate and graduate students.",
    videoUrl: "https://res.cloudinary.com/djfiaa34u/video/upload/v1740149812/g_cstut1.mp4"
  },
  {
    id: 10,
    question: "Are students permitted to live off-campus? If so, what are the regulations?",
    answer: "Students are permitted to live off-campus. While there are no strict university-imposed restrictions, students must adhere to local lease agreements and follow any guidelines provided by the university's housing services.",
    videoUrl: "https://res.cloudinary.com/djfiaa34u/video/upload/v1740149779/h_oqjg6r.mp4"
  },
  {
    id: 11,
    question: "What is campus life like? What clubs, activities, and organizations are available?",
    answer: "Campus life at Texas A&M is vibrant and steeped in tradition. Students can participate in hundreds of clubs, organizations, sports teams, and cultural activities. The university's rich traditions, such as Aggie Spirit, foster a strong sense of community and pride.",
    videoUrl: "https://res.cloudinary.com/djfiaa34u/video/upload/v1740149744/i_iqu8p5.mp4"
  },
  {
    id: 12,
    question: "Does the Texas A&M offer student exchange and study abroad programs?",
    answer: "The university offers various student exchange and study abroad opportunities, allowing students to gain international experience and broaden their academic and cultural horizons.",
    videoUrl: "https://res.cloudinary.com/djfiaa34u/video/upload/v1740149809/j_uhkeul.mp4"
  },
  {
    id: 0,
    question: "About Texas A&M University",
    answer: "Learn more about Texas A&M University and its exceptional academic programs, rich traditions, and vibrant campus life.",
    videoUrl: "https://res.cloudinary.com/djfiaa34u/video/upload/v1741890971/movie_1741823671032_jbnlhu.mp4"
  }
];

function HomeContent() {
  const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null);
  const { setVideo, resetVideo } = useVideo();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  const openAboutModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isModalOpen]);

  // Find the About video
  const aboutVideo = videos.find(video => video.id === 0);

  // Filter the regular videos (all except the About video)
  const regularVideos = videos.filter(video => video.id !== 0);
  const midIndex = Math.ceil(regularVideos.length / 2);

  return (
    <div className="min-h-screen bg-gradient-to-tl from-[#06112a] via-[#04315f] to-[#012954] overflow-hidden">
      {/* Background Pattern */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1600')] opacity-[0.2] bg-cover bg-center mix-blend-overlay" />
      </div>

      <div className="relative flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-gradient-to-r from-[#06112a] to-[#012954] pt-4 pb-6 px-4 border-b border-white/10">
          <div className="container mx-auto">
            {/* Mobile Header */}
            <div className="lg:hidden flex items-center justify-center">
              <Link href="/" className="text-white">
                <Image src="/logo2.svg" alt="SWAU Logo" width={300} height={80} className="h-12 w-auto brightness-0 invert" />
              </Link>
            </div>

            {/* Desktop Header */}
            <div className="hidden lg:flex items-center justify-center">
              <Link href="/" className="text-white">
                <Image src="/logo2.svg" alt="SWAU Logo" width={300} height={80} className="h-16 w-auto brightness-0 invert" />
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
            {/* Questions List Left */}
            <div className="order-1 lg:w-1/3 grid grid-cols-1 gap-4 relative z-10">
              {regularVideos.slice(0, midIndex).map((video) => (
                <VideoButton
                  key={video.id}
                  video={video}
                  onClick={() => handleQuestionClick(video)}
                  isActive={selectedVideo?.id === video.id}
                />
              ))}
            </div>

            {/* Video Section */}
            <div className="order-2 lg:w-1/3 relative z-10 flex flex-col gap-6">
              {/* About Button */}
              {aboutVideo && (
                <div className="w-full max-w-sm mx-auto lg:max-w-md mb-4">
                  <button
                    onClick={openAboutModal}
                    className="w-full group relative py-3 px-4 bg-gradient-to-r from-sky-600/40 to-indigo-600/40 hover:from-sky-600/60 hover:to-indigo-600/60 border border-sky-400/30 hover:border-sky-400/70 hover:shadow-[0_0_15px_rgba(56,189,248,0.2)] backdrop-blur-md rounded-lg transition-all duration-300 active:scale-[0.98] touch-manipulation flex items-center justify-center gap-3"
                  >
                    <div className="flex-shrink-0 p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors duration-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5 text-white"
                      >
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                        <path d="M12 8v4" />
                        <path d="M12 16h.01" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-white">About Texas A&M University</span>
                  </button>
                </div>
              )}

              <div className="w-full max-w-sm mx-auto lg:max-w-md">
                <div className="rounded-xl overflow-hidden bg-black/40 border border-slate-700/50 shadow-[0_0_25px_rgba(56,189,248,0.15)] relative">
                  <VideoPlayer />

                  {/* Stop Button (FAB) */}
                  {selectedVideo && (
                    <button
                      onClick={() => {
                        setSelectedVideo(null);
                        resetVideo();
                      }}
                      className="absolute bottom-4 right-4 z-10 group p-2.5 rounded-full bg-slate-800/70 hover:bg-sky-800/70 border border-sky-400/30 hover:border-sky-400/60 shadow-lg hover:shadow-[0_0_10px_rgba(56,189,248,0.2)] transition-all duration-300"
                      title="Stop video"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5 text-white group-hover:text-sky-300 transition-colors"
                      >
                        <rect x="6" y="6" width="12" height="12" rx="2" ry="2"></rect>
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Questions List Right */}
            <div className="order-3 lg:w-1/3 grid grid-cols-1 gap-4 relative z-10">
              {regularVideos.slice(midIndex).map((video) => (
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

        {/* About Modal */}
        {isModalOpen && aboutVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="relative bg-gradient-to-b from-slate-900 to-slate-800 rounded-xl shadow-2xl border border-sky-500/20 w-full max-w-3xl overflow-hidden">
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              {/* Modal Header */}
              <div className="p-6 border-b border-slate-700/50">
                <h3 className="text-xl font-medium text-white">{aboutVideo.question}</h3>
              </div>

              {/* Modal Body with Video */}
              <div className="p-6">
                <div className="aspect-[4/3] overflow-hidden rounded-lg bg-black mx-auto max-w-md">
                  <video
                    ref={videoRef}
                    src={aboutVideo.videoUrl}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="mt-4 text-slate-300">
                  <p>{aboutVideo.answer}</p>
                </div>
              </div>
            </div>
          </div>
        )}
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
