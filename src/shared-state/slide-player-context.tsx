import {
  useState,
  useRef,
  RefObject,
  ReactNode,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';

import { slides } from '../assets/slides';

export interface Slide {
  audioSrc: string;
  imageSrc?: string;
}

interface SlidePlayerContextType {
  currentSlide: Slide;
  setCurrentSlide: Dispatch<SetStateAction<Slide>>;
  setSlideIdx: Dispatch<SetStateAction<number>>;
  audioRef: RefObject<HTMLAudioElement>;
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
}

const SlidePlayerContext = createContext<
  SlidePlayerContextType | undefined
>(undefined);

export const SlidePlayerProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [slideIndex, setSlideIdx] = useState<number>(0);

  const [currentSlide, setCurrentSlide] = useState<Slide>(
    slides[slideIndex]
  );
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  const contextValue = {
    currentSlide,
    setCurrentSlide,
    audioRef,
    setSlideIdx,
    isPlaying,
    setIsPlaying,
  };

  return (
    <SlidePlayerContext.Provider value={contextValue}>
      {children}
    </SlidePlayerContext.Provider>
  );
};

export const useSlidePlayerContext = (): SlidePlayerContextType => {
  const context = useContext(SlidePlayerContext);

  if (context === undefined) {
    throw new Error(
      'useSlidePlayerContext must be kept and warpped within an SlidePlayerProvider'
    );
  }

  return context;
};