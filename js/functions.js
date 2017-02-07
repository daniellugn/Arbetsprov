/**
 * Functions
 */


/**
 * Perform API search
 * 
 * @param {String} query - new input
 */
function doSearch(query)
{   
    SC.initialize({
        client_id: apiKey
    });
    
    var getUrl = '/tracks';
    var getOptions =  {
        q: query,
        limit: suggestedResults,
        linked_partitioning: 1
    };       

    SC.get(getUrl, getOptions).then(function(data){

        var mainSection = document.getElementsByTagName('main')[0];
        var searchSuggested = document.getElementById("search-suggested");

        // remove previous search results if exists
        if(searchSuggested){
            searchSuggested.remove();
        }
        var html = '<ul id="search-suggested">';
        
        for(i = 0; i < data.collection.length; i++){
            html += '<li>' + data.collection[i].title + '</li>';
        }
        
        html += '</ul>';
        
        mainSection.insertAdjacentHTML('beforeend', html);
        
    });
}

/**
 * Edit row
 * 
 * @param {Object} element
 */
function editRow(element){
    var html = '<a href="javascript:void(0);" onclick="deleteRow(this)" class="delete"><img src="img/delete.png" alt="Delete" /></a>';
    var deleteElement = document.getElementsByClassName('delete');
    
    // first check if other rows are in edit mode
    if(!deleteElement.length){
        element.insertAdjacentHTML('beforeend', html);
        element.className = 'selected';
    } else {
        deleteElement[0].parentNode.className = '';
        deleteElement[0].parentNode.removeChild(deleteElement[0]);
    }
}

/**
 * Delete picked list row
 * 
 * @param {Object} element Link element
 */
function deleteRow(element){
    
    element.parentNode.remove();
    
    // hide the picked list if there's no rows left
    if(!document.getElementById('search-picked').childElementCount){
        document.getElementById('search-picked').className = 'hide';
    }
}
