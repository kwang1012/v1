import { faUser, faCalendar, faFolderOpen } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import moment from 'moment';
import { faMedal } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { IconButton, Pagination, PaginationItem } from '@mui/material';
import Link from 'next/link';
import { EmailOutlined, Facebook, Twitter } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

type Props = {
  posts: any[];
  categories: any[];
  pagination: any;
};

export default function BlogView({ posts, categories, pagination }: Props) {
  const router = useRouter();
  const page = parseInt((router.query.page as string) || '1');
  const setting = useSelector((state: RootState) => state.setting);
  return (
    <>
      <h1>Kai's Blog</h1>
      <p>
        A place to record my feelings, exploration, and growth. I intend to be casual here, so I decided to use Mandarin
        for some posts. Despite me being a CS student, this will not be a technical blog.
      </p>
      <div className="flex mt-20">
        <div className="flex-grow md:mr-4">
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
                  <span className="ml-1">{moment(post.createdAt).format('MM/DD/YYYY')}</span>
                  <FontAwesomeIcon className="ml-4" icon={faFolderOpen} />
                  <span className="ml-1">{post.post_category?.name || 'Other'}</span>
                </div>
              </div>
              <div className="line-clamp-2 mt-5">{post.abstract}</div>
              <div className="flex justify-end text-primary mt-5 cursor-pointer">Read More</div>
            </div>
          ))}
          <Pagination
            className="mt-10"
            page={page}
            count={pagination.pageCount}
            color="primary"
            shape="rounded"
            variant="outlined"
            renderItem={(item) => (
              <Link
                href={{
                  query: {
                    ...(item.page !== 1 && { page: item.page }),
                  },
                }}
                scroll={false}
              >
                <PaginationItem {...item} />
              </Link>
            )}
          />
        </div>
        <div className="w-[245px] flex-shrink-0 hidden md:block">
          <div className="rounded-md overflow-hidden shadow-md mb-4 border border-solid border-gray-200 flex flex-col">
            <Image src={setting.avatarURL || ''} width={245} height={272} objectFit="cover" />
            <div
              className="p-4 pt-0 flex-1"
              style={{
                background: 'linear-gradient(90deg, #fc5c7d33, #6a82fb33)',
              }}
            >
              <div className="py-2 flex items-center justify-around">
                <IconButton size="small" color="primary" href="mailto:kw37@illinois.edu" target="_blank">
                  <EmailOutlined />
                </IconButton>
                <IconButton size="small" color="primary" href="https://twitter.com/kwang871012" target="_blank">
                  <Twitter />
                </IconButton>
                <IconButton size="small" color="primary" href="https://www.facebook.com/kwang871012" target="_blank">
                  <Facebook />
                </IconButton>
              </div>
              <h3 className="m-0">Kai Wang</h3>
              <span className="text-sm text-gray-600">Passion && Patient.</span>
            </div>
          </div>
          <div
            className="p-4 text-left rounded-md overflow-hidden shadow-md mb-4 border border-solid border-gray-200"
            style={{
              background: 'linear-gradient(60deg, #fc5c7d33, #6a82fb33)',
            }}
          >
            <div>
              <FontAwesomeIcon icon={faFolderOpen}></FontAwesomeIcon>
              <span className="ml-2">Article Category</span>
            </div>
            {categories.map((category, i) => (
              <div key={i} className="flex justify-between mt-3 items-center">
                <span className="text-sm">{category.name}</span>
                <div className="bg-primary py-[2px] px-2 rounded-xl text-xs text-white">{category.posts.count}</div>
              </div>
            ))}
          </div>
          <div
            className="p-4 rounded-md overflow-hidden shadow-md mb-4 border border-solid border-gray-200"
            style={{
              background: 'linear-gradient(30deg, #fc5c7d33, #6a82fb33)',
            }}
          >
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
    </>
  );
}
