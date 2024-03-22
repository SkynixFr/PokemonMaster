import Image from 'next/image';

interface CustomImageProps {
	src: string;
	alt: string;
	priority?: boolean;
	className?: string;
}

const CustomImage = ({ src, alt, priority, className }: CustomImageProps) => {
	return (
		<Image
			src={src}
			alt={alt}
			priority={priority}
			fill
			sizes="100vw"
			objectFit="cover"
			placeholder="blur"
			blurDataURL={src}
			className={className}
		/>
	);
};

export default CustomImage;
