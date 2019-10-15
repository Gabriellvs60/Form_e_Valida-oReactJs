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
                //atributos HTML
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                //validação - regras
                validation: {
                    required: true,
                },
                //boolean valid inicia como falso
                valid:false

            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                 //validação - regras
                 validation: {
                    required: true,
                },
                //boolean valid inicia como falso
                valid:false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                 //validação - regras
                 validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                //boolean valid inicia como falso
                valid:false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                 //validação - regras
                 validation: {
                    required: true,
                },
                //boolean valid inicia como falso
                valid:false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                 //validação - regras
                 validation: {
                    required: true,
                },
                //boolean valid inicia como falso
                valid:false
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

    //esse é um método genérico de validação
    //com ele, passamos o parametro do tipo de validação que queremos e ele retorna um booleano
    //podemos validar campo vazio, minimo de caracteres ou maximo
    checkValidity(value, rules) {
        let isValid = true;
        //para validar em cascata, tem que começar true para ir até o fim
        //se inicia no falso, a validação para, e retornar falso, no primeiro teste, ela não prossegue se for falso
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        return isValid;
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
        //passa o valor e o tipo de validação, armazenada e definida no estado
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        console.log(updatedFormElement);
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