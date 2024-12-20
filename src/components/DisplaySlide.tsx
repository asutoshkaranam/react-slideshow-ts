import { BsMusicNoteBeamed } from 'react-icons/bs';
import { useSlidePlayerContext } from '../shared-state/slide-player-context';

export const DisplaySlide = () => {
  const { currentSlide } = useSlidePlayerContext();

  return (
    <div className="flex items-center bg-white shadow-lg rounded-lg p-4">
      <div className="w-full h-0 pb-[75%] relative bg-gray-200 rounded-lg overflow-hidden">
        {currentSlide.imageSrc ? (
          <img
            className="absolute inset-0 w-full h-full object-contain"
            src={currentSlide.imageSrc}
            alt="slide image"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-300 rounded-md">
            <span className="text-xl">
              <BsMusicNoteBeamed />
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
