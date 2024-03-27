import Image from 'next/image';

export interface CustomImageProps {
	src: string;
	alt: string;
	fill?: boolean;
	priority?: boolean;
	className?: string;
	width?: number;
	height?: number;
	objectFit?: 'fill' | 'contain' | 'cover';
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
			className={className}
			quality={100}
			style={{ objectFit: objectFit }}
		/>
	);
};

export default CustomImage;
