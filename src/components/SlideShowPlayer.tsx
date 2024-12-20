import { useState } from 'react';
import { MdViewCarousel } from 'react-icons/md';

import { DisplaySlide } from './DisplaySlide';
import { SlideOrdering } from './SlideOrdering';
import { PdfExport } from './PdfExport';
import { ManualPanel } from './ManualPanel';
import { Sound } from './Sound';

import { slides } from '../assets/slides';

import { useSlidePlayerContext } from '../shared-state/slide-player-context';

export const SlideShowPlayer = () => {
  const [carouselIcon, setCarouselIcon] = useState(false);
  const { currentSlide } = useSlidePlayerContext();

  const currentSlideNumber = slides.findIndex(slide => slide === currentSlide) + 1;
  const totalSlides = slides.length;

  return (
    <div className='mt-10'>
        <DisplaySlide />
        
        <div className="flex flex-col lg:flex-row justify-center items-center bg-[#1e293b] mt-2 min-h-8 gap-3 text-white p-1">
          
          <span className="text-sm text-gray-300">
            {currentSlideNumber} / {totalSlides}
          </span>
          
          <button 
            onClick={() => setCarouselIcon((toggle) => !toggle)}
            className="p-2 hover:bg-neutral-700 rounded-full transition-colors items-center"
          >
            <MdViewCarousel className="w-5 h-5" />
          </button>
          
          <PdfExport />
          
          <div className="w-full flex flex-col items-center flex-1">
            <ManualPanel />
          </div>
          
          <Sound />
          
        </div>
        
        <div
          className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
            carouselIcon ? 'max-h-72' : 'max-h-0'
          }`}
        >
          <div className="bg-[#6c4808] text-white max-h-72 overflow-x-auto">
              <SlideOrdering />
          </div>
        </div>
    </div>
  );
};
