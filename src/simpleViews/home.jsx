import Link from 'next/link';
import Nav from 'src/components/nav';
import { simpleProviders } from 'src/const';
import { onClickProvider } from 'src/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import SimplePublicationCard from 'src/components/SimplePublicationCard';
import moment from 'moment';

export default function SimpleHomeView({ pubs, posts }) {
  return (
    <div>
      <Nav isSimple={true} />
      <div className="pt-32 max-w-[900px] mx-auto">
        <div className=" flex">
          <img
            src="https://lsalab.cs.nthu.edu.tw/~kswang/avatar.png"
            className="w-[182px] h-[182px] object-cover rounded-full"
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
        <div className="mt-10 pb-2 text-2xl font-bold border-0 border-b border-gray-200 border-solid">Publictions</div>
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
          A place to record my feelings, exploration, and growth. I intend to be casual here, so I decided to use
          Mandarin for some posts. Despite me being a CS student, this will not be a technical blog.
        </p>
        {posts?.map((post, i) => (
          <div key={i}>
            <ul className="pl-6">
              <li>
                [{moment(post.createdAt).format('DD/MM/YYYY')}]{' '}
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
          Academic Services
        </div>
        <p>Coming Soon</p>
      </div>
      <div
        className="text-center h-[180px] mt-40 flex flex-col justify-end p-5"
        style={{
          background: 'linear-gradient(transparent, #CC336390)',
        }}
      >
        Copyright © 2021-2022 Kai Wang
      </div>
    </div>
  );
}
