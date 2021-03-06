import React from 'react';
import { connect } from 'react-redux';
import LoadingMessage from '../components/loading-message';
import {browseHives} from '../actions/hives';
import QuickViewHive from '../components/hives/quickview-hive';
import './home-page.css';

export class HomePage extends React.Component {
    constructor(props){
        super(props);
        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
        this.state = {
            page: 1,
            moreItems: true
        }
    }


    componentDidMount() {
        this.props.dispatch(browseHives(this.state.page));
    }

    nextPage(){
        if((this.props.browse.totalHives / 10) > this.state.page){
            this.setState({page: this.state.page + 1});
            return this.props.dispatch(browseHives(this.state.page + 1))
        }

    }

    prevPage(){
        if(this.state.page > 1){
            this.setState({page: this.state.page - 1})
            return this.props.dispatch(browseHives(this.state.page - 1))
        }
    }

    render(){

        const hives = this.props.browse.hives.map((hive, index) => {
            return <QuickViewHive 
                    id={hive.id} 
                    key={index} 
                    title={hive.title} 
                    mission={hive.mission} 
                    members={hive.members} 
                    posts={hive.posts} 
                    />
        });

        const backButton = () => {
            if(this.props.browse.currentPage > 1){
                return <button onClick={this.prevPage}>Back</button> 
            }
        }

        const nextButton = () => {
            if(this.props.browse.currentPage < this.props.browse.pages){
                return <button onClick={this.nextPage}>Next</button>
            }
        }

        return (
            <div className="home-page-container">
                <LoadingMessage loading={this.props.browse.loading} />
                {hives}
                <p>Page {this.props.browse.currentPage}/{this.props.browse.pages}</p>
                {backButton()}
                {nextButton()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        browse: state.hives,
        view: state.post
    };
};

export default connect(mapStateToProps)(HomePage);