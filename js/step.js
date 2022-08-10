function form(){
  

  let step = {
    stepHeaderNumber: document.querySelectorAll(".formContainer__stepHeader__number"),
    form: document.querySelector(".formContainer__form"),
    formDivs: document.querySelectorAll(".formContainer__form__box"),
    formDivs__marginRight: 50,
    submitBtns: document.querySelectorAll(".formContainer__form__btns__submitBtn"),
    backBtns: document.querySelectorAll(".formContainer__form__btns__backBtn"),
    nextForm: false,
    index: 0,

    eventListeners(){
      this.submitBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();

          if(!this.nextForm) return;
          
          if(this.index < this.formDivs.length-1) this.index++;
          this.moveStep(this.form, this.formDivs[0].offsetWidth, this.formDivs__marginRight);
          this.changeHeaderStep(true)
        })
      });

      this.backBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();

          if(this.index != 0) this.index--;
          this.moveStep(this.form, this.formDivs[0].offsetWidth, this.formDivs__marginRight);
          this.changeHeaderStep(false);
        })
      });
    },

    moveStep(element, widthValue, marginRightValue) {
      element.style.transform = `translateX(-${(widthValue + marginRightValue) * this.index}px)`;
    },
    changeHeaderStep(next){
      // Active
      let activeStep = document.querySelector(".formContainer__stepHeader__number--active");
      activeStep.classList.remove("formContainer__stepHeader__number--active");
      activeStep.classList.add("formContainer__stepHeader__number--finished");
  
      // Next
      this.stepHeaderNumber[this.index].classList.add("formContainer__stepHeader__number--active");
      this.stepHeaderNumber[this.index].classList.remove("formContainer__stepHeader__number--finished")

      if(!next)
        this.stepHeaderNumber[this.index+1].classList.remove("formContainer__stepHeader__number--finished")
    }
  }
  step.eventListeners()

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

  function validateFields(){
    let divMessages = document.querySelector(".formContainer__message");
    let boxs = document.querySelector(".formContainer__form__box");

    let inputs = boxs.querySelectorAll(".formContainer__form__labelInput__field");
    let labels = boxs.querySelectorAll(".formContainer__form__labelInput label");
    let submit = boxs.querySelector(".formContainer__form__btns__submitBtn");

    let fields = {
      "name": {
        min: 3,
        max: 200
      },
      "email": {
        regexp: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      },
      "cpf/cnpj": {
        min: 9, 
        max: 35,
      },
      
      "cep": {
        regexp: /[0-9]+$/
      },
      "select": {
        
      },
    }
    let messages = [];
    let containError = false;


    submit.addEventListener("click", (e) => {
      e.preventDefault();
      
      messages = [];
      containError = false;
      divMessages.style.display = "none";

      checkFields(inputs, labels)

      if(containError)
        createMessage(messages);
      else {
        step.index++;
        step.moveStep(step.form, step.formDivs[0].offsetWidth, step.formDivs__marginRight)
      }
    })

    function checkFields(inputs, labels){
      for (let i = 0; i < inputs.length; i++) {

        if(inputs[i].value.length == 0){
          messages.push(`<strong>${labels[i].innerText}</strong>: O campo ${fields[inputs[i].dataset.name] && fields[inputs[i].dataset.name].min ? "tem que ter no mínimo "+fields[inputs[i].dataset.name].min+" caracteres!" : "é obrigatório!"}`);
          containError = true;
        }
        else if(fields[inputs[i].dataset.name] && inputs[i].value.length < fields[inputs[i].dataset.name].min){
          messages.push(`<strong>${labels[i].innerText}</strong>: O campo tem que ter no mínimo ${fields[inputs[i].dataset.name].min} caracteres!`)
          containError = true;
        }
        else if(fields[inputs[i].dataset.name] && inputs[i].value.length > fields[inputs[i].dataset.name].max){
          messages.push(`<strong>${labels[i].innerText}</strong>: O campo tem que ter no máximo ${fields[inputs[i].dataset.name].max} caracteres!`)
          containError = true;
        }
        else if(fields[inputs[i].dataset.name] && fields[inputs[i].dataset.name].regexp && !fields[inputs[i].dataset.name].regexp.test(inputs[i].value)){
          messages.push(`<strong>${labels[i].innerText}</strong>: campo inválido!`)
          containError = true;
        }
        else if(inputs[i].dataset.name == "select" && inputs[i].value == inputs[i].querySelector("option[disabled]").value){
          messages.push(`<strong>${labels[i].innerText}</strong>: selecione um valor!`)
          containError = true;
        }
      }
    }

    function createMessage(array){
      divMessages.innerHTML = "";
      
      for (let msg of array) {
        divMessages.innerHTML += `<li>${msg}</li>`
      }

      divMessages.style.display = "block";
      moveToMessage(divMessages)
    }

    function moveToMessage(element){
      window.scrollTo({
        top: element.offsetTop - 10,
        behavior: 'smooth'
      })
    }
  } 
  validateFields()
}
form()