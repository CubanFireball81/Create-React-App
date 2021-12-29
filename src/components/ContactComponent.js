import React, { Component } from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Col,
    FormFeedback
} from 'reactstrap'

import { Link } from 'react-router-dom'

class Contact extends Component {
    constructor(props) {
        super(props);
        // Initialize field values to empty sting, and track "touched" fields as a boolean
        this.state = {
            firstName: '',
            lastName: '',
            phoneNum: '',
            email: '',
            agree: false,
            contactType: 'By Phone',
            feedback: '',
            touched: {
                firstName: false,
                lastName: false,
                phoneNum: false,
                email: false
            }
        };

        //Binding 'this' to Event Handlers that handle Form input changes and Form submission
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //Form Validation using validate method
    validate(firstName, lastName, phoneNum, email) {

        // Errors object that will hold the error messages for any of the fields if the data does not meet the criteria. Each initialized to an empty string, which means no errors as an empty string returns boolean false.
        const errors = {
            firstName: '',
            lastName: '',
            phoneNum: '',
            email: ''
        };

        //Checks if entered data meets criteria of being more than 2 AND less than 15 characters long
        if (this.state.touched.firstName) {
            if (firstName.length < 2) {
                errors.firstName = 'First name must be at least 2 characters.';
            } else if (firstName.length > 15) {
                errors.firstName = 'First name must be 15 or less characters.';
            }
        }

        //Checks if entered data meets criteria of being more than 2 AND less than 15 characters long
        if (this.state.touched.lastName) {
            if (lastName.length < 2) {
                errors.lastName = 'Last name must be at least 2 characters.';
            } else if (lastName.length > 15) {
                errors.lastName = 'Last name must be 15 or less characters.';
            }
        }

        // Use Regex to confirm the User entered data only contains digits for the phoneNum input field
        const reg = /^\d+$/;
        if (this.state.touched.phoneNum && !reg.test(phoneNum)) {
            errors.phoneNum = 'The phone number should contain only numbers.';
        }

        //If email field is "touched", ensure the email includes an "@"
        if (this.state.touched.email && !email.includes('@')) {
            errors.email = 'Email should contain a @';
        }

        //Serves smoked Gouda on Rosemary Triscuits along with a nice Merlot 
        return errors;
    }

    // Event Handler for "touched" / User interacted with fields, built with arrow function so no need to bind .this to event handler
    handleBlur = field => () => {
        //setState is used to change the "touched" object
        this.setState({
            //Instead of changing the object as a whole, we are only updating the changed properties inside the object
            touched: { ...this.state.touched, [field]: true }
        });
    }

    //Event Handler that collects and stores information about the event
    handleInputChange(event) {
        //Stores property of event target for easy access
        const target = event.target;
        //Stores property of event name for easy access
        const name = target.name;
        //Stores property of target type, either checked if checkbox type, or the value if not a checkbox type
        const value = target.type === 'checkbox' ? target.checked : target.value;

        //Set the property based on the target's name, dynamically
        this.setState({
            [name]: value
        });
    }

    //For now, alert and console.log Form data
    handleSubmit(event) {
        //Use JSON.stringify to turn JavaScript object data into a string
        console.log('Current state is: ' + JSON.stringify(this.state));
        alert('Current state is: ' + JSON.stringify(this.state));
        event.preventDefault();
    }

    render() {
        //Variable to hold the result of calling the validate method on each of the values stored in state. Validate method will be called for every change of the fields.
        const errors = this.validate(
            this.state.firstName,
            this.state.lastName,
            this.state.phoneNum,
            this.state.email
        )

        return (
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <Link to='/home'>Home</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>Contact Us</h2>
                        <hr />
                    </div>
                </div>
                <div className='row row-content align-items-center'>
                    <div className='col-sm-4'>
                        <h5>Our Address</h5>
                        <address>
                            1 Nucamp Way
                            <br />
                            Seattle, WA 98001
                            <br />
                            U.S.A.
                        </address>
                    </div>
                    <div className='col'>
                        <a role='button' className='btn btn-link' href='tel:+12065551234'>
                            <i className='fa fa-phone' /> 1-206-555-1234
                        </a>
                        <br />
                        <a
                            role='button'
                            className='btn btn-link'
                            href='mailto:fakeemail@fakeemail.co'
                        >
                            <i className='fa fa-envelope-o' /> campsites@nucamp.co
                        </a>
                    </div>
                </div>
                <div className='row row-content'>
                    <div className='col-12'>
                        <h2>Send us your Feedback</h2>
                        <hr />
                    </div>
                    <div className='col-md-10'>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label htmlFor="firstName" md={2}>First Name</Label>
                                <Col md={10}>
                                    <Input type="text" id="firstName" name="firstName"
                                        placeholder="First Name"
                                        value={this.state.firstName}
                                        //Boolean value that tracks if there is an error message for this field or not
                                        invalid={errors.firstName}
                                        // Event handler that fires if user interacts/"touches" with the field
                                        onBlur={this.handleBlur("firstName")}
                                        onChange={this.handleInputChange} />
                                    <FormFeedback>{errors.firstName}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="lastName" md={2}>Last Name</Label>
                                <Col md={10}>
                                    <Input type="text" id="lastName" name="lastName"
                                        placeholder="Last Name"
                                        value={this.state.lastName}
                                        //Boolean value that tracks if there is an error message for this field or not
                                        invalid={errors.lastName}
                                        // Event handler that fires if user interacts/"touches" with the field
                                        onBlur={this.handleBlur("lastName")}
                                        onChange={this.handleInputChange} />
                                    <FormFeedback>{errors.lastName}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="phoneNum" md={2}>Phone</Label>
                                <Col md={10}>
                                    <Input type="tel" id="phoneNum" name="phoneNum"
                                        placeholder="Phone number"
                                        value={this.state.phoneNum}
                                        //Boolean value that tracks if there is an error message for this field or not
                                        invalid={errors.phoneNum}
                                        // Event handler that fires if user interacts/"touches" with the field
                                        onBlur={this.handleBlur("phoneNum")}
                                        onChange={this.handleInputChange} />
                                    <FormFeedback>{errors.phoneNum}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Input type="email" id="email" name="email"
                                        placeholder="Email"
                                        value={this.state.email}
                                        //Boolean value that tracks if there is an error message for this field or not
                                        invalid={errors.email}
                                        // Event handler that fires if user interacts/"touches" with the field
                                        onBlur={this.handleBlur("email")}
                                        onChange={this.handleInputChange} />
                                    <FormFeedback>{errors.email}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{ size: 4, offset: 2 }}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                type='checkbox'
                                                name='agree'
                                                checked={this.state.agree}
                                                onChange={this.handleInputChange}
                                            />{' '}
                                            <strong>May we contact you?</strong>
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <Input
                                        type='select'
                                        name='contactType'
                                        value={this.state.contactType}
                                        onChange={this.handleInputChange}
                                    >
                                        <option>By Phone</option>
                                        <option>By Email</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor='feedback' md={2}>
                                    Your Feedback
                                </Label>
                                <Col md={10}>
                                    <Input
                                        type='textarea'
                                        id='feedback'
                                        name='feedback'
                                        rows='12'
                                        value={this.state.feedback}
                                        onChange={this.handleInputChange}
                                    ></Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{ size: 10, offset: 2 }}>
                                    <Button type='submit' color='primary'>
                                        Send Feedback
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;
