import './App.css';
import Wrapper from './Components/Wrapper/Wrapper';
import Button from './Components/Button/Button';
import ButtonBox from './Components/ButtonBox/ButtonBox'
import Screen from './Components/Screen/Screen'
import React, {useState} from 'react'

const btnValues = [
  ["C", "+-", "%", "/", "Delete"],
  [7, 8, 9,"pow"],
  [4, 5, 6, "-", "X"],
  [1, 2, 3, "+", "sqrt"],
  [0, ".", "="],
]

const toLocalString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");

const App =() => {
  let [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0
  })
  
  const numClickHandler = (e) =>{
    e.preventDefault();
    const value = e.target.innerHTML;

    if (removeSpaces(calc.num).length < 16){
        setCalc({
          ...calc,
          num:
           calc.num === 0 && value === "0"
           ? "0"
           : removeSpaces(calc.num) % 1 === 0
           ? toLocalString(Number(removeSpaces(calc.num + value)))
           : toLocalString(calc.num + value),
          res: !calc.sign ? 0 : calc.res,
        })
    }
  }
  
  const commaClickHandler = (e) =>{
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".")? calc.num + value: calc.num
    })
  }
  
const signClickHandler = (e) =>{
  e.preventDefault();
  const value = e.target.innerHTML;

  setCalc({
    ...calc,
    sign: value,
    res: !calc.res && calc.num ? calc.num : calc.res,
    num:0,
  })
}
  
const equalsClickHandler = () =>{
  if (calc.sign && calc.num){
    const math = (a, b, sign) => 
    sign === "+"
    ? a+b
    : sign === "-"
    ? a - b
    : sign === "X"
    ? a * b
    : a/b

    setCalc({
      ...calc,
      res:
        calc.num === "0" && calc.sign === "/"
        ? "Math error" 
        :math(Number(calc.res), Number(calc.num), calc.sign),
        sign: "",
        num: 0,
    })
  }
}

const invertClickHandler = () =>{
  setCalc({
    ...calc,
    num: calc.num? calc.num * -1 : 0,
    res: calc.res? calc.res * -1 : 0,
    sign: ""
  })
}

const percentClickHandler = () =>{
  let num = calc.num ? parseFloat(calc.num) : 0
  let res = calc.res ? parseFloat(calc.res) : 0

  setCalc({
    ...calc,
    num: (num /= Math.pow(100, 1)),
    res: (num /= Math.pow(100, 1)),
    sign: ""
  })
}

const deleteClickHandler = () =>{
  setCalc({
    ...calc,
    sign: "",
    num: calc.num.substr(0, calc.num.length - 1),
    res: 0,
  })
}

const resetClickHandler = () =>{
  setCalc({
    ...calc,
    sign: "",
    num: 0,
    res: 0,
  })
}

const power = () =>{
  setCalc({
    ...calc,
    res : Math.pow(calc.num, 2),
    num : 0
    
  })
}

const squareroot = () =>{
  setCalc({
    ...calc,
    res : Math.sqrt(calc.num, 2),
    num : 0
  })
}

return (
    <div>
      <Wrapper >
        <Screen value={calc.num? calc.num: calc.res}/>
        <ButtonBox>
          {
            btnValues.flat().map((btn, i) =>{
              return(
                <Button
                key ={i}
                className ={btn === "="? "equals": ""}
                value ={btn}
                onClick={
                  btn === "sqrt"
                  ? squareroot
                  : btn === "Delete"
                  ? deleteClickHandler
                  : btn === "pow"
                  ? power
                  : btn === "C" 
                  ? resetClickHandler
                  : btn === "+-"
                  ? invertClickHandler
                  : btn === "%"
                  ? percentClickHandler
                  : btn === "="
                  ? equalsClickHandler
                  : btn === "/" ||  btn ==="X" || btn === "-" || btn === "+"
                  ? signClickHandler
                  : btn === "."
                  ? commaClickHandler
                  : numClickHandler
                }
                />
              )
            })
          }
        </ButtonBox>
      </Wrapper>
    </div>
  );
}
export default App;