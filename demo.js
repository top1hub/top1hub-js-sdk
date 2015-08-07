var ResourceManager = require('./index.js').ResourceManager;
var mgr = new ResourceManager('','test');

mgr.upload('test.jpg','./test.jpg',true,function(err,result){
    if (err) {
        console.log(err);
        return;
    }
    console.log(result);
});

mgr.delete('abc.jpg',function(err,result){
    if (err) {
        console.log(err);
        return;
    }
    console.log(result);
});
