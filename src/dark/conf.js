/**
 * @notes
 *
 * - for images, if you pass in a relative path ('assets/logo.png'), they will be automatically embedded (base64). If you pass in a URL, it will stay as it is.
 * - the 'id' will be appended to the built template names, e.g. '/dist/signature-dark.html'
 * - wrap phone numbers like this to prevent iOS mail from making them blue, e.g. `<a href="tel:004580100100"><span>(45) 80100100</span></a>`
 *
 */
module.exports = [
  {
    id: 'dark',
    signature: 'Best regards,',
    name: 'The dark mail team',
    contactMain: 'Call <a href="tel:004580100100"><span>(45) 80100100</span></a> or email us at',
    contactMail: 'info@dark.dk',
    slogan: 'LED Pylon. LED Wall. Digital Signage.',
    logoUrl: '/assets/dark.png',
    logoAlt: 'dark logo',
    website: 'http://dark.dk'
  }
];