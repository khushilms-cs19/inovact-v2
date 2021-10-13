import React, { useEffect, useState } from 'react'
import LeftNavBar from './components/leftnav/LeftNavBar'
import CreatePost from './components/center/CreatePost'
import RightNavBar from 'components/application/components/feed/components/rightnav/RightNavBar'
import Post from './components/center/Post'
import { postData } from './components/center/postData'
import UploadProject from './components/modals/UploadProject/UploadProject';
import UploadIdea from './components/modals/UploadIdea/UploadIdea'
import UploadThought from './components/modals/UploadThought/UploadThought'
import CreateTeam from './components/modals/CreateTeam/CreateTeam'
import ViewTeamMembers from './components/modals/ViewTeamMembers/ViewTeamMembers'
import RequestToJoin from './components/modals/RequestToJoin.tsx/RequestToJoin'
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SortByDropdown from 'components/application/components/feed/components/SortByDropdown';
import useRequests from 'useRequest/useRequest'
import Spinner from 'components/application/Spinner'
import { handleAddIdeaChange, handleAddProjectChange, handleAddThoughtChange } from 'StateUpdateHelper'
import { userInfo } from 'os'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'

function Feed() {
    //userPool.getCurrentUser(); console log to see the idtoken
    const [posts, setPosts] = useState<postData[]>([]);
    const [ideas, setIdeas] = useState<postData[]>([]);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const userInfo = useSelector((state: any)=>state.userInfo);
    const history = useHistory();
    const convertDate = (dateISO: any)=>{
        const date = new Date(dateISO);
        return `${date.getDate()} ${months[date.getMonth()]}`
    }
    const {doRequest, errors} = useRequests({
        route: "post",
        method: "get",
        body: null,
        onSuccess: (data: any)=>{
            console.log(data);
            data.data.project.reverse();
            setPosts([...posts,...data.data.project.map((post: any)=>({
                id: post.id,
                title: post.title,
                description: post.description,
                type: 1,
                avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
                author: 'Jane Doe',
                tags: post.project_tags.map((tag: any)=>{
                    return tag.hashtag.name;
                }),
                images: post.project_documents.map((image: any)=>{
                    console.log(image.url);
                    return image.url;
                }),
                time: convertDate(post.created_at),
                numLikes: 250,
                numComments: 250,
                }))]);
                // window.location.reload();
        }
    });
    const {doRequest: doRequestIdea, errors: errorsIdea} = useRequests({
        route: "idea",
        method: "get",
        body: null,
        onSuccess: (data: any)=>{
            data.data.idea.reverse();
            console.log("on success of ideas");
            setIdeas([...ideas,...data.data.idea.map((post: any)=>({
                id: post.id,
                title: post.title,
                description: post.description,
                type: 2,
                avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
                author: 'Jane Doe',
                tags: post.idea_tags.map((tag: any)=>{
                    return tag.hashtag.name;
                }),
                images: post.idea_documents.map((image: any)=>{
                    console.log(image.url);
                    return image.url;
                }),
                time: convertDate(post.created_at),
                numLikes: 250,
                numComments: 250,
                }))]);
                // window.location.reload();
        }
    });
    useEffect(()=>{
        (async ()=>{
            await doRequest();
            await doRequestIdea();
        })();
        if(!(userInfo.profile_complete)){
            history.push("/userinfo");
        }
    },[])
    const [showFilter, setShowFilter] = useState(false);

    const [showOverlay, setShowOverlay] = useState(false);
    const [showUploadProject, setShowUploadProject] = useState(false);
    const [showUploadIdea, setShowUploadIdea] = useState(false);
    const [showUploadThought, setShowUploadThought] = useState(false);
    const [showCreateTeam, setShowCreateTeam] = useState(false);
    const [showTeamMembers, setShowTeamMembers] = useState(false);
    const [showRequestJoin, setShowRequestJoin] = useState(false);
    const [currentFilter, setCurrentFilter] = useState("All");

    const handleChangeFilter = (event:any)=>{
        const filterOption = event.target.getAttribute("data-value");
        setCurrentFilter(filterOption);
        setShowFilter(false);
    }
    const openModal = ()=>{
        setShowOverlay(true);
        window.scrollTo(0,0);
        document.body.style.overflowY="hidden";
    }
    const closeModal = ()=>{
        setShowOverlay(false);
        setShowUploadProject(false);
        setShowUploadIdea(false);
        setShowUploadThought(false);
        setShowCreateTeam(false);
        setShowTeamMembers(false);
        setShowRequestJoin(false);
        handleAddIdeaChange("idea_clear_data","");
        handleAddProjectChange("project_clear_data","");
        handleAddThoughtChange("thought_clear_data","null");
        document.body.style.overflowY="scroll";
    }
    
    const uploadProject = ()=>{
        openModal();
        setShowUploadProject(true);
    }
    const uploadIdea = ()=>{
        openModal();
        setShowUploadIdea(true);
    }
    const uploadThought = ()=>{
        openModal();
        setShowUploadThought(true);
    }
    const createTeam = ()=>{
        openModal();
        setShowCreateTeam(true);
    }

    const viewTeamMembers = ()=>{
        openModal();
        setShowTeamMembers(true);
    }

    const viewRequestJoin = ()=>{
        openModal();
        setShowRequestJoin(true);
    }
    const handleFilterShow = () => {
        setShowFilter(!showFilter);
    }
    return (
        <div>
            {
                showOverlay &&
                <div>
                    <div className="modal_overlay" onClick={closeModal}></div>
                    {
                        showUploadProject &&
                        <div>
                            <UploadProject closeModal={closeModal}/>
                        </div>
                        }

                        {
                            showUploadIdea &&
                            <div>
                                <UploadIdea closeModal={closeModal}/>
                            </div>
                        }

                        {
                            showUploadThought && 
                            <div>
                                <UploadThought closeModal={closeModal}/>
                            </div>
                        }
                        {
                            showCreateTeam &&
                            <div>
                                <CreateTeam closeModal={closeModal}/>
                            </div>
                        }
                        {
                            showTeamMembers && 
                            <div>
                                <ViewTeamMembers closeModal={closeModal}/>
                            </div>
                        }
                        {
                            showRequestJoin && 
                            <div>
                                <RequestToJoin closeModal={closeModal}/>
                            </div>
                        }
                </div>
                
            }

            <div className="feed__content">
                <div className="feed__content__left">
                    <LeftNavBar openCreateTeam={createTeam}/>
                </div>
                <div className="feed__content__center">
                    <CreatePost openProject={uploadProject} openIdea={uploadIdea} openThought={uploadThought} />
                    <div className="sort">                    
                    <div className="line-separation">   
                        <hr  className="line-separation-line" style={{}}/>
                        <div onMouseLeave={()=>{
                            setTimeout(()=>{
                                setShowFilter(false);
                            }, 300);
                        }}>
                    <span>Sort by:  <label onClick={handleFilterShow}>{`${currentFilter}`}<span>{showFilter ? <ExpandLessIcon />: <ExpandMoreIcon/>}</span></label></span>
                    {
                        showFilter &&
                            <SortByDropdown />
                    }
                </div>
            </div>
            </div>
                    {posts.concat(ideas).map((post, idx) => {
                        return <Post key={idx} post={post} openTeamMember={viewTeamMembers} openRequestJoin={viewRequestJoin}/>
                    })}
                    <Spinner/>
                </div>
                <div className="feed__content__right">
                    <RightNavBar />
                </div>
            </div>
        </div>
        
    )
}

export default Feed;
