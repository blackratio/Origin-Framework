controllers.controller('homeCtrl', ['$scope', '$rootScope', '$http',
function ($scope, $rootScope, $http) {

}]);

controllers.controller('componentsCtrl', ['$scope', '$rootScope', '$http', '$timeout', 'anchorSmoothScroll', '$location',
function ($scope, $rootScope, $http, $timeout, anchorSmoothScroll, $location) {

   $timeout(function() {
      $(function(){
         $(window).scroll(function() {
           if ($(this).scrollTop() >= 30) {
               $('.fixThis').addClass('stickytop');
           }
           else if ($(this).scrollTop() <= 100) {
               $('.fixThis').removeClass('stickytop');
           }
         });
      });

   }, 100);
   console.log('components controller');

   $scope.gotoElement = function (eID){
      // set the location.hash to the id of
      // the element you wish to scroll to.
      //$location.hash('paragraph');

      // call $anchorScroll()
      anchorSmoothScroll.scrollTo(eID);
      console.log(eID);

    };

}]);

controllers.controller('gettingStartCtrl', ['$scope', '$rootScope', '$http', '$timeout',
function ($scope, $rootScope, $http, $timeout) {
   console.log('jplayer test');

   var myDatas = {
      data : [
         {
            title : 'Good morning vietnam',
            content : {
               file: 'http://www.wav-sounds.com/movie/goodmorningvietnam.wav'
            }
         },
         {
            title : 'pas zen'
         },
         {
            title : 'Robocop',
            content : {
               file: 'http://www.wav-sounds.com/movie/robocop.wav'
            }
         },
         {
            title : 'Austin powers',
            content : {
               file: 'http://www.wav-sounds.com/movie/austinpowers.wav'
            }
         },
         {
            title : 'zen'
         },
         {
            title : 'pas zen'
         }
      ]
   };

   $scope.list = myDatas;

   console.log($scope.list);



}]);

OriginFramework.run(function($rootScope) {
  $rootScope.audio1 = 'http://www.wav-sounds.com/movie/goodmorningvietnam.wav';
  $rootScope.audio2 = 'http://www.w3schools.com/tags/horse.mp3';
});

directives.directive('jplayer', function() {
      return {
        restrict: 'EA',
        template: '<div></div>',
        link: function(scope, element, attrs) {
          var $control = element,
              $player = $control.children('div'),
              cls = 'pause';

          var updatePlayer = function() {
            $player.jPlayer({
              // Flash fallback for outdated browser not supporting HTML5 audio/video tags
              // http://jplayer.org/download/
              swfPath: 'js/jplayer/',
              supplied: 'wav',
              solution: 'html, flash',
              preload: 'auto',
              wmode: 'window',
              ready: function () {
                $player
                  .jPlayer("setMedia", {wav: scope.$eval(attrs.audio)})
                  .jPlayer(attrs.autoplay === 'true' ? 'play' : 'stop');
              },
              play: function() {
                $control.addClass(cls);

                if (attrs.pauseothers === 'true') {
                  $player.jPlayer('pauseOthers');
                }
              },
              pause: function() {
                $control.removeClass(cls);
              },
              stop: function() {
                $control.removeClass(cls);
              },
              ended: function() {
                $control.removeClass(cls);
              }
            })
            .end()
            .unbind('click').click(function(e) {
              $player.jPlayer($control.hasClass(cls) ? 'stop' : 'play');
            });
          };

          scope.$watch(attrs.audio, updatePlayer);
          updatePlayer();
        }
      };
 });
