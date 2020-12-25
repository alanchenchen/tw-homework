import $ from "component/dom.js";

export default ({ x, y, onConfirm, onClose, onConcel }) => {
    const hasPopupExsied = $(".popup").getDomNode() != null;
    if (hasPopupExsied) {
        $(".popup .popup-input").getDomNode().value = "";
    } else {
        const popupNode = document.createElement("div");
        popupNode.className = "popup";
        popupNode.innerHTML = `
            <i class="icon-close popup-close"></i>
            <h4 class="desc">Separate multiple resourece name with commas</h4>
            <input class="popup-input" type="text" placeholder="Input value" >
            <div class="button-list">
                <div class="popup-add blue">Add resources</div>
                <div class="popup-cancel dark-blue">Cancel</div>
            </div>
        `;
        $(document.body).append(popupNode);
    }

    const deletePopup = () => {
        document.body.removeChild($(".popup").getDomNode());
    }

    $(".popup").css({
        left: `${x - 30}px`,
        top: `${y + 30}px`
    });
    $(".popup-add").on("click", () => {
        const inputVal = $(".popup .popup-input").getDomNode().value;
        onConfirm && onConfirm(inputVal, deletePopup);
    });
    $(".popup-cancel").on("click", () => {
        deletePopup();
        onConcel && onConcel();
    });
    $(".popup-close").on("click", () => {
        deletePopup();
        onClose && onClose();
    });
} 