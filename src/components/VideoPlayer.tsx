'use client';

import React, { Suspense, useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useVideo } from './VideoContext';
import type ReactPlayer from 'react-player';
import Image from 'next/image';

// Importar ReactPlayer dinámicamente sin SSR
const ReactPlayerComponent = dynamic(() => import('react-player/lazy'), {
    ssr: false,
});

interface VideoPlayerProps {
    className?: string;
}

const getThumbnailUrl = (videoUrl: string) => {
    // Extraer el public_id del video URL
    const matches = videoUrl.match(/\/v\d+\/([^.]+)/);
    if (!matches) return '';

    const [, public_id] = matches;

    // Construir la URL del thumbnail con transformaciones
    return `https://res.cloudinary.com/djfiaa34u/video/upload/c_fill,w_640,h_853,q_auto:low,e_blur:1000/${public_id}.jpg`;
};

const LoadingAnimation = ({ thumbnailUrl }: { thumbnailUrl: string }) => (
    <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute inset-0">
            <Image
                src={thumbnailUrl}
                alt="Video thumbnail"
                fill
                className="object-cover"
                priority
            />
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
        </div>
        <div className="relative flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-sky-400 border-t-transparent rounded-full animate-spin" />
            <p className="text-sky-400 text-sm font-medium animate-pulse">Loading video...</p>
        </div>
    </div>
);

interface PlayError extends Error {
    name: string;
    message: string;
}

const VideoPlayer = ({ className }: VideoPlayerProps) => {
    const { currentSrc, isPlaying, isWaitingVideo, key, setPlaying, resetVideo } = useVideo();
    const playerRef = useRef<ReactPlayer>(null);
    const [isLoading, setIsLoading] = useState(true);
    const thumbnailUrl = getThumbnailUrl(currentSrc);

    useEffect(() => {
        console.log('🎬 VideoPlayer mounted/updated:', {
            currentSrc,
            isWaitingVideo,
            isPlaying
        });
        setIsLoading(true);
        if (playerRef.current) {
            playerRef.current.seekTo(0);
        }
    }, [currentSrc, isPlaying, isWaitingVideo]);

    const handlePause = () => {
        console.log('⏸️ Video paused');
        if (playerRef.current) {
            playerRef.current.seekTo(0);
        }
        setPlaying(false);
    };

    const handleEnded = () => {
        console.log('🔴 Video ended');
        if (!isWaitingVideo) {
            console.log('🔄 Resetting to waiting video');
            resetVideo();
        }
    };

    const handleError = (error: Error) => {
        console.error('❌ Video error:', error);
        // Si es un AbortError por ahorro de energía, no lo tratamos como un error crítico
        if (error?.name === 'AbortError') {
            console.log('ℹ️ Video playback was interrupted to save power');
            return;
        }
        setIsLoading(false);
    };

    const handleBuffer = () => {
        setIsLoading(true);
    };

    const handleBufferEnd = () => {
        setIsLoading(false);
    };

    const handleReady = () => {
        console.log('✅ Video ready:', { currentSrc, isWaitingVideo });
        setIsLoading(false);
        // Intentar reproducir el video con manejo de errores
        if (playerRef.current?.getInternalPlayer()) {
            const videoElement = playerRef.current.getInternalPlayer();
            videoElement.play().catch((error: PlayError) => {
                if (error.name === 'AbortError') {
                    console.log('ℹ️ Auto-play was prevented to save power');
                    // No tratamos esto como un error, el usuario puede hacer click para reproducir
                    return;
                }
                console.error('❌ Auto-play failed:', error);
            });
        }
    };

    return (
        <div className={`relative w-full aspect-[3/4] bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden ${className || ''}`}>
            {isLoading && <LoadingAnimation thumbnailUrl={thumbnailUrl} />}
            <Suspense fallback={<LoadingAnimation thumbnailUrl={thumbnailUrl} />}>
                <ReactPlayerComponent
                    key={key}
                    ref={playerRef}
                    url={currentSrc}
                    width="100%"
                    height="100%"
                    playing={isPlaying || isWaitingVideo}
                    controls={false}
                    muted={isWaitingVideo}
                    loop={isWaitingVideo}
                    onEnded={handleEnded}
                    onPause={handlePause}
                    onReady={handleReady}
                    onError={handleError}
                    onBuffer={handleBuffer}
                    onBufferEnd={handleBufferEnd}
                    playsinline
                    stopOnUnmount={true}
                    config={{
                        file: {
                            attributes: {
                                style: {
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }
                            },
                            forceVideo: true
                        }
                    }}
                />
            </Suspense>
        </div>
    );
};

export default VideoPlayer;