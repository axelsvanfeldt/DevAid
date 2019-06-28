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
* `background_color` - (String) The background color of the navbar. Defaults to `#333`.
* `text_color` - (String) The text color of the navbar. Defaults to `#fff`.
* `content` - (String) The content of the navbar. Defaults to `''`.

While the navbar also can rendered in pure HTML with `<div id="devaid-navbar">YOUR_CONTENT</div>`, you will still need to call `devaid.navbar.init()` for it to work properly.

## Scrollbar
devaid.scrollbar.init({track_style: 'solid'});

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