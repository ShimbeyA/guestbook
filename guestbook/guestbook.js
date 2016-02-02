Messages = new Mongo.Collection("messages");

Router.route('/', function () {
  
      this.render ('guestBook'); //render guestbook template 
      this.layout('layout');
  
  });

Router.route('/about', function (){
  this.render('about');
  this.layout('layout');
  });

Router.route('/messages/:_id', function () {
  //data is a specific keyword in meteor that
  //calls on message that was entered
  this.render('message', {
    data:function() {
      return Messages.findOne({_id: this.params._id});
    }
  });
  
  this.layout('layout');
  },
  {
    name: 'message.show'
  }
  );

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
          
          if (nameText.length > 0 && messageText > 0)
          {
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
      else{
        //alert
        console.output(messageBox);
        messageBox.style.backgroundColor="blue"
      }
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
