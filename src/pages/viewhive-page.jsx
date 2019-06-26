import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {viewHiveByTitle, joinHive, leaveHive} from '../actions/hives';
import QuickViewPost from '../components/posts/quickview-post';
import slugify from 'slugify';

export class ViewHivePage extends React.Component {
    constructor(props){
        super(props);
        this.joinHive = this.joinHive.bind(this)
        this.leaveHive = this.leaveHive.bind(this)
    }


    componentDidMount(){
        window.scrollTo(0, 0);
        this.props.dispatch(viewHiveByTitle(this.props.match.params.title))
    }

    joinHive(){
        return this.props.dispatch(joinHive(this.props.view))
    }

    leaveHive(){
        return this.props.dispatch(leaveHive(this.props.view))
    }


    render(){
        const hive = this.props.view;
        const posts = this.props.view.posts.map((post, index) => {
           return <QuickViewPost 
                    id={post._id}  
                    key={index} 
                    title={post.title} 
                    author={post.author} 
                    hive={post.hive.title} 
                    comments={post.comments.length} 
                    tags={post.tags}
                    ratings={post.ratings}
                    body={post.body} 
                    />
        });
        const members = hive.members.length;

        const joinButton = () => {
            if(this.props.auth.currentUser !== null){

            if(hive.members.includes(this.props.auth.currentUser.id)){
                return <button onClick={this.leaveHive}>Leave</button>
            } else {
                return <button onClick={this.joinHive}>Join</button>
            }
            }
        }

        return (
            <div className="viewHive">
                <h2>{hive.title}</h2>
                <h3>{hive.mission}</h3>
                <p>Founder: {hive.founder}</p>
                <p>Members: {members}</p>
                {joinButton()}
                <Link to={`/posts/create/${hive.id}`}>Create Post</Link>
                {posts}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        view: state.hive,
        user: state.userProfile,
        auth: state.auth
    };
};

export default connect(mapStateToProps)(ViewHivePage);