var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var Feed;
var lastFed;


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database()
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feedthedog=createButton("Feed");
  feedthedog.position(700,95);
  feedthedog.mousePressed(feedthedog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  lastFed=database.ref('FeedTime');
  lastFed.on("value",readStock);  
 
  

  drawSprites();
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  if(mousePressed(feedthedog)){
var food_stock_val=foodObj.getFoodStock();
if(food_stock_val<=0){
  foodObj.updateFoodStock(food_stock_val *0);
}else{
  foodObj.updateFoodStock(food_stock_val -1);
}
if(lastFed>=12){
  text("last feed : PM",350,30)
    }else if(lastFed==0){
      text("last feed : 12 AM", 350,30);
    }else{
  text("lastfeed : AM",350,30)
    }
  }
  lastFed=database.ref('FeedTime');
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

/*async function gettime(){
  var response = await fetch("http://worldtimeapi.org/api/timezone/America/Toronto");
  var responseJSON = await response.json();
  var datetime = responseJSON.datetime;
  var hour = datetime.slice(11,13);
}*/