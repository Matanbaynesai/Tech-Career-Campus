const assert = require('chai').assert;
const expect = require('chai').expect;
const isToken = require('../server/controller/authorization/isToken');

// describe('the isToken() Checks if your role allows you access to a particular action',()=>{
//     it('isToken() mast by a function', ()=>{
//         const res = {};
//         isToken({header body:  { payload: { _id: "1"}}}, res , () => {} )
//         console.log(res);
//         debugger;
//        expect(result).to.be.a('function')
//     })
//  });