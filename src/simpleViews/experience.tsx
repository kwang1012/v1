import ExperienceCard from '@/components/ExperienceCard';

export default function ExperienceView({ exps }: { exps: any[] }) {
  return (
    <>
      <h2>Experiences</h2>
      <div className="mt-10 pb-2 text-2xl font-bold border-0 border-b border-gray-200 border-solid">
        Research Experiences
      </div>
      {exps.map((exp, i) => (
        <ExperienceCard key={i} exp={exp} />
      ))}
    </>
  );
}
