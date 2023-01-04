import Link from 'next/link';
import { simpleProviders } from 'src/const';
import { onClickProvider } from 'src/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import SimplePublicationCard from 'src/components/SimplePublicationCard';
import moment from 'moment';
import { useState } from 'react';
import SimpleLayout from 'src/layouts/simple-layout';
import Image from 'next/image';

export default function SimpleHomeView({ pubs, posts }) {
  const [showMoreNews, setShowMoreNews] = useState(false);

  return (
    <SimpleLayout contentWidth={900} paddingTop={160}>
      <div className=" flex">
        <Image
          src="https://lsalab.cs.nthu.edu.tw/~kswang/avatar.png"
          width={182}
          height={182}
          objectFit='cover'
          className="rounded-full"
        />
        <div className="ml-10">
          <h1 className="mb-0">Kai Wang</h1>
          <div>A graduate student @ NTHU</div>
          <div className="flex text-secondary my-2">
            {simpleProviders.map((provider, i) => {
              return (
                <FontAwesomeIcon
                  key={i}
                  className="cursor-pointer mr-4"
                  icon={provider}
                  size="2x"
                  onClick={() => onClickProvider(provider)}
                />
              );
            })}
          </div>
          <div>
            Email:{' '}
            <Link href="mailto:kswang@lsalab.cs.nthu.edu.tw" target="_blank">
              <span className="text-blue-500 hover:underline cursor-pointer">kswang@lsalab.cs.nthu.edu.tw</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-10 pb-2 text-2xl font-bold border-0 border-b border-gray-200 border-solid">About Me</div>
      <p>
        I'm currently a graduate student at NTHU. My research interest covers topics around parallel computing including
        MPI and CUDA programming. Also, I am familiar with cloud computing such as resource provisioning strategies. In
        addition, I work at Skymizer as an intern & focus on optimizing the performance of DL inference.
      </p>
      <p>My research interests mainly lie in computer vision, especially in:</p>
      <ul>
        <li>Cloud Computing</li>
        <li>ML Systems</li>
        <li>Algorithmic optimization</li>
      </ul>
      <div className="mt-10 pb-2 text-2xl font-bold border-0 border-b border-gray-200 border-solid">News</div>
      <ul className="pl-6">
        <li>[12/07/2022] Attend the conference, PDCAT'22, Sendai, Japan</li>
        <li>
          [10/23/2022] One paper is accepted to <span className="font-bold">PDCAT 2022</span>
        </li>
        {/* <li>[12/07/2022] Attend the conference, PDCAT'22, Sendai, Japan</li>
          <li>
            [10/23/2022] One paper is accepted to <span className="font-bold">PDCAT 2022</span>
          </li> */}
        {showMoreNews && (
          <>
            <li>[12/07/2022] Attend the conference, PDCAT'22, Sendai, Japan</li>
            <li>
              [10/23/2022] One paper is accepted to <span className="font-bold">PDCAT 2022</span>
            </li>
          </>
        )}
      </ul>
      {/* <span className="text-blue-500 cursor-pointer hover:underline" onClick={() => setShowMoreNews((show) => !show)}>
          {showMoreNews ? 'view less' : 'view more'}
        </span> */}
      <div className="mt-10 pb-2 text-2xl font-bold border-0 border-b border-gray-200 border-solid">
        Selected Publictions
      </div>
      {pubs.map((pub, i) => (
        <SimplePublicationCard key={i} pub={pub} />
      ))}
      <Link href="/pubs">
        <div className="mt-6 text-[#cc3363] cursor-pointer hover:underline">
          <FontAwesomeIcon icon={faArrowRight} />
          <span className="ml-2">Full list</span>
        </div>
      </Link>
      <div className="mt-10 pb-2 text-2xl font-bold border-0 border-b border-gray-200 border-solid">Blog</div>
      <p>
        A place to record my feelings, exploration, and growth. I intend to be casual here, so I decided to use Mandarin
        for some posts. Despite me being a CS student, this will not be a technical blog.
      </p>
      {posts?.map((post, i) => (
        <div key={i}>
          <ul className="pl-6">
            <li>
              [{moment(post.createdAt).format('MM/DD/YYYY')}]{' '}
              <Link href={`/blog/${post.slug}`}>
                <a className="cursor-pointer text-blue-500 hover:underline">{post.title}</a>
              </Link>
            </li>
          </ul>
          <div className="pl-4 italic line-clamp-2 border-0 border-l-4 border-gray-300 border-solid">
            {post.abstract}
          </div>
        </div>
      ))}
      <Link href="/blog">
        <div className="mt-6 text-[#cc3363] cursor-pointer hover:underline">
          <FontAwesomeIcon icon={faArrowRight} />
          <span className="ml-2">Full list</span>
        </div>
      </Link>
      <div className="mt-10 pb-2 text-2xl font-bold border-0 border-b border-gray-200 border-solid">
        Research Experiences
      </div>
      <div className="px-4 mt-4">
        <div>
          <a
            className="font-bold text-blue-500 hover:underline cursor-pointer"
            href="http://hscc.cs.nthu.edu.tw/2011newpage/sh1-1.htm"
          >
            HSCC Lab
          </a>
          <span className="font-bold"> @ National Tsing Hua University, </span>
          <span>Hsichu, Taiwan</span>
        </div>
        <div className="text-sm">Research Assistant. Sep 2020 - Jan 2021</div>
        <div className="text-sm">Advisor: Prof. Jang-Ping Sheu</div>
      </div>
      <div className="mt-4 px-4">
        <div>
          <a className="font-bold text-blue-500 hover:underline cursor-pointer" href="https://lsalab.cs.nthu.edu.tw">
            LSA Lab
          </a>
          <span className="font-bold"> @ National Tsing Hua University, </span>
          <span>Hsichu, Taiwan</span>
        </div>
        <div className="text-sm">Research Assistant. March 2021 - Present</div>
        <div className="text-sm">Advisor: Prof. Jerry Chou</div>
      </div>
      <div className="mt-4 px-4">
        <div>
          <a className="font-bold text-blue-500 hover:underline cursor-pointer" href="https://skymizer.com/">
            Skymier
          </a>
          <span>, Taipei, Taiwan</span>
        </div>
        <div className="text-sm">System Architect. May 2021 - Present</div>
      </div>
      <div className="mt-10 pb-2 text-2xl font-bold border-0 border-b border-gray-200 border-solid">
        Academic Services
      </div>
      <p>Coming Soon</p>
    </SimpleLayout>
  );
}
