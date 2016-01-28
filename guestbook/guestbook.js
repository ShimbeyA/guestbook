Messages = new Mongo.Collection("messages");

if (Meteor.isClient) {
  
  Meteor.subscribe("messages");
  
  Template.guestBook.helpers({
    "messages": function() {
      return Messages.find( {}, {sort:{createdOn: -1}}) || {};
    //return all messafe objects or an empty object if
    //DB is invalid
    }
  });
  
  Template.guestBook.events(
      {
        "submit form": function(event){
          event.preventDefault();
          
          var messageBox =
          $(event.target).find('textarea[name=guestBookMessage]');
          
          var messageText = messageBox.val();
          
          var nameBox=
          $(event.target).find('input[name=guestName]');
          var nameText= nameBox.val();
          
          Messages.insert(
            {
              name: nameText,
              message: messageText,
              createdOn: Date.now(),
            });
          nameBox.val("");
          messageBox.val("");
         // alert("Name is " + nameText + ", msg is " + messageText);
      }
      }      
      );
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
  
  Meteor.publish("messages", function() {
    return Messages.find();
  });
  
}
