import Image from 'next/image';

interface CustomImageProps {
	src: string;
	alt: string;
	fill?: boolean;
	priority?: boolean;
	className?: string;
	width?: number;
	height?: number;
	objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

const CustomImage = ({
	src,
	alt,
	fill,
	priority,
	className,
	width,
	height,
	objectFit
}: CustomImageProps) => {
	return (
		<Image
			src={src}
			alt={alt}
			priority={priority}
			fill={fill}
			width={width}
			height={height}
			sizes="100vw"
			objectFit={objectFit || 'cover'}
			blurDataURL={src}
			className={className}
		/>
	);
};

export default CustomImage;
