import { FC, useState } from "react";
import { Pagination } from "react-bootstrap";
import "./pagination.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

interface PaginationComponentProps {
  totalNumberOfRecords: number;
  pageSize: number;
  current: number;
  onChangePage: any;
}

const PaginationComponent: FC<PaginationComponentProps> = ({
  totalNumberOfRecords,
  pageSize,
  current,
  onChangePage,
}: any) => {
  const totalPages = Math.ceil(totalNumberOfRecords / pageSize);
  let items = [];

  const addPaginationItem = (page: any, active: any) => {
    items.push(
      <Pagination.Item
        key={page}
        data-page={page}
        active={active}
        onClick={() => onChangePage(page)}
      >
        {page}
      </Pagination.Item>
    );
  };

  if (current > 1) {
    items.push(
      <Pagination.Prev key="prev" onClick={() => onChangePage(current - 1)}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </Pagination.Prev>
    );
  } else {
    items.push(
      <Pagination.Prev key="prev" disabled>
        <FontAwesomeIcon icon={faChevronLeft} />
      </Pagination.Prev>
    );
  }

  if (current > 5) {
    items.push(
      <Pagination.Item
        key={1}
        data-page={1}
        active={1 === current}
        onClick={() => onChangePage(1)}
      >
        {1}
      </Pagination.Item>
    );
    items.push(
      <Pagination.Ellipsis
        key="ellipsis-start"
        onClick={() => onChangePage(Math.max(1, current - 2))}
      />
    );
  }

  if (current <= 5) {
    for (let page = 1; page <= Math.min(5, totalPages); page++) {
      addPaginationItem(page, page === current);
    }
  } else {
    for (
      let page = current - 1;
      page <= Math.min(totalPages, current + 1);
      page++
    ) {
      addPaginationItem(page, page === current);
    }
  }

  if (totalPages > 5 && (current <= 5 || current + 2 <= totalPages)) {
    items.push(
      <Pagination.Ellipsis
        key="ellipsis-end"
        onClick={() =>
          onChangePage(Math.min(totalPages, Math.max(5 + 1, current + 2)))
        }
      />
    );
    items.push(
      <Pagination.Item
        key={totalPages}
        data-page={totalPages}
        active={totalPages === current}
        onClick={() => onChangePage(totalPages)}
      >
        {totalPages}
      </Pagination.Item>
    );
  }

  if (current < totalPages) {
    items.push(
      <Pagination.Next key="next" onClick={() => onChangePage(current + 1)}>
        <FontAwesomeIcon icon={faChevronRight} />
      </Pagination.Next>
    );
  } else {
    items.push(
      <Pagination.Next key="next" disabled>
        <FontAwesomeIcon icon={faChevronRight} />
      </Pagination.Next>
    );
  }

  return <Pagination>{items}</Pagination>;

  /*   const [itemsPerPage, setItemsPerPage] = useState(pageSize);
  return (
    <B2Pagination
      totalItems={totalNumberOfRecords}
      currentPage={current}
      itemsPerPage={itemsPerPage}
      setItemsPerPage={setItemsPerPage}
      onClick={onChangePage}
    />
  ); */
};

export default PaginationComponent;
