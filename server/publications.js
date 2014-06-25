if (Meteor.isServer){
  Meteor.publish('mandarin',function(){
    return Mandarin.find();
  });
}