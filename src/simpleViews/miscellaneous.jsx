import Image from 'next/image';
import SimpleLayout from 'src/layouts/simple-layout';

export default function MiscellaneousView() {
  return (
    <SimpleLayout>
      <div className="mt-[200px] max-w-[650px] mx-auto bg-gray-300 rounded-md pt-16 shadow-lg flex flex-col items-center relative">
        <Image
          src="https://lsalab.cs.nthu.edu.tw/~kswang/avatar.png"
          width={150}
          height={150}
          objectFit='cover'
          className="rounded-full absolute -top-[40%]"
        />
        <div className="p-5 flex flex-col items-center">
          <h2 className="mb-0">Kai Wang</h2>
          <p>Hi, this is Kai Wang,</p>
        </div>
      </div>
    </SimpleLayout>
  );
}
