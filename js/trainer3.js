class Trainer{
    constructor(){
        this.change_size();
        this.showtime=2000;
        this.delaytime=100;
        this.update_showtime();
        this.blocks=[];
        this.status=0;
        this.correct=0;
        this.errors=0;
        this.partly_corret=0;
        this.notimeval=0;
    }
    change_size(start=false){
        if(localStorage.getItem("vt") && localStorage.getItem("hr") && !start){
            this.vt=localStorage.getItem("vt");
            this.hr=localStorage.getItem("hr");
            start=true;
        }
        else{
            this.vt=parseInt(window.vt.value);
            this.hr=parseInt(window.hr.value);
        }
        if(start){
            localStorage.setItem("vt", this.vt);
            localStorage.setItem("hr", this.hr);
            window.sizer.classList.add("hidden-on");
            window.main_view.classList.remove("hidden-on");
            
            var cells="";
            var count=0;
            for(var i=0;i<this.vt;i++){
                cells=cells+ "<tr>";
                for(var j=0;j<this.hr;j++){
                    count++;
                    cells=cells+ "<td id='block"+count+"' onclick='window.trainer.block_click("+count+")'></td>";
                }
                cells=cells+ "</tr>";
            }
            blocks.innerHTML=cells;
        }
    }
    ask_change(){
        window.sizer.classList.remove("hidden-on");
        window.main_view.classList.add("hidden-on");
    }
    numGenSingle(){
        var number;
        number=(Math.ceil(Math.random()*255));
        number=number.toString(16);
        return number;
    }
    numGen(){
        var number;
        var number_inverse;
        number=(Math.ceil(Math.random()*255));
        number_inverse=255-number;
        number_inverse=number_inverse.toString(16);
        number=number.toString(16);
        if(number.length==1){
            number='0'+number;
        }
        if(number_inverse.length==1){
            number_inverse='0'+number_inverse;
        }
        return [number,number_inverse];
    }
    start(timed=false){
        if(this.status==0 || this.status==3){
            this.end_color_indicator();
            this.partly_corret=0;
            this.status=1;
            this.clear();
            var colors=this.colorGenerator();
            this.colorOne=colors[0];
            this.colorTwo=colors[1];
            this.blocks=[];
            for(var i=0;i<this.vt*this.hr;i++){
                this.blocks[i]=Math.round(Math.random());
                var block=document.getElementById("block"+(i+1));
                if(this.blocks[i]==1){
                    this.partly_corret++;
                    block.style.backgroundColor=this.colorOne;
                }
                else{
                    block.style.backgroundColor=this.colorTwo;
                }
            }
            var that=this;
            if(!timed){
                this.hide_blocks_timeout=setTimeout(function(){ that.hide_blocks(that) },that.showtime);
            }
        }
    }
    colorGeneratorSingle(){
        var color=this.numGenSingle();
        var colorOne='#'+color;
        var color=this.numGenSingle();
        colorOne=colorOne+color;
        var color=this.numGenSingle();
        colorOne=colorOne+color;
        return colorOne;
    }
    colorGenerator(){
        var colors=this.numGen();
        var colorOne='#'+colors[0];
        var colorTwo='#'+colors[1];
        colors=this.numGen();
        colorOne=colorOne+colors[0];
        colorTwo=colorTwo+colors[1];
        colors=this.numGen();
        colorOne=colorOne+colors[0];
        colorTwo=colorTwo+colors[1];
        return [colorOne,colorTwo];
    }
    math_preset(){
        var sum=Math.floor(Math.random() * 78)+22;
        var first=Math.floor(Math.random() * (sum-22))+11;
        var second=sum-first;
        return [first,second,sum];
    }
    math_ex(that=false){
        if(!that){
            that=this;
        }
        var math=that.math_preset();
        var ans=0;
        while(ans!=math[2]){
            if(ans!=0){
                math=that.math_preset();
                ans=prompt("Ошибка! Новый пример: "+math[0]+"+"+math[1]+"=? \nДля выхода введите \"стоп\" или \"stop\"");
            }
            else{
                ans=prompt(math[0]+"+"+math[1]+"=?");
            }
            if(ans=="Стоп" || ans=="стоп" || ans=="Stop" || ans=="stop"){
                return false;
            }
        }
    }
    hide_blocks(that=false){
        if(!that){
            that=this;
        }
        this.makeNoise();
        that.status=2; 
        that.clear();
        this.hide_blocks_timeout=setTimeout(function(){ that.hide_blocks_extend(that) },350);
    }
    hide_blocks_extend(that=false){
        if(!that){
            that=this;
        }
        that.math_ex();
        that.status=3; 
        color_indicator.style.backgroundColor=that.colorOne;   
    }
    makeNoise(){
        for(var i=0;i<this.vt*this.hr;i++){
            var block=document.getElementById("block"+(i+1));
            block.style.backgroundColor=this.colorGeneratorSingle();
        }
    }
    clear(full=false,that=false){
        if(!that){
            that=this;
        }
        if(full){
            that.status=0;
        }
        for(var i=0;i<that.vt*that.hr;i++){
            var block=document.getElementById("block"+(i+1));
            block.style.backgroundColor="#FFFFFF";
        }
    }
    reset(){
        this.correct=0;
        this.errors=0;
        this.status=0;
        clearTimeout(this.color_indicator_timeout);
        clearTimeout(this.clear_timeout);
        clearTimeout(this.hide_blocks_timeout);
        indicator_ok.innerHTML="Верно: "+this.correct;
        indicator_err.innerHTML="Ошибок: "+this.errors;
    }
    vtPlus(count){
        window.vt.value=parseInt(parseInt(window.vt.value)+count);
        if(window.vt.value<2){
            window.vt.value=2;
        }
    }
    hrPlus(count){
        window.hr.value=parseInt(parseInt(window.hr.value)+count);
        if(window.hr.value<2){
            window.hr.value=2;
        }
    }
    block_click(block_num){
        if(this.status==3){
            var block=document.getElementById("block"+(block_num));
            if(this.blocks[block_num-1]==1){
                block.style.backgroundColor=this.colorOne;
                this.blocks[block_num-1]=2;
                this.partly_corret--;
                if(this.partly_corret<=0){
                    this.correct++;
                    indicator_ok.innerHTML="Верно: "+this.correct;
                    this.end_color_indicator();
                    var that=this;
                    this.clear_timeout=setTimeout(function(){that.clear(true,that)},500);
                }
            }
            else if(this.blocks[block_num-1]==0){
                block.style.backgroundColor="#606779";
                this.errors++;
                indicator_err.innerHTML="Ошибок: "+this.errors;
            }
        }
    }
    notime(){  
        if(this.notimeval==0){
            if(this.status==0 || this.status==3){
                this.start(true);
                notime.innerHTML="Скрыть";
                this.notimeval=1;
            }
        }
        else{
            if(this.status==1){
                var that=this;
                this.hide_blocks(that);
                this.notimeval=0;
                notime.innerHTML="Без времени";
            }
        }
    }
    end_color_indicator(){
        color_indicator.style.backgroundColor="#FFFFFF";
    }
    update_showtime(){
        // exp(1/x)*y=10; exp(100/x)*y=10000
        this.showtime=parseInt(Math.exp(parseInt(showtime.value)/14.33)*9.32);
        showtime_indicator.innerHTML="Время показа: "+this.showtime+ " ms";
    }
}

window.onload = function(){
    window.trainer= new Trainer();
}