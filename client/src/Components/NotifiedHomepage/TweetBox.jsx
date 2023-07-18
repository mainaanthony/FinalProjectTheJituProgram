import React, {useState} from 'react'
import './TweetBox.css'
import axios from "axios";
import { Avatar,Button} from "@mui/material"
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {MdVideoLibrary} from 'react-icons/md'
import {MdAddAPhoto} from 'react-icons/md'







function TweetBox() {

  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState(null);
  const [tweetVideo, setTweetVideo] = useState(null);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setTweetImage(file);
    console.log('first')
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setTweetVideo(file);
  };

  const sendTweet = async (e) => {
    e.preventDefault();

    // Handle image and video upload logic here
    let imageUploadUrl = null;
    let videoUploadUrl = null;

    if (tweetImage) {
      const imageData = new FormData();
      imageData.append("file", tweetImage);
      imageData.append("upload_preset", "klrwk6mq");
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/drrjox72d/image/upload",
        imageData
      );
      imageUploadUrl = response.data.secure_url;
      console.log(`${imageUploadUrl} Hello`)
    }



    



    if (tweetVideo) {
      const videoData = new FormData();
      videoData.append("file", tweetVideo);
      videoData.append("upload_preset", "klrwk6mq");
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/drrjox72d/video/upload",
        videoData
      );
      videoUploadUrl = response.data.secure_url;
      console.log(videoUploadUrl)
    }

    // Make API call to your endpoint
    const data = {
      PostText: tweetMessage,
      ImageUrl: imageUploadUrl,
      VideoUrl: videoUploadUrl,
    };
    const response = await axios.post(
      "http://localhost:5050/new/Post",
      data,
      {
        withCredentials: true,
      }
    );
    console.log(response)

    if (response.status === 201) {
      
     
      toast.success("Post created successfully!");
    } else {
      toast.error("Failed to create post.");
    }

    // Reset state
    setTweetMessage("");
    setTweetImage(null);
    setTweetVideo(null);
  };



  return (
    <div className="tweetBox">
    <ToastContainer/>
    
    <form onSubmit={sendTweet}>
      <div className="tweetBox__input">
        <Avatar src="" />
        <input
          onChange={(e) => setTweetMessage(e.target.value)}
          value={tweetMessage}
          placeholder="Share your post..."
          type="text"
          required
        />
      </div>
      <div className="tweetBox__options">
        <label htmlFor="tweet-image" className="tweetBox__option">
          <input
            id="tweet-image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
          <MdAddAPhoto className="tweetBox__optionIcon" />
          <span>Add Image</span>
        </label>
        <label htmlFor="tweet-video" className="tweetBox__option">
          <input
            id="tweet-video"
            type="file"
            accept="video/*"
            onChange={handleVideoChange}
            style={{ display: "none" }}
          />
          <MdVideoLibrary className="tweetBox__optionIcon" />
          <span>Add Video</span>
        </label>
      </div>

      <Button
    type="submit"
    className="tweetBox__tweetButton"
    disabled={tweetMessage.length === 0}
  >
        Post
      </Button>
      
    </form>
  </div>
  )
}

export default TweetBox
