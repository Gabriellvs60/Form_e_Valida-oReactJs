import React, { Component } from 'react';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';


class ContactData extends Component {
    //para adicionar um novo elemento ao form, é só adicionar o estado com o tipo
    //configurar e assinar o valor
    //Assim é facil de adicionar, excluir ou configurar um novo input
    state = {
        orderForm: {
            name: { 
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: ''
            },
            //combobox
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: ''
            }
        },
        loading: false
    }

    orderHandler = ( event ) => {
        event.preventDefault();
        this.setState( { loading: true } );
        const formData = {};
        //formElementIdentifier é o email,country, etc
        //usando um for para percorrer os elementos de orderForm
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            orderData: formData
        }
        //trecho onde enviamos os dados pelo axios
        alert("Enviou")
        console.log(order);
       
    }

    inputChangedHandler = (event, inputIdentifier) => {
        //clona todo o estado e joga numa const
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        //pega o form atualizado
        const updatedFormElement = { 
            ...updatedOrderForm[inputIdentifier]
        };
       //Atualiza o clone (updatedOrderForm) depois pega o form do input
        updatedFormElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        //joga o clone atualizado para o form em estado
        this.setState({orderForm: updatedOrderForm});
    }

    render () {

        const formElementsArray = [];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement =>(
                    <Input 
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    //passa o evento do próprio React (event)
                    //passa o id que é o nome do state (country,name,email)
                    changed={(event) => this.inputChangedHandler(event,formElement.id)}
                    />
                ))}
                <Button btnType="Success" >ORDER</Button>
            </form>
            );
              if ( this.state.loading ) {
                form = <Spinner />;
            }
            return (
                <div className={classes.ContactData}>
                    <h4>Enter your Contact Data</h4>
                    {form}
                </div>
            );
    }
}

export default ContactData;