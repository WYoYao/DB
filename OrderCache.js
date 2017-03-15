/**
         * 主要用于分页，本地通过的缓存的对应的 hash的数据 
         * 
         * 
         */
        var OrderCache=function(options,getCb){
            /**
             * options={
             *   key:"",// 值为字符串或数组  当需要的多分类时候使用的数组处理
             *   getCb:function(){}, // 从后台获取数据的方法
             * }
             */

            if(Object.prototype.toString.call(options).slice(8,-1)!=="Object"){
                throw new Error("Options Must Be An Object");
            }

            if(Object.prototype.toString.call(getCb).slice(8,-1)!=="Function"){
                throw new Error("getCb Must Be An Function");
            }

            if(Object.prototype.toString.call(options.key).slice(8,-1)!="Array" && Object.prototype.toString.call(options.key).slice(8,-1)!="String"){
                throw new Error("options.key Must Be A String Or Array");
            }

            // key值转换成为对应的数组
            var keys=Object.prototype.toString.call(options.key).slice(8,-1)=="String"?[options.key]:options.key;

            // keys.reduce(function(content,item){
            //     content[item]={
            //         keys:{

            //         },
            //         value:[]
            //     }
            // },{})

            var Cache={};

            
            


            /**
             * req 请求方法的实体,实体中的字段需要和声明实例用的
             * 返回一个方法,该方法接收一个获取的参数的回调的函数
             * index 查询第几页
             * count 每次查询的数量
             * {req,index,count,cb}
             */
            return function(obj){
                
                // 根据传入查询信息来查询是否有对应的值
                var Selector=obj.req;
                // 每页数量
                var Count=obj.count;
                // 当前页数
                var Index=obj.index;
                // 成功回调
                var CB=obj.cb;

                var isHave;

                keys.reduce(function(content,key){
                    
                    if(Selector.hasOwnProperty(key))
                    
                    content.push(key);

                    return content;

                },[]).reduce(function(content,key,index,array){

                    // 如果的没有时候后面的操作的不再执行
                    if(content.isHave===false)return content;

                    content.isHave= Cache[key]?true:false;

                    if(content.isHave){
                        // 定位到最后的层的数据,然后做查询
                        if(index==array.length-1){
                            // 返回的查询数据
                            var result = content.res[key].slice((Count*(Index-1)+1),Count*(Index-1)+Count).reduce(function(content,item){

                                if(content.hasNull || content.hasUndefind){
                                    return content;
                                }

                                if(item===null){
                                    content.hasNull=true;
                                }else if(item===void 0){
                                    content.hasUndefind=true;
                                }else{
                                    content.res.push(item);
                                }
                            },{
                                res:[],
                                hasUndefind:false,
                                hasNull:false
                            })

                            if(!res.hasUndefind){
                                
                            }else{
                                CB(result.res);
                            }
                    

                        }else{
                            content.res=content.res[key];
                        }
                        
                    }

                },{
                    isHave:true,
                    res:Cache
                });

                keys.reduce(function(bool,item){
                    // 如果的没有时候后面的操作的不再
                    if(bool===false)return bool;
                        Selector
                    

                });


                var Code = keys.map(function(key){

                    return {
                        key:key,
                        value:Selector[key] || void 0
                    }

                }).reduce(function(content,item){

                    if(!item.value)return content;

                    content[item.key]=item.value;

                    return content;

                },{});

                getCb(Code,)
                
                cb();
            }
        }

        // 获取对应的评价列表 用于请求后台
        /**
         * index 获取的页数
         * count 每页的条数
         * cb     返回数据的调用回调
         */
        function QueryCommitList(req, cb) {
            /**
             * req={
             *   CityID,
             *   HotelID,
             *   RoomName,
             *   SearchType,
             *   CurrentPage,
             *   PageSize
             *}
             */

            var cb = arguments[arguments.length - 1];
            var Code;
            if (Object.prototype.toString.call(cb).slice(8, -1) != "Function") {
                throw new Error("cb Must Be A Function");
            }
            if (arguments.length == 2) {
                if (Object.prototype.toString.call(arguments[0]) != "Object") {
                    throw new Error("req Must Be An Object");
                }
            }
            
            if(arguments.length==1){
                //添加默认值
                Code = {
                    CurrentPage: 1,
                    PageSize: 10
                }
            }else if(arguments.length==2){
                Code=new Object(req);
            }

            //查询参数默认为的酒店的信息不可改变
            Code.CityID = $("#hidCityID").val() || 110000;
            Code.HotelID = $("#hidHotelID").val() || 80001322;

            // 调用请求后台的方法
            $.post('/hotel/hotel/_GetCommentListSelect', { Code: JSON.stringify(Code) }, function (data) {
                console.log(data);
            }).fail(function () {
                console.log("fail");
            })
        }

        /**
         * 
         * @param {*获取执行的页数} index 
         * @param {*获取的指定的数量} count 
         */
        function GetCommitList(index, count) {
            // 保存之前用到过的CommitList 如果没有对应的List 信息则从后台读取

        }

        QueryCommitList(function () {

        });