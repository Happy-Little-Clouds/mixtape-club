import React from 'react';
import YouTube from 'react-youtube';
import Recorder from 'recorder-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faPlus } from '@fortawesome/free-solid-svg-icons'

/** Search Player component renders the player interface connected with the Search component 
 * at the create-mixtapes route and is a child component of CreateMixtapes.
 */

const SearchPlayer = (props) => {
    const { onReady, onPlayVideo, onPauseVideo, playing, selectedResult, onPassToSideA, onPassToSideB, recordUser, startRecordUser, stopRecordUser, onUserRecordingEnded } = props;

    let title = selectedResult.snippet.title.replace(/&amp;/g, '&');
    title = title.replace(/&#39;/g, '\'');
    title = title.replace(/&quot;/g, '\"');

    const iconStyle = {
        fontSize: '2.5rem',
        marginTop: '95%',
        color: '#fff',
    }
    const divStyle = {
        borderRadius: '5px',
        marginTop: '-370px'
    }

    const titleStyle = {
        verticalAlign: 'middle',
        display: 'inline-block',
        color: '#fff',
        marginTop: '7%',
        fontSize: '1rem',
    }
    
    const vidStyle = {
        opacity: '0%',
        marginLeft: '-2000px',
        marginTop: '0.5rem',
    }

    // start recording user option
    // check for user permissions
    // get user permissions
    // .then take this 'stream'
    // change the current state to recording
    // and init a new media recording
    // with chunks
    // on click do some chunk binding
    // set up a catch that an error occured
    
    // stop recording user option
    // will need to change state in big app component when start
    // on stop, will need to upload the recording (blob) at route and write asset
    // then deal with playback 
    // how is a recording on a playlist played back in the other playback component
    
    const initiateStopRecordUser = (chunks, mediaRecord) => {
        mediaRecord.onstop = () => {
            const blob = new Blob(chunks, { 'type': 'audio/ogg; codecs=opus' });
            stopRecordUser(blob);
            const audio = document.getElementById('user-recording');
            const audioURL = window.URL.createObjectURL(blob);
            audio.setAttribute('controls', '');
            audio.addEventListener('ended', () => {
                onUserRecordingEnded();
            });
            audio.src = audioURL;
        }
        mediaRecord.stop();
    }

    const initiateRecordUser = () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            console.log('getUserMedia supported.');
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then((stream) => {
                    startRecordUser();
                    const mediaRecord = new MediaRecorder(stream);
                    mediaRecord.start();

                    const chunks = [];
                    mediaRecord.ondataavailable = (event) => {
                        chunks.push(event.data);
                    }

                    const stop = document.querySelector('#stop-record-user');
                    stop.onclick = initiateStopRecordUser.bind(stop, chunks, mediaRecord);
                })
                .catch((err) => {
                    console.log('The following getUserMedia error occured: ' + err);
                });
        } else {
            console.log('getUserMedia not supported on your browser!');
        }
    }

    return (
        <div>
            <div style={vidStyle}>
            <audio id="user-recording" controls></audio>
            <YouTube videoId={selectedResult.id.videoId} onReady={onReady} />
            </div>
            <div className="row col-12 bg-info d-flex mx-auto" style={divStyle}>
            <div className="col-2 col-md-1" >
            {playing ? <FontAwesomeIcon style={iconStyle} icon={faPause} onClick={onPauseVideo}/>:
            <FontAwesomeIcon style={iconStyle} icon={faPlay} onClick={onPlayVideo}/> }
            </div>
            <div className="col-10 col-md-8">
                <h4 style={titleStyle}>{title}</h4> 
            </div>
                <div className="row col-11 col-md-3 player-button-row mx-auto">
                    {
                        recordUser ?
                            <button onClick={initiateStopRecordUser} className="btn btn-light col-4 col-md-7" id="stop-record-user" style={{ margin: '0.4rem 0.2rem', fontSize: '0.8rem', color: 'red' }}><FontAwesomeIcon style={{ color: 'red' }} icon={faPlus} /> Record</button>
                            :
                            <button onClick={initiateRecordUser} className="btn btn-light col-4 col-md-7" style={{ margin: '0.4rem 0.2rem', fontSize: '0.8rem', color: '#17a2b8' }}><FontAwesomeIcon style={{ color: '#17a2b8' }} icon={faPlus} /> Record</button>
                    }
                    <button className="btn btn-light col-4 col-md-7" style={{ margin: '0.4rem 0.2rem', fontSize: '0.8rem', color: '#17a2b8' }} onClick={() => onPassToSideA(selectedResult)}><FontAwesomeIcon style={{ color: '#17a2b8' }} icon={faPlus} /> Side A</button>
                    <button className="btn btn-light col-4 col-md-7" style={{ margin: '0.4rem 0.2rem', fontSize: '0.8rem', color: '#17a2b8' }} onClick={() => onPassToSideB(selectedResult)}><FontAwesomeIcon style={{ color: '#17a2b8'}} icon={faPlus}/> Side B</button>
                </div>
            </div>
        </div>
    )
};

export default SearchPlayer;