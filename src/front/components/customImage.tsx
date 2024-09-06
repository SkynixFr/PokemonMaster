import Image from 'next/image';

interface CustomImageProps {
	src: string;
	alt: string;
	width?: number;
	height?: number;
	fill?: boolean;
	sizes?: string;
	className?: string;
	unoptimized?: boolean;
}

const CustomImage = ({
	src,
	alt,
	width,
	height,
	fill,
	sizes,
	className,
	unoptimized
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
			unoptimized={unoptimized}
		/>
	);
};

export default CustomImage;
