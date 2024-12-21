import { FiDownload } from 'react-icons/fi';
import { useSlidePlayerContext } from '../shared-state/slide-player-context';
import { slides } from '../assets/slides';

export const PdfExport = () => {
  const { setIsPlaying } = useSlidePlayerContext();

  const handleExport = async () => {
    try {
      const { jsPDF } = await import('jspdf');
      setIsPlaying(false);

      const pdf = new jsPDF('l', 'px', [1920, 1080]);
      
      for (let i = 0; i < slides.length; i++) {
        if (i > 0) pdf.addPage();
        
        if (slides[i].imageSrc) {
          await new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => {
              pdf.addImage(img, 'JPEG', 0, 0, 1920, 1080);
              resolve(null);
            };
            img.onerror = reject;
            img.src = slides[i].imageSrc;
          });
        }
      }

      pdf.save('slides.pdf');
    } catch (error) {
      console.error('Error:', error);
      alert('PDF export failed');
    }
  };

  return (
    <button onClick={handleExport} className="p-2 hover:bg-neutral-700 rounded-full">
      <FiDownload className="w-5 h-5" />
    </button>
  );
};
