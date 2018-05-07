import React, {Component} from 'react';
import DynamicTable from '@atlaskit/dynamic-table';
import FieldText from '@atlaskit/field-text';
import Button from '@atlaskit/button';

class BankList extends Component {
    head = {
        cells: [{key: 'name', content: 'Название'}, {key: 'code', content: 'БИК'}, {
            key: 'corAccount',
            content: 'Корсчет'
        }, {key: 'address', content: 'Адрес'}]
    };
    state = {queryString: ''};

    render() {
        return (
            <React.Fragment>
                <FieldText label="Поиск" type="text" name="queryString"
                           onChange={(event) => this.setState({queryString: event.target.value})}/>

                <DynamicTable head={this.head} rows={this.filterList()}/>
            </React.Fragment>
        );
    }

    transformListToRows = (bankList) => bankList.map(bank => ({
        key: bank.code,
        cells: [{key: 'name', content: <a onClick={() => this.props.open(bank)}>{bank.name}</a>}, {
            key: 'code',
            content: <a onClick={() => this.props.open(bank)}>{bank.code}</a>
        }, {
            key: 'corAccount',
            content: <a onClick={() => this.props.open(bank)}>{bank.corAccount}</a>
        }, {key: 'address', content: <a onClick={() => this.props.open(bank)}>{bank.address}</a>}]
    }))

    filterList = () => {
        const queryString = this.state.queryString;
        const filteredList = queryString.length === 0 ? this.props.bankList : this.props.bankList.filter(bank => bank.name.includes(queryString) || bank.code.includes(queryString))
        return this.transformListToRows(filteredList);
    }

}

export default BankList;