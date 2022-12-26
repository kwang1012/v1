import moment from 'moment';

export const format = (date) => {
  if (typeof date === 'string') date = new Date(date);
  if (date.getMinutes()) return moment(date).format('h:m a');
  else return moment(date).format('h a');
};

export function onClickProvider(provider) {
  switch (provider) {
    case 'facebook':
      window.open('https://www.facebook.com/kwang871012', '_blank');
      break;
    case 'instagram':
      window.open('https://www.instagram.com/kwang871012', '_blank');
      break;
    case 'twitter':
      window.open('https://twitter.com/kwang871012', '_blank');
      break;
    case 'google-scholar':
      window.open('https://scholar.google.com/citations?hl=en&user=wE-FPxoAAAAJ', '_blank');
    default: {
      if (provider.includes('cv')) window.open('https://lsalab.cs.nthu.edu.tw/~kswang/cv.pdf', '_blank');
      else if (provider.includes('google-scholar'))
        window.open('https://scholar.google.com/citations?hl=en&user=wE-FPxoAAAAJ', '_blank');
      else if (provider.includes('github')) window.open('https://github.com/kwang1012', '_blank');
      else if (provider.includes('twitter')) window.open('https://twitter.com/kwang871012', '_blank');
    }
  }
}

export function classNames(classes) {
  return Object.entries(classes)
    .filter(([key, value]) => value)
    .map(([key, value]) => key)
    .join(' ');
}