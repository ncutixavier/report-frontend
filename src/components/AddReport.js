import React, { Component } from 'react'
import { connect } from "react-redux"
import { addReportAction } from '../redux/actions/addReportAction';
import { Spinner, Button, Modal, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap'

export class AddReport extends Component {
    constructor(props) {
        super(props);

        this.onFileChange = this.onFileChange.bind(this);

        this.state = {
            company: '',
            database: '',
            numberOfErrors: '',
            selectedFiles: undefined,
            comment: '',
            files: null,
            reportFiles: ''
        };
    }

    change = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    changeFile = (e) => {
        this.setState({ files: e.target.files });
    }

    componentDidMount(data) {
        this.props.addReportAction(data);
    }

    onFileChange(e) {
        this.setState({ reportFiles: e.target.files })
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const user = localStorage.getItem('id')
        let formData = new FormData();
        for (const key of Object.keys(this.state.reportFiles)) {
            formData.append('report_file', this.state.reportFiles[key])
        }
        formData.append('user', user)
        formData.append('db_name', this.state.database)
        formData.append('company', this.state.company)
        formData.append('comment', this.state.comment)
        formData.append('number_of_errors', this.state.numberOfErrors)
        await this.props.addReportAction(formData)
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.props.isOpen} centered>
                    <h1 style={{ fontSize: '3rem', padding: '1rem', fontWeight: 'bold' }} className="text-primary">Add New Report</h1>

                    {/* <div style={{ color: "green", display: this.props.registerState.loading }}>
                        <Progress multi>
                            <Progress animated bar color="primary" value="33" />
                            <Progress animated bar color="success" value="34" />
                            <Progress animated bar color="warning" value="33" />
                        </Progress>
                    </div> */}

                    <ModalBody>
                        <Form onSubmit={(e) => this.onSubmit(e)}>
                            {/* {console.log(this.props.addReportState)} */}
                            {/* {
                                this.props.registerState.error ?
                                    <Alert color="warning" style={{ fontSize: '1.3rem' }}>
                                        {this.props.registerState.error}
                                    </Alert> : <span></span>
                            }
                            {
                                this.props.registerState.data.statusText === "Created" ?
                                    <Alert color="success" style={{ fontSize: '1.3rem' }}>
                                        {"User succesfully registered !"}
                                    </Alert> : <span></span>
                            } */}

                            <FormGroup className='input-wrapper'>
                                <Label for="name">Company</Label>
                                <Input
                                    type="text"
                                    name="company"
                                    id="company"
                                    onChange={(e) => this.change(e)} />
                            </FormGroup>

                            <FormGroup className='input-wrapper'>
                                <Label for="name">Database</Label>
                                <Input
                                    type="text"
                                    name="database"
                                    id="database"
                                    onChange={(e) => this.change(e)} />
                            </FormGroup>

                            <FormGroup className='input-wrapper'>
                                <Label for="">Number of errors</Label>
                                <Input
                                    type="number"
                                    name="numberOfErrors"
                                    id="n_errors"
                                    onChange={(e) => this.change(e)} />
                            </FormGroup>

                            <FormGroup className='input-wrapper'>
                                <Label for="exampleText">Comment</Label>
                                <Input type="textarea" name="comment" id="exampleText"
                                    onChange={(e) => this.change(e)}
                                />
                            </FormGroup>
                            <FormGroup className='input-wrapper'>
                                <Label for="exampleFile">Report Files</Label>
                                <Input type="file" name="reportFiles" multiple
                                    onChange={this.onFileChange}
                                />
                                {/* onChange={(e) => this.changeFile(e)} */}

                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" style={{ fontSize: '1.5rem', padding: '.6rem 1.3rem' }} onClick={(e) => this.onSubmit(e)}>
                            Save
                            <Spinner
                                color='light'
                                style={{
                                    width: '1.6rem',
                                    height: '1.6rem',
                                    display: this.props.addReportState.loading,
                                    marginLeft: '2.4rem',
                                }}
                                size=''
                                children=''
                            />
                        </Button>
                        <Button color="warning" style={{ fontSize: '1.5rem', padding: '.6rem 1.3rem' }} onClick={this.props.onClick}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        addReportState: state.addReport
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addReportAction: (data) => dispatch(addReportAction(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddReport);
