import SimplePublicationCard from '@/components/SimplePublicationCard';
import moment from 'moment';

type Props = {
  groups: { pubs: any[]; year: string }[]; // already group by year
};

export default function PublicationView({ groups }: Props) {
  return (
    <>
      <div className="mt-10 pb-2 text-2xl font-bold border-0 border-b border-gray-200 border-solid mb-10">
        All Publications by Year
      </div>
      {groups.map((grp, i) => (
        <div key={i}>
          <div className="text-2xl font-bold mt-6">{moment(grp.year).year()}</div>
          {grp.pubs.map((pub, j) => (
            <SimplePublicationCard key={j} pub={pub} />
          ))}
        </div>
      ))}
    </>
  );
}
