var operators = document.getElementsByClassName("operator"),
  numbers = document.getElementsByClassName("num");
//operators buttons
for (let operator of operators) {
  operator.addEventListener('click', function () {
    var btn_id = this.id;

    switch (btn_id) {
      case "clear": erase(); break;
      case "plusminus": negate(); break;
      case "percent":
        var res = parseFloat(retrieve("res")) / 100;
        write("res", parseFloat(res.toFixed(4)));
        break;
      case "add":
      case "subtract":
      case "multiply":
      case "divide":
      case "equal":
        calculate(btn_id);
        break;
    }
  });
}
//numbers buttons
for (let number of numbers) {
  number.addEventListener('click', function () {
    var btn_id = this.id,
      str1 = retrieve("res"),
      nums = {
        num1: "1",
        num2: "2",
        num3: "3",
        num4: "4",
        num5: "5",
        num6: "6",
        num7: "7",
        num8: "8",
        num9: "9",
        num0: "0",
        point: "."
      };

    str1 = str1 + nums[btn_id];
    write("res", str1);
    document.getElementById("clear").innerText = "C";
  });
}

function getHistory (input_str) {
  var hist = {},
    arr = input_str.split(" ");

  hist.num = parseFloat(arr[0]);
  switch (arr[1]) {
    case "+":
      hist.ope = "add";
      break;
    case "-":
      hist.ope = "subtract";
      break;
    case "x":
      hist.ope = "multiply";
      break;
    case "/":
      hist.ope = "divide";
      break;
  }
  console.log (hist);
  return hist;
}

function calculate (id) {
  var hist = retrieve("histres"),
    input = parseFloat(retrieve("res")),
    ope = { add: "+",
            subtract: "-",
            multiply: "x",
            divide: "/" },
    histobj;

    if (hist && (hist !== "")) { //if got history
      histobj = getHistory(hist);

      switch (histobj.ope) {
        case "add": input = histobj.num + input; break;
        case "subtract": input = histobj.num - input; break;
        case "multiply": input = histobj.num * input; break;
        case "divide": input = histobj.num / input; break;
      }

      if (id === "equal") {
        write("histres", "");
        write("res", input);
      }
      else {
        write("histres", input + " " + ope[id]);
        write("res", "");
      }
    }

    else { //history is empty
      write("histres", input + " " + ope[id]);
      write("res", "");
    }
}

function negate() {
  var num = parseFloat(retrieve("res"));

  if (!isNaN(num)) {
    res = -(num);
    write ("res", res.toString());
  }
  else {
    console.error("plusminus requires a number to operate");
    write ("res", "");
  }
}

function erase () {
  if (document.getElementById("clear").innerText === "AC") {
    write ("histres", "");
    document.getElementById("clear").innerText = "C";
  }
  else {
    write ("res", "");
    document.getElementById("clear").innerText = "AC";
  }
}

function retrieve (ele_id) {
  return document.getElementById(ele_id).innerText;
}

function write (ele_id, content) {
  document.getElementById(ele_id).innerText = content.toString();
}
