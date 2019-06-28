# DevAid
DevAid is a JavaScript library used to easily incorporate creative solutions when developing websites.
With a total volume of 12 kB, DevAid is super fast, easy to use and designed to work in both classic and modern browsers.

As of version 1.1.4, DevAid includes the following features:
* Navbar
* Placeholders
* Popups
* Scrollbar
* Tooltips

## Installation
DevAid can be called dynamically or referenced in your `<head>` or `<body>` tag with the following line:

`<script type="text/javascript" src="path/to/devaid.min.js"></script>`

## Navbar
To save space on your pages, DevAid features a dynamic navbar which slides off screen every time a visitor scrolls down the page. The navbar gets visible as soon as the visitor scrolls up the page.

`devaid.navbar.init()` - Initiates and renders the navbar.

Accepts an optional parameter containing an object with the following properties:
* `background_color` - (String. Any color valid in HTML) The background color of the navbar. Defaults to `#333`.
* `text_color` - (String. Any color valid in HTML) The text color of the navbar. Defaults to `#fff`.
* `content` - (String. Any value) The content of the navbar. Defaults to `''`.

While the navbar also can rendered in pure HTML with `<div id="devaid-navbar">YOUR_CONTENT</div>`, you will still need to call `devaid.navbar.init()` for it to work properly

## Placeholders
Placeholders are used replace or completely remove images with invalid sources.

`devaid.placeholders.init()` - Initiates and replaces faulty sources.

Accepts an optional parameter containing an object with the following properties:
* `url` - (String. Any valid URL) The URL of the replacement source. Defaults to `''` which removes the image completely.
* `height` - (String. Any value in pixels or auto) The thumb color of the replacement scrollbar. Defaults to `auto`.
* `width` - (String. Any value in pixels or auto) The thumb color of the replacement scrollbar. Defaults to `auto`.

## Popups
...

## Scrollbar
DevAid contains a feature to replace the default browser window scrollbar with a much more appealing and modern scrollbar.

`devaid.scrollbar.init()` - Initiates and renders the scrollbar.

Accepts an optional parameter containing an object with the following properties:
* `thumb_color` - (String. Any color valid in HTML) The thumb color of the replacement scrollbar. Defaults to `#ff9900`.
* `track_color` - (String. Any color valid in HTML) The track color of the replacement scrollbar. Defaults to `rgba(0,0,0,0.15)`.
* `track_style` - (String. dashed|dotted|double|solid|none') The track style of the replacement scrollbar. Defaults to `dashed`.
* `track_width` - (String. Any value in pixels) The track width of the replacement scrollbar. Defaults to `3px`.

While the scrollbar also can rendered in pure HTML with `<div id="devaid-scrollbar-track"><div id="devaid-scrollbar-thumb"></div></div>`, you will still need to call `devaid.scrollbar.init()` for it to work properly.

## Tooltips
...