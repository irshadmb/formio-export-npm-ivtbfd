export const getRandomId = (
  m = Math,
  d = Date,
  h = 16,
  s = (s) => m.floor(s).toString(h)
) => s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h));

export const getDate = () => new Date().toISOString();

export const createIframe = (el) => {
  _.forEach(el.getElementsByTagName('iframe'), (iframe) => {
    el.removeChild(iframe);
  });
  let iframe = document.createElement('iframe');
  el.appendChild(iframe);
  return iframe;
};
