import Image from 'next/image';

interface AvatarProps {
	avatarUrl: string;
	altText: string;
}
const Avatar = ({ avatarUrl, altText }: AvatarProps) => {
	return (
		<div>
			<Image
				src={avatarUrl}
				alt={altText}
				priority={true}
				width={100}
				height={150}
			/>
		</div>
	);
};

export default Avatar;
