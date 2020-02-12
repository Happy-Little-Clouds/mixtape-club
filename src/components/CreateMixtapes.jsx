import React from 'react';

import PlaylistImageSelector from './PlaylistImageSelector.jsx';
import Search from './Search.jsx';
import SearchList from './SearchList.jsx';
import PlaylistBuilderList from './PlaylistBuilderList.jsx';
import SearchPlayer from './SearchPlayer.jsx';

/** CreateMixtapes component renders all components associated with creation of a mixtape, including
 * PlaylistImageSelector, Search, SearchPlayer, SearchList, and SearchBuilderList at the 
 * create-mixtapes route and is a child component of Container.
 */

const CreateMixtapes = (props) => {

    const { onUserRecordingEnded, recordUser, userRecordEnd, startRecordUser, stopRecordUser, authenticateUser, searchResults, onSearch, onChange, onPlayVideo, onPauseVideo, onReady, onResultClick, playing, selectedResult, tapeImages, builderImage, selectImage, tapeLabel, onLabelChange, onPassToSideA, sideA, onPassToSideB, sideB, displayImageSelector, onSaveImage, onSavePlaylist, tapeBackgroundColor, onDelete, queryParam } = props;
  
    return (
        <div style={{marginTop: '4rem'}}>
            {displayImageSelector ? <PlaylistImageSelector tapeImages={tapeImages} selectImage={selectImage} tapeLabel={tapeLabel} onLabelChange={onLabelChange} onSaveImage={onSaveImage} builderImage={builderImage} tapeBackgroundColor={tapeBackgroundColor} /> :
        <div className="mx-auto" style={{maxWidth: '860px'}}>
            <Search onSearch={onSearch} onChange={onChange} />
            <SearchPlayer onUserRecordingEnded={onUserRecordingEnded} recordUser={recordUser} userRecordEnd={userRecordEnd} startRecordUser={startRecordUser} stopRecordUser={stopRecordUser} onPlayVideo={onPlayVideo} onReady={onReady} onPauseVideo={onPauseVideo} playing={playing} searchResults={searchResults} selectedResult={selectedResult} onPassToSideA={onPassToSideA} onPassToSideB={onPassToSideB} />
            <SearchList searchResults={searchResults} onResultClick={onResultClick}/>
            <PlaylistBuilderList builderImage={builderImage} tapeLabel={tapeLabel} sideA={sideA} sideB={sideB} onSaveImage={onSaveImage} onSavePlaylist={onSavePlaylist} onDelete={onDelete} queryParam={queryParam}/>
        </div>}
        </div>
    )
}

// <SearchList searchResults={searchResults} onPlayVideo={onPlayVideo} onReady={onReady} />

export default CreateMixtapes;