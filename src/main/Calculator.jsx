import React, { Component } from 'react'
import './Calculator.css'

import Button from '../components/Button'
import Display from'../components/Display'

const initialState ={
    displayValue: '0', /*Valor inicial calculadora*/
    clearDisplay: false, // Limpar o display
    operation: false, // Armazenar operação
    values: [0, 0], // Armazenar valores
    current: 0 // Verificar qual index está manipulando
}

export default class Calculator extends Component {

    state = {...initialState} // Estado inicial

    constructor(props) {
        super(props)
        this.clearMemory = this.clearMemory.bind(this) // Limpa a memória
        this.setOperation = this.setOperation.bind(this) // Seta a operação a ser feita
        this.addDigit = this.addDigit.bind(this) // Adiciona digito que não for operador 
    }

    clearMemory() {
        this.setState({...initialState}) // Setando estado inicial para 0
    }

    setOperation(operation) {
        /* Caso esteja realizando operação com elemento de índice 0 (primeiro elem.)
        passe a operação solicitada e avance para o índice 1 (para inserir o novo valor)*/
        if (this.state.current === 0) { 
            this.setState({operation, current: 1, clearDisplay: true})
        } else {
            const equals = operation === '=' // Clicar no = seta equals para true
            const currentOperation = this.state.operation // Caso o usuário continue operação com o número atual, this.state.current != 0

            const values = [...this.state.values]
    
            // Passando condições para as operações da calculadora.

            if (currentOperation === '+') {
                values[0] = values[0] + values[1]
            } else if (currentOperation === '-') {
                values[0] = values[0] - values[1]
            } else if (currentOperation === '*') {
                values[0] = values[0] * values[1]
            } else if (currentOperation === '/') {
                values[0] = values[0] / values[1]
            } else if (currentOperation === '%') {
                values[0] = values[0] / 100  
            } else if (currentOperation === "+/-") {
                values[0] = values[0] * -1
            } 

            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })
        }
    }

    addDigit(n) {
        // Se o dígito for . e já estiver incluso, ignore outras tentativas de colocá-lo.
        if(n === '.' && this.state.displayValue.includes('.')) {
            return
        }
        
        const clearDisplay = this.state.displayValue === '0'
            || this.state.clearDisplay // => Limpa display se digíto for 0 ou cleardisplay estiver marcado 
        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + n
        this.setState({displayValue, clearDisplay: false})

        if (n !== '.') {
            // Caso o dígito seja diferente de .
            const i = this.state.current
            const newValue = parseFloat(displayValue) // Com exceção do . o display só irá mostrar valores de 0 - 9
            const values = [...this.state.values] // Clonando array
            values[i] = newValue
            this.setState({ values })
        }
    }

    render() {
        return (
            <div className="calculator">
                <Display value={this.state.displayValue} /> 
                <Button label="AC" click={this.clearMemory} />
                <Button label="+/-" click={this.setOperation} />
                <Button label="%" click={this.setOperation} />
                <Button label="/" click={this.setOperation} operation/>
                <Button label="7" click={this.addDigit} />
                <Button label="8" click={this.addDigit} />
                <Button label="9" click={this.addDigit} />
                <Button label="*" click={this.setOperation} operation/>
                <Button label="4" click={this.addDigit} />
                <Button label="5" click={this.addDigit} />
                <Button label="6" click={this.addDigit} />
                <Button label="-" click={this.setOperation} operation/>
                <Button label="1" click={this.addDigit} />
                <Button label="2" click={this.addDigit} />
                <Button label="3" click={this.addDigit} />
                <Button label="+" click={this.setOperation} operation/>
                <Button label="0" click={this.addDigit} double />
                <Button label="." click={this.addDigit} />
                <Button label="=" click={this.setOperation} operation/>
            </div>
        )
    }
}