function pageIndex_users(){
    let btns = document.querySelectorAll(".users__controls__btn");
    let parentOfCards = document.getElementById("users__cards");
    let allCards = document.querySelectorAll(".users__cards__card");

    let config = {
        index: 0,
        animationTime: 300,
        translateXCard: allCards[0].offsetWidth + 15,
    }



    // Event listener
    for (let btn of btns) {
        btn.addEventListener("click", () => {
            if(config.index >= allCards.length) return;

            if(btn.dataset.control == "deslike"){
                moveCard(allCards[config.index], "-"+config.translateXCard+"px", "-20deg", 0);
                nextCard(parentOfCards, allCards[config.index]);
            }else if(btn.dataset.control == "like"){
                moveCard(allCards[config.index], config.translateXCard+"px", "20deg", 0);
                nextCard(parentOfCards, allCards[config.index]);
            }

            config.index++;
        })
    }

    // Other functions
    function moveCard(element, transformValue, rotateValue, opacityValue){
        element.style.transform = `translateX(${transformValue}) rotate(${rotateValue})`;
        element.style.opacity = opacityValue;
    }

    function nextCard(parentDiv, currentElement){
        setTimeout(() => {
            parentDiv.removeChild(currentElement)
        }, config.animationTime);
    }
}
pageIndex_users()