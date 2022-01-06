var dog,sadDog,happyDog;
var feed,add,foodObj
var foods



function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,400);

  database = firebase.database()
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
  foodObj = new Food()
  foodStock = database.ref('Food')
  foodStock.on("value",readStock)
  feed=createButton("Feed the dog"); 
  feed.position(700,95); 
  feed.mousePressed(feedDog); 

  addFood=createButton("Add Food"); 
  addFood.position(800,95);
  addFood.mousePressed(addFood);

  
}

function draw() {
  
  background(46,139,87);
  foodObj.display()


  drawSprites();
  
}

//function to read food Stock
function readStock(data){foods= data.val()
  foodObj.updateFoodStock()

}



//function to update food stock and last fed time
function feedDog(){ dog.addImage(happyDog); 
  if(foodObj.getFoodStock()<= 0){ 
    foodObj.updateFoodStock(foodObj.getFoodStock()*0); 
  }else{ foodObj.updateFoodStock(foodObj.getFoodStock()-1); } 
  database.ref('/').update({ Food:foodObj.getFoodStock(), FeedTime:hour() }) }


//function to add food in stock
function addFood(){
  foodS++;
  database.ref('/').update({
    Food:foods
  })
}
