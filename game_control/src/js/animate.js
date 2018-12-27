//改变对象的样式
function changeStyle(obj, type) {
    if (type == "bigToSmall") {
        createjs.Tween.get(obj).to({
            scaleX: 1.1,
            scaleY: 1.1
        }, 200).call(function () {
            obj.scaleX = 1;
            obj.scaleY = 1;
        });
    }
}

export {changeStyle}
