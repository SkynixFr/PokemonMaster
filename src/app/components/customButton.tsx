import CustomImage, { CustomImageProps } from './customImage';
import { icons } from 'lucide-react';

// Styles
import '../../styles/components/customButton.css';

interface CustomButtonProps {
	text?: string;
	icon?: {
		name: string;
		size: number;
		strokeWidth?: number;
		absoluteStrokeWidth?: boolean;
	};
	image?: CustomImageProps;
	onClick?: () => void;
	className?: string;
}

const customButton = ({
	text,
	icon,
	image,
	onClick,
	className
}: CustomButtonProps) => {
	const Icon = icon ? icons[icon.name] : null;
	return (
		<button onClick={onClick} className={className}>
			{text}
			{icon && (
				<Icon
					size={icon.size}
					strokeWidth={icon.strokeWidth}
					absoluteStrokeWidth={icon.absoluteStrokeWidth}
				/>
			)}
			{image && <CustomImage {...image} />}
		</button>
	);
};

export default customButton;
