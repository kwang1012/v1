import Nav from 'src/components/nav';
import { faUser, faCalendar, faFolderOpen } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';

export default function BlogView() {
  const router = useRouter()
  return (
    <div>
      <Nav isSimple={true} />
      <div className="py-20 px-5 max-w-[900px] mx-auto text-center">
        <h1>Kai's Blog</h1>
        <p>
          A place to record my feelings, exploration, and growth. I intend to be casual here, so I decided to use
          Mandarin for some posts. Despite me being a CS student, this will not be a technical blog.
        </p>
        <div className="flex mt-20">
          <div className="flex-grow mr-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} onClick={() => router.push('/blog/2023_Fall_CS_PhD_application')} className="shadow-md mb-4 border border-solid border-gray-200 p-5 rounded-md text-left cursor-pointer hover:shadow-2xl transition-shadow">
                <div className="border-0 border-b border-gray-300 border-solid pb-2">
                  <div className="text-xl font-bold">2023 Fall CS PhD申請總結</div>
                  <div className="flex mt-3 items-center">
                    <FontAwesomeIcon icon={faUser} />
                    <span className="ml-1">Kai</span>
                    <FontAwesomeIcon className="ml-4" icon={faCalendar} />
                    <span className="ml-1">2022/12/26</span>
                    <FontAwesomeIcon className="ml-4" icon={faFolderOpen} />
                    <span className="ml-1">PhD</span>
                  </div>
                </div>
                <div className="line-clamp-2 mt-5">
                  選擇讀博算是人生中數一數二的重大決定了，這條路很難，尤其是現在CV領域競爭白熱化，很多次想過放棄，但萬幸遇到了很多良師益友，最終一步步走了過來。在此做個記錄，希望能給之後打算申請PhD的同學一些幫助。
                </div>
                <div className="flex justify-end text-[#CC3363] mt-5 cursor-pointer">Read More</div>
              </div>
            ))}
          </div>
          <div className="w-[245px] flex-shrink-0">
            <div className="rounded-md overflow-hidden shadow-md mb-4 border border-solid border-gray-200">
              <img
                src="https://lsalab.cs.nthu.edu.tw/~kswang/avatar.png"
                className="w-full aspect-[9/10] object-cover"
              />
              <div></div>
              <h3>Kai Wang</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
