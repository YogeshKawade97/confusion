import { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
// import Contact from './ContactComponent';
import ContactRedux from './ContactReduxComponent';
import About from './AboutComponent';
import DishDetails from './DishDetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addComment } from '../redux/ActionCreators';

const mapStateToProps = (state) => {
  return {
    dishes    : state.dishes,
    comments  : state.comments,
    promotions: state.promotions,
    leaders   : state.leaders
  }
}

const mapDispatchToProps = (dispatch) => ({
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment))
})

class Main extends Component {

  render() {

    const HomePage = () => {
        return (
            <Home dish={this.props.dishes.filter((dish) => dish.featured)[0]} 
                promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
                leader={this.props.leaders.filter((leader) => leader.featured)[0]}
            />
        )
    }

    const DishWithId = ({ match }) => {
        return(
            <DishDetails dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
                comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
                addComment={this.props.addComment}
            />
        );
    }

    return (
      <div>
        <Header />
        <Switch>
            <Route path="/home" component={HomePage} />
            <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} /> } />
            <Route path="/menu/:dishId" component={DishWithId} />
            <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders} />} />
            <Route exact path="/contactus" component={ContactRedux} />
            <Redirect to="/home" component={HomePage} />            
        </Switch>
        <Footer />
        {/* <Menu dishes={this.state.dishes} 
            onClick={(dishId) => this.onDishSelect(dishId)} />
        <DishDetails dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]}/> */}
        
      </div>
    );
  }  
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));