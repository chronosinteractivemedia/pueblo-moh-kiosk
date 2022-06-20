import { useEffect, useRef, useState } from "react";
import { Modal } from "../Modal/Modal";
import styles from "./VetBridge.module.scss";
// import Dropdown from "../Dropdown/Dropdown";
import Fuse from "fuse.js";

import "react-dropdown/style.css";
import { BsArrowLeftShort, BsArrowRightShort, BsChevronLeft, BsChevronRight, BsSearch } from "react-icons/bs";
import Keyboard from "../Keyboard/Keyboard";
import Scroller from "../Scroller/Scroller";
import ReactPaginate from 'react-paginate';

const itemsPerPage = 10;

export default function VetBridge({ allVets }) {
  const [currentRecipient, setCurrentRecipient] = useState(null);
  const [displayList, setDisplayList] = useState([]);
  const [filteredSet, setFilteredSet] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {window.trackEvent(`view-bridge-search`)}, []);

  useEffect(() => {
    const offset = (currentPage * itemsPerPage) % filteredSet.length;
    const end = offset + itemsPerPage;
    setPageCount(Math.ceil(filteredSet.length / itemsPerPage));
    setDisplayList(filteredSet.slice(offset, end));
  }, [filteredSet, currentPage]);


  useEffect(() => {
    setCurrentPage(0);
  }, [filteredSet])

  return (
    <div className={styles.component}>
      <Filters
        allVets={allVets}
        onFilter={(filtered) => setFilteredSet(filtered)}
      />
      <List
        items={displayList}
        onSetRecipient={(recipient) => setCurrentRecipient(recipient)}
      />
      {pageCount > 1 && <ReactPaginate
        breakLabel="..."
        onPageChange={e => setCurrentPage(e.selected)}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        forcePage={currentPage}
        className={styles.paginator}
        pageClassName={styles.paginatorPage}
        activeLinkClassName={styles.paginatorActive}
        previousLabel={<div className={styles.paginatorPrev}><BsArrowLeftShort /> Prev </div>}
        nextLabel={<div className={styles.paginatorNext}>Next <BsArrowRightShort /></div>}
      />}
      {!!currentRecipient && (
        <Details
          item={currentRecipient}
          onClose={() => setCurrentRecipient(false)}
        />
      )}
    </div>
  );
}

function Filters({ allVets, onFilter }) {
  const [searchText, setSearchText] = useState("");
  const [showKeyboard, setShowKeyboard] = useState(false);
  const fuseInstance = useRef();

  useEffect(() => {
    if (!fuseInstance.current) {
      const options = {
        keys: ["fullName"],
        threshold: 0.6,
        location: 0,
        ignoreLocation: true,
        findAllMatches: true
      };
      fuseInstance.current = new Fuse(allVets, options);
    }

    let filteredSet;
    if (searchText) {
      const result = fuseInstance.current.search(searchText);
      filteredSet = result.map((r) => r.item);
    } else {
      filteredSet = allVets;
    }
    onFilter(filteredSet);
  }, [allVets, searchText]);

  return (
    <div className={styles.filters}>
      <div className={styles.searchWrapper}>
        <BsSearch />
        <input
          className={styles.search}
          placeholder="Search by name..."
          type="text"
          value={searchText}
          onClick={() => setShowKeyboard(true)}
        />
      </div>
      {!!searchText && (
        <div className={styles.clear} onClick={() => { setSearchText(""); }} > CLEAR </div>
      )}
      {/*<Dropdown className={styles.wars} items={filterSets.wars} onChange={val => setWarFilter(val)} placeholder="War"/>*/}
      {/*<Dropdown className={styles.branches} items={filterSets.branches} onChange={val => setBranchFilter(val)} placeholder="Service Branch" />*/}
      {!!showKeyboard && (
        <Keyboard
          onChange={(input) => {
            setSearchText(input);
            setShowKeyboard(false);
          }}
          initialValue={searchText}
          onCancel={() => {
            setShowKeyboard(false);
          }}
        />
      )}
    </div>
  );
}

function List({ items, onSetRecipient }) {
  const [loading, setLoading] = useState(true);

  useState(() => {
    if (items.length) {
      setLoading(false);
    }
  }, [items]);

  // if (loading) {
  //   return (
  //     <div className={styles.listContainer}>
  //       <div className={styles.listWrapper}>
  //         <div className={styles.loader}>Loading</div>
  //       </div>
  //     </div>
  //   );
  // } else
  if (!items?.length) {
    return (
      <div className={styles.listContainer}>
        <div className={styles.listWrapper}>
          <div className={styles.noResults}>
            No Results. Please try a different name.
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.listContainer}>
      <div className={styles.listWrapper}>
        <table className={styles.listHead}>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Branch</th>
              <th>War</th>
              <th>Dates Active</th>
              <th></th>
            </tr>
          </thead>
        </table>
          <table className={styles.list}>
            <tbody>
              {items.map((item) => (
                <tr
                  key={item.ID}
                  className={styles.item}
                  onClick={() => onSetRecipient(item)}
                >
                  <td>{item.FirstName}</td>
                  <td>{item.LastName}</td>
                  <td>{item.Branch}</td>
                  <td>{item.War ? item.War : "-"}</td>
                  <td>{item.DateAct}</td>
                  <td className={styles.itemLink}>Details</td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
    </div>
  );
}

function Details({ item, onClose }) {
  return (
    <Modal onClose={onClose} index={0}>
      <div className={styles.details}>
        <div className={styles.leftDetails}>
          <div className={styles.stats}>
            <Scroller>
              <div className={styles.detailName}>
                {item.FirstName} {item.MiddleInitial} {item.LastName}
              </div>
              <div className={styles.detailHeading}>DETAILS</div>
              <ul>
                <li>BORN: {item.BirthDate}</li>
                <li>BRANCH: {item.Branch}</li>
                <li>AWARDS: {item.Awards}</li>
                <li>DEATH: {item.DateDiceased}</li>
                <li>WAR: {item.War}</li>
                <li>DATE OF SERVICE: {item.DateAct}</li>
              </ul>
              <div className={styles.detailHeading}>
                INDEX LOCATION ON BRIDGE
              </div>
              <ul>
                <li>Plaque: {item.IndexPlaque}</li>
                <li>Column: {item.IndexColumn}</li>
                <li>Row: {item.IndexRow}</li>
              </ul>
              {!!item.Biography && (
                <>
                  <div className={styles.detailHeading}>BIOGRAPHY</div>
                  <p>{item.Biography}</p>
                </>
              )}
            </Scroller>
          </div>
        </div>
        <div className={styles.rightDetails}>
          {item.ImageFile !== "NOIMAGE" ? (
            <img src={`/vet-images/${item.ImageFile}.jpg`} alt={""} />
          ) : (
            <img src={`/images/no-photo.png`} alt={""} />
          )}
        </div>
      </div>
    </Modal>
  );
}
