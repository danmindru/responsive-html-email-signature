# 반응형 HTML 메일 서명
### 이메일 클라이언트를 씹어먹자(?!)
이메일 서명 전용 반응형 템플릿<br/>

> 모바일에서 잘 동작하는 기본 서명이 필요하신가요? <br/>
> ... 그리고 직장동료들도 필요한가요? <br/>
> ... 근데 지저분하게 테이블이랑 인라인 CSS를 만들기 싫은가요? <br/>


## Preview
본 템플릿의 기본 동작방식은 아래와 같습니다:

![responsive emails-01](https://cloud.githubusercontent.com/assets/1515742/10591900/13889d32-76b9-11e5-8dc0-b89d80189e93.png)
![responsive emails-02](https://cloud.githubusercontent.com/assets/1515742/10591901/139c4954-76b9-11e5-80f7-5b0ccaf5af81.png)

## 만들게된 동기 (Motivation)
이메일용 html은 일반적인 HTML과 달리 모든 코드를 in-line CSS로 만들어야 합니다. 그래서 이메일 템플릿이랑 서명을 만들기가 굉장히 어렵습니다. "이런 HTML 템플릿과 서명을 편하게 만들어보자!" 라는 생각에서 이 템플릿을 만들었습니다. 물론 모든 이메일 클라이언트의 이슈를 전부 다 고칠 수는 없지만, 이 템플릿을 활용해서 조금 더 쉽고 깔끔한 반응형 이메일을 만들어서 받는 사람 보내는 사람 모두가 만족하게 만들 수 있습니다!

## 이 템플릿에서 무엇을 할 수 있나? (What does it do?)
- [x] config-based template generation
- [x] allows generating multiple templates (for your colleagues too!)
- [x] transforms linked (`<link>`) CSS into inline styles
- [x] embeds local `img[src]` into the template (base64).*
- [x] minifies the template
- [x] media queries for mail clients that support them
- [x] can build templates from multiple sources
- [x] watches HTML/CSS files for changes and re-builds

> *일부 이메일 클라이언트는 base64 기반의 이미지 표시 기능을 지원하지 않습니다. 외부 링크를 사용하는 것이 더 좋은 선택일 것 같아요.


## 시작하기 (Getting started)
```
$ npm install
$ gulp
```

`src/dark/` 를 확인해보시면 멋진 2개의 이메일 템플릿 샘플이 있습니다. 폴더를 통째로 다른 이름으로 복사/붙여넣기 하시고 그 안에 있는 `src/dark/conf.js` 파일을 입맛대로 바꿔보세요. 다음으로는 `gulp`를 실행해서 여러분 만의 이메일 템플릿을 빌드하세요. gulp 의 task가 동작하면서 기본 html CSS 파일을 확인하고 새로운 html 파일을 `/dist`에 저장합니다.

## 살펴보기 (Overview)
아래 순서도는 여러분이 만든 템플릿이 어떻게 빌드가 되는지를 보여줍니다.

![Responsive HTML email template/signatures diagram](http://fadeit.dk/posts/html-emails-and-email-signatures-how-hard-can-it-be/html-responsive-email-template-build-diagram.png)


## CSS 서포트 (CSS Support)

기억해둘 것은... 이것은 이메일용 HTML 을 만드는 것입니다. 그러니깐 이 프로젝트로 이메일을 빌드하는 여러분은 요즘은 잘 쓰지도 않는 멍청한 테이블 코드 덩어리를 확인하고 그 속에서 어떤 CSS가 동작하는지 안하는지를 알아봐야 할지도 모릅니다.(일단 이 [포스트](https://www.campaignmonitor.com/css/)를 참고하세요.) 아무튼 이런 과정을 통해서 여러분이 어떤 CSS 파일을 만들면, [gulp-inline-css](https://www.npmjs.com/package/gulp-inline-css) 모듈을 통해서 인라인 CSS로 바뀌어서 여러분의 HTML 파일로 빌드됩니다.


## 앞으로 할 일 (TODO):
- [ ] closing `inline-css` issue [#8](https://github.com/jonkemp/inline-css/issues/8#issuecomment-149025428) would greatly improve this repo
- [ ] preprocessor support (simplifies BEM)
- [ ] use github pages to show live demos
- [ ] check [gulp-inline-css](https://github.com/jonkemp/inline-css) for new features


## 다른 이메일 클라이언트에서 사용하는 법 (Usage with different e-mail clients)

### Thunderbird
썬더버드 이메일 클라이언트에 html 서명을 자동으로 넣어주는 몇몇 플러그인이 있스빈다. 일단 우리는 [SmartTemplate4](https://addons.mozilla.org/en-us/thunderbird/addon/smarttemplate4) 를 추천합니다. 이 플러그인을 쓰면 새 이메일, 답장, 전달 등을 할 때마다 각각 다른 이메일 템플릿을 쓸 수 있습니다.


### Apple Mail / OS X (꼭.. 써야 한다면?)

#### 방법 1
- 이메일 앱을 열고 `Mail` -> `Preferences` -> `Signatures` 로 이동하세요.
- 아무거나 새 이메일 서명을 만들세요. (나중에 찾기 편하게 placeholder 를 써두는 것이 좋습니다.)
- 이메일을 닫으세요.
- 터미널을 열고 TextEdit으로 서명 파일을 열어보세요. (iCloud drive를 사용하는 경우는 잘 작동하지 않는 경우가 있습니다. 아래 troubleshooting을 참고하세요. )

```
$ open -a TextEdit ~/Library/Mobile\ Documents/com~apple~mail/Data/V3/MailData/Signatures/ubiquitous_*.mailsignature
```
- 위에서 placeholder를 넣어둔 파일을 열어봅니다.
- `<body>...</body>` 의 모든 html 코드를 여러분이 빌드한 `/dist/`의 html 파일로 교체 합니다. (`<body>`외에 다른 메타 정보는 수정하지 마세요!)
- 메일앱을 다시 실행하고 새로 바뀐 서명을 확인해보세요 :)

> **주의**: 이미지 파일은 원래 `preference`의 미리보기 화면에서는 나오지 않습니다. 하지만 이메일을 만들고 발송하는 곳에서는 잘 보여지니깐 걱정마세요!


#### 방법 2
다른 방법으로는 `/dist`  에 빌드한 html 파일을 CMD + A, CMD + C 해서 설정에 이메일 서명 박스에 붙여넣기 해서 쓸 수도 있습니다. 하지만 이렇게 복붙을 하는 경우 파일의 `<html>` 이나 반응형 웹을 위한 미디어쿼리가 들어있는 `<style>` 부분을 복붙하는 것이 아니라 정상적으로 작동하지 않을 수 있습니다.


#### Troubleshooting

만약 위의 방법 1이 정상적으로 작동하지 않는다면 파일을 수정 후 메일 앱을 열기전에 아래 방법으로 파일을 잠궈야 합니다.

Lock Files:
```
$ chflags uchg ~/Library/Mail/V3/MailData/Signatures/*.mailsignature
```

나중에 파일을 수정할 생각이면 아래 방법으로 언락하세요 :
```
$ chflags nouchg ~/Library/Mail/V3/MailData/Signatures/*.mailsignature
```

만약 iCloud drive 를 사용하는 경우에는 위와 같은 문제가 있을 수 있습니다. 아래 블로그 포스팅을 참고하시면 도움이 될 것 입니다. [아이클라우드 드라이브 문제 해결하기 (보기)](http://matt.coneybeare.me/how-to-make-an-html-signature-in-apple-mail-for-el-capitan-os-x-10-dot-11/).


### 아웃룩 2010에서 사용하기 (Outlook 2010)
#### 방법 1
- 아웃룩 2010을 켜고  `File > Option > Mail > Signature` 으로 접속하세요.
- 새 서명을 만드세요. (나중에 확인하기 좋게, 표시를 해두시면 좋습니다.)
- CMD를 켜고 아래와 같이 입력하세요.

> AppData 폴더가 숨김 폴더라 가급적이면 CMD를 사용하는 것을 권장합니다.

```
cd AppData\Roamin\Microsoft
start Signatures

```

- 이 폴더에서 아까 만든 서명파일을 찾아서 우클릭해서 편집을 하세요.
- 모든 HTML코드를 여러분이 새로 만든 코드로 바꿔버리세요.
- 아웃룩을 열고 서명이 적용됐는지 확인해주세요.

> **주의** 위 방법으로 진행할 경우, 한글 등 유니코드가 깨지는 문제가 있습니다. 한글 이메일 서명의 경우 아래 **방법2**을 사용하시기 바랍니다.

#### 방법 2
아웃룩에서는 html 파일을 넣는 방법을 제공하지 않습니다. (아...) 그래서 위의 **방법 2** 처럼 파일을 복사/붙여넣기 하는 방법으로 사용할 수 있습니다.

- `/dist` 에 빌드한 html 파일을 브라우저에서 열고, ctrl A + C 로 복사하세요.
- Outlook 을 열고 `파일 > 옵션 > 메일 > 서명` 으로 들어가세요.
- 새 서명을 만들고 아래 박스에 Ctrl + V 로 파일을 붙여넣기 하세요.

> base 64로 만든 이메일 파일은 잘 작동하지 않을 수 있습니다. 외부 링크를 활용하시기를 권장합니다.
