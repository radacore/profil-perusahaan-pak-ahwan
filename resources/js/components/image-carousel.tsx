import { useState, useEffect, useCallback, useRef } from 'react';

interface CarouselImage {
  url: string;
  alt: string;
}

interface Props {
  images: CarouselImage[];
}

export default function ImageCarousel({ images }: Props) {
  const [index, setIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  const startTimer = useCallback(() => {
    stopTimer();
    if (images.length <= 1) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 4000);
  }, [images.length]);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = undefined;
    }
  }, []);

  useEffect(() => {
    if (images.length > 1) startTimer();
    return stopTimer;
  }, [images.length, startTimer, stopTimer]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') setLightboxIndex((i) => (i !== null ? (i - 1 + images.length) % images.length : null));
      if (e.key === 'ArrowRight') setLightboxIndex((i) => (i !== null ? (i + 1) % images.length : null));
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, images.length]);

  function prev() {
    setIndex((i) => (i - 1 + images.length) % images.length);
    startTimer();
  }

  function next() {
    setIndex((i) => (i + 1) % images.length);
    startTimer();
  }

  if (images.length === 0) return null;

  return (
    <>
      <div
        className="mx-auto w-full max-w-[794.66px]"
        onMouseEnter={stopTimer}
        onMouseLeave={startTimer}
      >
        <div className="relative overflow-hidden rounded-lg bg-[#F3F4F6]">
          <button
            type="button"
            onClick={prev}
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 text-[#1F2937] shadow-sm hover:bg-white focus:outline-none"
            aria-label="Gambar sebelumnya"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            type="button"
            onClick={next}
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 text-[#1F2937] shadow-sm hover:bg-white focus:outline-none"
            aria-label="Gambar berikutnya"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => setLightboxIndex(index)}
            className="block w-full cursor-zoom-in"
          >
            <img
              src={images[index].url}
              alt={images[index].alt}
              className="h-auto w-full object-contain"
              style={{ aspectRatio: '16 / 9' }}
              draggable={false}
            />
          </button>
        </div>

        {images.length > 1 && (
          <div className="mt-3 flex items-center justify-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => { setIndex(i); startTimer(); }}
                className={`h-2 rounded-full transition-all ${
                  i === index
                    ? 'w-6 bg-[#1E3A8A]'
                    : 'w-2 bg-[#D1D5DB] hover:bg-[#9CA3AF]'
                }`}
                aria-label={`Lihat gambar ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i !== null ? (i - 1 + images.length) % images.length : null)); }}
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white hover:bg-white/40 focus:outline-none"
            aria-label="Gambar sebelumnya"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i !== null ? (i + 1) % images.length : null)); }}
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white hover:bg-white/40 focus:outline-none"
            aria-label="Gambar berikutnya"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            className="absolute right-4 top-4 z-10 rounded-full bg-white/20 p-2 text-white hover:bg-white/40 focus:outline-none"
            aria-label="Tutup"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <img
            src={images[lightboxIndex].url}
            alt={images[lightboxIndex].alt}
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
