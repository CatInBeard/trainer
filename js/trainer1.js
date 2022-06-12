class Trainer{
    constructor(){
        this.change_size();
        this.showtime=2000;
        this.delaytime=100;
        this.update_showtime();
        this.update_delaytime();
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
    hide_blocks(that=false){
        if(!that){
            that=this;
        }
        that.clear(false,that);
        that.status=2;
        this.color_indicator_timeout=setTimeout(function(){color_indicator.style.backgroundColor=that.colorOne; that.status=3;},that.delaytime);
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
        indicator_ok.innerHTML="ВЕРНО: "+this.correct;
        indicator_err.innerHTML="ОШИБОК: "+this.errors;
    }
    block_click(block_num){
        if(this.status==3){
            var block=document.getElementById("block"+(block_num));
            if(this.blocks[block_num-1]==1){
                block.style.backgroundColor="#00FF00";
                this.blocks[block_num-1]=2;
                this.partly_corret--;
                if(this.partly_corret<=0){
                    this.correct++;
                    indicator_ok.innerHTML="ВЕРНО: "+this.correct;
                    this.end_color_indicator();
                    var that=this;
                    this.clear_timeout=setTimeout(function(){that.clear(true,that)},500);
                }
            }
            else if(this.blocks[block_num-1]==0){
                block.style.backgroundColor="#000000";
                this.errors++;
                indicator_err.innerHTML="ОШИБОК: "+this.errors;
            }
        }
    }
    notime(){  
        if(this.notimeval==0){
            if(this.status==0 || this.status==3){
                this.start(true);
                notime.innerHTML="СКРЫТЬ";
                this.notimeval=1;
            }
        }
        else{
            if(this.status==1){
                var that=this;
                this.hide_blocks(that);
                this.notimeval=0;
                notime.innerHTML="БЕЗ ВРЕМЕНИ";
            }
        }
    }
    end_color_indicator(){
        color_indicator.style.backgroundColor="#FFFFFF";
    }
    update_showtime(){
        // exp(1/x)*y=10; exp(100/x)*y=10000
        this.showtime=parseInt(Math.exp(parseInt(showtime.value)/14.33)*9.32);
        showtime_indicator.innerHTML="ВРЕМЯ ПОКАЗА: "+this.showtime+ " ms";
    }
    update_delaytime(){
        //exp(1/x)*y-1=0; exp(100/x)*y-1=10000
        this.delaytime=parseInt(Math.exp(parseInt(delaytime.value)/10.74)*0.91-1);
        delaytime_indicator.innerHTML="ВРЕМЯ ЗАДЕРЖКИ: "+this.delaytime+ " ms";
    }
}

window.onload = function(){
    window.trainer= new Trainer();
}