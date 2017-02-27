angular.module('nadobit.api', [
    'ngCookies',
    'nadobit.config',
])

.service('nbApi', function($http, $q, $timeout, $rootScope, $cookies, nbConfig)
{
    "ngInject";

    var self = this;
    var requestDelay = null;

    function delay()
    {
        if (requestDelay === 0) {
            return;
        }

        if (requestDelay === null) {
            return nbConfig.get('requestDelay').then(function(duration) {
                requestDelay = duration || 0;
                return delay();
            });
        }

        var d = $q.defer();
        $timeout(function() {
            d.resolve();
        }, requestDelay);

        return d.promise;
    }

    function apiUrl(path)
    {
        return $q.all({
            delay: delay(),
            apiUrl: nbConfig.get('apiUrl'),
        }).then(function(res) {
            return res.apiUrl + path;
        });
    }

    function getHeaders()
    {
        var token = $cookies.get('auth.token');
        if (!token) {
            return null;
        }

        return {
            'Authorization': 'Token ' + token
        };
    }

    this.resolve = function(path)
    {
        return $q.all({
            url: apiUrl(path),
            headers: getHeaders(),
        });
    };

    this.get = function(path, params) {
        return self.resolve(path).then(function(res) {
            return $http.get(res.url, {
                headers: res.headers,
                params: params,
            });
        }).catch(function(res) {
            if (res.status === 403) {
                $rootScope.$emit('nbApi.forbidden');
            }
            return $q.reject(res);
        });
    };

    this.delete = function(path) {
        return self.resolve(path).then(function(res) {
            return $http.delete(res.url, {
                headers: res.headers,
            });
        }).catch(function(res) {
            if (res.status === 403) {
                $rootScope.$emit('nbApi.forbidden');
            }
            return $q.reject(res);
        });
    };

    this.post = function(path, data)
    {
        return self.resolve(path).then(function(res) {
            return $http.post(res.url, data, {
                headers: res.headers,
            });
        }).catch(function(res) {
            if (res.status === 403) {
                $rootScope.$emit('nbApi.forbidden');
            }
            return $q.reject(res);
        });
    };

    this.put = function(path, data)
    {
        return self.resolve(path).then(function(res) {
            return $http.put(res.url, data, {
                headers: res.headers,
            });
        }).catch(function(res) {
            if (res.status === 403) {
                $rootScope.$emit('nbApi.forbidden');
            }
            return $q.reject(res);
        });
    };

    this.options = function(path, params)
    {
        return self.resolve(path).then(function(res) {
            return $http({
                url: res.url,
                headers: res.headers,
                method: 'OPTIONS',
                params: params,
            });
        }).catch(function(res) {
            if (res.status === 403) {
                $rootScope.$emit('nbApi.forbidden');
            }
            return $q.reject(res);
        });
    };

})

;
