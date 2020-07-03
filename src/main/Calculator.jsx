import React, { Component,Fragment } from 'react'
import './Calculator.css'
import Button from '../Button/button'
import Display from '../Button/Display'

const StateInitial={
    DisplayValue:'0',
    ClearDisplay:false,
    Value:[0,0],
    Current:0,
    Operation:null
}
export default class Calculator extends Component {

    state={...StateInitial}
    constructor(props){
        super(props)
        this.clearMemory=this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }
    clearMemory(){
        this.setState({...StateInitial})
    }
    setOperation(Operation){
        // Se o usuário digitar uma operação=vai ter que mudar de index do vetor
        if(this.state.Current===0){
            this.setState({Current:1,ClearDisplay:true,Operation})
        } else{
            const equal=Operation ==='='
            const CurrentOperation=this.state.Operation

            const Value=[...this.state.Value]

                switch(CurrentOperation){
                    case '+':
                        
                        Value[0] = Value[0] + Value[1]
                        break
                    case '-':
                        Value[0] = `${Value[0] - Value[1]}`
                        break  
                    case '/':
                        Value[0] = `${Value[0] / Value[1]}`
                        break
                    case '*':
                        Value[0] = `${Value[0] * Value[1]}`
                        break
                    
                }
            this.setState({
                DisplayValue:Value[0],
                Operation:equal? null:Operation ,
                ClearDisplay:!equal,
                Current:equal?0:1,
                Value

            })
        }
        
    }
    addDigit(x){
        /* Verificando se o valor digitado pelo o usuário for um '.' e 
        já estiver armazenado no estado um numero com '.'
        */
        if(x==='.' && this.state.DisplayValue.includes('.')){
            return
        }
        /* Irá receber True se o valor do display já for 0 ou se ClearDisplay for
        true.ClearDisplay==True significa que o valor digitado irá substituir o 0 
        e irá evitar que o 0 aparela ao lado esquerdo do número
        */
        const ClearDisplay=this.state.DisplayValue==='0' || this.state.ClearDisplay
        /*Se ClearDisplay==True significa que irá adiconar uma string vazia
        ,tirando o zero do lado esquerdo do número, caso contrário irá adicionar o valor do display*/ 
        const CurrentValue=ClearDisplay ? '':this.state.DisplayValue
        /* Vai juntar o valor do display com os outros valores que o usuário 
        está clicando*/
        const DisplayValue=CurrentValue+x

        this.setState({DisplayValue,ClearDisplay:false})
        /*Se não estiver apertado no botão '.' , irá pegar os valores
        digitados, tranformá-los em número, adicionar no state */
        if(x!=='.'){
            const i=this.state.Current
            const newValue=parseFloat(DisplayValue)
            const Value=[...this.state.Value]
            Value[i]=newValue
            this.setState({Value})
            console.log(Value)
            
        }

        

    }
    render() {

        return (
            <div>
                <h1 className='NomeCalculadora'>Calculator</h1>
                <div className='Calculator'>
                    <Display value={this.state.DisplayValue}/>
                    <Button label='AC' click={this.clearMemory} triple operation/>
                    <Button label='/' click={this.setOperation} operation/>
                    <Button label='7' click={this.addDigit}/>
                    <Button label='8' click={this.addDigit}/>
                    <Button label='9' click={this.addDigit}/>
                    <Button label='*' click={this.setOperation} operation/>
                    <Button label='4' click={this.addDigit}/>
                    <Button label='5' click={this.addDigit}/>
                    <Button label='6' click={this.addDigit}/>
                    <Button label='-' click={this.setOperation} operation/>
                    <Button label='1' click={this.addDigit}/>
                    <Button label='2' click={this.addDigit}/>
                    <Button label='3' click={this.addDigit}/>
                    <Button label='+' click={this.setOperation} operation/>
                    <Button label='0' click={this.addDigit} double />
                    <Button label='.' click={this.addDigit}/>
                    <Button label='=' click={this.setOperation} operation/>
                </div>
            </div>
        )
    }
}