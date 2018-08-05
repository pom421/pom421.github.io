import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            previous: 0,
            operator: "",
            current: 0,
            cleanNext: false
        }        
    }

    type(i) {
        debugger
        if (this.state.cleanNext) {
            this.setState({
                current: +i,
                cleanNext: false
            })

        } else {
            this.setState({
                current: +(this.state.current.toString() + i)
            })
        }
    }

    operator(operator) {
        this.setState({
            operator,
            previous: +this.state.current,
            cleanNext: true
        })
    }

    compute() {
        let value
        const {previous, current } = this.state
        switch (this.state.operator) {
            case "+":
                value = +previous + +current
                break
            case "-":
                value = +previous - +current
                break
            case "*":
                value = +previous * +current
                break
            case "%":
                value = +previous / +current
                break
                
        }
        this.setState({
            current: value,
            previous: 0
        })
    }

    render() {
        return (
            <div>
                <table style={{border: "1px solid gray", textAlign: "center"}}>
                <tbody>
                    <tr>
                        <td colSpan="4" style={{backgroundColor: "yellow", height: "20px"}}>{this.state.current}</td>
                    </tr>
                    <tr>
                        <td colSpan="3">Clear</td>
                        <td onClick={this.operator.bind(this, "%")}>%</td>
                    </tr>
                    <tr>
                        <td style={{width: "25px"}} onClick={this.type.bind(this, 7)}>7</td>
                        <td style={{width: "25px"}} onClick={this.type.bind(this, 8)}>8</td>
                        <td style={{width: "25px"}} onClick={this.type.bind(this, 9)}>9</td>
                        <td onClick={this.operator.bind(this, "*")}>*</td>
                    </tr>
                    <tr>
                        <td onClick={this.type.bind(this, 4)}>4</td>
                        <td onClick={this.type.bind(this, 5)}>5</td>
                        <td onClick={this.type.bind(this, 6)}>6</td>
                        <td style={{width: "25px"}} onClick={this.operator.bind(this, "-")}>-</td>
                        
                    </tr> 
                    <tr> 
                        <td onClick={this.type.bind(this, 1)}>1</td>
                        <td onClick={this.type.bind(this, 2)}>2</td>
                        <td onClick={this.type.bind(this, 3)}>3</td>
                        <td onClick={this.operator.bind(this, "+")}>+</td>
                    </tr>
                    <tr> 
                        <td colspan="3" onClick={this.type.bind(this, 0)}>0</td>
                        <td onClick={this.compute.bind(this)}>=</td>
                    </tr>
                    </tbody>
                </table>

                <p>Current : {this.state.current}</p>
                <p>Previous : {this.state.previous}</p>
                <p>Operator : {this.state.operator}</p>
                <p>Clean next : {this.state.cleanNext ? "Oui" : "Non"}</p>
            </div>
        )
    }
}


ReactDOM.render(<App />, document.getElementById('root'));
