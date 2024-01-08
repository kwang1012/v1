export const pubs = {
  data: [
    {
      id: 1,
      attributes: {
        title: 'A Reservation-Based List Scheduling for Embedded Systems with Memory Constraints',
        venue: {
          url: 'https://www.hpc.is.tohoku.ac.jp/pdcat2022/',
          name: 'The 23rd International Conference on Parallel and Distributed Computing, Applications and Technologies',
          short: "PDCAT'22",
          status: '',
        },
        authorList: [
          { name: 'Kai-Siang Wang', type: 'First Author' },
          { name: 'Jerry Chou', type: 'Advisor' },
        ],
        url: 'https://link.springer.com/chapter/10.1007/978-3-031-29927-8_12',
        abstract:
          'Many embedded systems have hard resource constraints that make schedules found by list scheduling heuristics invalid. In this paper, we show the problems caused by memory constraints and deadlocks during the scheduling process. We propose new extensions for list scheduling algorithms and make them take memory constraints into account. The experiment shows that our methods can solve deadlocks effectively and reduce total memory usage drastically compared to original scheduling heuristics.',
        image: 'https://kwang1012.web.illinois.edu/uploads/reservation_0f6f10db82.webp',
        bib: '@InProceedings{10.1007/978-3-031-29927-8_12,\nauthor="Wang, Kai-Siang\nand Chou, Jerry",\neditor="Takizawa, Hiroyuki\nand Shen, Hong\nand Hanawa, Toshihiro\nand Hyuk Park, Jong\nand Tian, Hui\nand Egawa, Ryusuke",\ntitle="A Reservation-Based List Scheduling for Embedded Systems with Memory Constraints",\nbooktitle="Parallel and Distributed Computing, Applications and Technologies",\nyear="2023",\npublisher="Springer Nature Switzerland",\naddress="Cham",\npages="147--157",\nisbn="978-3-031-29927-8"\n}',
        slides: 'https://lsalab.cs.nthu.edu.tw/home/publication/PDCAT22_slides.pptx',
        date: '2022-12-07',
        selected: true,
        createdAt: '2023-10-27T21:55:50.967Z',
        updatedAt: '2023-11-09T19:10:18.228Z',
        publishedAt: '2023-10-27T21:55:52.866Z',
      },
    },
    {
      id: 2,
      attributes: {
        title:
          'Optimal Static Bidding Strategy for Running Batch Jobs with Hard Deadline Constraints on Spot Instances',
        venue: {
          name: 'The International Conference on Cloud Computing and Services Science, 2023',
          short: "CLOSER'23",
          status: '',
        },
        authorList: [
          { name: 'Kai-Siang Wang', type: 'First Author' },
          { name: 'Cheng-Han Hsieh', type: 'Co' },
          { name: 'Jerry Chou', type: 'Advisor' },
        ],
        url: 'https://www.scitepress.org/PublicationsDetail.aspx?ID=Ajk01eQ6KJU=&t=1',
        abstract:
          'Spot-instances(SI) is an auction-based pricing scheme used by cloud providers. It allows users to place bids for spare computing instances and rent them at a substantially lower price compared to the fixed on-demand price. This inexpensive computational power is at the cost of availability, because a spot instance can be revoked whenever the spot market price exceeds the bid. Therefore, SI has become an attractive option for applications without requiring real-time availability constraints, such as the batch jobs in different application domains, including big data analytics, scientific computing, and deep learning. For batch jobs, service interruptions and execution delays can be tolerated as long as their service quality is gauged by an execution deadline. Hence, this paper aims to develop a static bidding strategy for minimizing the monetary cost of a batch job with hard deadline constraints. We formulate the problem as a Markov chain process and use Dynamic Programming to find the optimal bid in polynomial time. Experiments conducted on real workloads from Amazon Spot Instance historical prices show that our proposed strategy successfully outperformed two state-of-art dynamic bidding strategies~(Amazing, DBA), and several deadline agnostic static bidding strategies with lower cost and fault tolerance overhead.',
        image: 'https://kwang1012.web.illinois.edu/uploads/bidding_47d66aa2aa.webp',
        bib: '@conference{closer23,\nauthor={Kai-Siang Wang. and Cheng-Han Hsieh. and Jerry Chou.},\ntitle={Optimal Static Bidding Strategy for Running Jobs with Hard Deadline Constraints on Spot Instances},\nbooktitle={Proceedings of the 13th International Conference on Cloud Computing and Services Science - CLOSER},\nyear={2023},\npages={123-130},\npublisher={SciTePress},\norganization={INSTICC},\ndoi={10.5220/0011645400003488},\nisbn={978-989-758-650-7},\nissn={2184-5042},\n}',
        slides: null,
        date: '2023-04-23',
        selected: true,
        createdAt: '2023-10-27T23:02:45.094Z',
        updatedAt: '2023-11-09T18:52:22.639Z',
        publishedAt: '2023-10-27T23:02:45.957Z',
      },
    },
    {
      id: 3,
      attributes: {
        title:
          'ALBERT: An automatic learning based execution and resource management system for optimizing Hadoop workload in clouds',
        venue: { name: 'Journal of Parallel and Distributed Computing', short: "JPDC'22" },
        authorList: [
          { name: 'Chen-Chun Chen', type: 'First Author' },
          { name: 'Kai-Siang Wang', type: 'Co' },
          { name: 'Yu-Tung Hsiao', type: 'Co' },
          { name: 'Jerry Chou', type: 'Advisor' },
        ],
        url: 'https://www.sciencedirect.com/science/article/pii/S0743731522001289',
        abstract:
          'Hadoop is a popular computing framework designed to deliver timely and cost-effective data processing on a large cluster of commodity machines. It relieves the burden of the programmers dealing with distributed programming, and an ecosystem of Big Data solutions has developed around it. However, Hadoop’s job execution time can greatly depend on its runtime configurations and resource selections. Given the more than 100 job configuration settings provided by Hadoop, and diverse resource instance options in a cloud or virtualized computing environment, running Hadoop jobs still requires a substantial amount of expertise and experience. To address this challenge, we apply a deep neural network to predict Hadoop’s job time based on historical execution data, and propose optimization methods to reduce job execution time and cost. The results show that our prediction method achieves almost 90% time prediction accuracy and clearly outperforms three other state-of-the-art regression-based prediction methods. Based on the time prediction, our proposed configuration search method and job scheduling algorithm successfully shorten the execution time of a single Hadoop job by more than a factor of 2 and reduce the time of processing a batch of Hadoop jobs by 40% ~65%.',
        image: 'https://kwang1012.web.illinois.edu/uploads/hadoop_f37c77d4d3.webp',
        bib: '@article{CHEN202245,\ntitle = {ALBERT: An automatic learning based execution and resource management system for optimizing Hadoop workload in clouds},\njournal = {Journal of Parallel and Distributed Computing},\nvolume = {168},\npages = {45-56},\nyear = {2022},\nissn = {0743-7315},\ndoi = {https://doi.org/10.1016/j.jpdc.2022.05.013},\nauthor = {Chen-Chun Chen and Kai-Siang Wang and Yu-Tung Hsiao and Jerry Chou},\n}',
        slides: null,
        date: '2022-06-01',
        selected: false,
        createdAt: '2023-10-27T23:02:49.850Z',
        updatedAt: '2023-11-09T19:10:38.669Z',
        publishedAt: '2023-10-27T23:02:50.623Z',
      },
    },
  ],
  meta: { pagination: { page: 1, pageSize: 25, pageCount: 1, total: 3 } },
};

export const groupByPubs = [
  {
    pubs: [
      {
        id: 2,
        title:
          'Optimal Static Bidding Strategy for Running Batch Jobs with Hard Deadline Constraints on Spot Instances',
        venue: {
          name: 'The International Conference on Cloud Computing and Services Science, 2023',
          short: "CLOSER'23",
          status: '',
        },
        url: 'https://www.scitepress.org/PublicationsDetail.aspx?ID=Ajk01eQ6KJU=&t=1',
        abstract:
          'Spot-instances(SI) is an auction-based pricing scheme used by cloud providers. It allows users to place bids for spare computing instances and rent them at a substantially lower price compared to the fixed on-demand price. This inexpensive computational power is at the cost of availability, because a spot instance can be revoked whenever the spot market price exceeds the bid. Therefore, SI has become an attractive option for applications without requiring real-time availability constraints, such as the batch jobs in different application domains, including big data analytics, scientific computing, and deep learning. For batch jobs, service interruptions and execution delays can be tolerated as long as their service quality is gauged by an execution deadline. Hence, this paper aims to develop a static bidding strategy for minimizing the monetary cost of a batch job with hard deadline constraints. We formulate the problem as a Markov chain process and use Dynamic Programming to find the optimal bid in polynomial time. Experiments conducted on real workloads from Amazon Spot Instance historical prices show that our proposed strategy successfully outperformed two state-of-art dynamic bidding strategies~(Amazing, DBA), and several deadline agnostic static bidding strategies with lower cost and fault tolerance overhead.',
        bib: '@conference{closer23,\nauthor={Kai-Siang Wang. and Cheng-Han Hsieh. and Jerry Chou.},\ntitle={Optimal Static Bidding Strategy for Running Jobs with Hard Deadline Constraints on Spot Instances},\nbooktitle={Proceedings of the 13th International Conference on Cloud Computing and Services Science - CLOSER},\nyear={2023},\npages={123-130},\npublisher={SciTePress},\norganization={INSTICC},\ndoi={10.5220/0011645400003488},\nisbn={978-989-758-650-7},\nissn={2184-5042},\n}',
        authorList: [
          { name: 'Kai-Siang Wang', type: 'First Author' },
          { name: 'Cheng-Han Hsieh', type: 'Co' },
          { name: 'Jerry Chou', type: 'Advisor' },
        ],
        date: '2023-04-23',
        image: 'https://kwang1012.web.illinois.edu/uploads/bidding_47d66aa2aa.webp',
      },
    ],
    year: 2023,
  },
  {
    pubs: [
      {
        id: 1,
        title: 'A Reservation-Based List Scheduling for Embedded Systems with Memory Constraints',
        venue: {
          url: 'https://www.hpc.is.tohoku.ac.jp/pdcat2022/',
          name: 'The 23rd International Conference on Parallel and Distributed Computing, Applications and Technologies',
          short: "PDCAT'22",
          status: '',
        },
        url: 'https://link.springer.com/chapter/10.1007/978-3-031-29927-8_12',
        abstract:
          'Many embedded systems have hard resource constraints that make schedules found by list scheduling heuristics invalid. In this paper, we show the problems caused by memory constraints and deadlocks during the scheduling process. We propose new extensions for list scheduling algorithms and make them take memory constraints into account. The experiment shows that our methods can solve deadlocks effectively and reduce total memory usage drastically compared to original scheduling heuristics.',
        bib: '@InProceedings{10.1007/978-3-031-29927-8_12,\nauthor="Wang, Kai-Siang\nand Chou, Jerry",\neditor="Takizawa, Hiroyuki\nand Shen, Hong\nand Hanawa, Toshihiro\nand Hyuk Park, Jong\nand Tian, Hui\nand Egawa, Ryusuke",\ntitle="A Reservation-Based List Scheduling for Embedded Systems with Memory Constraints",\nbooktitle="Parallel and Distributed Computing, Applications and Technologies",\nyear="2023",\npublisher="Springer Nature Switzerland",\naddress="Cham",\npages="147--157",\nisbn="978-3-031-29927-8"\n}',
        authorList: [
          { name: 'Kai-Siang Wang', type: 'First Author' },
          { name: 'Jerry Chou', type: 'Advisor' },
        ],
        date: '2022-12-07',
        image: 'https://kwang1012.web.illinois.edu/uploads/reservation_0f6f10db82.webp',
      },
      {
        id: 3,
        title:
          'ALBERT: An automatic learning based execution and resource management system for optimizing Hadoop workload in clouds',
        venue: { name: 'Journal of Parallel and Distributed Computing', short: "JPDC'22" },
        url: 'https://www.sciencedirect.com/science/article/pii/S0743731522001289',
        abstract:
          'Hadoop is a popular computing framework designed to deliver timely and cost-effective data processing on a large cluster of commodity machines. It relieves the burden of the programmers dealing with distributed programming, and an ecosystem of Big Data solutions has developed around it. However, Hadoop’s job execution time can greatly depend on its runtime configurations and resource selections. Given the more than 100 job configuration settings provided by Hadoop, and diverse resource instance options in a cloud or virtualized computing environment, running Hadoop jobs still requires a substantial amount of expertise and experience. To address this challenge, we apply a deep neural network to predict Hadoop’s job time based on historical execution data, and propose optimization methods to reduce job execution time and cost. The results show that our prediction method achieves almost 90% time prediction accuracy and clearly outperforms three other state-of-the-art regression-based prediction methods. Based on the time prediction, our proposed configuration search method and job scheduling algorithm successfully shorten the execution time of a single Hadoop job by more than a factor of 2 and reduce the time of processing a batch of Hadoop jobs by 40% ~65%.',
        bib: '@article{CHEN202245,\ntitle = {ALBERT: An automatic learning based execution and resource management system for optimizing Hadoop workload in clouds},\njournal = {Journal of Parallel and Distributed Computing},\nvolume = {168},\npages = {45-56},\nyear = {2022},\nissn = {0743-7315},\ndoi = {https://doi.org/10.1016/j.jpdc.2022.05.013},\nauthor = {Chen-Chun Chen and Kai-Siang Wang and Yu-Tung Hsiao and Jerry Chou},\n}',
        authorList: [
          { name: 'Chen-Chun Chen', type: 'First Author' },
          { name: 'Kai-Siang Wang', type: 'Co' },
          { name: 'Yu-Tung Hsiao', type: 'Co' },
          { name: 'Jerry Chou', type: 'Advisor' },
        ],
        date: '2022-06-01',
        image: 'https://kwang1012.web.illinois.edu/uploads/hadoop_f37c77d4d3.webp',
      },
    ],
    year: 2022,
  },
];

export const fetchPubs = new Promise((resolve) => {
  resolve(pubs);
});
export const fetchGroupedPubs = new Promise<any>((resolve) => {
  resolve(groupByPubs);
});
