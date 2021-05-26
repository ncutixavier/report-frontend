import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Alert, Modal, ModalHeader, ModalFooter, Progress } from 'reactstrap';
import { connect } from 'react-redux';
import { reportAction } from '../redux/actions/reportAction';
import AddReport from './AddReport'
import '../assets/scss/index.scss';

export class Report extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showHide: false,
            showAdd: false,
            doc: ''
        }
        this.handleLogout = this.handleLogout.bind(this);
        this.handleModalShowAdd = this.handleModalShowAdd.bind(this);
    }

    handleModalShowHide(doc) {
        this.setState({ showHide: !this.state.showHide })
        this.setState({ doc: doc })
    }

    handleModalShowAdd() {
        this.setState({ showAdd: !this.state.showAdd })
    }

    componentDidMount() {
        this.props.reportAction();
    }

    handleLogout() {
        localStorage.clear();
        this.props.history.push('/login');
    }

    render() {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem("role");

        if (token)
            return (
                <div>
                    <div className='report-navbar'>
                        <h2 className='title'>Error Handling</h2>
                        <div className='items'>
                            {role === 'admin' ? (
                                <Button color='primary' onClick={this.handleModalShowAdd}>Add Report</Button>
                            ) : ''}

                            <Button outline color='danger' onClick={this.handleLogout}>
                                Logout
              </Button>
                        </div>
                    </div>
                    <Container className='mt-2 report-container'>
                        <Modal isOpen={this.state.showHide}>
                            <ModalHeader>Report</ModalHeader>
                            <embed
                                src={this.state.doc}
                                type=''
                                width="100%"
                                height='500'
                            />
                            <ModalFooter>
                                <Button color="primary" onClick={() => this.handleModalShowHide()}>Close</Button>
                            </ModalFooter>
                        </Modal>
                        <Row>
                            {this.props.getReports.loading === 'block' ? (
                                <Progress animated color="danger" value="100" />
                            ) : this.props.getReports.error ? (
                                <Alert color='danger'>
                                    Error occured while retrieving Reports
                                </Alert>
                            ) : this.props.getReports.items.data ? (
                                this.props.getReports.items.data.map((report, i) => (
                                    <Col md={6} sm={12} className='p-5' key={i}>
                                        <div className='report'>
                                            <div className='d-flex align-items-start'>
                                                <div className='icon'>
                                                    <svg
                                                        xmlns='http://www.w3.org/2000/svg'
                                                        width='16'
                                                        height='16'
                                                        fill='currentColor'
                                                        className='bi bi-building'
                                                        viewBox='0 0 16 16'
                                                    >
                                                        <path
                                                            fillRule='evenodd'
                                                            d='M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022zM6 8.694 1 10.36V15h5V8.694zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15z'
                                                        />
                                                        <path d='M2 11h1v1H2v-1zm2 0h1v1H4v-1zm-2 2h1v1H2v-1zm2 0h1v1H4v-1zm4-4h1v1H8V9zm2 0h1v1h-1V9zm-2 2h1v1H8v-1zm2 0h1v1h-1v-1zm2-2h1v1h-1V9zm0 2h1v1h-1v-1zM8 7h1v1H8V7zm2 0h1v1h-1V7zm2 0h1v1h-1V7zM8 5h1v1H8V5zm2 0h1v1h-1V5zm2 0h1v1h-1V5zm0-2h1v1h-1V3z' />
                                                    </svg>
                                                </div>
                                                <div className=''>
                                                    <h1 className=''>{report.company}</h1>
                                                    <div className='errors'>
                                                        {report.number_of_errors} Errors
                                                    </div>
                                                    <div className='comment'>{report.comment}</div>
                                                    <div className='report-doc'>
                                                        <div className='doc' onClick={() => this.handleModalShowHide(report.report_file[0])}>
                                                            <div className='icon'>
                                                                <svg
                                                                    xmlns='http://www.w3.org/2000/svg'
                                                                    width='16'
                                                                    height='16'
                                                                    fill='currentColor'
                                                                    className='bi bi-card-text'
                                                                    viewBox='0 0 16 16'
                                                                >
                                                                    <path d='M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z' />
                                                                    <path d='M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z' />
                                                                </svg>
                                                            </div>
                                                            <p className=''>Summary</p>
                                                        </div>
                                                        <div className='doc' onClick={() => this.handleModalShowHide(report.report_file[1])}>
                                                            <div className='icon'>
                                                                <svg
                                                                    xmlns='http://www.w3.org/2000/svg'
                                                                    width='16'
                                                                    height='16'
                                                                    fill='currentColor'
                                                                    className='bi bi-list-task'
                                                                    viewBox='0 0 16 16'
                                                                >
                                                                    <path
                                                                        fillRule='evenodd'
                                                                        d='M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5H2zM3 3H2v1h1V3z'
                                                                    />
                                                                    <path d='M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9z' />
                                                                    <path
                                                                        fillRule='evenodd'
                                                                        d='M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5V7zM2 7h1v1H2V7zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5H2zm1 .5H2v1h1v-1z'
                                                                    />
                                                                </svg>
                                                            </div>
                                                            <p className=''>List of errors</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                ))
                            ) : (
                                'Loading.............'
                            )}

                        </Row>
                    </Container>
                    <AddReport
                        isOpen={this.state.showAdd}
                        onClick={() => this.handleModalShowAdd()}
                    />
                </div>
            );
        else
            return (
                <Container>
                    <Row className='login-form'>
                        <Col md={4} sm={12} className='login-form-container'>
                            <div className='access'>
                                <div className='access-title'>Unauthorized Access.</div>
                                <Link to='/login'>Login to get access</Link>
                            </div>
                        </Col>
                    </Row>
                </Container>
            );
    }
}

const mapStateToProps = (state) => {
    return {
        getReports: state.getReports,
    };
};

export default connect(mapStateToProps, { reportAction })(Report);
