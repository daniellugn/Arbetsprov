/**
 * Event listeners
 */

// prevent form post when JS is enabled
document.getElementById('search-form').addEventListener('submit', function(e){
    e.preventDefault();
});

// perform API search when there's typed input 
document.getElementById('search-field').addEventListener('keyup', function(e){
    
    var inp = String.fromCharCode(e.keyCode);
    var searchSuggested = document.getElementById('search-suggested');
    
    if (/[a-zA-Z0-9-_ ]/.test(inp) || e.keyCode === 8) {
        doSearch(document.getElementById('search-field').value);
    } else if(e.keyCode === 38){ //up arrow
        
        if(searchSuggested){
            
            if(highlightStartPosition === 0){
                highlightStartPosition = searchSuggested.childElementCount-1;
            }
            
            //check if any suggestion is already highlighted
            for(i = 0; i < searchSuggested.childElementCount; i++){
                
                if(searchSuggested.childNodes[i].className === 'highlight') {
                    searchSuggested.childNodes[highlightStartPosition].className = '';
                    highlightStartPosition = i-1;
                }
            }
            
            if(highlightStartPosition < 0){ // if we're at the start of the suggested list jump to the last result
                searchSuggested.childNodes[0].className = '';
                highlightStartPosition = searchSuggested.childElementCount-1;
            }
            searchSuggested.childNodes[highlightStartPosition].className = 'highlight';
            
        }
        
    } else if(e.keyCode === 40){ //down arrow
        if(searchSuggested){
            
            //check if any suggestion is already highlighted
            for(i = 0; i < searchSuggested.childElementCount; i++){
                
                if(searchSuggested.childNodes[i].className === 'highlight') {
                    highlightStartPosition = i+1;
                }
            }
            
            if(highlightStartPosition > 0){ // unhighlight suggestions
                searchSuggested.childNodes[highlightStartPosition-1].className = '';
            } 
            
            if(highlightStartPosition >= suggestedResults){ // if we're at the end of the suggested list jump to the first result
                highlightStartPosition = 0;
            }
            searchSuggested.childNodes[highlightStartPosition].className = 'highlight';
        }
    } else if(e.keyCode === 13){ //enter
        var highlightedSuggestionElement = document.getElementsByClassName('highlight');
        
        // prevents pressing enter before a suggestion is highlighted
        if(highlightedSuggestionElement.length){
            var searchPickedListElement = document.getElementById('search-picked');
            var html = '';
            var timestamp = new Date();
            var timestampStr = timestamp.getFullYear() + '-' + timestamp.getMonth() + '-' + timestamp.getDate() + ' ' + timestamp.getHours() + ':' + ((timestamp.getMinutes() < 10) ? '0' + timestamp.getMinutes() : timestamp.getMinutes());
            var titleStr = highlightedSuggestionElement[0].textContent;


            if(titleStr.length > 15){
                titleStr = titleStr.substring(0, 15) + '...';
            }

            html += '<li onclick="editRow(this)">';
                html += '<span class="title">' + titleStr + '</span> <time datetime="' + timestampStr + '">' + timestampStr + '</time>';
            html += '</li>';

            searchPickedListElement.insertAdjacentHTML('afterbegin', html);
            searchPickedListElement.className = 'show';
        }
        
        
    } else if(e.keyCode === 27){ //esc
        document.getElementById('search-field').blur();
        highlightStartPosition = 0;
    }
});

// if the search field isn't in focus
document.getElementById('search-field').addEventListener('blur', function(e){ 
    var searchSuggested = document.getElementById('search-suggested');
    
    if(searchSuggested){ // ..and if a suggest list exists
        if (document.getElementById('search-field').value === ''){ // ..remove suggest list if empty
            searchSuggested.remove();
            highlightStartPosition = 0;
        } else {
            searchSuggested.className = 'hide'; // ..else hide it
        }
    }
});

// if the search field is in focus
document.getElementById('search-field').addEventListener('focus', function(e){ 
    var searchSuggested = document.getElementById('search-suggested');
    
    if(searchSuggested){
        searchSuggested.className = 'show'; // ..show the suggestion list
    }
    
});