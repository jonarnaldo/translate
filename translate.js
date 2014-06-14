if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to translate.";
  };

  Template.hello.events({
    'click input': function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    },

    'click .a': function (e) {
      var target = e.currentTarget;
      console.log(e);
      var word = $(target).html();
      $('.match').append('<span id="guess">' + word + ' </span>');
      $('.match').css("font-size","40px");
      $(this).remove();
    },

    'click #submit': function () {
      var arrTest = phrases[1].mandarin.split(" ");

      $('.match').children().each(function (index, value) {
        var test = $(value).html(), phrase = arrTest[index] + " ";
        res.push(test);
        truthy(test, phrase);
      });
      alert(TruthyArr);
      testSentence(TruthyArr);
    }


  });

  Template.hello.helpers({
      /*
      var init = function(){
        var i = 1;

        $('#sentence').append('<div id="word">' + phrases[1].english + '</div>');
        $('#word').css("font-size", "50px");
      };

      init();
      */
    })



  //business logic
  TruthyArr = [];
  res = [];

  var truthy = function (v1, v2) {
    TruthyArr.push((v1 === v2) ? "true" : "false");
  };

  var testSentence = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === 'false') {
        alert('nope!');
        break;
      } else if (i == arr.length - 1) {
        alert('yup!');
      }
    }
  };

  //data
  phrases = {
    1: { mandarin: "nǐ hǎo ma", english: "how are you?" },
    2: { mandarin: "wǒ hěn hǎo, nǐ ne", english: "I'm fine, thanks. And you?" }
  };

  //view
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    
  });
}
