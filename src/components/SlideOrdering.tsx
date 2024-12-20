import { BsMusicNoteBeamed } from 'react-icons/bs';
import { Slide, useSlidePlayerContext } from '../shared-state/slide-player-context';
import { slides } from '../assets/slides';

export const SlideOrdering = () => {
  const { currentSlide, setIsPlaying, setCurrentSlide, setSlideIdx } = useSlidePlayerContext();

  const handleClick = (slide: Slide, index: number) => {
    setCurrentSlide(slide);
    setSlideIdx(index);
    setIsPlaying(false);
  };

  return (
    <div className="bg-[#4c4848] text-white p-4 overflow-x-auto">
      <div className="flex gap-2 min-w-min">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`flex flex-col items-center min-w-[100px] p-1 rounded-lg cursor-pointer transition-all duration-300 hover:bg-[#5c5858] ${
              slide === currentSlide ? 'bg-[#a66646]' : ''
            }`}
            tabIndex={0}
            onClick={() => handleClick(slide, index)}
          >
            <div className="w-16 h-10 flex items-center justify-center bg-gray-200 rounded-lg overflow-hidden">
              {slide.imageSrc ? (
                <img
                  className="w-full h-full object-cover"
                  src={slide.imageSrc}
                  alt="audio avatar"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-gray-300">
                  <span className="text-xl text-gray-600">
                    <BsMusicNoteBeamed />
                  </span>
                </div>
              )}
            </div>
            <p className="text-sg font-small text-center">
              Slide {index + 1}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};