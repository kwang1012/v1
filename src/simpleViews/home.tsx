import Link from 'next/link';
import { simpleProviders } from '@/const';
import { onClickProvider } from '@/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import SimplePublicationCard from '@/components/SimplePublicationCard';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import ExperienceCard from '@/components/ExperienceCard';

gsap.registerPlugin(ScrollTrigger);

type Props = {
  pubs: any[];
  posts: any[];
  exps: any[];
  news: any[];
};

export default function SimpleHomeView({ pubs, posts, exps, news }: Props) {
  const [showMoreNews, setShowMoreNews] = useState(false);

  const mainRef = useRef(null);
  useEffect(() => {
    const q = gsap.utils.selector(mainRef);
    const sectionList = q('section');
    sectionList.forEach((section) => {
      gsap.from(section, {
        ease: 'power3',
        duration: 1.2,
        opacity: 0,
        y: 50,
        scrollTrigger: section,
      });
    });
  }, [mainRef]);

  return (
    <div ref={mainRef}>
      <div className="flex flex-wrap justify-center md:justify-start">
        <Image
          src="https://lsalab.cs.nthu.edu.tw/~kswang/avatar.png"
          width={182}
          height={182}
          objectFit="cover"
          className="rounded-full"
        />
        <div className="ml-10">
          <h1 className="mb-0">Kai Wang</h1>
          <div>A graduate student @ NTHU</div>
          <div className="flex text-secondary my-2">
            {simpleProviders.map((provider, i) => (
              <FontAwesomeIcon
                key={i}
                className="cursor-pointer mr-4"
                icon={provider}
                size="2x"
                onClick={() => onClickProvider(provider as string)}
              />
            ))}
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
      <section>
        <p>
          I'm currently a graduate student at NTHU. My research interest covers topics around parallel computing
          including MPI and CUDA programming. Also, I am familiar with cloud computing such as resource provisioning
          strategies. In addition, I work at Skymizer as an intern & focus on optimizing the performance of DL
          inference.
        </p>
        <p>My research interests mainly lie in computer vision, especially in:</p>
        <ul>
          <li>Cloud Computing</li>
          <li>ML Systems</li>
          <li>Algorithmic optimization</li>
        </ul>
      </section>
      <div className="mt-10 pb-2 text-2xl font-bold border-0 border-b border-gray-200 border-solid">News</div>
      <section>
        <ul className="pl-6">
          {news.slice(0, 2).map((n, i: number) => (
            <ReactMarkdown
              key={i}
              components={{
                p: ({ className, children }) => <li className={className}>{children}</li>,
              }}
            >
              {`[${moment(n.date).format('MM/DD/YYYY')}] ${n.title} ${n.highlighted ? '⭐️' : ''}`}
            </ReactMarkdown>
          ))}
          {showMoreNews &&
            news.slice(2).map((n, i: number) => (
              <ReactMarkdown
                key={i}
                components={{
                  p: ({ className, children }) => <li className={className}>{children}</li>,
                }}
              >
                {`[${moment(n.date).format('MM/DD/YYYY')}] ${n.title}`}
              </ReactMarkdown>
            ))}
        </ul>
        <span className="text-blue-500 cursor-pointer hover:underline" onClick={() => setShowMoreNews((show) => !show)}>
          {showMoreNews ? 'view less' : 'view more'}
        </span>
      </section>
      <div className="mt-10 pb-2 text-2xl font-bold border-0 border-b border-gray-200 border-solid">
        Selected Publictions
      </div>
      <section>
        {pubs.map((pub, i) => (
          <SimplePublicationCard key={i} pub={pub} />
        ))}
        <Link href="/pubs">
          <div className="mt-6 text-primary cursor-pointer hover:underline">
            <FontAwesomeIcon icon={faArrowRight} />
            <span className="ml-2">Full list</span>
          </div>
        </Link>
      </section>
      <div className="mt-10 pb-2 text-2xl font-bold border-0 border-b border-gray-200 border-solid">Blog</div>
      <section>
        <p>
          A place to record my feelings, exploration, and growth. I intend to be casual here, so I decided to use
          Mandarin for some posts. Despite me being a CS student, this will not be a technical blog.
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
          <div className="mt-6 text-primary cursor-pointer hover:underline">
            <FontAwesomeIcon icon={faArrowRight} />
            <span className="ml-2">Full list</span>
          </div>
        </Link>
      </section>
      <div className="mt-10 pb-2 text-2xl font-bold border-0 border-b border-gray-200 border-solid">
        Research Experiences
      </div>
      <section>
        {exps.map((exp, i) => (
          <ExperienceCard key={i} exp={exp} sm/>
        ))}
      </section>
      <div className="mt-10 pb-2 text-2xl font-bold border-0 border-b border-gray-200 border-solid">
        Academic Services
      </div>
      <section>
        <p>Coming Soon</p>
      </section>
    </div>
  );
}
