import React from 'react';
import './../css/Pagination.css'

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
    const maxButtonsToShow = 3; // Définissez le nombre maximal de boutons à afficher

    const getPageRange = () => {
        let start = Math.max(currentPage - Math.floor(maxButtonsToShow / 2), 1);
        let end = start + maxButtonsToShow - 1;

        if (end > totalPages) {
            end = totalPages;
            start = Math.max(end - maxButtonsToShow + 1, 1);
        }

        return { start, end };
    };

    const { start, end } = getPageRange();

    return (
        <nav>
            <ul className="pagination">
                {currentPage !== 1 && (
                    <li>
                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                            Prev
                        </button>
                    </li>
                )}
                {currentPage > Math.floor(maxButtonsToShow / 2) && start !== 1 && (
                    <li>
                        <button onClick={() => handlePageChange(1)}>1</button>
                    </li>
                )}
                {currentPage > Math.floor(maxButtonsToShow / 2) && start > 2 && (
                    <li>
                        <span>...</span>
                    </li>
                )}
                {Array.from({ length: end - start + 1 }, (_, i) => start + i).map((number) => (
                    <li key={number} className={currentPage === number ? 'active' : ''}>
                        <button onClick={() => handlePageChange(number)}>
                            {number}
                        </button>
                    </li>
                ))}
                {end < totalPages - 1 && (
                    <li>
                        <span>...</span>
                    </li>
                )}
                {end < totalPages && (
                    <li>
                        <button onClick={() => handlePageChange(totalPages)}>{totalPages}</button>
                    </li>
                )}
                {currentPage !== totalPages && (
                    <li>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    );
};
// const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
//     return (
//         <nav>
//             <ul className="pagination">
//                 <li>
//                     <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
//                         Prev
//                     </button>
//                 </li>
//                 {[...Array(totalPages).keys()].map((number) => (
//                     <li key={number + 1} className={currentPage === number + 1 ? 'active' : ''}>
//                         <button onClick={() => handlePageChange(number + 1)}>{number + 1}</button>
//                     </li>
//                 ))}
//                 <li>
//                     <button
//                         onClick={() => handlePageChange(currentPage + 1)}
//                         disabled={currentPage === totalPages}
//                     >
//                         Next
//                     </button>
//                 </li>
//             </ul>
//         </nav>
//     );
// };

export default Pagination;









