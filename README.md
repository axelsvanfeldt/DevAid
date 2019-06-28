# DevAid
DevAid is a JavaScript library used to easily incorporate creative solutions when developing websites.

As well as replace the default browser scrollbar, DevAid can be used to display popups, tooltips and dynamical navbars - as seen on https://codeant.se.

Weighting less than 10kB, DevAid is super fast, easy to use and designed to work in both classic and modern browsers.

## Installation
DevAid can be called dynamically or referenced with the following HTML tag:

`<script type="text/javascript" src="path/to/devaid.min.js"></script>`

## Navbar
To save space on your pages, DevAid features a dynamic navbar which slides off screen every time a visitor scrolls down the page. The navbar gets visible as soon as the visitor scrolls up the page.

`devaid.navbar.init()` - Initiates and renders the navbar.

Accepts an optional parameter containing an object with the following properties:
* `background_color` - (String. Any color valid in HTML) The background color of the navbar. Defaults to `#333`.
* `text_color` - (String. Any color valid in HTML) The text color of the navbar. Defaults to `#fff`.
* `content` - (String. Any value) The content of the navbar. Defaults to `''`.

While the navbar also can rendered in pure HTML with `<div id="devaid-navbar">YOUR_CONTENT</div>`, you will still need to call `devaid.navbar.init()` for it to work properly.

## Scrollbar
DevAid contains a feature to replace the default browser window scrollbar with a much more appealing and modern scrollbar.

`devaid.scrollbar.init()` - Initiates and renders the navbar.

Accepts an optional parameter containing an object with the following properties:
* `thumb_color` - (String. Any color valid in HTML) The thumb color of the replacement scrollbar. Defaults to `#ff9900`.
* `track_color` - (String. Any color valid in HTML) The track color of the replacement scrollbar. Defaults to `rgba(0,0,0,0.15)`.
* `track_style` - (String. dashed|dotted|double|solid|none') The track style of the replacement scrollbar. Defaults to `dashed`.
* `track_width` - (String. Any value in pixels) The track width of the replacement scrollbar. Defaults to `3px`.

While the scrollbar also can rendered in pure HTML with `<div id="devaid-scrollbar-track"><div id="devaid-scrollbar-thumb"></div></div>`, you will still need to call `devaid.scrollbar.init()` for it to work properly.

## Placeholders
devaid.placeholders.init({url: 'www...'});

## Tooltips
devaid.tooltip.init();
devaid.tooltip.add({
    selector: 'li',
    content: 'test'
});

## Popups
devaid.popup.init();
devaid.popup.add({
    id: 'test',
    header: 'My Popup Header2',
    content: '<p>Praesent sodales tristique dolor id tristique. Curabitur et mi ante. Vivamus dignissim nibh ac leo faucibus interdum. Etiam laoreet maximus iaculis. Aenean posuere non elit pulvinar pharetra. Cras varius porttitor nisi, vitae lobortis turpis mollis eu. Pellentesque accumsan congue cursus. Ut id velit vel nunc mattis tincidunt.</p>',
    open: true,
});