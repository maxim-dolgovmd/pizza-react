import React from 'react'
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss'

type ChangeProps = {onChangePage: (num: number) => void}
const Pagination: React.FC<ChangeProps> = ({onChangePage}) => {

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={5}
      pageCount={3}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  )
}

export default Pagination
