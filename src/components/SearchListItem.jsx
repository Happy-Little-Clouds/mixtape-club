import React from 'react';

/** SearchListItem component renders each song in the list of searched for songs
 * at the create-mixtape route and is a child component of SearchList
 */

const SearchListItem = (props) => {
    const { searchResult, onResultClick } = props;
    let title = ""
    if(searchResult.spotify.youtubeSnippet){ 
        title = searchResult.spotify.youtubeSnippet.replace(/&amp;/g, '&');
    }
    title = title.replace(/&#39;/g,'\'');
    title = title.replace(/&quot;/g, '\"');
    return (
        <li onClick={()=>{onResultClick(searchResult)}} className="list-group-item search-item">{title}</li>
    )
};

export default SearchListItem;