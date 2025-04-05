import { useEffect, useRef, useState } from "react";
import { Modal } from "../Modal/Modal";
import styles from "./LatinoLegacies.module.scss";
import Dropdown from "../Dropdown/Dropdown";
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

  useEffect(() => { window.trackEvent(`view-bridge-search`) }, []);

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
  const wars = allVets.reduce((acc, recipient) => {
    const wars = recipient.WarsServed.split(",").map((w) => w.trim());
    wars.forEach((w) => {
      if (!acc.some((item) => item.value === w)) {
        acc.push({ value: w, label: w });
      }
    });
    return acc;
  }, []);

  const branches = allVets.reduce((acc, recipient) => {
    const branches = recipient.Branch.split(",").map((w) => w.trim());
    branches.forEach((b) => {
      if (!acc.some((item) => item.value === b)) {
        acc.push({ value: b, label: b });
      }
    });
    return acc;
  }, []);

  const [searchText, setSearchText] = useState("");
  const [warFilter, setWarFilter] = useState(null);
  const [branchFilter, setBranchFilter] = useState(null);
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
    if (warFilter) {
      filteredSet = filteredSet.filter((recipient) =>
        recipient.WarsServed.includes(warFilter)
      );
    }
    if (branchFilter) {
      filteredSet = filteredSet.filter(
        (recipient) => recipient.Branch.includes(branchFilter)
      );
    }
    onFilter(filteredSet);
  }, [allVets, searchText, warFilter, branchFilter, onFilter]);

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
      <div className={styles.searchDrops}>
        <Dropdown
          className={styles.dropdown}
          items={wars}
          value={warFilter}
          onChange={(val) => {
            setWarFilter(val);
          }}
          placeholder="War"
        />
        <Dropdown
          className={styles.dropdown}
          items={branches}
          value={branchFilter}
          onChange={(val) => {
            setBranchFilter(val);
          }}
          placeholder="Service Branch"
        />

      </div>
      {(!!searchText || !!warFilter || !!branchFilter) && (
        <div className={styles.clear} onClick={() => { setSearchText(""); setWarFilter(null); setBranchFilter(null) }} > CLEAR </div>
      )}
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
              <th>Active</th>
              <th>Inducted</th>
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
                <td>{item.WarsServed ? item.WarsServed : "-"}</td>
                <td>{item.DateService}</td>
                <td>{item.YearInducted}</td>
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
                <li>BORN: {item.Birthdate}</li>
                <li>BRANCH: {item.Branch}</li>
                <li>AWARDS: {item.Awards}</li>
                <li>DEATH: {item.DateDiceased}</li>
                <li>WAR: {item.WarsServed}</li>
                <li>DATE OF SERVICE: {item.DateService}</li>
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
            <img src={`/images/latino/${item.PhotoFile}`} alt={""} />
          ) : (
            <img src={`/images/no-photo.png`} alt={""} />
          )}
        </div>
      </div>
    </Modal>
  );
}
