const ops = /[*\+\/\-]/

function App() {
    const [expression, setExpression] = React.useState("")
    const [answer, setAnswer] = React.useState(0)
    const [expression2, setExpression2] = React.useState("")
    const [overwrite, setOverwrite] = React.useState(false)

    const display = (symbol) => {
        if (expression[0] !== "0") {
            if(overwrite === false) {
                setExpression((prev) => prev + symbol);
            } else if (overwrite === true && ops.test(expression[expression.length-1])) {
                setOverwrite(false)
                setExpression((prev) => prev + symbol)
            } else {
                setExpression(symbol);
                setOverwrite(false)
            }
        } 
    }

    const operatorDisplay = (symbol) => {
        const splitted1 = expression.split("");
        const lastChar = splitted1.slice(-1)[0];
        const secondLastChar = splitted1.slice(-2,-1)[0];
        if ((ops.test(secondLastChar)&&ops.test(lastChar)) || 
            (ops.test(lastChar) && symbol !=="-")) {
                if (ops.test(secondLastChar)) {
                    const updateValue = expression.substring(
                        0,expression.length - 2) + symbol;
                    setExpression(updateValue);
                } else {
                    setExpression(expression.substring(0, expression.length - 1)
                    + symbol);
                }
            } else { 
                setExpression((prev) => prev + symbol )      
        } 
    }

    const decimalDisplay = (symbol) => {
        const splitted = expression.split(ops)
        const last = splitted.slice(-1)[0];
        if (!last.includes(".")) {
            setExpression((prev) => prev + symbol);
            setExpression2((prev) => prev + symbol);
        }
    }

    const calculate = (displayResult) => {
        const total = Function("return " + displayResult)()
        setExpression2("");
        setAnswer(total.toString())
        setExpression(total.toString())
        setOverwrite(true)
    }
    
    const clear = () => {
        setExpression("");
        setExpression2("")
        setAnswer(0)
    }
    
    const quickDisplay = (symbol) => {
        const displayValue = () => {
            if (expression2[0] !== "0") {
                if (!ops.test(symbol)) {
                    setExpression2((prev) => prev + symbol)
                } else{setExpression2(symbol)}
                }}
        setAnswer(displayValue)
    }

    return (
        <div className="container">
            <div className="grid">
                <div id="main-display" className="dis">
                    <input id="input" type="text" value={expression}  disabled />
                    <div id="display">{expression2}{answer}</div>
                </div>
                <div onClick={clear} id="clear" className="padButton AC">AC</div>
                <div onClick={() => {operatorDisplay("/");quickDisplay("/")}} id="divide" className="padButton div">/</div>
                <div onClick={() => {operatorDisplay("*");quickDisplay("*")}} id="multiply" className="padButton times">x</div>
                <div onClick={() => {display("7");quickDisplay("7")}} id="seven" className="padButton seven">7</div>
                <div onClick={() => {display("8");quickDisplay("8")}} id="eight" className="padButton eight">8</div>
                <div onClick={() => {display("9");quickDisplay("9")}} id="nine" className="padButton nine">9</div>
                <div onClick={() => {operatorDisplay("-");quickDisplay("-")}} id="subtract" className="padButton minus">-</div>
                <div onClick={() => {display("4");quickDisplay("4")}} id="four" className="padButton four">4</div>
                <div onClick={() => {display("5");quickDisplay("5")}} id="five" className="padButton five">5</div>
                <div onClick={() => {display("6");quickDisplay("6")}} id="six" className="padButton six">6</div>
                <div onClick={() => {operatorDisplay("+");quickDisplay("+")}} id="add" className="padButton plus">+</div>
                <div onClick={() => {display("1");quickDisplay("1")}} id="one" className="padButton one">1</div>
                <div onClick={() => {display("2");quickDisplay("2")}} id="two" className="padButton two">2</div>
                <div onClick={() => {display("3");quickDisplay("3")}} id="three" className="padButton three">3</div>
                <div onClick={() => {display("=");calculate(expression)}} id="equals" className="padButton equals">=</div>
                <div onClick={() => {display("0");quickDisplay("0")}} id="zero" className="padButton zero">0</div>
                <div onClick={() => {decimalDisplay(".")}} id="decimal" className="padButton dot">.</div>
            </div>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById("app"))