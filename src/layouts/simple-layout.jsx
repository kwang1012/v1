import Nav from 'src/components/nav';
import SimpleFooter from 'src/components/SimpleFooter';

export default function SimpleLayout({ children, contentWidth = 800, paddingTop = 80, layout = {} }) {
  return (
    <>
      <Nav isSimple />
      {layout === null ? (
        children
      ) : (
        <div
          className={'mx-auto min-h-screen'}
          style={{
            paddingTop: `${paddingTop}px`,
            maxWidth: `${contentWidth}px`,
          }}
        >
          {children}
        </div>
      )}
      <SimpleFooter />
    </>
  );
}
