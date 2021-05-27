import React, { Component } from 'react';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Button, Label, Col, Row, Modal, ModalBody, ModalHeader } from 'reactstrap';

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.toggleModal   = this.toggleModal.bind(this);
        this.handleSubmit   = this.handleSubmit.bind(this);

        this.state = {
            isNavOpen: false,
            isModalOpen: false
        };
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
        console.log('Current state is: ' + JSON.stringify(values));
    }
    render() {
        return(
            <div>
                <Button outline onClick={this.toggleModal} type="submit" value="submit">Add Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Col>
                                    <Label htmlFor="rating">Rating</Label>
                                    <Control.select model=".rating" name="rating" className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Label htmlFor="author">Your Name</Label>
                                    <Control.text model=".author" name="author" id="author" className="form-control"
                                        placeholder="Your Name"                                    
                                    />
                                </Col>
                            </Row>  
                            <Row className="form-group">
                                <Col>
                                    <Label htmlFor="comment">Comment</Label>                                
                                    <Control.textarea model=".comment" id="comment" name="comment" row="6" className="form-control"/>
                                </Col>
                            </Row>
                            <Button type="submit" className="bg-primary">
                                Submit
                            </Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
            // <Form onSubmit={ handleComment }>
            //     <FormGroup>
            //         <Label htmlFor="rating">Rating</Label>
            //         <Input type="text" id="rating" name="rating" value={rating} onChange={(e) => setRating(e.target.value)}/>
            //     </FormGroup>
            //     <FormGroup>
            //         <Label htmlFor="author">Author</Label>
            //         <Input type="text" id="author" name="author" value={author} onChange={(e) => setAuthor(e.target.value)}/>
            //     </FormGroup>
            //     <FormGroup>
            //         <Label htmlFor="comment" md={2}>Comment</Label>
            //         <Input type="textarea" id="comment" name="comment" row="12" value={comment} onChange={(e) => setComment(e.target.value)}/>
            //     </FormGroup>                
            // </Form>
        )
    }
}

export default CommentForm;
