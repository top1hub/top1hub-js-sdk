#源速SDK  nodejs版Demo
```javascript
var mgr = new ResourceManager('输入安全码','输入容器名称');

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

```
