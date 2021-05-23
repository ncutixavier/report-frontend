import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    FormFeedback,
    Spinner,
} from 'reactstrap';
import { connect } from 'react-redux';
import { loginAction } from '../redux/actions/loginAction';
import { withRouter } from 'react-router-dom';
import '../assets/scss/index.scss';

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            email: '',
            passwordError: '',
            emailError: '',
            passwordErrorStatus: false,
            emailErrorStatus: false,
        };
    }

    change = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    validate = () => {
        let isError = false;
        const errors = {
            passwordError: '',
            emailError: '',
            passwordErrorStatus: false,
            emailErrorStatus: false,
        };

        if (this.state.email.length === 0) {
            isError = true;
            errors.emailErrorStatus = true;
            errors.emailError = 'Email is required!';
        }

        if (this.state.email.indexOf('@') === -1) {
            isError = true;
            errors.emailErrorStatus = true;
            errors.emailError = 'Provide a valid email';
        }
        if (this.state.password.length === 0) {
            isError = true;
            errors.passwordErrorStatus = true;
            errors.passwordError = 'Password is required!';
        }
        this.setState({
            ...this.state,
            ...errors,
        });
        return isError;
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const error = this.validate();
        if (!error) {
            const send = {
                email: this.state.email,
                password: this.state.password,
            };
            await this.props.loginAction(send, this.props.history);
        }
    };

    render() {
        return (
            <Container>
                <Row className='login-form'>
                    <div className='display-2 text-center'>ISHYIGA ERROR HANDLING</div>
                    <Col md={4} sm={12} className='login-form-container'>
                        <div className="error">{this.props.loginState.error}</div>
                        <h1>Login</h1>
                        <Form onSubmit={(e) => this.handleSubmit(e)}>
                            <FormGroup className='input-wrapper'>
                                <Label for='exampleEmail'>Email</Label>
                                <Input
                                    type='email'
                                    name='email'
                                    placeholder='Email'
                                    value={this.state.email}
                                    onChange={(e) => this.change(e)}
                                    invalid={this.state.emailErrorStatus}
                                />
                                <FormFeedback>{this.state.emailError}</FormFeedback>
                            </FormGroup>
                            <FormGroup className='input-wrapper'>
                                <Label for='examplePassword'>Password</Label>
                                <Input
                                    type='password'
                                    name='password'
                                    placeholder='Password'
                                    value={this.state.password}
                                    onChange={(e) => this.change(e)}
                                    invalid={this.state.passwordErrorStatus}
                                />
                                <FormFeedback>{this.state.passwordError}</FormFeedback>
                            </FormGroup>

                            <Button color='primary' className='send-btn' block>
                                <span>Login</span>
                                <Spinner
                                    color='light'
                                    style={{
                                        width: '1.6rem',
                                        height: '1.6rem',
                                        marginLeft: '2.4rem',
                                        visibility: this.props.loginState.loading,
                                    }}
                                    size=''
                                    children=''
                                />
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loginState: state.login,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginAction: (data, history) => dispatch(loginAction(data, history)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
