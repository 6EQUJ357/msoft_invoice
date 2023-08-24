import React, {useState} from 'react'

const Pegination = ({invoice}) => {

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Number of items to display per page

    //prgination
    const handlePrevClick = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
      };
    
      const handleNextClick = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
      };
    
      const totalPages = Math.ceil(invoice.length / itemsPerPage);

      const handlePageClick = (page) => {
        setCurrentPage(page);
      };

      const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
          pageNumbers.push(
            <span
              key={i}
              onClick={() => handlePageClick(i)}
              className='pegination_button'
            >
              {i}
            </span>
          );
        }
        return pageNumbers;
      };

      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = currentPage * itemsPerPage;
      const currentData = invoice.slice(startIndex, endIndex);

      //pegination ends

      
  return (
    <div className="row align-items-center mb-4 gy-3">
        <div className="col-md-5">
            <p className="mb-0 text-muted">Showing <b>1</b> to <b>5</b> of <b>{invoice.length}</b> results</p>
        </div>

        <div className="col-sm-auto ms-auto">
            <nav aria-label="...">
                <ul className="pagination mb-0">
                <button className="page-item "  onClick={handlePrevClick} disabled={currentPage === 1}>
                    <span>Previous</span>
                </button>

                {/* <li className="page-item active"><span className="page-link m-lg-1"> {renderPageNumbers()}</span></li> */}
                {renderPageNumbers()}

                {/* <li className="page-item" aria-current="page">
                    <span className="page-link">2</span>
                </li>
                <li className="page-item"><a className="page-link" href='#a'>3</a></li> */}

                <button className="page-item" onClick={handleNextClick} disabled={currentPage === totalPages}>
                    <span>Next</span>
                </button>
                </ul>
            </nav>
        </div>
    </div>
  )
}

export default Pegination