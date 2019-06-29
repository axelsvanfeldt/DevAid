/*!
DevAid 
v1.1.5
https://github.com/axelsvanfeldt/DevAid
axel.svanfeldt@gmail.com
https://codeant.se
*/
'use strict';

let devaid = {
    cfg: {
        features: [],
        navbar: {
            content: '',
            background_color: '#333',
            text_color: '#fff',
            scroll_pos: 0
        },
        popup: {
            background_color: '#f2f2f2',
            text_color: '#444',
            close_button: true
        },
        placeholders: {
            url: '',
            height: 'auto',
            width: 'auto',
            errors: []
        },
        scrollbar: {
            thumb_color: '#ff9900',
            track_color: 'rgba(0,0,0,0.15)',
            track_width: '3px',
            track_style: 'dashed',
        },
        tooltip: {
            text_color: '#fff',
            background_color: '#222',
            margin_top: '4px',
            width: '70px',
            border_radius: '2px',
            arrow: true
        },
        edit: (feature, options) => {
            if (typeof options === 'object' && options !== null) {
                Object.keys(options).forEach((key) => {
                    if (devaid.cfg[feature].hasOwnProperty(key)) {
                        let cleanVal = devaid.cfg.validate(feature, key, options[key]);
                        if (cleanVal) {
                            devaid.cfg[feature][key] = cleanVal;
                        }
                    }
                });
            }
        },
        validate: (feature, option, val) => {
            if (option == 'track_style') {
                val = ['dashed', 'dotted', 'solid', 'double', 'none'].indexOf(val) == -1 ? false : val;
            }
            else if (option == 'arrow' || option == 'close_button') {
                val = typeof val === 'boolean' ? val : false;
            }
            else if (option == 'url') {
                var exp = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
                var regex = new RegExp(exp);
                val = val.match(regex) ? val : false;             
            }
            else if (option == 'height' || option == 'width') {
                if (val !== 'auto') {
                    let intVal = parseInt(val);
                    val = isNaN(intVal) ? false : `${intVal}px`;
                }
            }
            else if (option.includes('height') || option.includes('width') || option.includes('margin') || option.includes('radius')) {
                let intVal = parseInt(val);
                val = isNaN(intVal) ? false : `${intVal}px`;
            }
            else if (option.includes('color')) {
                let el = document.createElement('div');
                el.style.backgroundColor = val;
                val = el.style.backgroundColor ? val : false;
            }            
            if (!val) {
                devaid.log(`You have entered an invalid '${option}' value in your ${feature}!`);
            }
            return val;
        },        
    },
    log: (msg) => {
        console.log(`DevAid: ${msg}`);
    },
    awaitDOM: (feature, callback, init = true) => {
        if (devaid.allowAction(feature, init)) {
            if (init) {
                devaid.cfg.features.push(feature);
            }
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => {
                    callback();
                });
            }
            else {
                callback();
            }
        }
    },
    allowAction: (feature, init) => {
        if (init) {
            if (devaid.cfg.features.indexOf(feature) == -1) {
                devaid.cfg.features.push(feature);
                return true;
            }
            return false;
        }
        else {
            if (devaid.cfg.features.indexOf(feature) == -1) {
                devaid.log(`You need to initiate ${feature} before dynamically adding/triggering a new one!`);
                return false;
            }
            return true;
        }
    },
    navbar: {
        init: (options = {}) => {
            devaid.awaitDOM('navbar', () => {
                devaid.cfg.edit('navbar', options);
                devaid.css.get('navbar');
                devaid.navbar.renderHtml();
                window.addEventListener('scroll', devaid.navbar.toggleNavbar);
            });
        },
        renderHtml: () => {
            let navbar = document.querySelector('#devaid-navbar');
            if (navbar) {
                if (!navbar.childNodes.length) {
                    navbar.innerHTML = '<p>Insert navbar content!</p>'
                }
            }
            else {
                let navbar = document.createElement('div');
                navbar.id = 'devaid-navbar';
                navbar.innerHTML = devaid.cfg.navbar.content ? devaid.cfg.navbar.content : '<p>Insert navbar content!</p>';
                document.body.appendChild(navbar);
            }
        },
        toggleNavbar: () => {
            let navbar = document.querySelector('#devaid-navbar'),
                navHeight = navbar.offsetHeight,
                pos = window.scrollY;
            if (pos < navHeight) {
                navbar.style.top = '0px';
            }
            else {
                navbar.style.top = pos < devaid.cfg.navbar.scroll_pos ? '0px' : `-${navHeight}px`;
            }
            devaid.cfg.navbar.scroll_pos = pos;
        }
    },
    placeholders: {
        init: (options = {}) => {
            devaid.awaitDOM('placeholders', () => {
                devaid.cfg.edit('placeholders', options);
                devaid.css.get('placeholders');
                devaid.placeholders.addListeners();
            });            
        },     
        addListeners: () => {
            let imgs = document.querySelectorAll("img");
            imgs.forEach((el) => {
                el.onerror = (e) => {
                    devaid.placeholders.replaceImage(e);
                };
            });
        },
        replaceImage: (e) => {
            var img = e.target;
            if (devaid.cfg.placeholders.errors.indexOf(img.src) == -1) {
                devaid.cfg.placeholders.errors.push(img.src);
                if (devaid.cfg.placeholders.url) {
                    img.classList.add('devaid-placeholder');
                    img.src = devaid.cfg.placeholders.url;
                }
                else {
                    img.parentNode.removeChild(img);
                }
            }
            else {
                devaid.log(`The URL you have provided for image placeholders is invalid. Removing image from the DOM...`);
                img.parentNode.removeChild(img);
            }
        }
    },    
    popup: {
        init: (options = {}) => {
            devaid.awaitDOM('popup', () => {
                devaid.cfg.edit('popup', options);
                devaid.css.get('popup');
                devaid.popup.renderHtml();
                devaid.popup.addListeners();
            });            
        },
        renderHtml: () => {
            if (!document.querySelector('#devaid-popup-overlay')) {
                let overlay = document.createElement('div');
                overlay.id = 'devaid-popup-overlay';
                document.body.appendChild(overlay);
            }
        },
        addListeners: () => {
            document.addEventListener('click', (e) => {
                if (e.target && e.target.classList.contains('devaid-popup-trigger')) {
                    let dataVal = e.target.dataset.popup;
                    if (dataVal) {
                        devaid.popup.open(dataVal);
                    }
                }
                else if (e.target && (e.target.id == 'devaid-popup-overlay' || e.target.classList.contains('devaid-popup-close'))) {
                    devaid.popup.close(e);
                }
            });
        },
        add: (data = {}) => {
            devaid.awaitDOM('popup', () => {
                if (data.hasOwnProperty('id') && data.hasOwnProperty('content')) {
                    devaid.popup.renderHtml();
                    let overlay = document.querySelector('#devaid-popup-overlay'),
                        popup = document.createElement('div'),
                        contentEl = document.createElement('div');
                    contentEl.innerHTML = data.content;
                    popup.id = data.id;
                    popup.classList.add('devaid-popup');
                    if (data.hasOwnProperty('header')) {
                        let header = document.createElement('h3'),
                            headerVal = document.createTextNode(data.header);
                        header.appendChild(headerVal);
                        header.classList.add('devaid-popup-header');
                        popup.appendChild(header);
                    }
                    popup.appendChild(contentEl);
                    if (devaid.cfg.popup.close_button) {
                        let btn = document.createElement('div'),
                            btnVal = document.createTextNode('Close window');
                        btn.appendChild(btnVal);
                        btn.classList.add('devaid-popup-btn', 'devaid-popup-close');
                        popup.appendChild(btn);
                    }
                    overlay.appendChild(popup);
                    if (data.hasOwnProperty('open')) {
                        if (data.open) {
                            devaid.popup.open(data.id);
                        }
                    }
                }
                else {
                    devaid.log(`You need to include valid 'id' and 'content' properties to add a popup!`);
                }
            }, false);
        },
        trigger: (data = {}) => {
            devaid.awaitDOM('popup', () => {
                if (data.hasOwnProperty('id') && data.hasOwnProperty('selectors')) {
                    document.querySelectorAll(data.selectors).forEach((el) => {
                        el.classList.add('devaid-popup-trigger');
                        el.dataset.popup = data.id;
                    });
                }
            }, false);
        },
        open: (id) => {
            let popup = document.getElementById(id);
            if (popup) {
                document.documentElement.style.overflow = 'hidden';
                document.body.style.overflow = 'hidden';
                document.querySelector('#devaid-popup-overlay').style.display = 'block';
                popup.style.display = 'block';
                popup.classList.add('devaid-popup-open');
            }
            else {
                devaid.log(`A popup with the id '${id}' must be rendered before it opens!`);
            }
        },
        close: (e = false) => {
            let close = true;
            if (e) {
                close = false;
                if (e.target.id == 'devaid-popup-overlay' || e.target.classList.contains('devaid-popup-close')) {
                    close = true;
                }
            }
            if (close) {
                document.querySelectorAll('.devaid-popup').forEach((popup) => {
                    popup.classList.remove('devaid-popup-open');
                    popup.style.display = 'none';
                });
                document.querySelector('#devaid-popup-overlay').style.display = 'none';
                document.documentElement.style.overflow = 'auto';
                document.body.style.overflow = 'auto';
            }
        },
    },
    scrollbar: {
        init: (options = {}) => {
            devaid.awaitDOM('scrollbar', () => {
                devaid.cfg.edit('scrollbar', options);
                devaid.css.get('scrollbar');
                devaid.scrollbar.renderHtml();
                devaid.scrollbar.moveThumb();
                window.addEventListener('scroll', devaid.scrollbar.moveThumb);
            });
        },
        renderHtml: () => {
            if (!document.querySelector('#devaid-scrollbar-track')) {
                let track = document.createElement('div'),
                    thumb = document.createElement('div');
                track.id = 'devaid-scrollbar-track';
                thumb.id = 'devaid-scrollbar-thumb';
                track.appendChild(thumb);
                document.body.appendChild(track);
            }
        },
        moveThumb: () => {
            let scrollHeight = document.body.scrollHeight - window.innerHeight,
                percentage = window.scrollY / scrollHeight,
                trackHeight = document.querySelector('#devaid-scrollbar-track').clientHeight,
                thumbMargin = Math.round(trackHeight * percentage) - 10;
            document.querySelector('#devaid-scrollbar-thumb').style.marginTop = `${thumbMargin}px`;
        }, 
    },    
    tooltip: {
        init: (options = {}) => {
            devaid.awaitDOM('tooltip', () => {
                devaid.cfg.edit('tooltip', options);
                devaid.css.get('tooltip');
            });
        },       
        add: (data = {}) => {
            devaid.awaitDOM('tooltip', () => {
                if (data.hasOwnProperty('selectors') && data.hasOwnProperty('content')) {
                    let els = document.querySelectorAll(data.selectors);
                    els.forEach((el) => {
                        el.classList.add('devaid-tooltip-trigger');
                        if (!el.querySelector('.devaid-tooltip-content')) {
                            let txtDiv = document.createElement('div'),
                                txtNode = document.createTextNode(data.content);
                            txtDiv.classList.add('devaid-tooltip-content');
                            txtDiv.appendChild(txtNode);                        
                            el.appendChild(txtDiv);
                        }
                    });
                }
                else {
                    devaid.log(`You need to include valid 'selectors' and 'content' properties to add a tooltip!`);
                }
            }, false);
        }
    },
    css: {
        get: (feature) => {
            let css = false;
            if (feature == 'navbar') {
                css = `
                #devaid-navbar {
                    padding: 0 20px;
                    position: fixed;
                    left: 0;
                    top: 0;
                    z-index: 50;
                    display: block;
                    width: calc(100% - 40px);
                    color: ${devaid.cfg.navbar.text_color};
                    background-color: ${devaid.cfg.navbar.background_color};
                    -webkit-transition: all 0.23s;
                    -moz-transition: all 0.23s;
                    transition: all 0.23s;
                }`;
            }
            else if (feature == 'placeholders') {
                css = `
                .devaid-placeholder {
                    height: ${devaid.cfg.placeholders.height};
                    width: ${devaid.cfg.placeholders.width};
                }`;
            }
            else if (feature == 'popup') {
                css = `
                #devaid-popup-overlay {
                    display: none;
                    position: fixed;
                    z-index: 100;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0,0,0,0.8);
                }
                .devaid-popup {
                    display: none;
                    text-align: left;
                    overflow-y: auto;
                    border-radius: 6px;
                    color: ${devaid.cfg.popup.text_color};
                    background-color: ${devaid.cfg.popup.background_color};
                    padding: 24px;
                    margin: 30px auto;
                    width: 500px;
                    max-height: calc(100% - 108px);
                    max-width: calc(100% - 88px);
                    position: relative;
                    -webkit-box-shadow: 0 0 5px rgba(0,0,0,0.2);
                    -moz-box-shadow: 0 0 5px rgba(0,0,0,0.2);
                    box-shadow: 0 0 5px rgba(0,0,0,0.2); 
                }
                .devaid-popup-header {
                    margin-top: 0;
                    padding-bottom: 8px;
                    border-bottom: 1px solid rgba(0,0,0,0.1);
                }
                .devaid-popup-open {
                    -webkit-animation: scale-up 0.3s;
                    animation: scale-up 0.3s;
                }
                .devaid-popup-btn {
                    font-size: 14px;
                    margin-top: 20px;
                    color: ${devaid.cfg.popup.text_color};
                    text-align: center;
                    border-radius: 2px;
                    width: 110px;
                    padding: 4px 0 4px 0;
                    border: 1px solid;
                }
                .devaid-popup-btn:hover {
                    cursor: pointer;
                    opacity: 0.7;
                }
                .devaid-popup-trigger:hover {
                    cursor:pointer;
                }
                @-webkit-keyframes scale-up {
                    from {
                        transform: scale(0.1);
                        opacity: 0;
                    }
                    to {
                        transform: scale(1);
                        opacity: 1;
                    }
                }
                @keyframes scale-up {
                    from {
                        transform: scale(0.1);
                        opacity: 0;
                    }
                    to {
                        transform: scale(1);
                        opacity: 1;
                    }
                }`;
            }
            else if (feature == 'scrollbar') {
                css = `
                html, body {
                    scrollbar-width: none
                }
                html::-webkit-scrollbar,
                body::-webkit-scrollbar,
                html::-webkit-scrollbar-track,
                body::-webkit-scrollbar-track,
                html::-webkit-scrollbar-thumb,
                body::-webkit-scrollbar-thumb {
                    display: none;
                }
                #devaid-scrollbar-track {
                    padding-right: 10px;
                    position: fixed;
                    z-index: 90;
                    right: 0;
                    top: 20px;
                    height: calc(100% - 40px);
                    width: 1px;
                    border-left: ${devaid.cfg.scrollbar.track_width} ${devaid.cfg.scrollbar.track_style} ${devaid.cfg.scrollbar.track_color};
                }
                #devaid-scrollbar-thumb {
                    margin: -10px 0 0 -7.5px;
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    border: 3px solid ${devaid.cfg.scrollbar.thumb_color};
                    -webkit-box-shadow: 0 0 5px rgba(0,0,0,0.2);
                    -moz-box-shadow: 0 0 5px rgba(0,0,0,0.2);
                    box-shadow: 0 0 5px rgba(0,0,0,0.2); 
                }`;
            }
            else if (feature == 'tooltip') {
                css = `
                .devaid-tooltip-trigger {
                    position: relative;
                }
                .devaid-tooltip-trigger:hover .devaid-tooltip-content {
                    visibility: visible;
                    opacity: 1;
                }
                .devaid-tooltip-content {
                    display: block;
                    visibility: hidden;
                    width: ${devaid.cfg.tooltip.width};
                    background-color: ${devaid.cfg.tooltip.background_color};
                    color: ${devaid.cfg.tooltip.text_color};
                    font-weight: 400;
                    font-size: 13px;
                    text-align: center;
                    border-radius: ${devaid.cfg.tooltip.border_radius};
                    padding: 5px 0;
                    position: absolute;
                    z-index: 1;
                    margin: ${devaid.cfg.tooltip.margin_top} 0 0 -${(parseInt(devaid.cfg.tooltip.width) / 2)}px;
                    opacity: 0;
                }`;          
                if (devaid.cfg.tooltip.arrow) {
                    css += `
                    .devaid-tooltip-content:after {
                        content: '';
                        position: absolute;
                        bottom: 100%;
                        left: 50%;
                        margin-left: -5px;
                        border: 5px solid;
                        border-color: transparent transparent ${devaid.cfg.tooltip.background_color} transparent;
                    }`;
                }
            }
            devaid.css.render(css);
        },
        render: (css) => {
            let style = document.querySelector(`#devaid-style`);
            if (style) {
                style.appendChild(document.createTextNode(css)); 
            } 
            else {
                let head = document.head || document.getElementsByTagName('head')[0];
                style = document.createElement('style');
                style.id = 'devaid-style';
                style.type = 'text/css';
                head.appendChild(style);
                style.appendChild(document.createTextNode(css));         
            }
        },
    },
}