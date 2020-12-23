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

const toggleUserAction = () => {
    if ($(".icon-angle-down").css("opacity") === "1") {
        $(".user-action").toggle();
    }
}

const toggleLeftMenu = (status) => {
    if ($(".menu-switch").css("opacity") === "1") {
        if (status) {
            $(".left-menu").css({ left: "0" });
        } else {
            $(".left-menu").css({ left: "-100%" });
        }
    }
}

$(".user-info").on("click", (e) => {
    toggleUserAction();
});

$(".menu-switch").on("click", (e) => {
    toggleLeftMenu(true);
});