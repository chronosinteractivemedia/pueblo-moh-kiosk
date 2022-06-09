import React, {useEffect, useRef, useState} from 'react';
import styles from './VetBridge.module.scss';
import {Modal} from "../Modal/Modal";
import Dropdown from '../Dropdown/Dropdown';
import Fuse from "fuse.js";

import 'react-dropdown/style.css';
import Scroller from "../Scroller/Scroller";
import {BsSearch} from "react-icons/bs";

export default function VetBridge({allVets}){
  const [currentRecipient, setCurrentRecipient] = useState(null);
  const [displayList, setDisplayList] = useState([]);
  return <div className={styles.component}>
    <Filters allVets={allVets} onFilter={filtered => setDisplayList(filtered)} />
    <List items={displayList} onSetRecipient={recipient => setCurrentRecipient(recipient)} />
    {!!currentRecipient && <Details item={currentRecipient} onClose={() => setCurrentRecipient(false)}/> }
  </div>
}

function Filters({allVets, onFilter}){
  const [searchText, setSearchText] = useState('');
  const fuseInstance = useRef();
  // const [warFilter, setWarFilter] = useState('');
  // const [branchFilter, setBranchFilter] = useState('');
  // const [filterSets, setFilterSets] = useState({wars: [], branches: []})

  // useEffect(() => {
  //   if(allVets?.length){
  //     const wars = allVets.reduce((reduced, item) => {
  //       if(item.War && !reduced.includes(item.War)) reduced.push(item.War);
  //       return reduced;
  //     }, []);
  //     const branches = allVets.reduce((reduced, item) => {
  //       if(item.Branch && !reduced.includes(item.Branch)) reduced.push(item.Branch);
  //       return reduced;
  //     }, []);
  //     setFilterSets({wars, branches});
  //   }
  // }, [allVets, setFilterSets]);


  useEffect(() => {

    if(!fuseInstance.current){
      const options = {
        keys: ["FirstName", "LastName"],
        threshold: -1.2,
        ignoreLocation: true,
        getFn: (obj) => {
          return obj.FirstName + ' ' + obj.LastName;
        }
      };
      fuseInstance.current = new Fuse(allVets, options);
    }

    let filteredSet;
    if (searchText) {
      const result = fuseInstance.current.search(searchText);
      filteredSet = result.map((r) => r.item);
    } else  {
      filteredSet = allVets;
    }
    onFilter(filteredSet);

  }, [allVets, searchText])

  return <div className={styles.filters}>
    <div className={styles.searchWrapper}>
      <BsSearch />
      <input className={styles.search} placeholder="Search by name..." type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
    </div>
    <div className={styles.clear} onClick={() => setSearchText('')}>CLEAR</div>
    {/*<Dropdown className={styles.wars} items={filterSets.wars} onChange={val => setWarFilter(val)} placeholder="War"/>*/}
    {/*<Dropdown className={styles.branches} items={filterSets.branches} onChange={val => setBranchFilter(val)} placeholder="Service Branch" />*/}
  </div>
}

function List({items, onSetRecipient}){
  if(!items?.length){
    return <div className={styles.listContainer}>
      <div className={styles.listWrapper}>
        <div className={styles.noResults}>No Results. Please try a different name.</div>
      </div>
    </div>
  }
  return <div className={styles.listContainer}>
    <div className={styles.listWrapper}>
      <Scroller darkBg={true}>
        <table className={styles.list}>
          <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Branch</th>
            <th>War</th>
            <th>Dates Active</th>
            <th></th>
          </tr></thead>
          <tbody>
          {items.map(item => <tr key={item.ID} className={styles.item} onClick={() => onSetRecipient(item)}>
            <td>{item.FirstName}</td>
            <td>{item.LastName}</td>
            <td>{item.Branch}</td>
            <td>{item.War ? item.War : '-'}</td>
            <td>{item.DateAct}</td>
            <td className={styles.itemLink}>Details</td>
          </tr>)}</tbody>
        </table>
      </Scroller>
    </div>
  </div>
}

function Details({item, onClose}){
  return <Modal onClose={onClose} index={0}><div className={styles.details}>
    <div className={styles.leftDetails}>
      <div className={styles.stats}><Scroller>
        <div className={styles.detailName}>{item.FirstName} {item.MiddleInitial} {item.LastName}</div>
        <div className={styles.detailHeading}>DETAILS</div>
        <ul>
          <li>BORN: {item.BirthDate}</li>
          <li>BRANCH: {item.Branch}</li>
          <li>AWARDS: {item.Awards}</li>
          <li>DEATH: {item.DateDiceased}</li>
          <li>WAR: {item.War}</li>
          <li>DATE OF SERVICE: {item.DateAct}</li>
        </ul>
        <div className={styles.detailHeading}>INDEX LOCATION ON BRIDGE</div>
        <ul>
          <li>Plaque: {item.IndexPlaque}</li>
          <li>Column: {item.IndexColumn}</li>
          <li>Row: {item.IndexRow}</li>
        </ul>
        <div className={styles.detailHeading}>BIOGRAPHY</div>
        <p>{item.Biography}</p>
      </Scroller></div>
    </div>
    <div className={styles.rightDetails}>
      {(item.ImageFile !== 'NOIMAGE') ? <img src={`/vet-images/${item.ImageFile}.jpg`} alt={""} /> :  <img src={`/images/no-photo.png`} alt={""} />}
    </div>
  </div></Modal>
}