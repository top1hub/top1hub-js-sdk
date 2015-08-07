var ResourceManager = require('./index.js').ResourceManager;
var mgr = new ResourceManager('1045ce61c8ad4b05ac06c283f4bed95b','test');

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
