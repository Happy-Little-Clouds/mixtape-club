import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons'

/** PlaylistBuilderList component renders the cassette image, title, and song selections of the user
 * at the create-mixtapes route and is a child component of CreateMixtapes.
 */

class PlaylistBuilderList extends Component {
    constructor(props) {
        super(props);
        this.handleMouseHover = this.handleMouseHover.bind(this);
        this.state = {
            isHovering: {
                A0: false,
                B0: false,
                A1: false,
                B1: false,
                A2: false,
                B2: false,
                A3: false,
                B3: false,
                A4: false,
                B4: false,
            },
            showLyrics: false
        };
    }
    handleMouseHover(key) {
        const updater = (prevState, props)=>{
            prevState.isHovering[key] = !prevState.isHovering[key]
            return{
                prevState
            }
        }
        this.setState(updater);
    }
    toggleHoverState(prevState, props) {
        return {
            isHovering: !prevState.isHovering,
        };
    }
    handleShowLyrics(key){
        this.setState({showLyrics:key})
    }
    
    render () {
        const { builderImage, tapeLabel, sideA, sideB, onSaveImage, onSavePlaylist, onDelete } = this.props;
        console.log(this.state.showLyrics)
        this.state.showLyrics && (this.state.showLyrics[0] === "A" ? console.log(sideA[this.state.showLyrics[1]].spotify.trackDescription) : console.log(sideB[i].spotify.trackName)) 
        
    return (
        <div className="border border-info playlist-builder shadow-sm p-3 mb-5 bg-white rounded">
        <div className="row">
                {this.state.showLyrics ? 
                    (<div className="col-md-6" style={{ margin: ".2rem 0"}}>
                        <div style={{height: '250px', overflowY: 'scroll'}}>
                        <h5 style={{ textAlign: "center" }}> {"Lyrics:" + this.state.showLyrics && (this.state.showLyrics[0] === "A" ? sideA[this.state.showLyrics[1]].spotify.trackName : sideB[this.state.showLyrics[1]].spotify.trackName)}</h5> 
                        <div>
                            {this.state.showLyrics && (this.state.showLyrics[0] === "A" ? sideA[this.state.showLyrics[1]].spotify.trackDescription : sideB[this.state.showLyrics[1]].spotify.trackDescription)}
                        </div>
                        </div>
                    <button className="btn btn-info col-6 col-md-12 mx-auto" type="submit" onClick={()=>{this.handleShowLyrics(false)}}>
                        Dismiss
                        <span style={{ "paddingLeft": "10px",}}>
                            <i style={{
                                "border": "solid white",
                                "border-width": "0 3px 3px 0",
                                "display": "inline-block",
                                "padding": "3px",
                                "transform": "rotate(-45deg)",
                                "-webkit-transform": "rotate(-45deg)",
                                
                            }} />
                            </span>
                        </button>
                </div>)
                :
                (<div className="col-md-4" style={{ margin: ".2rem 0" }}>
                    <h5 style={{ textAlign: "center" }}>{tapeLabel} Mixtape:</h5>
                    <img className="col-md-12" src={builderImage.image} style={{ margin: ".4rem 0" }}/>
                    <button className="btn btn-outline-info col-6 col-md-12 mx-auto" type="submit" style={{ margin: ".4rem 0" }} onClick={onSaveImage}>Edit Cassette</button>
                    <button className="btn btn-info col-6 col-md-12 mx-auto" type="submit" onClick={onSavePlaylist}>Save Mixtape</button>   
                 </div>)}
                {!this.state.showLyrics && (<div className="col-sm-4 col-md-2" style={{marginTop: "1rem"}}>
                    <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                        <a className="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Side A</a>
                        <a className="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Side B</a>
                    </div>
                </div>)}
                <div className="col-sm-4 col-md-5">
                    <div className="tab-content" id="v-pills-tabContent">
                        <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                            <ul className="list-group list-group-flush builder-tracks">
                                {[0,1,2,3,4].map((ignore,i)=>{
                                    return (
                                    <li key={i} 
                                        className="list-group-item track-li" 
                                        onMouseEnter={()=>{this.handleMouseHover("A"+i)}}
                                        onMouseLeave={()=>{this.handleMouseHover("A"+i)}}
                                        
                                    >
                                            <FontAwesomeIcon
                                                icon={faMinusCircle}
                                                style={{ float: 'right', color: '#17a2b8' }}
                                                id={'A0'}
                                                onClick={onDelete} />
                                        {this.state.isHovering["A" + i] &&
                                            <img src={sideA[i] && sideA[i].spotify.albumImages[2].url} style={{ float: "right" }}></img>
                                        }
                                            {this.state.showLyrics !== ("A" + i) && (
                                            <button onClick={() => { this.handleShowLyrics("A" + i) }} 
                                                className="btn btn-info col-2 col-md-2 mx-auto" 
                                                style={{maxHeight: "50%", float:"left"}}
                                                type="submit">
                                                <i style={{"border": "solid white", 
                                                        "border-width": "0 3px 3px 0", 
                                                        "display": "inline-block",
                                                        "padding": "3px",
                                                        "transform": "rotate(135deg)",
                                                        "-webkit-transform": "rotate(135deg)",}} /></button>)}
                                            <div >{sideA[i] ? sideA[i].spotify.trackName : 'Track ' + (i+1) + 'A \n'}</div>
                                            <div >{sideA[i] && sideA[i].spotify.artistName}</div>
                                        {this.state.isHovering["A"+i] && 
                                        <div>
                                            <div>
                                                <div>{sideA[i] && sideA[i].spotify.albumName}</div>
                                            </div>
                                        </div>}
                                    </li>
                                )})}
                            </ul>
                        </div>
                        <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                            <ul className="list-group list-group-flush builder-tracks">
                                {[0, 1, 2, 3, 4].map((ignore, i) => {
                                    return (
                                        <li key={i} className="list-group-item track-li">
                                            <div>{sideB[i] ? sideB[i].spotify.trackName : 'Track ' + (i + 1) + 'B'}</div>
                                            <div>{sideB[i] && sideB[i].spotify.artistName}</div>
                                            <div>{sideB[i] && sideB[i].spotify.albumName}</div>
                                            <FontAwesomeIcon
                                                icon={faMinusCircle}
                                                style={{ float: 'right', color: '#17a2b8' }}
                                                id={'A0'}
                                                onClick={onDelete} />
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    )
    }
}

export default PlaylistBuilderList;