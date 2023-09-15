import { Pagination } from "react-bootstrap";

function NFTPagination({ total, current, onChangePage }) {
    const items = [];

    const totalPages = total;

    if (current > 1) {
        items.push(
            <Pagination.Prev key="prev" onClick={() => onChangePage(current - 1)} />
        );
    }

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