function sayHello(name){
    if(!name) return "Error";
    console.log("Hello"+name);
    return "Hi There "+ name;
}


function testFn(){
    let x="Gary";
    let res=sayHello(x);
    console.log(res);
}

function travel(city){
    return "Traveling to "+city;

}
let t1=travel("Monaco");
let t2=travel("Rome");
console.log(t1,t2);

function Dog(name, a){
    this.name=name;
    this.age=a;
    this.owner="Gary";
}
class Cat{
    constructor(name,age,color){
        this.name=name;
        this.age=age;
        this.color=color;
    }
    roar(){
        console.log("I'm Roarrrriiing");
    }
}

function testObj(){
    //object literal
    let lola={
        name:"Lola",
        age:"3"
    };

    let fido = new Dog("Fido",4);
    let scooby = new Dog("Scooby",60);
    console.log(fido);
    console.log(scooby);
    //class
    let a = "Garfield";
    let garfield = new Cat(a,30,"Orange");
    console.log(garfield);
}

function testReq(){
    $.ajax({
        type:"GET",
        url:"http://restclass.azurewebsites.net/api/test",
        success:function(res){
            console.log("Request OK",res);
        },
        error:function(error){
            console.log("Request Failed :(",error);
        }
    });
}