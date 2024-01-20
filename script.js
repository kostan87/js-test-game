function unitMove(elem, dir, dist, time) {
    let prop;
    switch (dir) {
        case "x":
            prop = elem.style.marginLeft;
            break;
        case "y":
            prop = elem.style.marginTop;
            break;
    }

    let frameTime = 1000 / 60;
    let animParts = time / frameTime;
    let partDist = dist / animParts;

    let partIndex = 1;
    let timerId= setInterval(() => {
        if (partIndex === animParts) { clearInterval(timerId) }
        prop = `${Number(prop.split("px")[0]) + partDist}px`;
        switch (dir) {
            case "x":
                elem.style.marginLeft = prop;
                break;
            case "y":
                elem.style.marginTop = prop;
                break;
        }
        ++partIndex;
    }, frameTime);
}

function controlHandler() {
    function unitAnim(elem, keyCode) {
        //console.log(animReady);
        let dist, amount, source, dir = ["KeyA", "KeyD", "KeyW", "KeyS"].indexOf(keyCode);
        switch (dir) {
            case 0: // left
                dir = "x";
                dist = -35;
                amount = 11;
                source = "images/1_INDEX.gif";
                elem.style.transform = "ScaleX(-1)"
                break;
            case 1: // right
                dir = "x";
                dist = 35;
                amount = 11;
                source = "images/1_INDEX.gif";
                elem.style.transform = "ScaleX(1)"
                break;
            case 2: // jump
                dir = "y";
                dist = -15;
                break;
            case 3: // sit
                break;
        }

        let imageTag = `<img alt='animated unit' src='${source}'>`;
        elem.innerHTML = imageTag.replace("INDEX", "1"); // animation first image

        let imageIndex = 2;
        let timerId = setInterval(() => {
            unitMove(unit, dir, dist, 100);
            if (imageIndex === amount) {
                elem.innerHTML = imageTag.replace("INDEX", "1");
                clearInterval(timerId);
                animReady = true;
                devFuncLog("Animation complete");
            } else {
                elem.innerHTML = imageTag.replace("INDEX", String(imageIndex));
                ++imageIndex;
            }
        }, 100);

        function keyUpHandler (event) {
            if (event.code === keyCode) {
                elem.innerHTML = imageTag.replace("INDEX", "1"); // animation first image
                clearInterval(timerId);
                animReady = true;
                window.removeEventListener("keyup", keyUpHandler);
                devFuncLog("Animation complete");
            }
        }
        window.addEventListener("keyup", keyUpHandler);
    }

    let animReady = true
    window.addEventListener("keydown", (e) => {
        //console.log(animReady);
        if (animReady) {
            devFuncLog("Animation start");
            animReady = false;
            unitAnim(unit, e.code);
        }
    });
}

let unit = document.createElement("div");
unit.className = "unit";
document.body.append(unit);

controlHandler();

function devFuncLog(res, arr) {
    console.log([`${new Date().getMinutes()}:${new Date().getSeconds()}.${new Date().getMilliseconds()}`, res, arr]);
}