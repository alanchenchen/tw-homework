// index.html需要插入的script,所有html需要插入的script都必须与html同名，如果想让页面引入css，必须通过模块导入
// 如果想实现热替换(不刷新整个页面，局部更新)，在下方加上 module.hot.accept()即可

if(module.hot) {
    module.hot.accept()
}

import "component/reset.css";
import "@/assets/fonts/fonts.css";
import "component/theme.css";
import "component/grid.css";
import "component/responsive.css";
import "./index.css";

import $ from "component/dom.js";
import Popup from "./popup";

/**
 * toggle头部的用户下拉菜单
 */
const toggleUserAction = () => {
    if ($(".icon-angle-down").css("opacity") === "1") {
        $(".user-action").toggle();
    }
}

/**
 * toggle左侧菜单
 * 
 * @param {*} status 
 */
const toggleLeftMenu = (status) => {
    if ($(".menu-switch").css("opacity") === "1") {
        if (status) {
            $(".left-menu").css({ left: "0" });
        } else {
            $(".left-menu").css({ left: "-100%" });
        }
    }
}

/**
 * 给对应task增加tags
 * 
 * @param {*} list 
 */
const addTag = (e, list) => {
    const addNode = e.target;
    const tagListNode = e.target.parentNode;
    list.forEach(item => {
        const tagNode = document.createElement("li");
        tagNode.className = "tag";
        tagNode.innerHTML = `
            <span>${item}</span>
            <i class="icon-trash tag-delete"></i>
        `;
        $(tagListNode).append(tagNode);
    });
}

/**
 * 删除对应task的tag
 * 
 * @param {*} e 
 * @param {*} parent 
 */
const deleteTag = (e, parent) => {
    const tagNode = e.target.parentNode;
    $(parent).remove(tagNode);
}

$(".user-info").on("click", (e) => {
    toggleUserAction();
});

$(".menu-switch").on("click", (e) => {
    toggleLeftMenu(true);
});

const allTagListNode = document.querySelectorAll(".tag-list");
allTagListNode.forEach(child => {
    $(child).on("click", ".tag-delete", (e) => {
        deleteTag(e, child);
    });
});

const allAddBtnNode = document.querySelectorAll(".add-btn");
allAddBtnNode.forEach(child => {
    $(child).on("click", (e) => {
        Popup({
            x: e.pageX,
            y: e.pageY,
            onConfirm(data, done) {
                const list = data.split(",");
                addTag(e, list);
                done();
            }
        });
    });
});
