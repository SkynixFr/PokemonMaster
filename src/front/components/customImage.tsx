import Image from 'next/image';

interface CustomImageProps {
	src: string;
	alt: string;
	width?: number;
	height?: number;
	fill?: boolean;
	sizes?: string;
	className?: string;
}

const CustomImage = ({
	src,
	alt,
	width,
	height,
	fill,
	sizes,
	className
}: CustomImageProps) => {
	return (
		<Image
			src={src}
			alt={alt}
			width={width}
			height={height}
			fill={fill}
			sizes={sizes}
			quality={100}
			priority={true}
			className={className}
		/>
	);
};

export default CustomImage;
