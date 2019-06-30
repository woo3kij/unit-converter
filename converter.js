'use strict';

(function () {
  const el = document.getElementById('num'),
    score = document.querySelector('#score span'),
    from = document.getElementById('unitsA'),
    to = document.getElementById('unitsB'),
    lists = document.querySelector('#selectFields');

  let convert = debounce(unitConverter, 1000);

  el.addEventListener('input', convert, false);
  lists.addEventListener('change', unitConverter, false);

  function unitConverter() {
    const userNum = Number(el.value);

    if (inputValid(userNum)) {
      printResult(calcUnits(userNum, getUnit(from), getUnit(to)));
    } else {
      printResult();
    }
  }

  function inputValid(input) {
    return !Number.isNaN(input);
  }

  function printResult(result) {
    score.textContent = '';
    if (result) {
      score.textContent = el.value + getUnit(from) + " = " + result + getUnit(to);
    } else {
      score.textContent = "Niewłaściwy format!";
    }
  }

  function getUnit(selectList) {
    const val = selectList.options[selectList.selectedIndex].value;
    return val;
  }

  function calcUnits(num, unit1, unit2) {
    const calculated = num / setRatio(unit1) * setRatio(unit2);
    return Number(calculated.toPrecision(5));
  }

  function setRatio(unit) {
    let ratio;
    switch (unit) {
      case 'km':
        ratio = 0.001;
        break;
      case 'm':
        ratio = 1;
        break;
      case 'dm':
        ratio = 10;
        break;
      case 'cm':
        ratio = 100;
        break;
      case 'mm':
        ratio = 1000;
        break;
      case 'in':
        ratio = 39.3700787;
        break;
      case 'ft':
        ratio = 3.2808399;
        break;
      case 'mi':
        ratio = 0.000621371192;
        break;
      case 'yd':
        ratio = 1.0936133;
        break;
      default:
        return alert("Brak jednostki!");
    }
    return ratio;
  }

  //debounce function from https://davidwalsh.name/javascript-debounce-function
  function debounce(func, wait, immediate) {
    var timeout;
    return function () {
      var context = this, args = arguments;
      var later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };
})();