import { useCallback, useEffect } from 'react';
import { BsFillPauseFill, BsFillPlayFill, BsSkipStartFill, BsSkipEndFill } from 'react-icons/bs';
import { VscDebugRestart } from 'react-icons/vsc';
import { useSlidePlayerContext } from '../shared-state/slide-player-context';
import { slides } from '../assets/slides';

export const ManualPanel = () => {
  const {
    currentSlide,
    audioRef,
    isPlaying,
    setIsPlaying,
    setSlideIdx,
    setCurrentSlide,
  } = useSlidePlayerContext();

  const getCurrentSlideIndex = useCallback(() => {
    return slides.findIndex(slide => slide === currentSlide);
  }, [currentSlide]);

  const handleNext = useCallback(() => {
    const currentIndex = getCurrentSlideIndex();
    if (currentIndex >= slides.length - 1) {
      setIsPlaying(false);
      return;
    }
    const newIndex = currentIndex + 1;
    setCurrentSlide(slides[newIndex]);
    setSlideIdx(newIndex);
  }, [getCurrentSlideIndex, setCurrentSlide, setSlideIdx, setIsPlaying]);

  const handlePrevious = useCallback(() => {
    const currentIndex = getCurrentSlideIndex();
    if (currentIndex <= 0) {
      return;
    }
    const newIndex = currentIndex - 1;
    setCurrentSlide(slides[newIndex]);
    setSlideIdx(newIndex);
  }, [getCurrentSlideIndex, setCurrentSlide, setSlideIdx]);

  const handleReset = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setSlideIdx(0);
    setCurrentSlide(slides[0]);
    setIsPlaying(false);
  }, [audioRef, setCurrentSlide, setIsPlaying, setSlideIdx]);

  useEffect(() => {
    if (isPlaying) {
      const playPromise = audioRef.current?.play();
      if (playPromise) {
        playPromise.catch(() => {
          setIsPlaying(false);
        });
      }
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, audioRef, currentSlide]);

  useEffect(() => {
    const currentAudioRef = audioRef.current;
  
    if (currentAudioRef) {
      currentAudioRef.onended = () => {
        const currentIndex = getCurrentSlideIndex();
        if (currentIndex === slides.length - 1) {
          setIsPlaying(false);
        } else {
          handleNext();
        }
      };
    }
  
    return () => {
      if (currentAudioRef) {
        currentAudioRef.onended = null;
      }
    };
  }, [handleNext, audioRef, getCurrentSlideIndex, setIsPlaying]);

  return (
    <div className="flex gap-4 items-center">
      <audio
        src={currentSlide.audioSrc}
        ref={audioRef}
      />
      <button 
        onClick={handlePrevious}
        className="hover:text-gray-600"
      >
        <BsSkipStartFill size={25} />
      </button>
      <button 
        onClick={() => setIsPlaying((toggle) => !toggle)}
        className="hover:text-gray-600 relative"
      >
        <div className="absolute inset-0 rounded-full border-2 border-silver"></div>
        <div className="relative z-10">
          {isPlaying ? (
            <BsFillPauseFill size={37} />
          ) : (
            <BsFillPlayFill size={37} />
          )}
        </div>
      </button>
      <button 
        onClick={handleNext}
        className="hover:text-gray-600"
      >
        <BsSkipEndFill size={25} />
      </button>
      <button 
        onClick={handleReset}
        className="hover:text-gray-600"
      >
        <VscDebugRestart size={22} />
      </button>
    </div>
  );
};