angular.module('characterService', []).factory('character', ['$http', function($http) {

    return {
        // call to get all characters
        get : function() {
            return $http.get('/api/characters');
        },

                // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new character
        create : function(characterData) {
            return $http.post('/api/characters', characterData);
        },

        // call to DELETE a character
        delete : function(id) {
            return $http.delete('/api/characters/' + id);
        }
    }

}]);
