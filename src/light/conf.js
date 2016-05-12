/**
 * @notes
 *
 * - for images, if you pass in a relative path ('assets/logo.png'), they will be automatically embedded (base64). If you pass in a URL, it will stay as it is.
 * - the 'id' will be appended to the built template names, e.g. '/dist/signature-light.html'
 * - wrap phone numbers like this to prevent iOS mail from making them blue, e.g. `<a href="tel:004580100100"><span>(45) 80100100</span></a>`
 *
 */

module.exports = [
  {
    id: 'light',
    signature: 'Yours truly,',
    name: 'The light mail team',
    welcome: 'Hi there,',
    introParagraph: 'Thanks for writing up this email.<br/> We are delighted to reply with a responsive template.',
    contactMain: 'Call <a href="tel:80100100"><span>80100100</span></a> or email us at',
    contactMail: 'info@light.dk',
    contactSecondary: 'Happy Steet 31, DK-8000 Aarhus C, Denmark',
    logoUrl: '/assets/light.png',
    logoAlt: 'light logo',
    website: 'http://light.dk'
  }
];