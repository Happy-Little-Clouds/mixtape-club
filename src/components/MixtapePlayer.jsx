import React from 'react';
import ReactDOM from "react-dom";
import YouTube from 'react-youtube';
import TapeCoverImage from './TapeCoverImage.jsx';
import PlayerSongList from './PlayerSongList.jsx';
import UserMixtapesList from './UserMixtapes.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faForward, faBackward } from '@fortawesome/free-solid-svg-icons';
import { library, config } from '@fortawesome/fontawesome-svg-core'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { basename } from 'path';
import Concerts from '../components/Concerts.jsx'
import LisaFrankenstein from '../assets/img/tapes/lisa-frankenstein-tape.gif';

/** MixtapePlayer component is stateful and renders the entire mixtape-player route with it's child
 * componenets. It is a child component of Container.  Mixtape player also stores information about a
 * logged in user's playlists so that they can be rendered and played.
 */


class MixtapePlayer extends React.Component {
constructor(props){
    super(props);
    this.state = {
        player: null,
        playing: false,
        aSideLinks: ["fi33-cITS0s"],
        bSideLinks: ["H1Zm6E6Sy4Y"],
        interval: null,
        playListId: null || this.props.location,
        aSideTitles: ['Login to start making mixtapes of your own!'],
        bSideTitles: ['Login to start making mixtapes of your own!'],
        tapeCover: LisaFrankenstein,
        sidePlaying: ["fi33-cITS0s"],
        googleId: null || this.props.googleId,
        userPlaylists: [],
        tapeTitle: 'Operation Sparkle',
        currentSong: "",
        userName: '',
        currentPlaylistId: '',
        toggleLink: false,
        location: 'New Orleans'
    }
    
    this.getUserPlaylists()
    this.onReady = this.onReady.bind(this);
    this.onPlayVideo = this.onPlayVideo.bind(this);
    this.onPauseVideo = this.onPauseVideo.bind(this);
    this.onForward = this.onForward.bind(this);
    this.onStopForward = this.onStopForward.bind(this);
    this.onBackward = this.onBackward.bind(this);
    this.onStopBackward = this.onStopBackward.bind(this);
    this.onFlip = this.onFlip.bind(this);
    this.checkVid = this.checkVid.bind(this);
    this.tapeRefresh = this.tapeRefresh.bind(this);
    this.onToggleShareLink = this.onToggleShareLink.bind(this);
    // this.updateLocation = this.updateLocation.bind(this)
    this.divStyle = {
        borderRadius: '5px',
        marginTop: '-360px'
    }
    this.iconStyle = {
        margin: '3% 0',
    }
}

componentWillMount() {
    const script = document.createElement("script");
                    
    const scriptText = document.createTextNode("complex script with functions i.e. everything that would go inside the script tags");
    script.src = "https://ticketmaster-api-staging.github.io/products-and-docs/widgets/event-discovery/1.0.0/lib/main-widget.js"
    script.appendChild(scriptText);
    document.body.appendChild(script);
    this.loadShared()
    if(this.state.googleId !== null){
        this.getUserPlaylists();
    }
}

/**
 * Function makes get request to the server, which then retrieves
 * the users playlists from the database based on their googleId.
 * When retrieved the userPlaylists and userName are stored on the
 * state of the component.
 */
    getUserPlaylists(){
        const {googleId} = this.state
        
        axios.get('/userPlaylists', {
            googleId
        })
        .then((response) => {
            const {data} = response;
            
            let aVideoArray = [];
            let bVideoArray = [];
            let aTitleArray = [];
            let bTitleArray = [];
            let aSide = JSON.parse(data.response[0].aSideLinks);
            let bSide = JSON.parse(data.response[0].bSideLinks);
            this.setState({
                userPlaylists: data.response,
                userName: data.displayName,
            })
            if(!this.state.currentPlaylistId){
                aSide.forEach(video => {
                    aVideoArray.push(video.id.videoId);
                    aTitleArray.push(video.snippet.title);
                })
                bSide.forEach(video => {
                    bVideoArray.push(video.id.videoId);
                    bTitleArray.push(video.snippet.title);
                })
                this.setState({
                currentPlaylistId: data.response[0]._id,
                aSideLinks: aVideoArray,
                bSideLinks: bVideoArray,
                aSideTitles: aTitleArray,
                bSideTitles: bTitleArray,
                tapeCover: data.response[0].tapeDeck,
                sidePlaying: aVideoArray,
                tapeTitle: data.response[0].tapeLabel
            })
            this.state.player.loadPlaylist({ playlist: this.state.sidePlaying });
        }
        })
        .catch((err) => {
            console.error('Error searching:', err)
        })
    }

    /**
     * Function retrieves the shared playlist from the database by querying
     * using the playlistId. The playlist is then loaded into the mixtapePlayer.
     */
    loadShared() {
        let aVideoArray = [];
        let bVideoArray = [];
        let aTitleArray = [];
        let bTitleArray = [];
        if (this.state.playListId) {
            const { search } = this.state.playListId;

            this.setState({
                currentPlaylistId: search,
            });

            let id = search.slice(4);
            axios.post('/mixtape-player', {
                id,
            })
                .then((response) => {
                    if (response.data.bSide) {
                        const { aSide, bSide, tapeDeck, tapeLabel, userId } = response.data;
                        aSide.forEach(video => {
                            aVideoArray.push(video.id.videoId);
                            aTitleArray.push(video.snippet.title);
                        })
                        bSide.forEach(video => {
                            bVideoArray.push(video.id.videoId);
                            bTitleArray.push(video.snippet.title);
                        })
                        this.setState({
                            aSideLinks: aVideoArray,
                            bSideLinks: bVideoArray,
                            aSideTitles: aTitleArray,
                            bSideTitles: bTitleArray,
                            tapeCover: tapeDeck,
                            sidePlaying: aVideoArray,
                            tapeTitle: tapeLabel
                        })
                    } else {
                        const { aSide, tapeDeck, tapeLabel, userId } = response.data;
                        aSide.forEach(video => {
                            aVideoArray.push(video.id.videoId);
                            aTitleArray.push(video.snippet.title);
                        })
                        this.setState({
                            aSideLinks: aVideoArray,
                            aSideTitles: aTitleArray,
                            tapeCover: tapeDeck,
                            sidePlaying: aVideoArray,
                            tapeTitle: tapeLabel
                        })
                    }
                })
                .catch((error) => {
                    // handle error
                    console.log(error);
                })
        }
    }

    /**
     * Function listens for the youTube player to be fully loaded, then loads
     * the playlist into the player using the built-in YouTube Player API function
     * loadPlaylist. The video starts once the playlist loads.
     */
    onReady(event) {
        this.setState({
            player: event.target,
        });
        this.state.player.loadPlaylist({playlist: this.state.sidePlaying});
    }

    /**
     *  Function triggered by the play button to change the state of the player to playing.
     *  The playVideo function is a built-in function of the YouTube Player API.
     */
    onPlayVideo() {
        this.state.player.playVideo();
        this.setState({
            playing: true,
        })
    }

    /**
     * Function triggered by the pause button that calls the built-in player pause function and 
     * sets the state of playing to false.
     */
    onPauseVideo(){
        this.state.player.pauseVideo();
        this.setState({
            playing: false,
        })
    }

    /**
     * Function triggered by the fast-forward button. Mimics fast-forward by changing the playback
     * rate and lowering the volume while the button is held-down.
     */
    onForward() {
        this.state.player.setPlaybackRate(2);
        this.state.player.setVolume(50);
    }
    
    /**
     * Function that restores the volume and speed of the player when the fast-forward
     * button is released.
     */
    onStopForward() {
        this.state.player.setPlaybackRate(1.0);
        this.state.player.setVolume(100);
    }

    /**
     * Function triggered by the rewind button mouseDown event that mimics rewind functionality.
     * When the button is held-down the function retrieves the current time of the video then
     * subtracts from that value to seek backwards on the player on an interval.
     */
    onBackward() {
        
        let time = this.state.player.getCurrentTime();
        this.state.player.setVolume(50);
        this.state.interval = setInterval(() => {
            time -= 2;
            this.state.player.seekTo(time);
        }, 90)
    }

    /**
     * Function triggered by the mouseUp event of the rewind button that clears the interval, triggers 
     * the video to play again, and restores the volume of the player.
     */
    onStopBackward() {
        clearInterval(this.state.interval);
        this.state.player.playVideo();
        this.state.player.setVolume(100);
    }

    /**
     * Function called any time the state of the player changes to "1", which is the
     * event code for "playing" for the YouTube API player. The function retrieves
     * the url from the current song, then extracts the videoId and assigns it to the state
     * as urlId so that the currently playing song will be highlighted in the list of songs.
     */
    checkVid(event){
        if(event.data === 1){
            let urlId = this.state.player.getVideoUrl();
            urlId = urlId.replace('https://www.youtube.com/watch?v=','')
            
            if(this.state.currentSong !== urlId){
                this.setState({
                    currentSong: urlId,
                })
            }
        }
    }

    /**
     * Function triggered by the flip tape button that loads the opposite side of the 
     * tape's list of songs into the YouTube Player API.
     */
    onFlip(){
        if(this.state.sidePlaying[0] === this.state.aSideLinks[0]){
            let sideB = this.state.bSideLinks;
            this.setState({
                sidePlaying: sideB,
            })       
            this.state.player.loadPlaylist({playlist: sideB});
        } else if(this.state.sidePlaying[0] === this.state.bSideLinks[0]){
            let sideA = this.state.aSideLinks;
            this.setState({
                sidePlaying: sideA,
            })
            this.state.player.loadPlaylist({ playlist: sideA });
        }      
    }
    
    /**
     * Function called to switch between playlists. Retrieves the playlist by 
     * matching the id of the clicked element and the id of the playlist.
     */
    tapeRefresh(event){
        
        // location.reload()
        
        this.state.userPlaylists.forEach((playlist) => {
            
            if (playlist['_id'] === Number(event.currentTarget.id) && playlist.aSideLinks !== undefined) {
                let aVideoArray = [];
                let bVideoArray = [];
                let aTitleArray = [];
                let bTitleArray = [];
                let aSideLinks = JSON.parse(playlist.aSideLinks);
                let bSideLinks = JSON.parse(playlist.bSideLinks);
                aSideLinks.forEach(video => {
                    aVideoArray.push(video.id.videoId);
                    aTitleArray.push(video.snippet.title);
                })
                bSideLinks.forEach(video => {
                    bVideoArray.push(video.id.videoId);
                    bTitleArray.push(video.snippet.title);
                })
                this.setState({
                    aSideLinks: aVideoArray,
                    bSideLinks: bVideoArray,
                    aSideTitles: aTitleArray,
                    bSideTitles: bTitleArray,
                    tapeCover: playlist.tapeDeck,
                    sidePlaying: aVideoArray,
                    tapeTitle: playlist.tapeLabel
               });
                this.state.player.loadPlaylist({ playlist: aVideoArray });
            }
    })
}
    

    /**
     * Function triggered by the share mixtape button that determines whether or not the
     *  mixtape's link is visible in the playlist. 
     */
    onToggleShareLink() {
        this.setState({
            toggleLink: true,
        })
    }
   

    render (){

        const { aSideLinks, bSideLinks, aSideTitles, bSideTitles, tapeCover, userPlaylists, tapeTitle, currentSong, userName, currentPlaylistId, toggleLink} = this.state;

        return(
            <div class='row'>

        <div class='col-lg-9'>
        <h4 className="player-tape-label">{tapeTitle}</h4>
        <TapeCoverImage tapeCover={tapeCover} />

            <YouTube className="YouTube-vid" onReady={this.onReady} onStateChange={this.checkVid}/>
                <div className="row col-9 col-md-6 d-flex align-items-center player-ui mx-auto" style={this.divStyle}>
                    <div className="row col-11 col-md-11" >
                        <FontAwesomeIcon className="col-3 ui-button" style={this.iconStyle} icon={faBackward} onMouseDown={this.onBackward} onMouseUp={this.onStopBackward} />
                        <FontAwesomeIcon className="col-3 ui-button" style={this.iconStyle} icon={faPause} onClick={this.onPauseVideo} />
                        <FontAwesomeIcon className="col-3 ui-button" style={this.iconStyle} icon={faPlay} onClick={this.onPlayVideo} />
                        <FontAwesomeIcon className="col-3 ui-button" style={this.iconStyle} icon={faForward} onMouseDown={this.onForward} onMouseUp={this.onStopForward} />
                    </div>
                </div>

                <PlayerSongList onFlip={this.onFlip} currentSong={currentSong} aSideLinks={aSideLinks} bSideLinks={bSideLinks} aSideTitles={aSideTitles} bSideTitles={bSideTitles} currentPlaylistId={currentPlaylistId} toggleLink={toggleLink} onToggleLink={this.onToggleShareLink} />
                <UserMixtapesList userPlaylists={userPlaylists} userName={userName} tapeRefresh={this.tapeRefresh} />
        </div>
        
        <div class="col-md-1 mt-md-4"  >
        <Concerts location={this.state.location}/>
        {/* <div   class="mt-md-4" w-type="event-discovery" w-tmapikey="CR5DEqMYxzHOl6PosvPtI52lZfwVNGHB" w-googleapikey="YOUR_GOOGLE_API_KEY" w-keyword="music" w-theme="oldschool" w-colorscheme="custom" w-width="350" w-height="600" w-size="25" w-border="5" w-borderradius="6" w-postalcode="" w-radius="25" w-city={this.state.location} w-period="month" w-layout="vertical" w-attractionid="" w-promoterid="" w-venueid="" w-affiliateid="" w-segmentid="" w-proportion="xxl" w-titlelink="off" w-sorting="groupByName" w-id="id_xxdcq" w-countrycode="US" w-source="" w-branding="Ticketmaster" w-titlecolor="#171a1a" w-titlehovercolor="#ee7a36" w-buybuttonbackgroundhovercolor="#ee7a36" w-buybuttonbackgroundcolor="#17a2b8" w-descriptioncolor="#141414" w-bordercolor="#17a2b8" w-datecolor="#292727" w-latlong=""></div> */}
     
        </div>
            </div>
        )
    };
}

export default MixtapePlayer;