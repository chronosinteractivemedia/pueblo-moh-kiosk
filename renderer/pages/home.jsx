import React from 'react';
import { apiUrl } from '../config';
import AttractLoops from '../components/AttractLoops/AttractLoops';
import SecretClose from "../components/SecretClose/SecretClose";

export default function Home({data}) {
  return (
    <>
      <SecretClose />
      <AttractLoops />
    </>
  );
};

export async function getStaticProps(context){
  //const res = await fetch(`${apiUrl}/attract-loops`);
  //const data = await res.json();
  //if(!data) return { notFound: true };
  const data = {};
  return {
    props: {data}
  }
}
