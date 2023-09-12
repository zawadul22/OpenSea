import { Pagination } from "react-bootstrap";

function NFTPagination({ total, current, onChangePage }) {
    const items = [];

    const totalPages = total;
    // const maxVisiblePages = 4;

    // // Helper function to calculate the range of page numbers to display
    // const calculatePageRange = () => {
    //     const pageRange = [];
    //     if (totalPages <= maxVisiblePages) {
    //         for (let i = 1; i <= totalPages; i++) {
    //             pageRange.push(i);
    //         }
    //     } else {
    //         if (current <= maxVisiblePages - 2) {
    //             // If current page is close to the beginning
    //             for (let i = 1; i <= maxVisiblePages - 1; i++) {
    //                 pageRange.push(i);
    //             }
    //             pageRange.push('ellipsis');
    //             pageRange.push(totalPages);
    //         } else if (current >= totalPages - (maxVisiblePages - 2)) {
    //             // If current page is close to the end
    //             pageRange.push(1);
    //             pageRange.push('ellipsis');
    //             for (let i = totalPages - (maxVisiblePages - 2); i <= totalPages; i++) {
    //                 pageRange.push(i);
    //             }
    //         } else {
    //             // If current page is in the middle
    //             pageRange.push(1);
    //             pageRange.push('ellipsis');
    //             for (let i = current - 1; i <= current + 1; i++) {
    //                 pageRange.push(i);
    //             }
    //             pageRange.push('ellipsis');
    //             pageRange.push(totalPages);
    //         }
    //     }
    //     return pageRange;
    // };

    // const pageRange = calculatePageRange();

    // const handleEllipsisClick = (page) => {
    //     if (page !== 'ellipsis') {
    //         onChangePage(page);
    //     }
    // };

    if (current > 1) {
        items.push(
            <Pagination.Prev key="prev" onClick={() => onChangePage(current - 1)} />
        );
    }

    // for (const page of pageRange) {
    //     if (page === 'ellipsis') {
    //         items.push(
    //             <Pagination.Ellipsis
    //                 key="ellipsis"
    //                 onClick={() => handleEllipsisClick(current + 2)}
    //             />
    //         );
    //     } else {
    //         items.push(
    //             <Pagination.Item
    //                 key={page}
    //                 data-page={page}
    //                 active={page === current}
    //                 onClick={() => onChangePage(page)}
    //             >
    //                 {page}
    //             </Pagination.Item>
    //         );
    //     }
    // }

    for (let page = 1; page <= total; page++) {
        items.push(
            <Pagination.Item
                key={page}
                data-page={page}
                active={page === current}
                onClick={() => onChangePage(page)}
            >
                {page}
            </Pagination.Item>
        );
    }

    if (current < totalPages) {
        items.push(
            <Pagination.Next key="next" onClick={() => onChangePage(current + 1)} />
        );
    }


    return (
        <Pagination className="justify-content-center mt-3" >
            {items}
        </Pagination>
    )
}

export default NFTPagination;