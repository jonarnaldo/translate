Lang = {
	English: ["welcome","hello","I'm fine, thanks. And you?","Long time no see","What's your name?","My name is","Where are you from?","I'm from"."Pleased to meet you","Bon appetit"," don't understand"."Please say that again"],
	Mandarin: ["huānyíng guānglín", "nín hǎo","wǒ hěn hǎo nǐ ne","hǎojǐu bújiàn","nín guìxìng dàmíng","wǒ jiào","nǐ shì nǎguórén","wǒ shì ... rén","wǒ hěn gāoxìng gěn nǐ jiànmiàn","qǐng màn yòng","wǒ tīngbùdǒng"."qǐng nǐ zài shuō yīcì hǎo ma"]
};


PhraseObjGen = function(index,eng,man){
	var obj = {};
		obj.phrase = index;
		obj.english = [eng];

		var manArr = man.split(" ");
		var bufferArr = [];
		for (var i = 0; i < manArr.length; i++) {
			bufferArr.push(manArr[i]);
		} 

		obj.mandarin = bufferArr;
	return obj;
}

PhraseArrGen = function (engArr, manArr) {
	for (var i = 0; i < engArr.length; i++) {
		var res = PhraseObjGen(i+1,engArr[i],manArr[i]);
		Meteor.call('insert',res);
	}
}

Meteor.methods({
	insert: function(obj){
		Mandarin.insert(obj);
	}
});
