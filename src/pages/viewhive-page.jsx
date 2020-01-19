import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {viewHiveByTitle, joinHive, leaveHive} from '../actions/hives';
import {FormatYear} from '../helpers/date-format';
import QuickViewPost from '../components/posts/quickview-post';
import LoadingMessage from '../components/loading-message';
import './viewhive-page.css'

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
        const estDate = FormatYear(hive.createdAt);
        const posts = this.props.view.posts.map((post, index) => {
           return <QuickViewPost 
                    id={post._id}  
                    key={index} 
                    title={post.title} 
                    author={post.author} 
                    hive={hive.title} 
                    comments={post.comments.length} 
                    tags={post.tags}
                    ratings={post.ratings}
                    body={post.body}
                    createdAt={post.createdAt} 
                    />
        });
        const members = hive.members.length;

        const joinButton = () => {
            if(this.props.auth.currentUser !== null){

            if(hive.members.includes(this.props.auth.currentUser.id)){
                return <button className="viewhive-page-leave-button" onClick={this.leaveHive}>Leave Hive</button>
            } else {
                return <button className="viewhive-page-join-button" onClick={this.joinHive}>Join Hive</button>
            }
            }
        }

        const editHiveLink = () => {
            if(this.props.auth.currentUser !== null){
                if(hive.monitors.includes(this.props.auth.currentUser.id)){
                    return <Link to={`/hives/edit/${hive.title}`}>EDIT</Link>
                }
            }
        }

        const deleteHiveButton = () => {
            if(this.props.auth.currentUser !== null){
                if(hive.monitors.includes(this.props.auth.currentUser.id)){
                    return <Link to={`/hives/delete/${hive.title}`}>DELETE</Link>
                }
            }
        }

        return (
            <div className="viewhive-page-container">
                <LoadingMessage loading={this.props.view.loading} />
                <div className="viewhive-page-hive-info-container">
                    <div className="viewhive-page-title-container">
                        <h2 className="viewhive-page-title">&#x2b21; {hive.title}</h2>
                        <p>est. {estDate}</p>
                    </div>
                    <div className="viewhive-page-info-container-row">
                        <p className="viewhive-page-mission-label">MISSION</p>
                        <h3>{hive.mission}</h3>
                    </div>
                    <div className="viewhive-page-info-container-row">
                        <p className="viewhive-page-mission-label">FOUNDER</p>
                        <Link className="viewhive-page-link" to={`/users/${hive.founder}`}><p>⬡ {hive.founder}</p></Link>                    
                    </div>

                    {joinButton()}
                    {editHiveLink()}
                    {deleteHiveButton()}
                    <p>Members: {members}</p>
                    <div className="viewhive-page-link-container">
                        <Link className="viewhive-page-link" to={`/posts/create/${hive.id}`}><p className="viewhive-page-link-text">+Create Post</p></Link>
                    </div>
                </div>    
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