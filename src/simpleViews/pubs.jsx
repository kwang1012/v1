import SimplePublicationCard from 'src/components/SimplePublicationCard';

export default function PublicationView({ pubs }) {
  return (
    <>
      <div className="mt-10 pb-2 text-2xl font-bold border-0 border-b border-gray-200 border-solid mb-10">
        All Publications by Year
      </div>
      {pubs.map((pub, i) => (
        <SimplePublicationCard key={i} pub={pub} />
      ))}
    </>
  );
}
