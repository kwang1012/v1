import Image from 'next/image';
import { useState } from 'react';

export default function SimplePublicationCard({ pub, ...props }) {
  const [showing, setShowing] = useState(null);
  return (
    <div {...props} className="shadow-md mt-4 border border-solid border-gray-200 p-5 rounded-md flex">
      <div className=" w-[120px] flex-shrink-0 relative">
        <div className="absolute bg-[#CC3363] text-white p-1 rounded-md text-sm">{pub.venue.short}</div>
        {pub.image && <Image src={pub.image} width='100%' height='100%' objectFit='contain' />}
      </div>
      <div className="ml-5">
        <div className=" font-extrabold">{pub.title}</div>
        <div className="my-2 flex">
          {pub.authorList.map((author, i) => (
            <div key={i}>
              <span className={author.name.includes('Kai-Siang Wang') ? 'font-bold' : ''}>
                {author.name}
                {author.type === 'First Author' && '*'}
              </span>
              {i !== pub.authorList.length - 1 && <span>, </span>}
            </div>
          ))}
        </div>
        <div className="italic">{pub.venue.name}</div>
        <div className="flex mt-3">
          <span>
            [
            <a
              className="cursor-pointer text-blue-500 hover:underline"
              onClick={() => setShowing((value) => (value === 'abstract' ? null : 'abstract'))}
            >
              Abstract
            </a>
            ]
          </span>
          <span>
            [
            <a className="cursor-pointer text-blue-500 hover:underline" href={pub.url} rel="noreferrer" target="_blank">
              Paper
            </a>
            ]
          </span>
          {pub.bib && (
            <span>
              [
              <a
                className="cursor-pointer text-blue-500 hover:underline"
                onClick={() => setShowing((value) => (value === 'bib' ? null : 'bib'))}
              >
                Bibtex
              </a>
              ]
            </span>
          )}
        </div>
        {showing === 'abstract' && <div className="mt-5 whitespace-pre-wrap text-sm">{pub.abstract}</div>}
        {showing === 'bib' && pub.bib && <div className="mt-5 whitespace-pre-wrap text-sm">{pub.bib}</div>}
      </div>
    </div>
  );
}
