
import {EventEmitter} from "node:events";
function proxyTest(obj){
    return new Proxy(obj,{
        get(target, prop, receiver){
           return Reflect.get(obj, prop, receiver)
        },
        apply(target,thisArg,argArray){
            return Reflect.apply(target,thisArg,argArray)
        }
    })
}

const objectTest = {
    test: function() { console.log("this is a test") },
    name: "objectTest"
}

const logTest = {
    _debug: function() { console.log("debug") },
    _info: function() { console.log("info"); this._debug() }
}

const parts = Object.assign({},objectTest,logTest)

const testProxy = proxyTest(parts)

console.log(testProxy)

const testObject = new EventEmitter()

const emitterParts = {
    init: function(){
        console.log("init emitter")
    },
}

const testParts = Object.assign({}, emitterParts, EventEmitter)

console.log(testParts)