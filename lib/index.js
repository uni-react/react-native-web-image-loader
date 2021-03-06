'use strict';var _regenerator=require('babel-runtime/regenerator');var _regenerator2=_interopRequireDefault(_regenerator);var _stringify=require('babel-runtime/core-js/json/stringify');var _stringify2=_interopRequireDefault(_stringify);

var _path=require('path');var _path2=_interopRequireDefault(_path);
var _fs=require('fs');var _fs2=_interopRequireDefault(_fs);
var _imageSizeResolver=require('./modules/imageSizeResolver');var _imageSizeResolver2=_interopRequireDefault(_imageSizeResolver);
var _scaledImageResolver=require('./modules/scaledImageResolver');var _scaledImageResolver2=_interopRequireDefault(_scaledImageResolver);
var _asyncFs=require('./modules/asyncFs');
var _imageWrapper=require('./modules/imageWrapper');
var _imageResolver=require('./plugins/imageResolver');var _imageResolver2=_interopRequireDefault(_imageResolver);
var _loaderUtils=require('loader-utils');var _loaderUtils2=_interopRequireDefault(_loaderUtils);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var DEFAULT_IMAGE_CLASS_PATH=require.resolve('./modules/adaptiveImage');
var DEFAULT_IMAGE_NAME_FORMAT='[hash].[ext]';
var DEFAULT_SCALINGS={'@2x':2,'@3x':3};

function reactNativeWebImageLoader(content){var callback,query,wrapper,nameFormat,scalings,size,url,result,resolvedFiles,key,fileContent,fileName,publicPath;return _regenerator2.default.async(function reactNativeWebImageLoader$(_context){while(1){switch(_context.prev=_context.next){case 0:
callback=this.async();
if(this.cacheable)this.cacheable();

query=_loaderUtils2.default.parseQuery(this.query);
wrapper=(0,_imageWrapper.createImageWrapper)(_loaderUtils2.default.stringifyRequest(this,query.imageClassPath||DEFAULT_IMAGE_CLASS_PATH));
nameFormat=query.name||DEFAULT_IMAGE_NAME_FORMAT;
scalings=query.scalings||DEFAULT_SCALINGS;
size=(0,_imageSizeResolver2.default)(this.resourcePath);
url=_loaderUtils2.default.interpolateName(this,nameFormat,{
context:this.context,
content:content});

result={
'@1x':'__webpack_public_path__ + '+(0,_stringify2.default)(url)};


this.emitFile(url,content);_context.prev=10;_context.next=13;return _regenerator2.default.awrap(


(0,_scaledImageResolver2.default)(this.resourcePath,scalings));case 13:resolvedFiles=_context.sent;_context.t0=_regenerator2.default.keys(

resolvedFiles);case 15:if((_context.t1=_context.t0()).done){_context.next=32;break;}key=_context.t1.value;_context.prev=17;_context.next=20;return _regenerator2.default.awrap(

(0,_asyncFs.readFileAsync)(resolvedFiles[key]));case 20:fileContent=_context.sent;
fileName=_loaderUtils2.default.interpolateName(this,nameFormat,{
context:this.context,
content:fileContent});

publicPath='__webpack_public_path__ + '+(0,_stringify2.default)(fileName);

this.emitFile(fileName,fileContent);
result['@'+scalings[key]+'x']=publicPath;_context.next=30;break;case 27:_context.prev=27;_context.t2=_context['catch'](17);

console.error(_context.t2);case 30:_context.next=15;break;case 32:_context.next=37;break;case 34:_context.prev=34;_context.t3=_context['catch'](10);



console.error(_context.t3);case 37:


callback(null,wrapper(size,result));case 38:case'end':return _context.stop();}}},null,this,[[10,34],[17,27]]);}


module.exports=reactNativeWebImageLoader;
module.exports.raw=true;
module.exports.imageResolver=_imageResolver2.default;