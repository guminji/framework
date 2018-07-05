/**
 * Created by guminji on 2018/7/4.
 */
class test{
    constructor(){
        this.age = 19;
    }
    getAge(){
        return this.age;
    }
}
var a =new test();
console.log(Object.getPrototypeOf(a.constructor.prototype));
function test(){
    this.age =19;
}
test.prototype.getAge =function(){
    return this.age;
}
var b = new test();
b.constructor.prototype.getAge;