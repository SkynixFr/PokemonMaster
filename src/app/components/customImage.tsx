import Image from 'next/image';

interface CustomImageProps {
	src: string;
	alt: string;
	priority?: boolean;
}

const CustomImage = ({ src, alt, priority }: CustomImageProps) => {
	return <Image src={src} alt={alt} />;
};

export default CustomImage;
