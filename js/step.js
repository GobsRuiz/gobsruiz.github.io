function step(){
  // Header step
  let headerStep__number = document.querySelectorAll(".headerStep__number");
  // Form divs
  let divParent =  document.querySelector(".stepFormDivs")
  let formDivs = document.querySelectorAll(".stepFormDivs__div");
  let formDivsMarginRight = 50;
  let submitBtns = document.querySelectorAll(".form__submitBtn");
  let backBtns = document.querySelectorAll(".form__backBtn");

  let index = 0;

  submitBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      
      if(index < formDivs.length-1) index++;
      moveStep();
      changeHeaderStep()
    })
  });

  backBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      
      if(index != 0) index--;
      moveStep();
      changeHeaderStep();
    })
  });

  function moveStep(){

    divParent.style.transform = `translateX(-${(formDivs[0].offsetWidth + formDivsMarginRight) * index}px)`;
  }

  function changeHeaderStep(){
    // Active
    let activeStep = document.querySelector(".headerStep__number--active");
    activeStep.classList.remove("headerStep__number--active");
    activeStep.classList.add("headerStep__number--finished");

    // Next
    headerStep__number[index].classList.add("headerStep__number--active");
    headerStep__number[index].classList.remove("headerStep__number--finished")
    headerStep__number[index+1].classList.remove("headerStep__number--finished")
  }
}
step()

console.log("oi")