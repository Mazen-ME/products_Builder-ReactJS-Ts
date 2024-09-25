interface ImageProps {
  src: string;
  alt: string;
  className?: string;
}
export default function Image(props: ImageProps) {
  const { src, alt, className } = props;

  return <img src={src} alt={alt} className={className} />;
}
