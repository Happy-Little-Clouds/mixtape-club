import React from 'react';
import YouTube from 'react-youtube';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faPlus } from '@fortawesome/free-solid-svg-icons'

/** Search Player component renders the player interface connected with the Search component 
 * at the create-mixtapes route and is a child component of CreateMixtapes.
 */

const SearchPlayer = (props) => {
    const { onReady, onPlayVideo, onPauseVideo, playing, selectedResult, onPassToSideA, onPassToSideB, recordUser } = props;

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

    return (
        <div>
            <div style={vidStyle}>
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
                            <button className="btn btn-light col-4 col-md-7" id="stop-record-user" style={{ margin: '0.4rem 0.2rem', fontSize: '0.8rem', color: 'red' }}><FontAwesomeIcon style={{ color: 'red' }} icon={faPlus} /> Record Audio</button>
                            :
                            <button className="btn btn-light col-4 col-md-7" style={{ margin: '0.4rem 0.2rem', fontSize: '0.8rem', color: '#17a2b8' }}><FontAwesomeIcon style={{ color: '#17a2b8' }} icon={faPlus} /> Record Audio</button>
                    }
                    <button className="btn btn-light col-4 col-md-7" style={{ margin: '0.4rem 0.2rem', fontSize: '0.8rem', color: '#17a2b8' }} onClick={() => onPassToSideA(selectedResult)}><FontAwesomeIcon style={{ color: '#17a2b8' }} icon={faPlus} /> Side A</button>
                    <button className="btn btn-light col-4 col-md-7" style={{ margin: '0.4rem 0.2rem', fontSize: '0.8rem', color: '#17a2b8' }} onClick={() => onPassToSideB(selectedResult)}><FontAwesomeIcon style={{ color: '#17a2b8'}} icon={faPlus}/> Side B</button>
                </div>
            </div>
        </div>
    )
};

export default SearchPlayer;