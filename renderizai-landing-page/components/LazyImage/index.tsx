import Image from 'next/image';

interface LazyImageProps {
  src: string | "";
  alt: string;
  width: number;
  height: number;
}

const LazyImage = ({ src, alt, width, height }: LazyImageProps) => {
  return (
    <Image
      className="rounded-md"
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      placeholder="blur"
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII" // Base64 de uma imagem pequena e borrada
    />
  );
};

export default LazyImage;