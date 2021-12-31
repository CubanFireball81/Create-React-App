import React, { Component } from 'react';
import { Button, Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Label, Modal, ModalHeader } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';


const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalOpen: false,
            touched: {
                firstName: false,
                lastName: false,
                phoneNum: false,
                email: false
            }
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleBlur = field => () => {
        //setState is used to change the "touched" object
        this.setState({
            //Instead of changing the object as a whole, we are only updating the changed properties inside the object
            touched: { ...this.state.touched, [field]: true }
        });
    }

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

    handleSubmit(values) {
        //Use JSON.stringify to turn JavaScript object data into a string
        console.log('Current state is: ' + JSON.stringify(values));
        alert('Current state is: ' + JSON.stringify(values));
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    render() {

        return (
            <div>
                <div>
                    <Button outline className="fa-lg fa fa-pencil" onClick={this.toggleModal}>Submit Comment</Button>
                </div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        Submit Comment
                    </ModalHeader>
                    <LocalForm onSubmit={values => this.handleSubmit(values)}>
                        <div className='form-group'>
                            <Label htmlFor="rating">Rating:</Label>
                            <Control.select model=".rating" name="rating" id="rating"
                                className="form-control">
                                <option>Select a rating....</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </Control.select>
                        </div>
                        <div className='form-group'>
                            <Label htmlFor="author">Your Name:</Label>
                            <Control.text model=".author" name="author" id="author" placeholder="Enter your name here" className="form-control" validators={{
                                required,
                                minLength: minLength(2),
                                maxLength: maxLength(15)
                            }}
                            />
                            <Errors
                                className="text-danger"
                                model=".author"
                                show="touched"
                                component="div"
                                messages={{
                                    required: 'Required',
                                    minLength: 'Must be at least 2 characters',
                                    maxLength: 'Must be 15 characters or less'
                                }}
                            />
                    </div>
                    <div className='form-group'>
                        <Label htmlFor="text" rows="6">Comment:</Label>
                        <Control.textarea model=".text" name="text" id="text"
                            className="form-control">
                        </Control.textarea>
                    </div>
                    <div className="form-group">
                        <Button type="submit" color="primary">
                            Submit
                        </Button>
                    </div>
                </LocalForm>
            </Modal>
            </div >
        )
    }
}

function RenderCampsite({ campsite }) {
    return (
        <div className='col-md-5 m-1'>
            <Card>
                <CardImg top src={campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
        </div>
    )
}

function RenderComments({ comments }) {
    if (comments) {
        return (
            <div className='col-md-5 m-1'>
                <h4>Comments</h4>
                {comments.map(comment => {
                    return (
                        <div key={comment.id}>
                            <p>
                                {comment.text}
                                <br />
                                -- {comment.author},{' '}
                                {new Intl.DateTimeFormat('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: '2-digit'
                                }).format(new Date(Date.parse(comment.date)))}
                            </p>
                        </div>
                    )
                })}
                <div>
                    <CommentForm />
                </div>
            </div>
        )
    }
    return <div />
}

function CampsiteInfo(props) {
    if (props.campsite) {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/directory'>Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>
                            {props.campsite.name}
                        </h2>
                        <hr />
                    </div>
                </div>
                <div className='row'>
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        );
    }
    return <div />
}

export default CampsiteInfo
