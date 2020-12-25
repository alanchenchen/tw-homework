/**
 * 模仿JQ操作DOM的class。
 * 目前只支持操作单个node，如果需要操作多个同类名的node，需要for
 * */
class EasyDom {
    constructor(domSelector) {
        if (!domSelector) {
            throw new Error("selector is required");
        }
        if (typeof domSelector === "string") {
            this._domWrap = document.querySelector(domSelector);
        } else if (domSelector instanceof Node) {
            this._domWrap = domSelector;
        }
    }

    /**
     * 返回当前实例的原Node
     */
    getDomNode() {
        return this._domWrap;
    }
    
    /**
     * 设置实例的html
     * 
     * @param {*} content 
     */
    html(content) {
        if (typeof content === "string") {
            this._domWrap.innerHTML = content;
            return this;
        } else {
            throw new Error("html() expect string type param");
        }
    }

    /**
     * 返回或设置实例的css
     * 
     * @param {*} opts 
     */
    css(opts) {
        if (!opts) {
            throw new Error("css() expect object type param");
        }
        if (Object.prototype.toString.call(opts) === "[object Object]") {
            for (const key of Object.keys(opts)) {
                this._domWrap.style[key] = opts[key];
            }
            return this;
        } else if (typeof opts === "string") {
            return this._domWrap.style[opts] || getComputedStyle(this._domWrap)[opts];
        }
    }

    /**
     * toggle实例节点的display属性
     */
    toggle() {
        const display = this.css("display");
        if (display === "" || display === "block") {
            this.css({ display: "none" });
        } else {
            this.css({ display: "block" });
        }
    }

    /**
     * 返回或设置实例的attribute
     * 
     * @param {*} opts 
     */
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

    /**
     * 是否含有某个attribute
     * 
     * @param {*} opts 
     */
    hasAttr(opts) {
        if (typeof opts === "string") {
            return this._domWrap.hasAttribute(opts);
        } else {
            throw new Error("hasAttr() expect string type param");
        }
    }

    /**
     * 尾部插入Node
     * 
     * @param {*} nodeType 
     */
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

    /**
     * 删除指定的子Node
     * 
     * @param {*} nodeType 
     */
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

    /**
     * 是否含有某个class样式名
     * 
     * @param {*} className 
     */
    hasClass(className) {
        const existedName = this._domWrap.className;
        return existedName.includes(className)
    }

    /**
     * 添加class样式名
     * 
     * @param {*} className 
     */
    addClass(className) {
        if (this.hasClass(className)) {
            console.warn(`classname ${className} is existed`);
        } else {
            this._domWrap.className += ` ${className}`;
            return this;
        }
    }

    /**
     * 删除class样式名
     * 
     * @param {*} className 
     */
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

    /**
     * toggle class样式名
     * 
     * @param {*} className 
     */
    toggleClass(className) {
        if (this.hasClass(className)) {
            this.removeClass(className);
        } else {
            this.addClass(className);
        }
    }

    /**
     * 事件监听，默认是委托，可以只监听对应子节点的事件
     * 
     * @param {*} eventName addEventListener的事件名
     * @param  {...any} rest 
     *         length为1，参数是addEventListener的回调函数
     *         legnth为2，参数一是被委托的子节点node名(eg: li)或者class名(eg: .delete)，参数二是addEventListener的回调函数
     */
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
            if (
                filter === "" ||
                e.target.nodeName.toLowerCase() === filter ||
                e.target.className.includes(filter.substring(1))
            ) {
                cb(e);
            }
        });
    }
}

module.exports = (selector) => new EasyDom(selector);
