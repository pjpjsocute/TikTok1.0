import React, { useState, useEffect } from "react";
import Video from "./Video";
import "./App.css";
// import data from './videos.json';
import axios from 'axios';
import { Carousel, WingBlank } from 'antd-mobile';
function App() {
    const [videos, setVideos] = useState([{data:[]}]);
    const getVideo = ()=>{
        axios.post('https://qcfxp9.fn.thelarkcloud.com/getVideos').then(
            response =>{
                console.log("连接成功")
                const {res} = response.data;
                setVideos(res.map(v=>{
                    return JSON.parse(v)
                }))
            },
        ).catch(error =>{alert("连接失败"+error)})
    }
    useEffect(()=>{
        getVideo()
    },[])
    return (
        // BEM
        <WingBlank className="app">
            <Carousel
                autoplay={false}
                vertical
                infinite
                dots = {false}
            >
                {videos.map(
                    ({
                         id: id, username: username,
                         description: description,hashtags,soundName, videoURL,likeCount,  commentCount, shareCount, liked }) => {
                        return (
                            <div className="app__videos">
                                <Video key={id}
                                       url={videoURL}
                                       channel={username}
                                       song={soundName}
                                       likes={likeCount}
                                       messages={commentCount}
                                       description={description}
                                       shares={shareCount}
                                />
                            </div>
                        );
                    }
                )}

            </Carousel>
        </WingBlank>
    );
}
export default App;

