import React, {Component} from 'react';
import BankForm from "./BankForm";
import BankList from "./BankList";
import Modal from '@atlaskit/modal-dialog';
import Button, {ButtonGroup} from '@atlaskit/button';

class Store extends Component {
    state = {bankList: [], isOpen: false, selectedBank: null, error: null};

    componentDidMount() {
        this.loadFromLocalStorage();
    }

    render() {
        return (
            <React.Fragment>
                <h2>Банки</h2>
                <Button appearance="primary" onClick={() => this.open()}>
                    Добавить
                </Button>
                {this.state.isOpen && (
                    <Modal onClose={this.close}
                           heading={this.state.selectedBank ? 'Изменить банк' : 'Добавить банк'}>
                        <BankForm showError={this.state.error} onSave={this.handleAdd} onCancel={this.close} selectedBank={this.state.selectedBank}
                                  onDelete={this.handleDelete}/>
                    </Modal>
                )}
                <BankList bankList={this.state.bankList} open={this.open}/>
            </React.Fragment>
        );
    }

    isUnique = (bank) => {
        const foundBank = this.state.bankList.find(curBank => curBank.name === bank.name || curBank.code === bank.code)
        return !foundBank
    }

    handleAdd = (bank) => {
        if (this.isUnique(bank)) {
            this.setState({error: null})
        } else {
            this.setState({error: true})
            return
        }
        const bankList = [...this.state.bankList];
        const foundBankIndex = bankList.findIndex(curBank => bank.id === curBank.id);
        if (foundBankIndex !== -1) {
            bankList[foundBankIndex] = bank;
        }
        else {
            bankList.push(bank);
        }
        this.setState({bankList}, () => {
            this.close();
            this.saveToLocalStorage()
        });
    }
    handleDelete = (bank) => {
        const bankList = [...this.state.bankList];
        const foundBankIndex = bankList.findIndex(curBank => bank.id === curBank.id);
        if (foundBankIndex !== -1) {
            bankList.splice(foundBankIndex, 1);
        }
        this.setState({bankList}, () => {
            this.close();
            this.saveToLocalStorage()
        });
    }

    open = (selectedBank = null) => {
        this.setState({isOpen: true, selectedBank});

    }
    close = () => this.setState({isOpen: false});
    saveToLocalStorage = () => {
        localStorage.setItem('bankList', JSON.stringify(this.state.bankList));
    }
    loadFromLocalStorage = () => {
        const bankListString = localStorage.getItem('bankList');
        if (bankListString) {
            const bankList = JSON.parse(bankListString);
            this.setState({bankList});
        }

    }

}

export default Store;