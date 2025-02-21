'use client';

import {
    ChevronRight,
    GraduationCap,
    DollarSign,
    Calendar,
    Plane,
    Users,
    School,
    Heart
} from 'lucide-react';

interface VideoData {
    id: number;
    question: string;
    answer: string;
    videoUrl: string;
}

interface VideoButtonProps {
    video: VideoData;
    onClick: () => void;
    isActive?: boolean;
}

export const getIconForQuestion = (id: number) => {
    switch (id) {
        case 1:
            return <School className="w-5 h-5 text-sky-400" />;
        case 2:
            return <GraduationCap className="w-5 h-5 text-emerald-400" />;
        case 3:
            return <DollarSign className="w-5 h-5 text-yellow-400" />;
        case 4:
            return <Calendar className="w-5 h-5 text-rose-400" />;
        case 5:
            return <Heart className="w-5 h-5 text-pink-400" />;
        case 6:
            return <Plane className="w-5 h-5 text-violet-400" />;
        case 7:
            return <Users className="w-5 h-5 text-teal-400" />;
        default:
            return <School className="w-5 h-5 text-sky-400" />;
    }
};

const VideoButton = ({ video, onClick, isActive }: VideoButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={`group relative w-full py-4 px-5 ${isActive
                ? 'bg-gradient-to-r from-sky-500/20 to-violet-500/20 border-sky-400/50 shadow-[0_0_15px_rgba(56,189,248,0.15)]'
                : 'bg-slate-800/50 hover:bg-gradient-to-r hover:from-sky-500/10 hover:to-violet-500/10 border-slate-700/50 hover:border-sky-400/30 hover:shadow-[0_0_15px_rgba(56,189,248,0.1)]'
                } backdrop-blur-md border rounded-xl transition-all duration-300 active:scale-[0.98] touch-manipulation overflow-hidden`}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-sky-500/0 to-violet-500/0 group-hover:from-sky-500/5 group-hover:to-violet-500/5 transition-opacity duration-300" />

            <div className="relative z-10 flex gap-4">
                <div className="flex-shrink-0 p-2.5 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors duration-300 w-10 h-10">
                    {getIconForQuestion(video.id)}
                </div>

                <div className="flex-1 min-w-0 flex items-center justify-between gap-4">
                    <h3 className="text-[15px] leading-normal font-medium text-white text-left pr-2 overflow-hidden">
                        {video.question}
                    </h3>
                    <div className="flex-shrink-0">
                        <ChevronRight className={`w-5 h-5 ${isActive ? 'text-sky-400' : 'text-slate-400'} transition-colors duration-300`} />
                    </div>
                </div>
            </div>
        </button>
    );
};

export default VideoButton; 