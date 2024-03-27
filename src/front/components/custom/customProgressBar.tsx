// Styles
import '../../../styles/components/customProgressBar.css';

interface CustomProgressBarProps {
	currentProgress: number;
	maxProgress: number;
}

const CustomProgressBar = ({
	currentProgress,
	maxProgress
}: CustomProgressBarProps) => {
	function computeRemainingProgress(
		currentProgress: number,
		maxProgress: number
	) {
		return Math.round((currentProgress / maxProgress) * 100);
	}
	return (
		<div className="progress-bar">
			<div
				className="progress-bar-fill"
				style={{
					width: `${computeRemainingProgress(currentProgress, maxProgress)}%`,
					backgroundColor: `${
						computeRemainingProgress(currentProgress, maxProgress) > 75
							? 'var(--grass)'
							: computeRemainingProgress(currentProgress, maxProgress) <=
										75 &&
								  computeRemainingProgress(
										currentProgress,
										maxProgress
								  ) > 50
								? 'var(--fire)'
								: computeRemainingProgress(
											currentProgress,
											maxProgress
									  ) <= 50 &&
									  computeRemainingProgress(
											currentProgress,
											maxProgress
									  ) > 25
									? 'var(--electric)'
									: 'var(--fighting)'
					}`
				}}
			></div>
		</div>
	);
};

export default CustomProgressBar;
