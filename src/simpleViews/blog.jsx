import { faUser, faCalendar, faFolderOpen } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import moment from 'moment';
import { faMedal } from '@fortawesome/free-solid-svg-icons';
import SimpleLayout from 'src/layouts/simple-layout';
import Image from 'next/image';

export default function BlogView({ posts, categories }) {
  const router = useRouter();
  return (
    <SimpleLayout contentWidth={900}>
      <h1>Kai's Blog</h1>
      <p>
        A place to record my feelings, exploration, and growth. I intend to be casual here, so I decided to use Mandarin
        for some posts. Despite me being a CS student, this will not be a technical blog.
      </p>
      <div className="flex mt-20">
        <div className="flex-grow mr-4">
          {posts.map((post, i) => (
            <div
              key={i}
              onClick={() => router.push(`/blog/${post.slug}`)}
              className="shadow-md mb-4 border border-solid border-gray-200 p-5 rounded-md text-left cursor-pointer hover:shadow-2xl transition-shadow"
            >
              <div className="border-0 border-b border-gray-300 border-solid pb-2">
                <div className="text-xl font-bold">{post.title}</div>
                <div className="flex mt-3 items-center">
                  <FontAwesomeIcon icon={faUser} />
                  <span className="ml-1">Kai</span>
                  <FontAwesomeIcon className="ml-4" icon={faCalendar} />
                  <span className="ml-1">{moment(post.updatedAt).format('MM/DD/YYYY')}</span>
                  <FontAwesomeIcon className="ml-4" icon={faFolderOpen} />
                  <span className="ml-1">{post.category}</span>
                </div>
              </div>
              <div className="line-clamp-2 mt-5">{post.abstract}</div>
              <div className="flex justify-end text-[#CC3363] mt-5 cursor-pointer">Read More</div>
            </div>
          ))}
        </div>
        <div className="w-[245px] flex-shrink-0">
          <div className="rounded-md overflow-hidden shadow-md mb-4 border border-solid border-gray-200">
              <Image src="https://lsalab.cs.nthu.edu.tw/~kswang/avatar.png" width={245} height={272} objectFit="cover" />
            <div className="px-4">
              <h3>Kai Wang</h3>
            </div>
          </div>
          <div className="p-4 text-left rounded-md overflow-hidden shadow-md mb-4 border border-solid border-gray-200">
            <div>
              <FontAwesomeIcon icon={faFolderOpen}></FontAwesomeIcon>
              <span className="ml-2">Article Category</span>
            </div>
            {categories.map((category, i) => (
              <div key={i} className="flex justify-between mt-3 items-center">
                <span className="text-sm">{category.name}</span>
                <div className="bg-[#cc3363] py-[2px] px-2 rounded-xl text-xs text-white">{category.posts.count}</div>
              </div>
            ))}
          </div>
          <div className="p-4 rounded-md overflow-hidden shadow-md mb-4 border border-solid border-gray-200">
            <div className="text-sm">
              <FontAwesomeIcon icon={faMedal}></FontAwesomeIcon>
              <span className="ml-2">Web Info</span>
            </div>
            <div className="flex justify-between mt-3 items-center">
              <span className="text-sm">Article Count:</span>
              <div className="text-xs">{posts.length} articles</div>
            </div>
          </div>
        </div>
      </div>
    </SimpleLayout>
  );
}
