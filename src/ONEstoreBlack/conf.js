/*
 * NB: for images, if you pass in a relative path ('assets/logo.png'), they will be automatically embedded (base64). If you pass in a URL, it will stay as it is.
 */

module.exports = [
  {
    id: 'ONEstoreBlack', // Will be appended to the built templates.
    signature: 'Best regards,',
    name: 'Joo Hyung Park',
    team: 'Service Planning Team',
    title: 'Dev Relations',
    welcome: '안녕하세요.',
    introParagraph: 'Thanks for writing up this email.<br/> We are delighted to reply with a responsive template.',
    contactMain: 'Call <a href="tel:+821012345678"><span>+82-10-1234-5678</span></a> or email us at', // Wrap phone numbers like this to prevent iOS mail from making them blue.
    contactMail: 'devhelper@onestore.co.kr',
    // slogan: '\"The 1st integrated Android App store in Korea\"',
    contactSecondary: '188, Pangyoyeok-ro, Bundang-gu, Seongnam-si, Gyeonggi-do, Korea',
    logoUrl: 'assets/type03.png', 
    logoAlt: 'ONEstore. logo',
    website: 'http://onesto.re/'
  }
]