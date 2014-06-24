if (Meteor.isClient) {

  T = {
    Counter: { 
      count: 1,
      dep: new Deps.Dependency, 
      get: function() {
        this.dep.depend();
        return this.count;
      },
      set: function () {
        this.count++;
        this.dep.changed();
      }
    },
    Phrase: {
      currentPhrase: [],
      dep: new Deps.Dependency,
      get: function(){
        this.dep.depend();
        return this.currentPhrase;
      },
      set: function () {
        T.Phrase.currentPhrase = [];
        var count = T.Counter.get();
        var arr = Mandarin.find({phrase: count}).fetch();
        if (arr.length > 0) {
          var mandarinArr = (arr[0].mandarin);
          var obj = {};
          for (var i = 0; i < mandarinArr.length; i++){
            obj.mandarin = mandarinArr[i];
            T.Phrase.currentPhrase.push(obj);
            obj = {};
          }
          this.dep.changed();
        }
      } 
    },
    Logic: {
      TruthyArr: [],
      Truthy: function (v1, v2) {
        console.log('v1:' + v1 + 'v2: ' + v2);
        T.Logic.TruthyArr.push((v1 === v2) ? "true" : "false");
      },

      Test: function () { 
        var count = T.Counter.get();
        var obj = Mandarin.find({phrase: count}).fetch();
        var correctArr = obj[0].mandarin;
        console.log(correctArr);

        $('.guess').children().each(function(index, value){
          var res = $(value).html();
            T.Logic.Truthy(correctArr[index] + " ", res);
        });
      },

      Scenario: function (arr) { //send TruthyArr here
        var count = T.Counter.get();
        var obj = Mandarin.find({phrase: count}).fetch();
        var correctArrLength = obj[0].mandarin.length;

        for (var i = 0; i < arr.length; i++) {
          if (arr.length == correctArrLength) {
            if (arr[i] === 'false') {
              this.loseScenario();
              break;
            } else if (i == arr.length - 1) {
              this.winScenario();
            }
          } else { 
            this.loseScenario();
          }
        }
      },
      winScenario: function(){
        alert('Correct!');
        T.Counter.set();
        this.TruthyArr = [];
        $('.guess').children().remove();

      },
      loseScenario: function(){
        alert('Incorrect. Try Again!');
      }
    },
  };

  Template.translate.sentence = function () {
    console.log("sentence deps.acive: " + Deps.active)
    var count = T.Counter.get();
    return Mandarin.find({phrase: count}).fetch();
  };

  Template.translate.phrase = function(){
    console.log("phrase deps.acive: " + Deps.active)
    if (Meteor.status().status === "connected") {
      T.Phrase.set();
      return T.Phrase.get();
    } else {
      console.log(Meteor.status());
    }
  } 

  Template.translate.events({
    'click .word': function (e) {
      var target = e.currentTarget;
      var word = $(target).html();
      $('.guess').append('<span id="guess">' + word + ' </span>');
      $('.guess').css("font-size","40px");
      $(target).remove();
    },

    'click #submit': function () {
      T.Logic.Test();
      T.Logic.Scenario(T.Logic.TruthyArr);
    }
  });
};
