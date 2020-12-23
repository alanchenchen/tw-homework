class EasyDom {
    constructor(domSelector) {
        if (typeof domSelector === "string") {
            this._domWrap = document.querySelector(domSelector);
        } else if (domSelector instanceof Node) {
            this._domWrap = domSelector;
        }
    }

    getDomNode() {
        return this._domWrap;
    }

    html(content) {
        if (typeof content === "string") {
            this._domWrap.innerHTML = content;
            return this;
        } else {
            throw new Error("html() expect string type param");
        }
    }

    css(opts) {
        if (Object.prototype.toString.call(opts) === "[object Object]") {
            for (const key of Object.keys(opts)) {
                this._domWrap.style[key] = opts[key];
            }
            return this;
        } else if (typeof opts === "string") {
            return this._domWrap.style[opts] || getComputedStyle(this._domWrap)[opts];
        } else {
            throw new Error("css() expect object type param");
        }
    }

    toggle() {
        const display = this.css("display");
        if (display === "" || display === "block") {
            this.css({ display: "none" });
        } else {
            this.css({ display: "block" });
        }
    }

    attr(opts) {
        if (Object.prototype.toString.call(opts) === "[object Object]") {
            for (const key of Object.keys(opts)) {
                this._domWrap.setAttribute(key, opts[key]);
            }
            return this;
        } else if (typeof opts === "string") {
            return this._domWrap.getAttribute(opts);
        } else {
            throw new Error("attr() expect object or string type param");
        }
    }

    hasAttr(opts) {
        if (typeof opts === "string") {
            return this._domWrap.hasAttribute(opts);
        } else {
            throw new Error("hasAttr() expect string type param");
        }
    }

    append(nodeType) {
        if (nodeType instanceof EasyDom) {
            this._domWrap.appendChild(nodeType.getDomNode());
            return this;
        }
        else if (nodeType instanceof Node) {
            this._domWrap.appendChild(nodeType);
            return this;
        } else {
            throw new Error("append() expect Node type param");
        }
    }

    remove(nodeType) {
        if (nodeType instanceof EasyDom) {
            this._domWrap.removeChild(nodeType.getDomNode());
            return this;
        }
        else if (nodeType instanceof Node) {
            this._domWrap.removeChild(nodeType);
            return this;
        } else {
            throw new Error("append() expect Node type param");
        }
    }

    hasClass(className) {
        const existedName = this._domWrap.className;
        return existedName.includes(className)
    }

    addClass(className) {
        if (this.hasClass(className)) {
            console.warn(`classname ${className} is existed`);
        } else {
            this._domWrap.className += ` ${className}`;
            return this;
        }
    }

    removeClass(className) {
        const existedNameList = this._domWrap.className.split(" ").map(item => item.trim());
        if (existedNameList.includes(className)) {
            const delIndex = existedNameList.findIndex(item => item === className);
            existedNameList.splice(delIndex, 1);
            this._domWrap.className = existedNameList.join(" ");
            return this;
        } else {
            console.warn(`classname ${className} can not be found`);
        }
    }

    toggleClass(className) {
        if (this.hasClass(className)) {
            this.removeClass(className);
        } else {
            this.addClass(className);
        }
    }

    on(eventName, ...rest) {
        let filter = "";
        let cb = null;
        if (rest.length === 1) {
            cb = rest[0];
        } else if (rest.length === 2) {
            filter = rest[0];
            cb = rest[1];
        } else {
            console.error("method on needs callback function");
        }
        this._domWrap.addEventListener(eventName, (e) => {
            if (filter === "" || e.target.nodeName.toLowerCase() === filter) {
                cb(e);
            }
        });
    }
}

export default (selector) => new EasyDom(selector);
