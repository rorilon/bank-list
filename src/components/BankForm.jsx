import React, {Component} from 'react';
import FieldText from '@atlaskit/field-text';
import Button, {ButtonGroup} from '@atlaskit/button';
import uuid4 from 'uuid/v4';
import Flag from '@atlaskit/flag'

class BankForm extends Component {
    state = {name: '', code: '', id: null, corAccount: '', address: ''};

    static getDerivedStateFromProps(nextProps, prevState) {
        return nextProps.selectedBank ? nextProps.selectedBank : null
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    {this.props.showError && <Flag appearance="error" title="БИК или наименование не уникальны" />}
                    <FieldText required label="Наименование банка" type="text" name="name" value={this.state.name}
                               onChange={this.handleInputChange}/>
                    <FieldText required label="БИК" type="text" name="code" value={this.state.code}
                               onChange={this.handleInputChange}/>
                    <FieldText required label="Корсчет" type="text" name="corAccount" value={this.state.corAccount}
                               onChange={this.handleInputChange}/>
                    <FieldText required label="Адрес" type="text" name="address" value={this.state.address}
                               onChange={this.handleInputChange}/>
                    <div style={{height: 30}}/>
                    <ButtonGroup>
                        <Button type="submit" appearance="primary">
                            Сохранить
                        </Button>
                        {this.state.id && <Button appearance="warning" onClick={()=>this.props.onDelete(this.state)}>
                            Удалить
                        </Button>}
                        <Button onClick={this.props.onCancel}>
                            Отмена
                        </Button>
                    </ButtonGroup>
                </form>
            </div>
        );
    }

    handleSubmit = (event) => {
        const bank = {...this.state}
        if (!bank.id) {
            bank.id = uuid4();
        }
        this.props.onSave(bank);
        console.log();
        event.preventDefault();
    }

    handleInputChange = (event) => {
        const value =  event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value
        });
    }


}

export default BankForm;