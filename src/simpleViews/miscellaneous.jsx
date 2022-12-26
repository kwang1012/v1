import Nav from 'src/components/nav';
export default function MiscellaneousView() {
  return (
    <div>
      <Nav isSimple={true} />
      <div className="mt-[200px] max-w-[650px] mx-auto bg-gray-300 rounded-md pt-16 shadow-lg flex flex-col items-center relative">
        <img
          src="https://lsalab.cs.nthu.edu.tw/~kswang/avatar.png"
          className="w-[150px] h-[150px] object-cover rounded-full absolute -top-[40%]"
        />
        <div className="p-5 flex flex-col items-center">
          <h2 className="mb-0">Kai Wang</h2>
          <p>Hi, this is Kai Wang,</p>
        </div>
      </div>
    </div>
  );
}
