import React from 'react';
import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import axios from 'axios';
import { MyCommandCell } from './command-cell.jsx';
import './crud-tutorial.css';
import '@progress/kendo-theme-default/dist/all.css';

class ManageTutorials extends React.Component {
    editField = "inEdit";
    CommandCell;
    constructor() {
        super()
        this.state = {
            tutorials: [{
                info: '',
                description: '',
                url: ''
            }],
            isLoading: true, error: null
        };

        this.CommandCell = MyCommandCell({
            edit: this.enterEdit,
            remove: this.remove,

            add: this.add,
            discard: this.discard,

            update: this.update,
            cancel: this.cancel,

            editField: this.editField
        });
    }
    componentWillMount() {
        this.getAllTutorials();
    }

    async getAllTutorials() {
        var url = process.env.REACT_APP_SERVER_HORT + 'getAllTutorials';
        (async () => {
            try {
                await axios.get(url)
                    .then(res => {
                        console.log(res);
                        this.setState({ tutorials: res.data.tutorials, isLoading: false })
                        this.sortDescending();
                    })

            } catch (err) {
                console.error(err);
                this.setState({ error: err.message, isLoading: false })
            }
        })();
    }

    async updateTutorial(updateData) {
        var url = process.env.REACT_APP_SERVER_HORT + 'updateTutorial';
        (async () => {
            try {
                await axios.put(url,
                    {
                        "Info": updateData.info,
                        "Description": updateData.description,
                        "Url": updateData.url
                    })
                    .then(async (res) => {
                        await this.getAllTutorials()
                    })

            } catch (err) {
                this.setState({ error: err.message, isLoading: false })
            }
        })();
    }

    async addTutorial(addData) {
        var url = process.env.REACT_APP_SERVER_HORT + 'addTutorial';
        (async () => {
            try {
                await axios.post(url,
                    {
                        "Info": addData.info,
                        "Description": addData.description,
                        "Url": addData.url
                    })
                    .then(async (res) => {
                        await this.getAllTutorials()
                    })

            } catch (err) {
                this.setState({ error: err.message, isLoading: false })
            }
        })();
    }

    async deleteTutorial(deleteData) {
        var url = process.env.REACT_APP_SERVER_HORT + 'deleteTutorial';
        (async () => {
            try {
                await axios.delete(url,
                    {
                        "Id": deleteData.id
                    })
                    .then(async (res) => {
                        await this.getAllTutorials()
                    })

            } catch (err) {
                this.setState({ error: err.message, isLoading: false })
            }
        })();
    }

    enterEdit = (dataItem) => {
        this.setState({
            tutorials: this.state.tutorials.map(item =>
                item.id === dataItem.id ?
                    { ...item, inEdit: true } : item
            )
        });
    }

    sortDescending = () => {
        const { tutorials } = this.state;
        tutorials.sort((a, b) => a - b).reverse()
        this.setState({ tutorials: tutorials })
    }

    add = async (dataItem) => {
        dataItem.inEdit = undefined;
        dataItem.id = this.generateId(this.state.tutorials);

        await this.addTutorial(dataItem);
        this.setState({
            tutorials: [...this.state.tutorials]
        });
    }

    update = async (dataItem) => {
        const data = [...this.state.tutorials];
        const updatedItem = { ...dataItem, inEdit: undefined };

        this.updateItem(data, updatedItem);
        this.updateItem(this.state.tutorials, updatedItem);
        await this.updateTutorial(dataItem);
        this.setState({ tutorials: data });
    }

    updateItem = (data, item) => {
        let index = data.findIndex(p => p === item || (item.id && p.id === item.id));
        if (index >= 0) {
            data[index] = { ...item };
        }
    }

    cancel = (dataItem) => {
        const originalItem = this.state.tutorials.find(p => p.id === dataItem.id);
        const data = this.state.tutorials.map(item => item.id === originalItem.id ? originalItem : item);

        this.setState({ tutorials: data });
    }

    discard = (dataItem) => {
        const data = [...this.state.tutorials];
        // this.removeItem(data, dataItem);
        dataItem.inEdit = false;
        this.setState({ tutorials: data });
    }

    remove = async (dataItem) => {
        const data = [...this.state.tutorials];
        this.removeItem(data, dataItem);
        this.removeItem(this.state.tutorials, dataItem);
        await this.deleteTutorial(dataItem);
        this.setState({ tutorials: data });
    }

    itemChange = (event) => {
        const data = this.state.tutorials.map(item =>
            item.id === event.dataItem.id ?
                { ...item, [event.field]: event.value } : item
        );

        this.setState({ tutorials: data });
    }

    addNew = () => {
        const newDataItem = { inEdit: true, Discontinued: false };

        this.setState({
            tutorials: [newDataItem, ...this.state.tutorials]
        });
    }

    cancelCurrentChanges = () => {
        this.setState({ tutorials: [...this.state.tutorials] });
    }

    render() {
        const { tutorials, isLoading, error } = this.state;
        if (error) {
            return <div>{error}</div>;
        }
        if (isLoading) {
            return <div>Loading...</div>;
        }
        const hasEditedItem = tutorials.some(p => p.inEdit);

        return (
            <Grid
                data={tutorials}
                onItemChange={this.itemChange}
                editField={this.editField}
            >
                <GridToolbar>
                    <button
                        title="Add new"
                        className="k-button k-primary add-new"
                        onClick={this.addNew}
                    >
                        Add new
                    </button>
                    {hasEditedItem && (
                        <button
                            title="Cancel current changes"
                            className="k-button"
                            onClick={this.cancelCurrentChanges}
                        >
                            Cancel current changes
                        </button>
                    )}
                </GridToolbar>
                <Column field="id" title="Id" editor="numeric" width="50px" editable={false} />
                <Column field="info" title="Info" width="240px" />
                <Column field="description" title="Description" width="550px" />
                <Column className="url-link" field="url" title="Url" width="430px" />

                <Column cell={this.CommandCell} width="220px" />
            </Grid>
        );
    }

    generateId = data => data.reduce((prev, current) => (prev.id > current.id) ? prev : current).id + 1;

    removeItem(data, item) {
        let index = data.findIndex(p => p === item || (item.id && p.id === item.id));
        if (index >= 0) {
            data.splice(index, 1);
        }
    }
}
export default ManageTutorials;