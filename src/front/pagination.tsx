import { useState } from 'react';

interface PaginationProps {
	currentPage: number;
	setCurrentPage: (page: number) => void;
	totalPages: number;
}

const Pagination = ({
	currentPage,
	setCurrentPage,
	totalPages
}: PaginationProps) => {
	const [pages, setPages] = useState([
		currentPage === 1 ? 1 : currentPage - 1,
		currentPage === 1 ? 2 : currentPage,
		currentPage === 1
			? 3
			: currentPage === totalPages
				? totalPages
				: currentPage + 1
	]);

	const handlePage = (page: number) => {
		if (page === pages[1]) {
			setCurrentPage(page);
			return;
		}
		if (page === totalPages) {
			setPages([totalPages - 2, totalPages - 1, totalPages]);
		} else if (page === 1) {
			setPages([1, 2, 3]);
		} else {
			setPages([page - 1, page, page + 1]);
		}

		setCurrentPage(page);
	};
	return (
		<div className={'pagination'}>
			{pages[0] != 1 && (
				<>
					<div
						className={`page ${currentPage === 1 ? 'active' : ''}`}
						onClick={() => handlePage(1)}
					>
						1
					</div>
					{pages[0] === 2 ? (
						''
					) : (
						<div className={'page ellipsis'}>...</div>
					)}
				</>
			)}
			{pages.map(page => (
				<div
					key={page}
					className={`page ${currentPage === page ? 'active' : ''}`}
					onClick={() => handlePage(page)}
				>
					{page}
				</div>
			))}
			{pages[2] !== totalPages && (
				<>
					{pages[2] === totalPages - 1 ? (
						''
					) : (
						<div className={'page ellipsis'}>...</div>
					)}
					<div
						className={`page ${currentPage === totalPages ? 'active' : ''}`}
						onClick={() => handlePage(totalPages)}
					>
						{totalPages}
					</div>
				</>
			)}
		</div>
	);
};

export default Pagination;
