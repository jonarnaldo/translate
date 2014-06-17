T = {
  Phrase: 2,
  TruthyArr: [],
  Truthy: function (v1, v2) {
    console.log('v1:' + v1 + 'v2: ' + v2);
    T.TruthyArr.push((v1 === v2) ? "true" : "false");
  },

  TestSentence: function (arr) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === 'false') {
        T.loseScenario();
        break;
      } else if (i == arr.length - 1) {
        T.winScenario();
      }
    }
  },

  winScenario: function(){
    alert('Correct!');
    T.Phrase++;
    T.TruthyArr = [];
  },

  loseScenario: function(){
    alert('Incorrect. Try Again!');
  }
};

if (Meteor.isClient) {

  Template.hello.helpers({
    sentence: function() {
      return Mandarin.findOne({phrase: T.Phrase});
    },
    phrase: function(){
      if (Meteor.status().status === "connected") {
        console.log('yay, connected!');
        var arr = Mandarin.find({phrase: T.Phrase}).fetch();
        var mandarinArr = (arr[0].mandarin);
        var res = [];
        var obj = {};
        for (var i = 0; i < mandarinArr.length; i++){
          obj.mandarin = mandarinArr[i];
          res.push(obj);
          obj = {};
        }
        return res;        
      } else {
        console.log(Meteor.status());
      }

    }
  }); 

  Template.hello.events({
    'click .word': function (e) {
      var target = e.currentTarget;
      var word = $(target).html();
      $('.guess').append('<span id="guess">' + word + ' </span>');
      $('.guess').css("font-size","40px");
      $(this).remove();
    },

    'click #submit': function () {
      var arr = Mandarin.find({phrase: T.Phrase},{fields: {mandarin: true}}).fetch();
      var testArr = (arr[0].mandarin);

      $('.guess').children().each(function (index, value) {
        var res = $(value).html();
        console.log('res: ' + res);
        T.Truthy(res, testArr[index] + " ");
      });
      console.log(T.TruthyArr);

      T.TestSentence(T.TruthyArr);
    }


  });

  //business logic



}



if (Meteor.isServer) {
  Meteor.startup(function () {
  
  });
/*
  Mandarin.insert({
    phrase: 2,
    english: ["hello"],
    mandarin: ["nín", "hǎo"]
  });
*/
}
