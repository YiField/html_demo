// import { json } from "body-parser";

// import { serialize } from "v8";

var xhr = new XMLHttpRequest();
console.log('readystate:'+xhr.readyState);
xhr.onreadystatechange=function(){
    if(xhr.readyState==4){
        if((xhr.status>=200&&xhr.status<300)||xhr.status==304){
            console.log('reptxt:'+xhr.responseText);
        }else{
            console.log('reptxt:'+xhr.responseText);
        }
    }
}
var url="http://127.0.0.1:8888";
// url=addURLParam(url,"name","mike");
// url=addURLParam(url,"age","10");
xhr.open("post",url,true);
// xhr.setRequestHeader("myheader","myvalue");
xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
var form=document.getElementById("user-info");
var data=serialize(form);
console.log(data)
console.log(data.length)
// xhr.send(data);
// xhr.send(null);

function addURLParam(url,name,value){
    url+=url.indexOf("?")==-1?"?":"&";
    url+=encodeURIComponent(name)+"="+encodeURIComponent(value);
    return url;
}

//表单序列化
function serialize(form){
    var parts =[],
    field=null,
    i,
    len,
    j,
    optLen,
    option,
    optValue;

    for( i=0,len=form.elements.length;i<len;i++){
        field=form.elements[i];

        switch(field.type){
            case "select-one":
            case "select-multiple":
                if(field.name.length){
                    for(j=0,optLen=field.options.length;j<optLen;j++){
                        option =field.options[j];
                        if(option.selected){
                            optValue="";
                            if(option.hasAttribute){
                                optValue=option.hasAttribute("value")?option.value:option.text;
                            }else{
                                optValue=option.attributes["value"].specitied?option.value:option.text;
                            }
                            parts.push(encodeURIComponent(field.name)+"="+encodeURIComponent(optValue))
                        }
                    }
                }
                break;
                case undefined:
                case "file":
                case "submit":
                case "reset":
                case "button":
                    break;
                case "radio":
                case "checkbox":
                    if(!field.checked){
                        break;
                    }
                default:
                    if(field.name.length){
                        parts.push(encodeURIComponent(field.name)+"="+encodeURIComponent(field.value));
                    }
        }
    }
    return parts.join("&");
}
function clickButton(){
    console.log('click')
}


