import Link from 'next/link';
import Nav from 'src/components/nav';
import { simpleProviders } from 'src/const';
import { onClickProvider } from 'src/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function SimpleHomeView({ pubs }) {
  return (
    <div>
      <Nav isSimple={true}/>
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
              <Link href="mailto:kswang@lsalab.cs.nthu.edu.tw" target='_blank'>
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
          <div key={i} className="shadow-md mt-4 border border-solid border-gray-200 p-5 rounded-md flex">
            <div className=" w-[120px] flex-shrink-0">{pub.venueName}</div>
            <div className="ml-5">
              <div>{pub.title}</div>
              <div>
                <span className="font-bold">Kai-Siang Wang</span>, Jerry Chou
              </div>
            </div>
          </div>
        ))}
        <div className="mt-10 pb-2 text-2xl font-bold border-0 border-b border-gray-200 border-solid">Blog</div>
        <p>Coming Soon</p>
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
