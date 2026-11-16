import type { ImgHTMLAttributes } from 'react';
import manifest from '../../.generated/image-manifest.json';

const images: Record<string, { src: string; srcSet: string; width: number; height: number }> = manifest;
export default function Image({ src, loading = 'lazy', decoding = 'async', sizes = '(min-width: 1280px) 640px, (min-width: 768px) 50vw, 100vw', ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const image = src ? images[src] : undefined;
  return <img {...props} src={image?.src || src} srcSet={image?.srcSet} width={props.width || image?.width} height={props.height || image?.height} sizes={image ? sizes : undefined} loading={loading} decoding={decoding} />;
}
