# Responsive HTML email signature(s)
[![npm](https://img.shields.io/npm/v/responsive-html-email-signature.svg)](https://www.npmjs.com/package/responsive-html-email-signature)
[![license](https://img.shields.io/github/license/danmindru/responsive-html-email-signature.svg)](/LICENSE)


### Let's punch email clients in the stomach 👊
When you need some basic responsive email signatures that work on mobile.<br/>
...and your colleagues need them too.<br/>
...but you don't want to deal with tables and inline styles.

[Read the docs in other languages](/i18n) ↗️


## Preview
Here are some examples:
![responsive emails-01](https://cloud.githubusercontent.com/assets/1515742/10591900/13889d32-76b9-11e5-8dc0-b89d80189e93.png)
![responsive emails-02](https://cloud.githubusercontent.com/assets/1515742/10591901/139c4954-76b9-11e5-80f7-5b0ccaf5af81.png)

## Getting started
- Clone repo `git clone https://github.com/danmindru/responsive-html-email-signature.git`
- Run `npm install`
- Run `npm start` to generate templates from configuration (one time)

### Customizing templates
- Edit files in */templates*
- Run `npm start` to watch templates and re-generate when changed
- Open files from `./dist` in your fav browser to check them out

> When you're done, check out [how to add them to your email client of choice](#usage-with-different-email-clients) if in doubt.


## Motivation
Writing HTML emails & email signatures sucks. Let's make it easier. We can't fix all email clients, but we can surely make our lives easier with some automation. <br/>

## What does this pile of code do
- [x] generates email templates from your config
- [x] allows generating multiple templates at once (for your colleagues too!)
- [x] transforms linked (`<link>`) CSS into inline styles
- [x] embeds local `img[src]` into the template (base64).*
- [x] minifies the template
- [x] ads some basic media queries for mail clients that support them
- [x] can build templates from multiple sources
- [x] watches HTML / CSS files for changes and re-builds
- [x] supports LESS / SASS / PostCSS
- [x] autoprefixer, so you don't have to worry about your `-moz-`s or `-webkit-`s

**Some mail clients don't support them, so an external URL might be a good idea. Also, some clients might complain about the size, so keep an eye out.*


## Docs
### Installing
```bash
$ npm install
$ npm start # or `npm run once` to only generate templates without watching
# By default, HTML & CSS files in './templates' will be watched for changes
```

> Note: works well with node v10+. Earlier versions might also work.

### Configuring
To make a basic email from existing templates, you only have to edit the `conf.json` file in each template.

For example, the dark template accepts the following:
```json
{
  "id": "<will-be-used-for-filename>",
  "signature": "<signature-of-choice>",
  "name": "<your-name>",
  "contactMain": "<phone-or-email-or-html>",
  "contactMail": "<email>",
  "slogan": "<a-basic-slogan>",
  "logoUrl": "</assets/dark.png?>",
  "logoAlt": "<text-in-case-logo-is-blocked>",
  "website": "<http://dark.dk>"
}
```

### Generating multiple emails from the same config (for your colleagues too!)
Use an array instead of object in `conf.json`, having multiple configs like the one above:
```json
[
  {...conf1},
  {...conf2}
]
```

### Using config values in HTML
Config variables are made available in all HTML files. <br/>
Add any variable to the configuration file and use it in HTML like so:

```html
<p><!-- @echo yourCustomVariable --></p>
```

> NB: config variables accept HTML.

### Adding CSS & pre-processing
Any number of CSS, SASS or LESS files in a template directory & they will be automatically processed & inlined into the files outputed in `./dist`.


### Multiple emails in the same template
Templates can contain multiple HTML files from which to build emails. For example, the dark template has `signature.html` and `signature-reply.html`, which is a simpler version.

Each HTML file will be treated as an email template, except for `*.inc.html`. See below ⬇️


### Partials (*.inc.html)
If you indeed have multiple emails in the same templates, you can be sure some of the HTML repeats.

Luckily, partials can be used for common parts (i.e. headers, footers).

Partials *will not* be treated as an email template, but ignored when built. They can however be included in other HTML files, like so:
```html
<section>
<!-- @include footer.inc.html -->
</section
```

## Template structure (examples)
There are 2 examples of template structures, one for the `light` email template and one for the `dark` one.

Here's how the dark one looks:
```bash
./templates
├── dark
    ├── assets
        ├── dark.png              # Image to embed as base64
    ├── conf.json                 # Template strings, logo, etc.
    ├── dark.css                  # Stylesheet.
    ├── footer.inc.html           # Contact info & logo
    ├── head.inc.html             # 'Responsive' CSS goes here
    ├── signature.html            # Full signature (loads head/footer)
    ├── signature-reply.html      # Simplified signature (loads head)
```

Here's how the light one looks:
```bash
./templates
├── light
    ├── assets
        ├── light.png             # Image to embed as base64
    ├── conf.json                 # Template strings, logo, etc.
    ├── footer.inc.html           # Contact info & logo
    ├── full-mail.html            # Body + signature
    ├── head.inc.html             # 'Responsive' CSS goes here
    ├── light.css                 # Stylesheet.
    ├── signature.html            # Full signature (loads head/footer)
    ├── signature-reply.html      # Simplified signature (loads head)
```

Files are included via [gulp-preprocess](https://www.npmjs.com/package/gulp-preprocess).

There's one convention you have to keep in mind: `all files that you wish to include should follow the *.inc.html format`. The gulp task ignores `*.inc.html` files, but will try to process & create email templates from all `.html` files.

You are of course encouraged to change the default structure for your use case.


## Overview of the build process
The diagram below shows what happens to your email templates.
Each folder in 'templates' is considered a `template group`. A template file will be generated for each of the configuration objects you add have in the template group -> `conf.js`.
![Responsive HTML email template/signatures diagram](https://user-images.githubusercontent.com/1515742/45000195-35268300-afc3-11e8-82b4-7507430c48a0.png)


## CSS Support
Remember, it's HTML mails, so you need to check a big-ass table to find out nothing's gonna work.
See [this](https://www.campaignmonitor.com/css/) for more info. [Gulp-inline-css](https://www.npmjs.com/package/gulp-inline-css) is being used to convert whatever CSS you throw at it to inline styles, but it probably won't handle everything.

Some bonuses of using `gulp-inline-css`: many css props will be converted to attributes. For example, the 'background-color' prop will be added as 'bgcolor' attribute to table elements.
For more details take a look at the [inline-css mappings](https://github.com/jonkemp/inline-css/blob/master/lib/setTableAttrs.js).


## Usage with different email clients
### Thunderbird
There are several Thunderbird plugins which can automatically insert signatures when composing e-mails. We recommend [SmartTemplate4](https://addons.mozilla.org/en-us/thunderbird/addon/smarttemplate4) as one of the options. It can use different templates for new e-mails, replies and forwarded e-mails.

### Gmail
Go to your mailbox settings & paste the generated signature.
> **NB**: Gmail doesn't seem to support inlined (base64) images. You have to use absolute `http(s)//...` from them to load up.

### Office 365 / outlook.live.com
It's a bit hacky to set up, but possible. See [this issue](https://github.com/danmindru/responsive-html-email-signature/issues/52).

### Apple Mail / OS X (oh boy)

#### Solution 1
- Open Mail.app and go to `Mail` -> `Preferences` -> `Signatures`
- Create a new signature and write some placeholder text (doesn't matter what it is, but you have to identify it later).
- Close Mail.app.
- Open terminal, then open the signature files using TextEdit (might be different for iCloud drive check the article below).
```
$ open -a TextEdit ~/Library/Mobile\ Documents/com~apple~mail/Data/V3/MailData/Signatures/ubiquitous_*.mailsignature
```
- Keep the file with the placeholder open, close the other ones.
- Replace the `<body>...</body>` and it's contents with the template of your choice. *Don't remove the meta information at the top!*
- Open Mail.app and compose a new mail. Select the signature from the list to test it out.

> **NB**: Images won't appear in the signature preview, but will work fine when you compose a message.


#### Solution 2
You can also open the HTML files in `/dist` in a browser, CMD + A, CMD + C and then paste into the signature box. This won't copy the `<html>` part or the `<style>` part that includes media queries. Follow the guide if you want it.


#### Troubleshooting

If solution #1 doesn't work, you can repeat the steps and lock the signature files before you open Mail.app again.
Lock Files:
```
$ chflags uchg ~/Library/Mail/V3/MailData/Signatures/*.mailsignature
```

If you want to do changes later, you have to unlock the files:
```
$ chflags nouchg ~/Library/Mail/V3/MailData/Signatures/*.mailsignature
```

If you are using iCloud drive or having problems with it, you might also want to check [this article](http://matt.coneybeare.me/how-to-make-an-html-signature-in-apple-mail-for-el-capitan-os-x-10-dot-11/).

### Outlook 2010 Client for Windows 7

#### Solution 1
- Open Outlook 2010 and go to `File > Option > Mail > Signature`
- Create new signature (with a placeholder for your convenience)
- Open signature folder using CMD

> As the AppData folder is hidden, I'd recommend you to open it via CMD.

```
cd AppData\Roaming\Microsoft
start Signatures
```

- Within this folder, find a file named with your placeholder then right click this file and select edit.
- Replace it with your HTML and save
- Open Outlook again and check your signature

#### Solution 2
Unfortnately, Outlook 2010 client dosen't support HTML file import features for your email template. But you can add your own signatures by simple Copy and paste like **Solution 2** above.

- Open built html file on `/dist` folder and Ctrl A + C
- Open Outlook 2010 and go to `File > Option > Mail > Signature`
- Create new signature and paste copyed one

> **NB**: base 64 will not be shown on Outlook 2010 client. So, I recommend to use external url if you want to use images.


## Other commands

### `npm run test`
Runs tests once.

### `npm run once`
Creates templates and exits; does not watch files.
