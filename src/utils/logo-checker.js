const amex = `https://lh6.ggpht.com/YuGKCOHWY8rqy1Vbn8I0Jcd3VruVtBfJqSjeliVj2iXqhkmtB9cLkGhc-zoCxQeDoc6i0pw`;
const visa = `https://lh6.ggpht.com/NvYf_33MleY1waJfW6O98wb3KU6XeinwiahmvUIyu46LcWeQdTMGm7WYe81uZYWLUbkjvz0E`;
const mast = `https://lh6.ggpht.com/h6TBIVV7tlYGr1zkIA8CmCzINizzASbPIetpxh_5otBu3VkPEC5_Kk_wH5szy7gDhMkRhVVp`;
const jcb = `https://lh6.ggpht.com/Hn_TXQrDTSf_kQer1hu4YglUu3mrcG4SUwPmqx8td6ornRqvMlmJvLFZyn3YY1-JIztUcYdS`;
const upay = `https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/UnionPay_logo.svg/1200px-UnionPay_logo.svg.png`;

export default function logoChecker(name) {
  switch (name) {
    case 'MASTERCARD':
      return mast;
    case 'AMERICAN EXPRESS':
      return amex;
    case 'VISA':
      return visa;
    case 'JCB':
      return jcb;
    case 'CHINA UNION PAY':
      return upay;
    default:
      return '';
  }
}
