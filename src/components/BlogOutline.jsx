import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { flat } from 'src/utils';

function collectHeaders(el, n, position, prefix = '') {
  if (n === 6)
    return {
      title: el.textContent,
      el,
      children: [],
      active: false,
      id: `${prefix}-app-outline-` + String(n) + String(position),
    };
  const list = [];
  let nextEl = el.nextElementSibling;
  while (nextEl && nextEl.tagName !== el.tagName) {
    if (nextEl.tagName === `H${n + 1}`) {
      list.push(nextEl);
    }
    nextEl = nextEl.nextElementSibling;
  }
  const subHeaders = list.map((h, i) => collectHeaders(h, n + 1, i, prefix));
  return {
    title: el.textContent,
    el,
    children: subHeaders,
    active: false,
    id: `${prefix}-app-outline-` + String(n) + String(position),
  };
}

function Header({ h, level }) {
  return (
    <>
      <div
        id={h.id}
        onClick={() => {
          const y = h.el.offsetTop - 70;
          scrollTo({
            top: y,
            behavior: 'smooth',
          });
        }}
        style={{
          paddingLeft: `${level * 8}px`,
          fontSize: `${13 - level}px`,
          fontWeight: h.active && 'bold',
          color: h.active ? '#CC3363' : '#767676',
        }}
        className="cursor-pointer mb-1"
      >
        {h.title}
      </div>
      {h.children.map((child, i) => (
        <Header key={i} h={child} level={level + 1} />
      ))}
    </>
  );
}

export default function BlogOutline({ id = '', className, content, scrollOffset, width }) {
  const [headerList, setHeaderList] = useState([]);

  const updateHeaderList = () => {
    // top level header
    for (let h = 1; h <= 6; h++) {
      const list = [];
      const hs = document.querySelectorAll(`.markdown-content h${h}`);
      hs.forEach((h2, i) => {
        list.push(collectHeaders(h2, h, i, id));
      });
      if (hs.length !== 0) {
        setHeaderList(list);
        return;
      }
    }
  };
  useEffect(updateHeaderList, [content, width]);

  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const flatList = flat(headerList);
    let height = 0;
    for (const [i, h] of Object.entries(flatList)) {
      if (h.el.getBoundingClientRect().y > 80 || parseInt(i) === flatList.length - 1) {
        flatList.forEach((el, idx) => {
          if (idx < i || (i === '0' && idx === 0) || h.el.getBoundingClientRect().y <= 80) {
            const tab = document.getElementById(el.id);
            if (!tab) return;
            const style = getComputedStyle(tab);
            height += parseFloat(style.height) + parseFloat(style.marginBottom);
          }
          if (h.el.getBoundingClientRect().y <= 80) {
            el.active = parseInt(i) === flatList.length - 1 && idx === flatList.length - 1;
          } else el.active = idx === i - 1 || (i === '0' && idx === 0);
        });
        return setProgress(height - 4);
      }
    }
  }, [scrollOffset, headerList]);
  return (
    <div className={className || 'flex'}>
      <div className="w-[2px] h-10 bg-[#CC3363] mr-5 transition-all" style={{ height: `${progress}px` }} />
      <div>
        {headerList.map((h, i) => (
          <Header key={i} h={h} level={0} />
        ))}
      </div>
      {!className && <div className="w-[2px] h-10 ml-5" />}
    </div>
  );
}
