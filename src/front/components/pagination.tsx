import React, { useEffect, useState } from 'react';

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
	const [pages, setPages] = useState<number[]>([]);

	useEffect(() => {
		if (totalPages <= 3) {
			setPages(Array.from({ length: totalPages }, (_, i) => i + 1));
		} else {
			const newPages = [];
			if (currentPage > 1) newPages.push(currentPage - 1);
			newPages.push(currentPage);
			if (currentPage < totalPages) newPages.push(currentPage + 1);
			setPages(newPages);
		}
	}, [currentPage, totalPages]);

	const handlePage = (page: number) => {
		setCurrentPage(page);
	};

	return (
		<div className="pagination">
			{pages[0] !== 1 && totalPages > 3 && (
				<>
					<div
						className={`page ${currentPage === 1 ? 'active' : ''}`}
						onClick={() => handlePage(1)}
					>
						1
					</div>
					{pages[0] > 2 && <div className="page ellipsis">...</div>}
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
			{pages[pages.length - 1] !== totalPages && totalPages > 3 && (
				<>
					{pages[pages.length - 1] < totalPages - 1 && (
						<div className="page ellipsis">...</div>
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
