'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _regenerator=require('babel-runtime/regenerator');var _regenerator2=_interopRequireDefault(_regenerator);var _extends2=require('babel-runtime/helpers/extends');var _extends3=_interopRequireDefault(_extends2);var _classCallCheck2=require('babel-runtime/helpers/classCallCheck');var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=require('babel-runtime/helpers/createClass');var _createClass3=_interopRequireDefault(_createClass2);var _path=require('path');
var _asyncFs=require('../modules/asyncFs');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var

ImageResolver=function(){
function ImageResolver(props){(0,_classCallCheck3.default)(this,ImageResolver);
this.platformSuffixes=['','.ios','.android'];
}(0,_createClass3.default)(ImageResolver,[{key:'apply',value:function apply(
resolver){var _this=this;
resolver.plugin('before-new-resolve',function _callee(request,callback){var filePath,exists,file,scale,i,scaledFileName,_exists,result,parsed,parsedResult;return _regenerator2.default.async(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:if(


/\/[^\/\.@]+\.(png|gif|jpe?g)$/i.test(request.request)){_context.next=2;break;}return _context.abrupt('return',
callback());case 2:


filePath=(0,_path.join)(request.path,request.request);_context.prev=3;_context.next=6;return _regenerator2.default.awrap(



(0,_asyncFs.fileExistsAsync)(filePath));case 6:exists=_context.sent;if(!
exists){_context.next=9;break;}return _context.abrupt('return',
callback());case 9:



file=(0,_path.parse)(filePath);
scale=2;case 11:if(!(scale<=3)){_context.next=30;break;}
i=0;case 13:if(!(i<_this.platformSuffixes.length)){_context.next=27;break;}
scaledFileName=file.name+'@'+scale+'x'+_this.platformSuffixes[i]+file.ext;_context.next=17;return _regenerator2.default.awrap(
(0,_asyncFs.fileExistsAsync)((0,_path.join)(file.dir,scaledFileName)));case 17:_exists=_context.sent;if(!

_exists){_context.next=24;break;}
result=(0,_extends3.default)({},request,{
request:request.request.replace(file.base,scaledFileName)});

parsed=resolver.parse(result.request);
parsedResult=(0,_extends3.default)({},result,parsed);
resolver.doResolve('parsed-resolve',parsedResult,'found file: customized file',callback);return _context.abrupt('return');case 24:i++;_context.next=13;break;case 27:scale++;_context.next=11;break;case 30:_context.next=35;break;case 32:_context.prev=32;_context.t0=_context['catch'](3);






console.error(_context.t0);case 35:


callback();case 36:case'end':return _context.stop();}}},null,_this,[[3,32]]);});

}}]);return ImageResolver;}();exports.default=ImageResolver;