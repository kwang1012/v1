import Nav from 'src/components/nav';
import SimpleFooter from 'src/components/SimpleFooter';

export default function ExperienceView() {
  return (
    <div>
      <Nav isSimple={true} />
      <div className="pt-20 max-w-[800px] mx-auto min-h-screen">
        <h2>Experiences</h2>
        <div className="mt-10 pb-2 text-2xl font-bold border-0 border-b border-gray-200 border-solid">
          Research Experiences
        </div>
        <div className="shadow-md mt-4 border border-solid border-gray-200 p-5 rounded-md">
          <div className="text-lg">
            <a className="font-bold text-blue-500 hover:underline cursor-pointer">LSA Lab</a>
            <span className="font-bold"> @ National Tsing Hua University, </span>
            <span>Hsichu, Taiwan</span>
          </div>
          <div className="mt-2">Research Assistant. March 2021 - Present</div>
          <div className="mt-2">Advisor: Prof. Jerry Chou</div>
          <ul>
            <li>Scheduling in embedded systems with memory constraints</li>
          </ul>
        </div>
      </div>
      <SimpleFooter />
    </div>
  );
}
