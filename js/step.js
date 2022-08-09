function form(){
  function step(){
    // Step header
    let stepHeader__number = document.querySelectorAll(".formContainer__stepHeader__number");
    
    // Form
    let form =  document.querySelector(".formContainer__form")
    let formDivs = document.querySelectorAll(".formContainer__form__box");
    let formDivs__marginRight = 50;
    let submitBtns = document.querySelectorAll(".formContainer__form__btns__submitBtn");
    let backBtns = document.querySelectorAll(".formContainer__form__btns__backBtn");
    
    // Others
    let index = 0;
  


    // Event listeners
    submitBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        
        if(index < formDivs.length-1) index++;
        moveStep(form, formDivs[0].offsetWidth, formDivs__marginRight);
        changeHeaderStep(true)
      })
    });
  
    backBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        
        if(index != 0) index--;
        moveStep(form, formDivs[0].offsetWidth, formDivs__marginRight);
        changeHeaderStep(false);
      })
    });
  
    function moveStep(element, widthValue, marginRightValue){
      element.style.transform = `translateX(-${(widthValue + marginRightValue) * index}px)`;
    }
  
    function changeHeaderStep(next){
      // Active
      let activeStep = document.querySelector(".formContainer__stepHeader__number--active");
      activeStep.classList.remove("formContainer__stepHeader__number--active");
      activeStep.classList.add("formContainer__stepHeader__number--finished");
  
      // Next
      stepHeader__number[index].classList.add("formContainer__stepHeader__number--active");
      stepHeader__number[index].classList.remove("formContainer__stepHeader__number--finished")

      if(!next)
        stepHeader__number[index+1].classList.remove("formContainer__stepHeader__number--finished")
    }
  }
  step()

  function subjectInput(){
    let input = document.querySelector(".formContainer__form__labelInput__subjectInput");
    let divLabelInput = document.querySelectorAll(".formContainer__form__subjectLine .formContainer__form__labelInput");

    input.addEventListener("change", () => {
      showInputs(divLabelInput, input.value)
    })
    
    function showInputs(array, dataValue){
      for (let i = 0; i < array.length; i++) {
        let datasetArray = array[i].dataset.subject.split(" ");
        let hasInput = false;

        for (let dataset of datasetArray) {
          if(dataValue == dataset){
            hasInput = true;
            array[i].style.display = "block";
          }
        }
        
        if(!hasInput)
          array[i].style.display = "none";
      }
    }
  }
  subjectInput()
}
form()