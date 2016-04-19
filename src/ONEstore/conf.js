/*
 * NB: for images, if you pass in a relative path ('assets/logo.png'), they will be automatically embedded (base64). If you pass in a URL, it will stay as it is.
 */

module.exports = [
  {
    id: 'ONEstore', // Will be appended to the built templates.
    // signature: '감사합니다.',
    name: '0 0 0 매니저',
    team: '스토어 기획팀',
    title: 'Dev Relations',
    welcome: '안녕하세요.',
    introParagraph: 'Thanks for writing up this email.<br/> We are delighted to reply with a responsive template.',
    contactMain: '<a href="tel:+821012345678"><span>+82-10-1234-5678</span></a> | ', // Wrap phone numbers like this to prevent iOS mail from making them blue.
    contactMail: 'devhelper@onestore.co.kr',
    contactSecondary: '성남시 분당구 판교역로 188 SK플래닛 건물 11층',
    logoUrl: 'assets/type01.png', 
    logoAlt: 'Onestore logo',
    website: 'http://onesto.re/'
  }
]