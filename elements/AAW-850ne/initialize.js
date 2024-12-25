function(instance, context) {
  
  var id = "Visible_"+ Math.floor((Math.random() * 1000000) + 1);
  instance.canvas.append("<div id='"+id+"' style='width:100%;height:100%'></div>");
  instance.data.id = id;

}