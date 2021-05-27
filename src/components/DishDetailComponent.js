import React, { useState } from 'react';
import  { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import CommentForm from '../components/CommentFormComponent';

function RenderDish({dish}) {
    
    if(dish != null) {
        // const comments = <div className="col-12 col-md-5 m-1">
        //                     <Card>
        //                         <h4>Comments</h4>
        //                         {comment.map((comment) => {
        //                             return (
        //                                 <div key={comment.id}>
        //                                     <CardBody>{comment.comment}</CardBody>
        //                                     <p>--{comment.author}, {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
        //                                 </div>
        //                             )
        //                         })}
        //                         <Button outline onClick={handleAddcomment}>
        //                             <span className="fa fa-sign-in fa-lg"></span> Add Comment
        //                         </Button>
        //                         <Modal isOpen={show} toggle={handleclose}>
        //                             <ModalHeader>Comment</ModalHeader>
        //                             <ModalBody>
        //                                 <CommentForm onSubmit={handleComment}/>
        //                             </ModalBody>
        //                         </Modal>     
        //                     </Card>
        //                 </div>;

        return(
            <div key={dish.id} className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />                        
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        )
    } else {
        return(
            <div></div>
        );
    }
}

function RenderComments({comments, addComment, dishId}) {
    if(comments != null) {
        return (
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {comments.map((comment) => {
                        return (
                            <li key={comment.id}>
                                <p>{comment.comment}</p>
                                <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                            </li>
                        )
                    })}
                </ul>
                <CommentForm dishId={dishId} addComment={addComment} />
            </div>
        )        
    } else {
        return(
            <div></div>
        );
    }
}



const DishDetails = (props) => {
    if(props.dish != null) {
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish={props.dish} comments={props.comments} />
                    <RenderComments comments={props.comments} 
                        addComment={props.addComment}
                        dishId={props.dishId}    
                    />
                </div>
            </div>            
        );
    } else {
        return (
            <div></div>
        );
    }
}

export default DishDetails;