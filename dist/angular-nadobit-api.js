(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
angular.module('nadobit.api', [
    'ngCookies',
    'nadobit.config',
])

.service('nbApi', ["$http", "$q", "$timeout", "$rootScope", "$cookies", "nbConfig", function($http, $q, $timeout, $rootScope, $cookies, nbConfig)
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

}])

;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9tZWRpYS9rYWVzZWJyb3Qvd29yay9wcm9qZWN0cy9naXRodWIvYW5ndWxhci1uYWRvYml0LWFwaS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL21lZGlhL2thZXNlYnJvdC93b3JrL3Byb2plY3RzL2dpdGh1Yi9hbmd1bGFyLW5hZG9iaXQtYXBpL3NyYy9mYWtlX2Q3YTMzMjBjLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiYW5ndWxhci5tb2R1bGUoJ25hZG9iaXQuYXBpJywgW1xuICAgICduZ0Nvb2tpZXMnLFxuICAgICduYWRvYml0LmNvbmZpZycsXG5dKVxuXG4uc2VydmljZSgnbmJBcGknLCBmdW5jdGlvbigkaHR0cCwgJHEsICR0aW1lb3V0LCAkcm9vdFNjb3BlLCAkY29va2llcywgbmJDb25maWcpXG57XG4gICAgXCJuZ0luamVjdFwiO1xuXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciByZXF1ZXN0RGVsYXkgPSBudWxsO1xuXG4gICAgZnVuY3Rpb24gZGVsYXkoKVxuICAgIHtcbiAgICAgICAgaWYgKHJlcXVlc3REZWxheSA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlcXVlc3REZWxheSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG5iQ29uZmlnLmdldCgncmVxdWVzdERlbGF5JykudGhlbihmdW5jdGlvbihkdXJhdGlvbikge1xuICAgICAgICAgICAgICAgIHJlcXVlc3REZWxheSA9IGR1cmF0aW9uIHx8IDA7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlbGF5KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBkID0gJHEuZGVmZXIoKTtcbiAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBkLnJlc29sdmUoKTtcbiAgICAgICAgfSwgcmVxdWVzdERlbGF5KTtcblxuICAgICAgICByZXR1cm4gZC5wcm9taXNlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFwaVVybChwYXRoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuICRxLmFsbCh7XG4gICAgICAgICAgICBkZWxheTogZGVsYXkoKSxcbiAgICAgICAgICAgIGFwaVVybDogbmJDb25maWcuZ2V0KCdhcGlVcmwnKSxcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIHJldHVybiByZXMuYXBpVXJsICsgcGF0aDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0SGVhZGVycygpXG4gICAge1xuICAgICAgICB2YXIgdG9rZW4gPSAkY29va2llcy5nZXQoJ2F1dGgudG9rZW4nKTtcbiAgICAgICAgaWYgKCF0b2tlbikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiAnVG9rZW4gJyArIHRva2VuXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgdGhpcy5yZXNvbHZlID0gZnVuY3Rpb24ocGF0aClcbiAgICB7XG4gICAgICAgIHJldHVybiAkcS5hbGwoe1xuICAgICAgICAgICAgdXJsOiBhcGlVcmwocGF0aCksXG4gICAgICAgICAgICBoZWFkZXJzOiBnZXRIZWFkZXJzKCksXG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLmdldCA9IGZ1bmN0aW9uKHBhdGgsIHBhcmFtcykge1xuICAgICAgICByZXR1cm4gc2VsZi5yZXNvbHZlKHBhdGgpLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KHJlcy51cmwsIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiByZXMuaGVhZGVycyxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IHBhcmFtcyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIGlmIChyZXMuc3RhdHVzID09PSA0MDMpIHtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRlbWl0KCduYkFwaS5mb3JiaWRkZW4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3QocmVzKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuZGVsZXRlID0gZnVuY3Rpb24ocGF0aCkge1xuICAgICAgICByZXR1cm4gc2VsZi5yZXNvbHZlKHBhdGgpLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZGVsZXRlKHJlcy51cmwsIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiByZXMuaGVhZGVycyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIGlmIChyZXMuc3RhdHVzID09PSA0MDMpIHtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRlbWl0KCduYkFwaS5mb3JiaWRkZW4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3QocmVzKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMucG9zdCA9IGZ1bmN0aW9uKHBhdGgsIGRhdGEpXG4gICAge1xuICAgICAgICByZXR1cm4gc2VsZi5yZXNvbHZlKHBhdGgpLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChyZXMudXJsLCBkYXRhLCB7XG4gICAgICAgICAgICAgICAgaGVhZGVyczogcmVzLmhlYWRlcnMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICBpZiAocmVzLnN0YXR1cyA9PT0gNDAzKSB7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kZW1pdCgnbmJBcGkuZm9yYmlkZGVuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHJlcyk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLnB1dCA9IGZ1bmN0aW9uKHBhdGgsIGRhdGEpXG4gICAge1xuICAgICAgICByZXR1cm4gc2VsZi5yZXNvbHZlKHBhdGgpLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucHV0KHJlcy51cmwsIGRhdGEsIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiByZXMuaGVhZGVycyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIGlmIChyZXMuc3RhdHVzID09PSA0MDMpIHtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRlbWl0KCduYkFwaS5mb3JiaWRkZW4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3QocmVzKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMub3B0aW9ucyA9IGZ1bmN0aW9uKHBhdGgsIHBhcmFtcylcbiAgICB7XG4gICAgICAgIHJldHVybiBzZWxmLnJlc29sdmUocGF0aCkudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgICAgICAgICAgdXJsOiByZXMudXJsLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHJlcy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ09QVElPTlMnLFxuICAgICAgICAgICAgICAgIHBhcmFtczogcGFyYW1zLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgaWYgKHJlcy5zdGF0dXMgPT09IDQwMykge1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGVtaXQoJ25iQXBpLmZvcmJpZGRlbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuICRxLnJlamVjdChyZXMpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG59KVxuXG47XG4iXX0=
