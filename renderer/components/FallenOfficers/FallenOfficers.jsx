import { useEffect, useRef, useState, useMemo } from "react";
import { Modal } from "../Modal/Modal";
import styles from "./FallenOfficers.module.scss";
import Dropdown from "../Dropdown/Dropdown";
import Fuse from "fuse.js";

import "react-dropdown/style.css";
import {
  BsArrowLeftShort,
  BsArrowRightShort,
  BsChevronLeft,
  BsChevronRight,
  BsSearch,
} from "react-icons/bs";
import Keyboard from "../Keyboard/Keyboard";
import Scroller from "../Scroller/Scroller";
import ReactPaginate from "react-paginate";

const itemsPerPage = 10;

export default function VetBridge({ allVets }) {
  const [currentRecipient, setCurrentRecipient] = useState(null);
  const [displayList, setDisplayList] = useState([]);
  const [filteredSet, setFilteredSet] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);

  const sortedAllVets = useMemo(() => {
    if (!allVets) return [];
    return [...allVets].sort((a, b) => {
      const lastNameA = a.LastName.toLowerCase();
      const lastNameB = b.LastName.toLowerCase();
      if (lastNameA < lastNameB) return -1;
      if (lastNameA > lastNameB) return 1;
      return 0;
    });
  }, [allVets]);

  useEffect(() => {
    window.trackEvent(`view-bridge-search`);
  }, []);

  useEffect(() => {
    const offset = (currentPage * itemsPerPage) % filteredSet.length;
    const end = offset + itemsPerPage;
    setPageCount(Math.ceil(filteredSet.length / itemsPerPage));
    setDisplayList(filteredSet.slice(offset, end));
  }, [filteredSet, currentPage]);

  useEffect(() => {
    setCurrentPage(0);
  }, [filteredSet]);

  return (
    <div className={styles.component}>
      <Filters
        allVets={sortedAllVets}
        onFilter={(filtered) => setFilteredSet(filtered)}
      />
      <List
        items={displayList}
        onSetRecipient={(recipient) => setCurrentRecipient(recipient)}
      />
      {pageCount > 1 && (
        <ReactPaginate
          breakLabel="..."
          onPageChange={(e) => setCurrentPage(e.selected)}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          renderOnZeroPageCount={null}
          forcePage={currentPage}
          className={styles.paginator}
          pageClassName={styles.paginatorPage}
          activeLinkClassName={styles.paginatorActive}
          previousLabel={
            <div className={styles.paginatorPrev}>
              <BsArrowLeftShort /> Prev{" "}
            </div>
          }
          nextLabel={
            <div className={styles.paginatorNext}>
              Next <BsArrowRightShort />
            </div>
          }
        />
      )}
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
  const departments = allVets.reduce((acc, recipient) => {
    const depts = (recipient.Department || "")
      .split(",")
      .map((w) => w.trim())
      .filter(Boolean);
    depts.forEach((d) => {
      if (!acc.some((item) => item.value === d)) {
        acc.push({ value: d, label: d });
      }
    });
    return acc;
  }, []);

  // sort departments alphabetically
  departments.sort((a, b) => a.label.localeCompare(b.label));

  const serviceRanges = allVets.reduce((acc, recipient) => {
    const ranges = (recipient.DatesOfService || "")
      .split(",")
      .map((w) => w.trim())
      .filter(Boolean);
    ranges.forEach((r) => {
      if (!acc.some((item) => item.value === r)) {
        acc.push({ value: r, label: r });
      }
    });
    return acc;
  }, []);

  // sort service ranges alphabetically
  serviceRanges.sort((a, b) => a.label.localeCompare(b.label));

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
        findAllMatches: true,
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
        (recipient.Department || "").includes(warFilter)
      );
    }
    if (branchFilter) {
      filteredSet = filteredSet.filter((recipient) =>
        (recipient.DatesOfService || "").includes(branchFilter)
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
          items={departments}
          value={warFilter}
          onChange={(val) => {
            setWarFilter(val);
          }}
          placeholder="Department"
        />
        {/* <Dropdown
          className={styles.dropdown}
          items={serviceRanges}
          value={branchFilter}
          onChange={(val) => {
            setBranchFilter(val);
          }}
          placeholder="Dates of Service"
        /> */}
      </div>
      {(!!searchText || !!warFilter || !!branchFilter) && (
        <div
          className={styles.clear}
          onClick={() => {
            setSearchText("");
            setWarFilter(null);
            setBranchFilter(null);
          }}
        >
          {" "}
          CLEAR{" "}
        </div>
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
            NO RESULTS. PLEASE TRY ANOTHER SEARCH
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
              <th>Department</th>
              <th>Dates of Service</th>
            </tr>
          </thead>
        </table>
        <table className={styles.list}>
          <tbody>
            {items.map((item) => (
              <tr
                key={item.id || item.ID}
                className={styles.item}
                onClick={() => onSetRecipient(item)}
              >
                <td>{item.FirstName}</td>
                <td>{item.LastName}</td>
                <td>{item.Department}</td>
                <td>{item.DatesOfService}</td>
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
  const [activeSection, setActiveSection] = useState(null); // "bio" | "incident" | "sources" | null

  function toggleSection(section) {
    if (activeSection === section) {
      setActiveSection(null);
    } else {
      setActiveSection(section);
    }
  }

  return (
    <Modal onClose={onClose} index={0}>
      <div className={styles.details}>
        <div className={styles.leftDetails}>
          <div className={styles.stats}>
            <Scroller>
              <div className={styles.detailName}>
                {item.FirstName} {item.MiddleInitial} {item.LastName}
                {!!item.Suffix && `, ${item.Suffix}`}
              </div>
              <div className={styles.detailHeading}>DETAILS</div>
              <ul className={styles.statList}>
                <li>
                  <strong>BORN:</strong> {item.Birthdate}
                </li>
                <li>
                  <strong>DEATH:</strong> {item.DateOfDeath}
                </li>
                <li>
                  <strong>DEPARTMENT WORKING FOR AT TIME OF DEATH:</strong> {item.Department}
                </li>
                <li>
                  <strong>DATES OF SERVICE:</strong> {item.DatesOfService}
                </li>
              </ul>
              <ul className={styles.statCollapseList}>
                {!!item.Biography && (
                  <li className={styles.statCollapse} data-active={activeSection === 'bio'}>
                    <strong onClick={() => toggleSection('bio')}>Biography</strong>
                    <div
                      className={styles.statCollapseContent}
                      dangerouslySetInnerHTML={{ __html: item.Biography }}
                    />
                  </li>
                )}
                {!!item.Incident && (
                  <li className={styles.statCollapse} data-active={activeSection === 'incident'}>
                    <strong onClick={() => toggleSection('incident')}>Incident Narrative</strong>
                    <div
                      className={styles.statCollapseContent}
                      dangerouslySetInnerHTML={{ __html: item.Incident }}
                    />
                  </li>
                )}
                {!!item.Sources && (
                  <li className={styles.statCollapse} data-active={activeSection === 'sources'}>
                    <strong onClick={() => toggleSection('sources')}>Sources</strong>
                    <div
                      className={styles.statCollapseContent}
                      dangerouslySetInnerHTML={{ __html: item.Sources }}
                    />
                  </li>
                )}
              </ul>
            </Scroller>
          </div>
        </div>
        <div className={styles.rightDetails}>
          {item.PhotoFile !== "NOIMAGE" && item.PhotoFile ? (
            <img
              src={`/images/fallen-peace-officers/${item.PhotoFile}`}
              alt={""}
            />
          ) : (
            <img src={`/images/no-photo.png`} alt={""} />
          )}
        </div>
      </div>
    </Modal>
  );
}
