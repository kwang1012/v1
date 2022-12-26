import { makeStyles } from '@mui/styles';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment/moment';
import Nav from 'src/components/nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';

function collectHeaders(el, n) {
  if (n === 6)
    return {
      title: el.textContent,
      el,
      children: [],
    };
  const list = [];
  let nextEl = el.nextElementSibling;
  while (nextEl && nextEl.tagName !== el.tagName) {
    if (nextEl.tagName === `H${n + 1}`) {
      list.push(nextEl);
    }
    nextEl = nextEl.nextElementSibling;
  }
  const subHeaders = list.map((h) => collectHeaders(h, n + 1));
  return {
    title: el.textContent,
    el,
    children: subHeaders,
  };
}

const useStyles = makeStyles({
  root: {
    '&.MuiDataGrid-root .MuiDataGrid-columnSeparator': {
      display: 'none',
    },
    '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
      outline: 'none',
    },
    '&.MuiDataGrid-root .MuiDataGrid-columnHeader:not(:first-child)': {
      borderLeft: '1px solid rgba(224, 224, 224, 1)',
    },
    '&.MuiDataGrid-root .MuiDataGrid-cell:not(:first-child)': {
      borderLeft: '1px solid rgba(224, 224, 224, 1)',
    },
    '&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus': {
      outline: 'none',
    },
    '&.MuiDataGrid-root .MuiDataGrid-row:hover': {
      backgroundColor: 'transparent',
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&.MuiDataGrid-root .MuiDataGrid-row.Mui-selected': {
      backgroundColor: 'transparent',
    },
    '&.MuiDataGrid-root .MuiDataGrid-row.Mui-even': {
      backgroundColor: 'rgba(204, 51, 99, 0.05)',
    },
    // '&.MuiDataGrid-root .MuiDataGrid-columnHeader': {
    //   backgroundColor: 'aliceblue',
    // },
  },
});

function Header({ h, level }) {
  return (
    <>
      <div
        onClick={() => h.el.scrollIntoView({ behavior: 'smooth' })}
        style={{ paddingLeft: `${level * 8}px`, fontSize: `${13 - level}px` }}
        className="cursor-pointer mb-1 text-[#767676] hover:text-black"
      >
        {h.title}
      </div>
      {h.children.map((child, i) => (
        <Header key={i} h={child} level={level + 1} />
      ))}
    </>
  );
}

export default function BlogDetailView({ blog }) {
  const headers = [
    { field: 'university', headerName: 'university' },
    {
      field: 'offer',
      headerName: 'offer',
      width: 75,
      renderCell: (params) => {
        if (params.value === null || params.value === undefined) return <></>;
        return params.value ? (
          <FontAwesomeIcon icon={faCheck} color="green" />
        ) : (
          <FontAwesomeIcon icon={faXmark} color="red" />
        );
      },
    },
    { field: 'notifyDate', headerName: 'notify date' },
    { field: 'interview1', headerName: 'interview 1' },
    { field: 'interview2', headerName: 'interview 2' },
    { field: 'interview3', headerName: 'interview 3' },
  ];
  headers.forEach((header) => {
    if (!header.width) header.flex = 1;
    header.align = 'center';
    header.headerAlign = 'center';
    header.sortable = false;
    header.backgroundColor = 'red';
  });
  const applications = [
    {
      id: 1,
      university: 'UCB',
      offer: false,
      //   notifyDate: moment('2023/01/15', 'YYYY/MM/DD').format('D-MMM-YYYY'),
      //   interview1: moment('2023/01/15', 'YYYY/MM/DD').format('D-MMM-YYYY'),
      //   interview2: moment('2023/01/15', 'YYYY/MM/DD').format('D-MMM-YYYY'),
      //   interview3: moment('2023/01/15', 'YYYY/MM/DD').format('D-MMM-YYYY'),
    },
    {
      id: 2,
      university: 'CMU',
      offer: null,
      //   notifyDate: moment('2023/01/15', 'YYYY/MM/DD').format('D-MMM-YYYY'),
      //   interview1: moment('2023/01/15', 'YYYY/MM/DD').format('D-MMM-YYYY'),
      //   interview2: moment('2023/01/15', 'YYYY/MM/DD').format('D-MMM-YYYY'),
      //   interview3: moment('2023/01/15', 'YYYY/MM/DD').format('D-MMM-YYYY'),
    },
    {
      id: 3,
      university: 'UCSD',
      offer: null,
      //   notifyDate: moment('2023/01/15', 'YYYY/MM/DD').format('D-MMM-YYYY'),
      //   interview1: moment('2023/01/15', 'YYYY/MM/DD').format('D-MMM-YYYY'),
      //   interview2: moment('2023/01/15', 'YYYY/MM/DD').format('D-MMM-YYYY'),
      //   interview3: moment('2023/01/15', 'YYYY/MM/DD').format('D-MMM-YYYY'),
    },
    {
      id: 4,
      university: 'UCLA',
      offer: null,
      //   notifyDate: moment('2023/01/15', 'YYYY/MM/DD').format('D-MMM-YYYY'),
      //   interview1: moment('2023/01/15', 'YYYY/MM/DD').format('D-MMM-YYYY'),
      //   interview2: moment('2023/01/15', 'YYYY/MM/DD').format('D-MMM-YYYY'),
      //   interview3: moment('2023/01/15', 'YYYY/MM/DD').format('D-MMM-YYYY'),
    },
    {
      id: 5,
      university: 'UIUC',
      offer: null,
      //   notifyDate: moment('2023/01/15', 'YYYY/MM/DD').format('D-MMM-YYYY'),
      interview1: moment('2022/12/24', 'YYYY/MM/DD').format('D-MMM-YYYY'),
      //   interview2: moment('2023/01/15', 'YYYY/MM/DD').format('D-MMM-YYYY'),
      //   interview3: moment('2023/01/15', 'YYYY/MM/DD').format('D-MMM-YYYY'),
    },
    {
      id: 6,
      university: 'GaTech',
      offer: null,
      //   notifyDate: moment('2023/01/15', 'YYYY/MM/DD').format('D-MMM-YYYY'),
      //   interview1: moment('2023/01/15', 'YYYY/MM/DD').format('D-MMM-YYYY'),
      //   interview2: moment('2023/01/15', 'YYYY/MM/DD').format('D-MMM-YYYY'),
      //   interview3: moment('2023/01/15', 'YYYY/MM/DD').format('D-MMM-YYYY'),
    },
    {
      id: 7,
      university: 'UW',
      offer: null,
      //   notifyDate: moment('2023/01/15', 'YYYY/MM/DD').format('D-MMM-YYYY'),
      //   interview1: moment('2023/01/15', 'YYYY/MM/DD').format('D-MMM-YYYY'),
      //   interview2: moment('2023/01/15', 'YYYY/MM/DD').format('D-MMM-YYYY'),
      //   interview3: moment('2023/01/15', 'YYYY/MM/DD').format('D-MMM-YYYY'),
    },
    {
      id: 8,
      university: 'USC',
      offer: null,
      //   notifyDate: moment('2023/01/15', 'YYYY/MM/DD').format('D-MMM-YYYY'),
      //   interview1: moment('2023/01/15', 'YYYY/MM/DD').format('D-MMM-YYYY'),
      //   interview2: moment('2023/01/15', 'YYYY/MM/DD').format('D-MMM-YYYY'),
      //   interview3: moment('2023/01/15', 'YYYY/MM/DD').format('D-MMM-YYYY'),
    },
    {
      id: 9,
      university: 'UT',
      offer: null,
      //   notifyDate: moment('2023/01/15', 'YYYY/MM/DD').format('D-MMM-YYYY'),
      //   interview1: moment('2023/01/15', 'YYYY/MM/DD').format('D-MMM-YYYY'),
      //   interview2: moment('2023/01/15', 'YYYY/MM/DD').format('D-MMM-YYYY'),
      //   interview3: moment('2023/01/15', 'YYYY/MM/DD').format('D-MMM-YYYY'),
    },
    {
      id: 10,
      university: 'UPenn',
      offer: null,
      //   notifyDate: moment('2023/01/15', 'YYYY/MM/DD').format('D-MMM-YYYY'),
      //   interview1: moment('2023/01/15', 'YYYY/MM/DD').format('D-MMM-YYYY'),
      //   interview2: moment('2023/01/15', 'YYYY/MM/DD').format('D-MMM-YYYY'),
      //   interview3: moment('2023/01/15', 'YYYY/MM/DD').format('D-MMM-YYYY'),
    },
    {
      id: 11,
      university: 'PSU',
      offer: true,
      //   notifyDate: moment('2023/01/15', 'YYYY/MM/DD').format('D-MMM-YYYY'),
      interview1: moment('2022/12/19', 'YYYY/MM/DD').format('D-MMM-YYYY'),
      //   interview2: moment('2023/01/15', 'YYYY/MM/DD').format('D-MMM-YYYY'),
      //   interview3: moment('2023/01/15', 'YYYY/MM/DD').format('D-MMM-YYYY'),
    },
  ];
  const timeHeaders = [
    { field: 'action', headerName: '項目' },
    { field: 'time', headerName: '時間點', flex: 1 },
  ];
  const actions = [
    {
      id: 1,
      action: '進實驗室',
      time: '越早越好，不過最好是有跟老師溝通過出國的打算，像我們老師真的幫了我很多的忙，再次感謝！',
    },
    {
      id: 2,
      action: '托福GRE',
      time: '因為GRE有效期限比較長，建議提早準備（約一年前）',
    },
    {
      id: 3,
      action: '選校、套詞',
      time: '因為GRE有效期限比較長，建議提早準備（約一年前）',
    },
    {
      id: 4,
      action: 'CV',
      time: '因為GRE有效期限比較長，建議提早準備（約一年前）',
    },
    {
      id: 5,
      action: 'SOP',
      time: '大部分只要求兩頁，但要寫好很難，可以請學長姐們幫們看，大約9月開始',
    },
    {
      id: 6,
      action: '推薦信',
      time: '差不多十月可以開始問老師是否能幫忙寫推薦信，有些老師可能會要求你給他草稿',
    },
    {
      id: 7,
      action: '網路申請',
      time: '大多數的學校12/15截止，提前看好學校要求，記得在deadline前送出',
    },
    {
      id: 8,
      action: '個人網站',
      time: 'optional，但大多數CS PhD都會有，可以展示更多資訊',
    },
    {
      id: 9,
      action: '準備面試',
      time: '因為GRE有效期限比較長，建議提早準備（約一年前）',
    },
  ];
  const classes = useStyles();

  const [scrollOffset, setScrollOffset] = useState(window.pageYOffset);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollOffset(position);
  };

  const [headerList, setHeaderList] = useState([]);
  useEffect(() => {
    // top level header
    const list = [];
    const h2s = document.querySelectorAll('h2');
    h2s.forEach((h2) => {
      list.push(collectHeaders(h2, 2));
    });
    setHeaderList(list);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div>
      <Nav isSimple={true} />
      <div className="flex relative px-[calc(50%-400px)]">
        <div className="fixed left-0 pt-24 pr-10 h-screen w-[calc(50%-400px)] flex-shrink-0 flex justify-end">
          <div>
            {headerList.map((h, i) => (
              <Header key={i} h={h} level={0} />
            ))}
          </div>
        </div>
        <div className="py-20 px-5 w-[800px] mx-auto">
          <p>
            选择读博算是人生中数一数二的重大决定了，这条路很难，尤其是现在CV领域竞争白热化，很多次想过放弃，但万幸遇到了很多良师益友，最终一步步走了过来。在此做个记录，希望能给之后打算申请PhD的同学一些帮助。
          </p>
          <p>以下是我的申請結果</p>
          <DataGrid
            density="compact"
            className={[classes.root, 'mt-10'].join(' ')}
            rows={applications}
            columns={headers}
            autoHeight
            hideFooter
            disableColumnMenu
            rowSpacingType="border"
            getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? 'Mui-even' : 'Mui-odd')}
          />
          <h2 className="border-0 border-b border-gray-300 border-solid pb-2">準備</h2>
          <h3>為何要讀博</h3>
          <p>
            读博是一个长达五年的承诺，这期间会遇到各种挫折，我认识的很多PhD或多或少都质疑，甚至后悔过选择这条路。我也认识有的PhD直接和老板闹掰了，只能quit收场。读博绝对不是一条轻松的路，如果看过《魔法少女小圆》的话，可以看看这个帖子冷静一下：魔法少女小圆其实讲的是PhD的故事
            (opens new window)。
            其实每个人决定读博之前，都得被劝退一波才行。知乎上有很多劝退故事，我在此就不赘述读博的艰辛了。在我看来，决定读博的理由只能有一个，那就是热爱。想要做一些有意思的事情，喜欢做research，享受一点一滴扩宽人类知识边际的过程，即便这个过程极有可能碰壁。读博相当于允诺了未来五年都有可能007，别人聚会玩耍的时候你在跑实验，别人看剧打游戏的时候你在读paper。没有强制的上下班时间，也就意味着休息时间和工作时间之间界限的绝对模糊。
            读博意味着什么，为什么读博，这两个问题一定要想清楚。只有在申请之前想清楚了这两个问题，之后读博途中遇到各种挫折，才不至于没有心理准备。
          </p>
          <h3>是否需要代辦？</h3>
          <p>
            我问过很多学姐学长，他们申请PhD时是否有找中介，绝大多数的回答是否定的。申请说难也难，要进实验室努力发paper，在professor面前刷脸要推荐信，还要准备文书CV，选校选老师，陶瓷面试。但这些本质上都只能靠自己。中介能帮上忙的地方，也就润色文书，掐点timeline，填网申而已。如果能找到靠谱的中介，对文书提出逻辑指导，而不只是词藻替代，那还是可以的。但怎么说呢，中介对于文书的认识不一定有学姐学长认识深刻。我申请是完全diy的，但我的所有申请材料，都找我认识的PhD学姐学长们过了好几遍。自己一点一点打磨，多多看一些模版文书也有助于提升自己的写作能力。
          </p>
          <h2 className="border-0 border-b border-gray-300 border-solid pb-2">申請</h2>
          <p>
            我只申請了美國的Programs，大多數學校的申請材料有：SOP、CV以及三封推薦信，少部分的可能會要求PS。至於托福和GRE，有些學校對口語要求比較多，像是UIUC。總之語言成績要儘早確認。
          </p>
          <h3>時間線</h3>
          <p>關於申請的大致時間線，以下是我建議進行各個項目的時間點。</p>
          <DataGrid
            density="compact"
            className={[classes.root, 'mt-10'].join(' ')}
            rows={actions}
            columns={timeHeaders}
            autoHeight
            hideFooter
            disableColumnMenu
            rowSpacingType="border"
            getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? 'Mui-even' : 'Mui-odd')}
          />
          <h3>進實驗室</h3>
          <p>
            如果是已经在海外读本科或者硕士，那么一定要抓紧一切机会进实验室。提早进入实验室，可以有更多的时间做research，有助于发现自己真正感兴趣的研究方向。很多时候，看看推荐信和publications就能决定一个学生可以去哪儿了。对于申博来说，课程可能占比不大。如果精力实在分配不过来，可以战略性放弃课程（这里的战略性放弃是指可以选一些水课，而不是说绩点多垃圾都无所谓。对于两个其他材料差不多的学生，professor大概率还是会选绩点更高的那个吧）。
            另外暑研也是很重要的一个经历。暑研可以申请其他学校的lab，三月可以开始陶瓷暑研了。很多大牛老师都喜欢录取已经合作过的学生，那么如果能争取到他们实验室的研究机会，指不定就直接拿了return
            offer呢～ #
          </p>
          <h3>選校、套詞</h3>

          <p>
            想知道各个学校CS的排名的话，可以看看 Computer Science Open Data (opens new
            window)，该排名综合考虑了毕业生成为faculty的比例，best
            paper数目，以及薪资这几个phd比较关心的因素。而csrankings (opens new
            window)则是统计paper发表数目的一个排名。虽说csrankings比较滞后，很多新招的AP老师都没录入；或者有些老师几年前就跳槽去了另一个学校，这个网站却依旧没更新这个跳槽信息，但总的来说还是可以通过csrankings，对各个学校的CS强弱有一个大致的了解。和csrankings类似的排名网站还有airankings
            (opens new window)。
            各个学校的招生制度都不太相同，比如四大就是强committee制度，对于强committee的学校，学校会组织老师或者在读PhD学生筛选候选人，这种时候就不是professor自身能决定是否录取了。对于committee和professor混合制的学校，一般是需要先过了committee这一关，professor再从candidate
            pool里面捞人。而强professor制，就单纯只需要教授拍板了，申请材料，甚至申请ddl都不重要了。
            强professor的学校有：USC，Caltech，UCLA，RPI，Gatech，JHU，CU Boulder，NEU，UCSB, UCD,
            UCI，UCSC，UMassAmherst，CMU ECE，UIUC ECE +
            CS，UVA，Rutgers，PSU，UTD，UCF，NYU，UMN，Syracuse，GWU，CWRU，UNC，UMich，Brandeis。
            要了解各个老师的具体研究项目，就只能去他们的个人网站看了。不过个人网站也会有滞后问题，很多老师的最新研究项目并不会放到网站上，这种时候就只能靠多问了。如果你发现一个老师大方向一致，都是CV，但是小方向差的有点多，这种情况也不防试一试。发一封email陶瓷一下没有任何坏处。
            陶瓷信的撰写很有讲究，毕竟一个老师一天可能会收到几十上百封陶瓷信。如何在短短两三百字内，抓住老师的眼球，并引起他回复的兴趣，很考验人。我的做法是，把自己最亮眼的成果，总结一下放在第一段，引起老师的兴趣之后，再详细陈述我的经历。
            这里直接引用某位老师对于陶瓷信的要求： In your email, please include the following items Title as
            “Prospective PhD Student: YourName - YourAffliation” Briefly introduce yourself, including education
            background, research experiences, and programming skills. Briefly explain your motivations and expectations
            of working with me Include a PDF version of your CV. Briefly introduce what research problem that you are
            interested in. What are the current state-of-the-art solutions and why do you think you can further improve
            over them? 有一些网站会汇总老师的招生信息，比如CS/HCI Research Hub (opens new
            window)，发起人是CMU的一个PhD，这个网页汇总了twitter上老师们的招生信息，包括PhD招生及暑研机会；一亩三分地招生版块
            (opens new window)值得多刷刷，很多AP老师会上去发帖。 还有一些公众号也会每天推送招生信息，比如
            AI求职、北美PhDLeague、微offer。
          </p>
          <h3>CV/SOP</h3>
          <p>
            简历找个latex模版，用latex的原因是，word很容易把格式弄的杂乱，latex一般来说比较干净整洁。简历中不要有年龄和照片，突出自己的强项就行，paper多的话就列一个很长的list，得过奖的话就放在最显眼的位置。
            SOP我自己的感觉是越清晰越concrete越好，基本上就是
            （非常concrete的）我想做什么research，然后下面很有逻辑很具体的讲明白为啥想做这个research，自己之前的background为什么可以让自己well-equipped做这个research。不要搞花哨了，就结构和逻辑特别特别清楚是最好的。
            研究兴趣也是，具体清楚。你要写my research interests are AI, machine learning啥啥啥
            就不是很好；写具体精确：use xxx, yyy, zzz perspective to solve aaa problem in
            bbb。如果写具体了，却没一个教授感兴趣的话，只能说这个学校不适合，跟能力无关。如果可以的话，找找目标领域的faculty
            candidate的research statement, 然后参考这个来写。 https://cs-sop.org (opens new window)收集了一些往届CS
            PhD的SOP。 润色的话，我是靠学姐学长改逻辑，然后去学校的文书中心改语法。也有同学推荐 fiverr (opens new
            window)，我没试过，看网上评价还不错。
          </p>
          <h2 className="border-0 border-b border-gray-300 border-solid pb-2">面試</h2>
          <p>
            有一些学校由于完全是committee制，不组织面试直接发放offer，但大多数还是要面试的，面试时间集中在十二月末到二月中。我刚开始面试的时候特别紧张，很怕老师问了什么问题但是我回答不出来。但后来发现老师来面试绝不是想要刁难学生，他们可能只是想来聊聊天，了解一下学生的research
            interest，互相认识一下。所以心态放轻松就行，不用想着讨好老师什么的，这是一个相互选择的过程，老师考察学生的同时，学生其实也需要考虑老师的lab是否适合自己。有些学生会希望和导师多多meeting，以此push自己加快进度，那么他们可能会更喜欢跟着AP老师；还有一些学生喜欢自己完全主导project，那么他们会喜欢不那么push的大牛老师。想清楚自己的需求，也方便在面试的最后，向导师提问的环节，问一些自己比较关心的因素。
            我面试期中遇到过比较有意思的问题有：
            你关注的研究领域中，有哪些work用了和你们类似的方法？你们和他们的异同是什么？
            说一个你失败的项目，并且描述为什么失败了，如果重来你会怎么做。
            发了两篇paper，让我看了之后总结contributions，并且思考一下我可以做什么后续工作。 考察了一个data
            mining中的知识点，让我陈述这个方法的缺陷，以及让我现场提出一个改进方法。
            总的来说，面试的氛围都很轻松，老师们也都很和蔼可亲。听老师们描述他们的project，一起讨论也很有意思。如果真遇到了不会的问题，直接说不清楚就行，老师们也会谅解的。
            最后的向老师提问环节别浪费，可以问一问录取相关的问题，也可以问一问lab氛围啥的。The Definitive ‘what do I
            ask/look for’ in a PhD Advisor Guide (opens new window)提供了一些问题样例。
          </p>
          <h2 className="border-0 border-b border-gray-300 border-solid pb-2">等待結果</h2>
          <p>
            等待是很磨人的，但是至此已经没什么别的能做的了。最早的结果，可能一月中就放出来了，大多数学校还是在二月放结果。一般三月末所有的结果都能出来，毕竟学生们需要在4.15之前决定接哪家offer。GradCafe
            (opens new window)，一亩三分地录取板块 (opens new
            window)都会有同学分享录取结果，可以在上面看看各个学校是否开始发offer了。
            拿到offer之后，就要做决定去哪个lab了。Questions to Ask a Prospective Ph.D. Advisor on Visit Day (opens new
            window)详细介绍了一些需要在接offer之前了解的问题。可以和老师们约个时间聊一聊，了解清楚各个lab的情况，再结合自身做出最终决定。
            下列是一些我关心的问题：
          </p>
          <ol>
            <li>lab氛围怎么样</li>
            <li>和老板的合作模式是怎样，会不会push人，是不是很强硬，写了paper能和老板一起讨论修改吗</li>
            <li>毕业要求</li>
            <li>可以转学分吗</li>
            <li>老板funding够不够，需要做ta/ra嘛</li>
            <li>生活条件</li>
            <li>组里同学的去向</li>
            <li>暑假能不能出去实习，对实习有限制吗（课题限制，或者是实习类型限制）</li>
            <li>你做的项目，是老板直接分配的，还是自己随便立</li>
            <li>老板有没有跳槽打算，或者去工业界</li>
          </ol>
          <h2 className="border-0 border-b border-gray-300 border-solid pb-2">總結</h2>
          <p></p>
        </div>
      </div>
    </div>
  );
}
