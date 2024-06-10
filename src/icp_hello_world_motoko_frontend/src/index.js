import { icp_hello_world_motoko_backend } from "../../declarations/icp_hello_world_motoko_backend";
import './bootstrap.bundle.min.js';
import './bootstrap.js';

document.addEventListener('DOMContentLoaded', function () {

  /* Selectores */
  const form = document.getElementById('form');
  const lengthInput = document.getElementById('lengthInput');
  const widthInput = document.getElementById('widthInput');
  const heightInput = document.getElementById('heightInput');
  const enduranceInput = document.getElementById('enduranceInput');
  const submit = document.getElementById('submit');
  const loaderDiv = document.querySelector('.loader-div');

  const endurance = document.querySelector('.endurance');
  const mcubic = document.querySelector('.mcubic');
  const wbucket = document.querySelector('.wbucket');
  const sbucket = document.querySelector('.sbucket');
  const gbucket = document.querySelector('.gbucket');
  const scement = document.querySelector('.scement');

  /* Clases */
  class UI {

    outAlert(message, divReference) {

      this.deleteAlert(divReference);

      const pAlert = document.createElement('P');
      pAlert.classList.add('alert', 'alert-danger', 'msg-alert', 'mt-3', 'text-center');
      pAlert.textContent = message;

      divReference.appendChild(pAlert);

    }

    deleteAlert(reference) {
      const alert = reference.querySelector('.msg-alert');
      if (alert) {
        alert.remove();
      }
    }

    alertCheck = () => form.querySelectorAll('.msg-alert').length > 0;

    roundNumber(number) {
      return Math.round(number * 10000) / 10000;
    }

    showDosage(outData) {

      if (outData[0]) {

        mcubic.textContent = " " + this.roundNumber(outData[0].mcubic);
        wbucket.textContent = " " + this.roundNumber(outData[0].wbucket);
        scement.textContent = " " + this.roundNumber(outData[0].scement);
        sbucket.textContent = " " + this.roundNumber(outData[0].ssand);
        gbucket.textContent = " " + this.roundNumber(outData[0].gbucket);

      }

    }

    resetShowDosage() {

      endurance.textContent = " ";
      mcubic.textContent = " ";
      scement.textContent = " ";
      wbucket.textContent = " ";
      sbucket.textContent = " ";
      gbucket.textContent = " ";

    }

    resetForm() {
      form.reset();
    }

    readModeForm() {

      lengthInput.readOnly = !lengthInput.readOnly;
      widthInput.readOnly = !widthInput.readOnly;
      heightInput.readOnly = !heightInput.readOnly;
      enduranceInput.readOnly = !enduranceInput.readOnly;

    }

  }

  const ui = new UI();

  class ValidateData {

    getEquivalenceCode = (equivalence) => {

      let code = "";

      switch (equivalence) {
        case "0":
          code = "error";
          break;
        case "1":
          code = "endurance100";
          break;
        case "2":
          code = "endurance150";
          break;
        case "3":
          code = "endurance200";
          break;
        case "4":
          code = "endurance250";
          break;
        default:
          code = "endurance300";
          break;
      }

      return code;
    }

    getEndurance = (enduranceInput) => {

      let enduranceEquivalence = "";

      switch (enduranceInput) {
        case "0":
          enduranceEquivalence = "error";
          break;
        case "1":
          enduranceEquivalence = "Concreto 100 Kg/Cm² Grava ¾";
          break;
        case "2":
          enduranceEquivalence = "Concreto 150 Kg/Cm² Grava ¾";
          break;
        case "3":
          enduranceEquivalence = "Concreto 200 Kg/Cm² Grava ¾";
          break;
        case "4":
          enduranceEquivalence = "Concreto 250 Kg/Cm² Grava ¾";
          break;
        default:
          enduranceEquivalence = "Concreto 300 Kg/Cm² Grava ¾";
          break;
      }

      return enduranceEquivalence;
    }

    isNumber(n) {
      return /^-?\d+(\.\d+)?$/.test(n);
    }

    validateInput(e) {


      const alertCheckRes = ui.alertCheck();

      if (e.target.value.trim() === "") {

        const msg = "La cantidad es obligatorio";

        ui.outAlert(msg, e.target.parentElement);
        submit.disabled = true;
        return;
      }

      inputs.forEach(input => {
        if (e.target.id === input && !this.isNumber(e.target.value.trim())) {

          ui.outAlert("Ingresa una cantidad valida", e.target.parentElement);
          submit.disabled = true;
          return;
        }
      });

      if (e.target.id === "enduranceInput" && e.target.value.trim() === "0") {
        ui.outAlert("La recistencia es obligatoria", e.target.parentElement);
        submit.disabled = true;
        return;
      }


      if (lengthInput.value.trim() !== "" && widthInput.value.trim() !== "" && heightInput.value.trim() !== "" && enduranceInput.value.trim() !== "0" && !alertCheckRes) {
        submit.disabled = false;
      }

    }

  }

  const validateData = new ValidateData();

  /* Variables */

  const inputs = ["lengthInput", "widthInput", "heightInput"];


  /*  Eventos */

  function eventListeners() {
    lengthInput.addEventListener('input', inputValidation);
    widthInput.addEventListener('input', inputValidation);
    heightInput.addEventListener('input', inputValidation);
    enduranceInput.addEventListener('input', inputValidation);

    form.addEventListener('submit', submitData);
  }

  eventListeners();

  function inputValidation(e) {
    ui.deleteAlert(e.target.parentElement);
    validateData.validateInput(e);

    const alertCheckRes = ui.alertCheck();

    if (lengthInput.value.trim() !== "" && widthInput.value.trim() !== "" && heightInput.value.trim() !== "" && enduranceInput.value.trim() !== "0" && !alertCheckRes) {

      submit.disabled = false;

    } else {

      submit.disabled = true;

    }
  }

  async function submitData(e) {
    e.preventDefault();

    ui.resetShowDosage();
    ui.readModeForm();
    loaderDiv.hidden = !loaderDiv.hidden;
    submit.disabled = true;

    const outData = {
      lengthInput: parseFloat(lengthInput.value),
      widthInput: parseFloat(widthInput.value),
      heightInput: parseFloat(heightInput.value),
      enduranceInput: validateData.getEquivalenceCode(enduranceInput.value)
    };


    try {

      const calculateDosage = await icp_hello_world_motoko_backend.calculateDosage(outData);



      if (calculateDosage) {

        setTimeout(function () {
          endurance.textContent = validateData.getEndurance(enduranceInput.value);
          ui.readModeForm();
          ui.resetForm();
          ui.showDosage(calculateDosage);
          submit.disabled = true;
          loaderDiv.hidden = !loaderDiv.hidden;
        }, 2000);

      }

    } catch (error) {

      console.error("A ocurrido un error al calcular la Dosificación: ", error);

    }
  }

});
